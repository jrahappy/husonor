import type { ExamTemplate } from '../types/template';

export const obstetricMorphologyTemplate: ExamTemplate = {
  id: 'obstetric_morphology',
  name: '2nd Trimester Obstetric Morphology',
  nameKo: '2분기 산과 형태학 초음파',
  category: 'obstetric',
  version: '1.0.0',
  reportHeader: 'SECOND TRIMESTER OBSTETRIC ULTRASOUND',
  findingsIntro:
    'High resolution, real-time, dynamic ultrasound was performed. ' +
    'The gestational age based on provided referral date is ' +
    '{{gestational_age_weeks}} weeks {{gestational_age_days}} days.',
  sections: [
    // ── 0. Patient Info ─────────────────────────────────────────────────
    {
      id: 'patient_info',
      title: 'Patient Info',
      titleKo: '환자 정보',
      order: 0,
      omitWhenEmpty: false,
      fields: [
        {
          id: 'clinical_history',
          label: 'Clinical History',
          labelKo: '임상 병력',
          type: 'text',
          placeholder: 'Enter relevant clinical history',
          maxLength: 1000,
        },
        {
          id: 'sonographer',
          label: 'Sonographer',
          labelKo: '초음파 검사자',
          type: 'text',
          placeholder: 'Name of the performing sonographer',
          maxLength: 200,
        },
        {
          id: 'gestational_age_weeks',
          label: 'Gestational Age (Weeks)',
          labelKo: '임신 주수 (주)',
          type: 'number',
          unit: 'weeks',
          precision: 0,
          step: 1,
        },
        {
          id: 'gestational_age_days',
          label: 'Gestational Age (Days)',
          labelKo: '임신 주수 (일)',
          type: 'number',
          unit: 'days',
          precision: 0,
          step: 1,
        },
        {
          id: 'edd',
          label: 'EDD',
          labelKo: '분만 예정일',
          type: 'text',
          placeholder: 'Estimated date of delivery',
          maxLength: 50,
        },
        {
          id: 'exam_type',
          label: 'Exam Type',
          labelKo: '검사 유형',
          type: 'select',
          options: [
            { value: 'transabdominal', label: 'Transabdominal' },
            { value: 'transvaginal', label: 'Transvaginal' },
          ],
        },
        {
          id: 'fetal_count',
          label: 'Fetal Count',
          labelKo: '태아 수',
          type: 'select',
          options: [
            { value: 'singleton', label: 'Singleton' },
            { value: 'twins', label: 'Twins' },
            { value: 'triplets', label: 'Triplets' },
          ],
          defaultValue: 'singleton',
        },
      ],
      sentencePattern: {
        template:
          '{{?clinical_history:Clinical History: {{clinical_history}}. }}' +
          '{{?sonographer:Sonographer: {{sonographer}}. }}' +
          '{{?edd:EDD: {{edd}}.}}',
        defaultSentence: '',
      },
    },

    // ── 1. Fetal Heart ──────────────────────────────────────────────────
    {
      id: 'fetal_heart',
      title: 'Fetal Heart',
      titleKo: '태아 심장',
      order: 1,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'heart_beat',
          label: 'Heart Beat',
          labelKo: '심박동',
          type: 'select',
          options: [
            {
              value: 'yes',
              label: 'Yes',
              sentenceFragment: 'Fetal heart beat is present',
            },
            {
              value: 'no',
              label: 'No',
              sentenceFragment: 'No fetal heart beat is detected',
            },
          ],
          defaultValue: 'yes',
        },
        {
          id: 'heart_rate',
          label: 'Heart Rate',
          labelKo: '심박수',
          type: 'number',
          unit: 'bpm',
          precision: 0,
          normalRange: { min: 110, max: 160, unit: 'bpm' },
          step: 1,
        },
      ],
      sentencePattern: {
        template:
          '{{heart_beat:sentence}}. ' +
          '{{?heart_rate:The fetal heart rate is {{heart_rate}} bpm{{heart_rate:normal: (normal)| (abnormal)}}.}}',
        defaultSentence: 'Fetal heart beat is present with a normal rate.',
      },
    },

    // ── 2. Biometry ─────────────────────────────────────────────────────
    {
      id: 'biometry',
      title: 'Biometry',
      titleKo: '생체 계측',
      order: 2,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'bpd',
          label: 'BPD',
          labelKo: '양두정경',
          type: 'number',
          unit: 'mm',
          precision: 1,
          step: 0.1,
        },
        {
          id: 'bpd_percentile',
          label: 'BPD Percentile',
          labelKo: 'BPD 백분위수',
          type: 'number',
          unit: '%',
          precision: 0,
          step: 1,
        },
        {
          id: 'hc',
          label: 'HC',
          labelKo: '머리둘레',
          type: 'number',
          unit: 'mm',
          precision: 1,
          step: 0.1,
        },
        {
          id: 'hc_percentile',
          label: 'HC Percentile',
          labelKo: 'HC 백분위수',
          type: 'number',
          unit: '%',
          precision: 0,
          step: 1,
        },
        {
          id: 'ac',
          label: 'AC',
          labelKo: '복부둘레',
          type: 'number',
          unit: 'mm',
          precision: 1,
          step: 0.1,
        },
        {
          id: 'ac_percentile',
          label: 'AC Percentile',
          labelKo: 'AC 백분위수',
          type: 'number',
          unit: '%',
          precision: 0,
          step: 1,
        },
        {
          id: 'fl',
          label: 'FL',
          labelKo: '대퇴골 길이',
          type: 'number',
          unit: 'mm',
          precision: 1,
          step: 0.1,
        },
        {
          id: 'fl_percentile',
          label: 'FL Percentile',
          labelKo: 'FL 백분위수',
          type: 'number',
          unit: '%',
          precision: 0,
          step: 1,
        },
        {
          id: 'efw',
          label: 'EFW',
          labelKo: '추정 태아 체중',
          type: 'number',
          unit: 'g',
          precision: 0,
          step: 1,
        },
        {
          id: 'efw_percentile',
          label: 'EFW Percentile',
          labelKo: 'EFW 백분위수',
          type: 'number',
          unit: '%',
          precision: 0,
          step: 1,
        },
      ],
      sentencePattern: {
        template:
          'Biparietal diameter {{bpd}}mm consistent with {{bpd_percentile}}th percentile. ' +
          'Head circumference {{hc}}mm ({{hc_percentile}}th percentile). ' +
          'Abdominal circumference {{ac}}mm ({{ac_percentile}}th percentile). ' +
          'Femur length {{fl}}mm ({{fl_percentile}}th percentile). ' +
          '{{?efw:Estimated fetal weight {{efw}}g ({{efw_percentile}}th percentile).}}',
        defaultSentence: '',
      },
    },

    // ── 3. Morphology - Head ────────────────────────────────────────────
    {
      id: 'morphology_head',
      title: 'Morphology - Head',
      titleKo: '형태학 - 두부',
      order: 3,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'morph_cerebellum',
          label: 'Cerebellum',
          labelKo: '소뇌',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The cerebellum is normal.',
          uncheckedSentence: 'The cerebellum appears abnormal.',
        },
        {
          id: 'morph_nuchal_fold',
          label: 'Nuchal Fold',
          labelKo: '목덜미 주름',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The nuchal fold is normal.',
          uncheckedSentence: 'The nuchal fold appears abnormal.',
        },
        {
          id: 'morph_nasal_bone',
          label: 'Nasal Bone',
          labelKo: '비골',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The nasal bone is present.',
          uncheckedSentence: 'The nasal bone is not clearly identified.',
        },
        {
          id: 'morph_ventricles',
          label: 'Ventricles',
          labelKo: '뇌실',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The ventricles are normal.',
          uncheckedSentence: 'The ventricles appear abnormal.',
        },
        {
          id: 'morph_choroids',
          label: 'Choroid Plexus',
          labelKo: '맥락총',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The choroid plexus is normal.',
          uncheckedSentence: 'The choroid plexus appears abnormal.',
        },
        {
          id: 'morph_orbits',
          label: 'Orbits',
          labelKo: '안와',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The orbits are normal.',
          uncheckedSentence: 'The orbits appear abnormal.',
        },
      ],
      sentencePattern: {
        template:
          '{{morph_cerebellum:checked}} {{morph_nuchal_fold:checked}} ' +
          '{{morph_nasal_bone:checked}} {{morph_ventricles:checked}} ' +
          '{{morph_choroids:checked}} {{morph_orbits:checked}}',
        defaultSentence:
          'The brain and face structures appear normal. The cerebellum, nuchal fold, ' +
          'nasal bone, ventricles, choroid plexus and orbits are all normal.',
      },
    },

    // ── 4. Morphology - Chest ───────────────────────────────────────────
    {
      id: 'morphology_chest',
      title: 'Morphology - Chest',
      titleKo: '형태학 - 흉부',
      order: 4,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'morph_4ch',
          label: '4 Chamber Heart',
          labelKo: '4방 심장',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The 4 chamber heart view is normal.',
          uncheckedSentence: 'The 4 chamber heart view appears abnormal.',
        },
        {
          id: 'morph_ivs',
          label: 'IVS',
          labelKo: '심실중격',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The interventricular septum is intact.',
          uncheckedSentence: 'The interventricular septum appears abnormal.',
        },
        {
          id: 'morph_outflow',
          label: 'Outflow Tracts',
          labelKo: '유출로',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The outflow tracts are normal.',
          uncheckedSentence: 'The outflow tracts appear abnormal.',
        },
        {
          id: 'morph_3vv',
          label: '3VV',
          labelKo: '3혈관도',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The 3 vessel view is normal.',
          uncheckedSentence: 'The 3 vessel view appears abnormal.',
        },
        {
          id: 'morph_arches',
          label: 'Arches',
          labelKo: '대동맥궁',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The arches are normal.',
          uncheckedSentence: 'The arches appear abnormal.',
        },
      ],
      sentencePattern: {
        template:
          '{{morph_4ch:checked}} {{morph_ivs:checked}} ' +
          '{{morph_outflow:checked}} {{morph_3vv:checked}} ' +
          '{{morph_arches:checked}}',
        defaultSentence:
          'The heart is visualised (4 chamber view) with normal outflow tracts, ' +
          '3 vessel view and arches. The interventricular septum is intact.',
      },
    },

    // ── 5. Morphology - Abdomen ─────────────────────────────────────────
    {
      id: 'morphology_abdomen',
      title: 'Morphology - Abdomen',
      titleKo: '형태학 - 복부',
      order: 5,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'morph_abd_walls',
          label: 'Abdominal Walls',
          labelKo: '복벽',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The abdominal walls are intact.',
          uncheckedSentence: 'The abdominal walls appear abnormal.',
        },
        {
          id: 'morph_kidneys',
          label: 'Kidneys',
          labelKo: '신장',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The kidneys have a normal appearance.',
          uncheckedSentence: 'The kidneys appear abnormal.',
        },
        {
          id: 'morph_stomach',
          label: 'Stomach',
          labelKo: '위',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The stomach is normal.',
          uncheckedSentence: 'The stomach appears abnormal.',
        },
        {
          id: 'morph_bowel',
          label: 'Bowel',
          labelKo: '장',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The bowel is normal.',
          uncheckedSentence: 'The bowel appears abnormal.',
        },
        {
          id: 'morph_bladder',
          label: 'Urinary Bladder',
          labelKo: '방광',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The urinary bladder is normal.',
          uncheckedSentence: 'The urinary bladder appears abnormal.',
        },
        {
          id: 'morph_diaphragm',
          label: 'Diaphragm',
          labelKo: '횡격막',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The diaphragm is intact.',
          uncheckedSentence: 'The diaphragm appears abnormal.',
        },
      ],
      sentencePattern: {
        template:
          '{{morph_abd_walls:checked}} {{morph_kidneys:checked}} ' +
          '{{morph_stomach:checked}} {{morph_bowel:checked}} ' +
          '{{morph_bladder:checked}} {{morph_diaphragm:checked}}',
        defaultSentence:
          'The abdominal walls are intact. The kidneys have a normal appearance. ' +
          'The stomach, bowel and urinary bladder are normal. The diaphragm is intact.',
      },
    },

    // ── 6. Morphology - Umbilical Cord ──────────────────────────────────
    {
      id: 'morphology_cord',
      title: 'Morphology - Umbilical Cord',
      titleKo: '형태학 - 탯줄',
      order: 6,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'morph_cord_3v',
          label: '3 Vessels Cord',
          labelKo: '3혈관 제대',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'A three-vessel umbilical cord is identified.',
          uncheckedSentence: 'The umbilical cord does not demonstrate three vessels.',
        },
        {
          id: 'morph_cord_insertion',
          label: 'Cord Insertion',
          labelKo: '제대 부착부',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The cord insertion site is normal.',
          uncheckedSentence: 'The cord insertion site appears abnormal.',
        },
      ],
      sentencePattern: {
        template:
          '{{morph_cord_3v:checked}} {{morph_cord_insertion:checked}}',
        defaultSentence:
          'A three-vessel umbilical cord is identified, with a normal cord insertion site.',
      },
    },

    // ── 7. Morphology - Spine ───────────────────────────────────────────
    {
      id: 'morphology_spine',
      title: 'Morphology - Spine',
      titleKo: '형태학 - 척추',
      order: 7,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'morph_spine_sag',
          label: 'Sag/Coronal/TRV',
          labelKo: '시상/관상/횡단면',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The spine is normal in sagittal, coronal and transverse planes.',
          uncheckedSentence: 'The spine appears abnormal.',
        },
        {
          id: 'morph_skin_line',
          label: 'Skin Line',
          labelKo: '피부선',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The skin line is intact.',
          uncheckedSentence: 'The skin line appears abnormal.',
        },
      ],
      sentencePattern: {
        template:
          '{{morph_spine_sag:checked}} {{morph_skin_line:checked}}',
        defaultSentence:
          'The spine is normal in sagittal, coronal and transverse planes. The skin line is intact.',
      },
    },

    // ── 8. Morphology - Limbs ───────────────────────────────────────────
    {
      id: 'morphology_limbs',
      title: 'Morphology - Limbs',
      titleKo: '형태학 - 사지',
      order: 8,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'morph_humerus',
          label: 'Humerus/Radius/Ulna/Hands',
          labelKo: '상완골/요골/척골/손',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The upper limbs including humerus, radius, ulna and hands are normal.',
          uncheckedSentence: 'The upper limbs appear abnormal.',
        },
        {
          id: 'morph_femur',
          label: 'Femur/Tibia/Fibula/Feet',
          labelKo: '대퇴골/경골/비골/발',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The lower limbs including femur, tibia, fibula and feet are normal.',
          uncheckedSentence: 'The lower limbs appear abnormal.',
        },
      ],
      sentencePattern: {
        template:
          '{{morph_humerus:checked}} {{morph_femur:checked}}',
        defaultSentence:
          'The upper and lower limbs are normal.',
      },
    },

    // ── 9. Movements ────────────────────────────────────────────────────
    {
      id: 'movements',
      title: 'Movements',
      titleKo: '태동',
      order: 9,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'fetal_movements',
          label: 'Fetal Movements',
          labelKo: '태아 운동',
          type: 'select',
          options: [
            {
              value: 'yes',
              label: 'Yes',
              sentenceFragment: 'Fetal movements are observed',
            },
            {
              value: 'no',
              label: 'No',
              sentenceFragment: 'No fetal movements are observed',
            },
          ],
          defaultValue: 'yes',
        },
        {
          id: 'breathing_movements',
          label: 'Breathing Movements',
          labelKo: '호흡 운동',
          type: 'select',
          options: [
            {
              value: 'yes',
              label: 'Yes',
              sentenceFragment: 'Fetal breathing movements are observed',
            },
            {
              value: 'no',
              label: 'No',
              sentenceFragment: 'No fetal breathing movements are observed',
            },
          ],
          defaultValue: 'yes',
        },
      ],
      sentencePattern: {
        template:
          '{{fetal_movements:sentence}}. {{breathing_movements:sentence}}.',
        defaultSentence:
          'Fetal movements are observed. Fetal breathing movements are observed.',
      },
    },

    // ── 10. Placenta ────────────────────────────────────────────────────
    {
      id: 'placenta',
      title: 'Placenta',
      titleKo: '태반',
      order: 10,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'placenta_location',
          label: 'Placenta Location',
          labelKo: '태반 위치',
          type: 'select',
          options: [
            {
              value: 'anterior',
              label: 'Anterior',
              sentenceFragment: 'The placenta is located anteriorly',
            },
            {
              value: 'posterior',
              label: 'Posterior',
              sentenceFragment: 'The placenta is located posteriorly',
            },
            {
              value: 'fundal',
              label: 'Fundal',
              sentenceFragment: 'The placenta is located at the fundus',
            },
            {
              value: 'lateral',
              label: 'Lateral',
              sentenceFragment: 'The placenta is located laterally',
            },
            {
              value: 'low',
              label: 'Low',
              sentenceFragment: 'The placenta is low-lying',
            },
          ],
        },
        {
          id: 'placenta_low',
          label: 'Low Placenta',
          labelKo: '전치태반',
          type: 'select',
          options: [
            {
              value: 'not low',
              label: 'Not Low',
              sentenceFragment: 'The placenta is not low-lying',
            },
            {
              value: 'low',
              label: 'Low',
              sentenceFragment: 'The placenta is low-lying',
            },
          ],
          defaultValue: 'not low',
        },
        {
          id: 'placenta_distance_os',
          label: 'Distance from OS',
          labelKo: '자궁경부로부터 거리',
          type: 'number',
          unit: 'mm',
          precision: 0,
          step: 1,
        },
        {
          id: 'amniotic_fluid',
          label: 'Amniotic Fluid',
          labelKo: '양수',
          type: 'select',
          options: [
            {
              value: 'normal',
              label: 'Normal',
              sentenceFragment: 'The amniotic fluid volume is normal',
            },
            {
              value: 'increased',
              label: 'Increased',
              sentenceFragment: 'The amniotic fluid volume is increased (polyhydramnios)',
            },
            {
              value: 'decreased',
              label: 'Decreased',
              sentenceFragment: 'The amniotic fluid volume is decreased (oligohydramnios)',
            },
          ],
          defaultValue: 'normal',
        },
      ],
      sentencePattern: {
        template:
          '{{?placenta_location:{{placenta_location:sentence}}. }}' +
          '{{placenta_low:sentence}}. ' +
          '{{?placenta_distance_os:The placental edge is {{placenta_distance_os}}mm from the internal os. }}' +
          '{{amniotic_fluid:sentence}}.',
        defaultSentence:
          'The placenta is not low-lying. The amniotic fluid volume is normal.',
      },
    },

    // ── 11. Cervix ──────────────────────────────────────────────────────
    {
      id: 'cervix',
      title: 'Cervix',
      titleKo: '자궁경부',
      order: 11,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'cervix_nad',
          label: 'NAD',
          labelKo: '이상 소견 없음',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The cervix appears normal.',
          uncheckedSentence: 'The cervix appears abnormal.',
        },
        {
          id: 'cervix_status',
          label: 'Cervix Status',
          labelKo: '자궁경부 상태',
          type: 'select',
          options: [
            {
              value: 'closed',
              label: 'Closed',
              sentenceFragment: 'The cervix is closed',
            },
            {
              value: 'open',
              label: 'Open',
              sentenceFragment: 'The cervix is open',
            },
          ],
          defaultValue: 'closed',
        },
        {
          id: 'cervix_length',
          label: 'Cervix Length',
          labelKo: '자궁경부 길이',
          type: 'number',
          unit: 'mm',
          precision: 0,
          step: 1,
        },
      ],
      sentencePattern: {
        template:
          '{{cervix_nad:checked}} {{cervix_status:sentence}}. ' +
          '{{?cervix_length:The cervical length measures {{cervix_length}}mm.}}',
        defaultSentence: 'The cervix appears normal and is closed.',
      },
    },
  ],
  conclusionPattern: {
    template:
      'No morphological abnormality was detected within the brain, face, chest, abdomen, ' +
      'pelvis, spine and limbs. The heart is visualised (4 chamber view) with normal outflow tracts. ' +
      'The kidneys have a normal appearance. A three-vessel umbilical cord is identified, ' +
      'with a normal cord insertion site. ' +
      '{{?placenta_location:{{placenta_location:sentence}}. }}' +
      '{{placenta_low:sentence}}. ' +
      '{{amniotic_fluid:sentence}}. ' +
      '{{?cervix_length:Cervical length {{cervix_length}}mm.}}',
    builderId: 'obstetric_conclusion',
    defaultSentence:
      'Live {{fetal_count}} pregnancy. No morphological abnormality was detected. ' +
      'Biometry is consistent with the gestational age. The placenta is not low-lying. ' +
      'Normal amniotic fluid volume.',
    abnormalConclusion:
      'Abnormal findings identified. Please correlate clinically and consider further evaluation.',
  },
};
