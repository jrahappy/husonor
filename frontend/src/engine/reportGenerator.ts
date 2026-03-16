import type { ExamTemplate, FieldDefinition } from '../types/template';
import type { FormValues, GeneratedReport, ReportSection } from '../types/report';
import { interpolateSentence } from './sentenceBuilder';
import { evaluateAllFields } from './normalRangeEvaluator';

type ConclusionBuilder = (values: FormValues, template: ExamTemplate) => string;

const customBuilders: Record<string, ConclusionBuilder> = {
  cardiac_echo_conclusion: buildCardiacConclusion,
  renal_conclusion: buildRenalConclusion,
  shoulder_conclusion: buildShoulderConclusion,
  vascular_dvt_conclusion: buildVascularDvtConclusion,
  obstetric_conclusion: buildObstetricConclusion,
};

export function generateReport(
  template: ExamTemplate,
  values: FormValues,
): GeneratedReport {
  const sections: ReportSection[] = template.sections
    .sort((a, b) => a.order - b.order)
    .map((section) => generateSection(section, values))
    .filter((section): section is ReportSection => section !== null);

  const conclusion = generateConclusion(template, values, sections);

  return {
    templateId: template.id,
    templateName: template.name,
    header: template.reportHeader ?? template.name.toUpperCase(),
    findingsIntro: template.findingsIntro ?? '',
    sections,
    conclusion,
    generatedAt: new Date().toISOString(),
    rawValues: { ...values },
  };
}

function generateSection(
  section: { id: string; title: string; titleKo?: string; fields: FieldDefinition[]; sentencePattern: { template: string; defaultSentence?: string }; omitWhenEmpty?: boolean },
  values: FormValues,
): ReportSection | null {
  const hasValue = (field: FieldDefinition) => {
    const v = values[field.id];
    if (v === null || v === undefined || v === '') return false;
    if (field.type === 'checkbox') return v === true;
    if (field.type === 'select') return v !== field.defaultValue;
    return true;
  };

  const allEmpty = section.fields.every((f) => !hasValue(f));

  if (allEmpty && section.omitWhenEmpty) {
    return null;
  }

  const fieldMap = new Map<string, FieldDefinition>();
  section.fields.forEach((f) => fieldMap.set(f.id, f));

  let sentences: string;
  if (allEmpty && section.sentencePattern.defaultSentence !== undefined) {
    sentences = section.sentencePattern.defaultSentence;
  } else {
    sentences = interpolateSentence(
      section.sentencePattern.template,
      values,
      fieldMap,
    );
  }

  const rangeResults = evaluateAllFields(values, section.fields);
  const abnormalFields = rangeResults
    .filter((r) => !r.isNormal)
    .map((r) => r.fieldId);

  return {
    sectionId: section.id,
    title: section.title,
    titleKo: section.titleKo,
    sentences,
    hasAbnormalFindings: abnormalFields.length > 0,
    abnormalFields,
  };
}

function generateConclusion(
  template: ExamTemplate,
  values: FormValues,
  sections: ReportSection[],
): string {
  if (!template.conclusionPattern) return '';

  if (template.conclusionPattern.builderId) {
    const builder = customBuilders[template.conclusionPattern.builderId];
    if (builder) return builder(values, template);
  }

  const hasAnyAbnormal = sections.some((s) => s.hasAbnormalFindings);
  if (!hasAnyAbnormal) {
    return template.conclusionPattern.defaultSentence ?? '';
  }

  const allFieldMap = new Map<string, FieldDefinition>();
  template.sections.forEach((s) =>
    s.fields.forEach((f) => allFieldMap.set(f.id, f)),
  );

  return interpolateSentence(
    template.conclusionPattern.template,
    values,
    allFieldMap,
  );
}

// ============ Conclusion Builders ============

function buildCardiacConclusion(values: FormValues): string {
  const findings: string[] = [];

  const ef = values['ef'];
  if (ef != null && ef !== '' && Number(ef) < 55) {
    findings.push(`reduced LV systolic function (EF ${ef}%)`);
  }

  const lvEdd = values['lv_edd'];
  if (lvEdd != null && lvEdd !== '' && Number(lvEdd) > 56) {
    findings.push('LV dilatation');
  }

  const laDim = values['la_dimension'];
  if (laDim != null && laDim !== '' && Number(laDim) > 40) {
    findings.push('LA enlargement');
  }

  const valveChecks = [
    { id: 'mr_grade', name: 'mitral regurgitation' },
    { id: 'ar_grade', name: 'aortic regurgitation' },
    { id: 'tr_grade', name: 'tricuspid regurgitation' },
  ];
  for (const vc of valveChecks) {
    const grade = values[vc.id] as string;
    if (grade === 'moderate') findings.push(`moderate ${vc.name}`);
    if (grade === 'severe') findings.push(`severe ${vc.name}`);
  }

  const rvsp = values['rvsp'];
  if (rvsp != null && rvsp !== '' && Number(rvsp) > 35) {
    findings.push(`elevated RVSP (${rvsp}mmHg)`);
  }

  if (values['pericardial_effusion'] === true) {
    findings.push('pericardial effusion');
  }

  const diastolicGrade = values['diastolic_grade'] as string;
  if (diastolicGrade && diastolicGrade !== 'normal') {
    const gradeLabels: Record<string, string> = {
      grade1: 'Grade I diastolic dysfunction',
      grade2: 'Grade II diastolic dysfunction (pseudonormal)',
      grade3: 'Grade III diastolic dysfunction (restrictive)',
    };
    findings.push(gradeLabels[diastolicGrade] ?? 'diastolic dysfunction');
  }

  if (findings.length === 0) {
    return 'Normal echocardiographic findings.';
  }

  return findings.map((f) => f.charAt(0).toUpperCase() + f.slice(1)).join('. ') + '.';
}

function buildRenalConclusion(values: FormValues): string {
  const findings: string[] = [];

  const rkNad = values['rk_nad'];
  if (rkNad === false) {
    const pathology = values['rk_pathology'] as string;
    if (pathology && pathology !== 'none') findings.push(`right kidney ${pathology}`);
  }

  const lkNad = values['lk_nad'];
  if (lkNad === false) {
    const pathology = values['lk_pathology'] as string;
    if (pathology && pathology !== 'none') findings.push(`left kidney ${pathology}`);
  }

  const prostateStatus = values['prostate_status'] as string;
  if (prostateStatus === 'enlarged') findings.push('prostatomegaly');
  if (prostateStatus === 'prostatectomy') findings.push('previous prostatectomy');

  const postMict = values['bladder_post_mict'];
  if (postMict != null && postMict !== '' && Number(postMict) > 100) {
    findings.push('significant post void residual volume');
  }

  if (findings.length === 0) {
    return 'Normal kidneys, ureters and bladder ultrasound. No evidence of prostatomegaly. No significant post void residual bladder volume.';
  }

  return findings.map((f) => f.charAt(0).toUpperCase() + f.slice(1)).join('. ') + '.';
}

function buildShoulderConclusion(values: FormValues): string {
  const findings: string[] = [];
  const side = (values['shoulder_side'] as string) ?? 'left';
  const sideLabel = side.charAt(0).toUpperCase() + side.slice(1);

  const structures = [
    { id: 'lhb_nad', name: 'long head biceps' },
    { id: 'subscap_nad', name: 'subscapularis' },
    { id: 'rif_nad', name: 'rotator interval' },
    { id: 'supra_nad', name: 'supraspinatus' },
    { id: 'infra_nad', name: 'infraspinatus' },
    { id: 'teres_nad', name: 'teres minor' },
    { id: 'bursa_nad', name: 'bursa' },
    { id: 'post_joint_nad', name: 'posterior joint' },
    { id: 'ac_joint_nad', name: 'AC joint' },
  ];

  for (const s of structures) {
    if (values[s.id] === false) {
      const commentId = s.id.replace('_nad', '_comment');
      const comment = values[commentId] as string;
      if (comment) {
        findings.push(`${s.name}: ${comment}`);
      } else {
        findings.push(`${s.name} abnormality`);
      }
    }
  }

  if (findings.length === 0) {
    return `Normal ${sideLabel.toLowerCase()} shoulder ultrasound.`;
  }

  return findings.map((f) => f.charAt(0).toUpperCase() + f.slice(1)).join('. ') + '.';
}

function buildVascularDvtConclusion(values: FormValues): string {
  const side = (values['dvt_side'] as string) ?? 'left';
  const limb = (values['dvt_limb'] as string) ?? 'upper';
  const sideLabel = side.charAt(0).toUpperCase() + side.slice(1);
  const limbLabel = limb === 'upper' ? 'upper limb' : 'lower limb';

  const veins = limb === 'upper'
    ? ['ij', 'subclavian', 'axillary', 'brachial', 'cephalic', 'basilic']
    : ['cfv', 'sfv', 'popliteal', 'atv', 'ptv', 'peroneal', 'gsv', 'ssv'];

  const abnormalVeins: string[] = [];
  for (const v of veins) {
    if (values[`${v}_patent`] === false) {
      const veinNames: Record<string, string> = {
        ij: 'internal jugular', subclavian: 'subclavian', axillary: 'axillary',
        brachial: 'brachial', cephalic: 'cephalic', basilic: 'basilic',
        cfv: 'common femoral', sfv: 'superficial femoral', popliteal: 'popliteal',
        atv: 'anterior tibial', ptv: 'posterior tibial', peroneal: 'peroneal',
        gsv: 'great saphenous', ssv: 'small saphenous',
      };
      abnormalVeins.push(veinNames[v] ?? v);
    }
  }

  if (abnormalVeins.length === 0) {
    return `No DVT or superficial venous thrombophlebitis identified in the ${sideLabel.toLowerCase()} ${limbLabel}.`;
  }

  return `Thrombosis identified in the ${abnormalVeins.join(', ')} vein(s) of the ${sideLabel.toLowerCase()} ${limbLabel}.`;
}

function buildObstetricConclusion(values: FormValues): string {
  const findings: string[] = [];

  const morphologyFields = [
    'morph_cerebellum', 'morph_nuchal_fold', 'morph_nasal_bone', 'morph_ventricles',
    'morph_4ch', 'morph_ivs', 'morph_outflow', 'morph_3vv',
    'morph_abd_walls', 'morph_kidneys', 'morph_stomach', 'morph_bowel',
    'morph_spine_sag', 'morph_humerus', 'morph_femur',
    'morph_cord_3v', 'morph_cord_insertion',
  ];

  const hasAbnormalMorph = morphologyFields.some((f) => values[f] === false);
  if (hasAbnormalMorph) {
    findings.push('morphological abnormalities noted');
  }

  const amnioticFluid = values['amniotic_fluid'] as string;
  if (amnioticFluid === 'increased') findings.push('polyhydramnios');
  if (amnioticFluid === 'decreased') findings.push('oligohydramnios');

  if (findings.length === 0) {
    return 'Single, live intrauterine gestation, with measurements concordant with established dates. The foetal morphology assessment is normal. No unusual features evident.';
  }

  return findings.map((f) => f.charAt(0).toUpperCase() + f.slice(1)).join('. ') + '.';
}
