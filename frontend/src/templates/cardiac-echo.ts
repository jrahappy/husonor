import type { ExamTemplate } from '../types/template';

export const cardiacEchoTemplate: ExamTemplate = {
  id: 'cardiac_echo',
  name: 'Cardiac Echocardiography',
  nameKo: '심장 초음파',
  category: 'cardiac',
  version: '1.0.0',
  reportHeader: 'CARDIAC ECHOCARDIOGRAPHY',
  findingsIntro:
    'High resolution, real-time, dynamic echocardiography was performed.',
  sections: [
    // ── 0. Patient Info ─────────────────────────────────────────────────
    {
      id: 'patient_info',
      title: 'Patient Info',
      order: 0,
      omitWhenEmpty: false,
      fields: [
        {
          id: 'clinical_history',
          label: 'Clinical History',
          type: 'text',
          placeholder: 'Enter relevant clinical history',
          maxLength: 1000,
        },
        {
          id: 'sonographer',
          label: 'Sonographer',
          type: 'text',
          placeholder: 'Name of the performing sonographer',
          maxLength: 200,
        },
      ],
      sentencePattern: {
        template:
          '{{?clinical_history:Clinical History: {{clinical_history}}. }}' +
          '{{?sonographer:Sonographer: {{sonographer}}.}}',
        defaultSentence: '',
      },
    },

    // ── 1. LV Dimensions ────────────────────────────────────────────────
    {
      id: 'lv_dimensions',
      title: 'LV Dimensions',
      order: 1,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'lv_edd',
          label: 'LV EDD',
          type: 'number',
          unit: 'mm',
          precision: 1,
          normalRange: { min: 37, max: 56, unit: 'mm' },
          step: 0.1,
        },
        {
          id: 'lv_esd',
          label: 'LV ESD',
          type: 'number',
          unit: 'mm',
          precision: 1,
          normalRange: { min: 22, max: 40, unit: 'mm' },
          step: 0.1,
        },
        {
          id: 'ivs_thickness',
          label: 'IVS Thickness',
          type: 'number',
          unit: 'mm',
          precision: 1,
          normalRange: { min: 6, max: 11, unit: 'mm' },
          step: 0.1,
        },
        {
          id: 'lvpw_thickness',
          label: 'LVPW Thickness',
          type: 'number',
          unit: 'mm',
          precision: 1,
          normalRange: { min: 6, max: 11, unit: 'mm' },
          step: 0.1,
        },
      ],
      sentencePattern: {
        template:
          'The left ventricular end-diastolic dimension is {{lv_edd}}mm{{lv_edd:normal: (normal)| (increased)}} ' +
          'and the end-systolic dimension is {{lv_esd}}mm{{lv_esd:normal: (normal)| (increased)}}. ' +
          '{{?ivs_thickness:The interventricular septal thickness is {{ivs_thickness}}mm{{ivs_thickness:normal: (normal)| (increased)}}. }}' +
          '{{?lvpw_thickness:The LV posterior wall thickness is {{lvpw_thickness}}mm{{lvpw_thickness:normal: (normal)| (increased)}}.}}',
        defaultSentence: '',
      },
    },

    // ── 2. LV Systolic Function ─────────────────────────────────────────
    {
      id: 'lv_function',
      title: 'LV Systolic Function',
      order: 2,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'ef',
          label: 'Ejection Fraction',
          type: 'number',
          unit: '%',
          precision: 0,
          normalRange: { min: 55, max: 75, unit: '%' },
          step: 1,
        },
        {
          id: 'lv_wall_motion',
          label: 'Wall Motion',
          type: 'select',
          options: [
            {
              value: 'normal',
              label: 'Normal',
              sentenceFragment: 'normal wall motion is observed',
            },
            {
              value: 'hypokinesis',
              label: 'Hypokinesis',
              sentenceFragment: 'hypokinesis is noted',
            },
            {
              value: 'akinesis',
              label: 'Akinesis',
              sentenceFragment: 'akinesis is noted',
            },
            {
              value: 'dyskinesis',
              label: 'Dyskinesis',
              sentenceFragment: 'dyskinesis is noted',
            },
          ],
          defaultValue: 'normal',
        },
      ],
      sentencePattern: {
        template:
          'The left ventricular ejection fraction is {{ef}}%, indicating {{ef:normal:normal|reduced}} systolic function, ' +
          'and {{lv_wall_motion:sentence}}.',
        defaultSentence: '',
      },
    },

    // ── 3. LA & Aorta ──────────────────────────────────────────────────
    {
      id: 'la_ao',
      title: 'LA & Aorta',
      order: 3,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'la_dimension',
          label: 'LA Dimension',
          type: 'number',
          unit: 'mm',
          precision: 1,
          normalRange: { min: 19, max: 40, unit: 'mm' },
          step: 0.1,
        },
        {
          id: 'ao_root',
          label: 'Aortic Root',
          type: 'number',
          unit: 'mm',
          precision: 1,
          normalRange: { min: 20, max: 37, unit: 'mm' },
          step: 0.1,
        },
      ],
      sentencePattern: {
        template:
          'The left atrial dimension is {{la_dimension}}mm{{la_dimension:normal: (normal)| (dilated)}} ' +
          'and the aortic root measures {{ao_root}}mm{{ao_root:normal: (normal)| (dilated)}}.',
        defaultSentence: '',
      },
    },

    // ── 4. Right Ventricle ──────────────────────────────────────────────
    {
      id: 'rv',
      title: 'Right Ventricle',
      order: 4,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'rv_dimension',
          label: 'RV Dimension',
          type: 'number',
          unit: 'mm',
          precision: 1,
          normalRange: { min: 7, max: 26, unit: 'mm' },
          step: 0.1,
        },
        {
          id: 'tapse',
          label: 'TAPSE',
          type: 'number',
          unit: 'mm',
          precision: 1,
          normalRange: { min: 16, max: 30, unit: 'mm' },
          step: 0.1,
        },
      ],
      sentencePattern: {
        template:
          'The right ventricular dimension is {{rv_dimension}}mm{{rv_dimension:normal: (normal)| (dilated)}}. ' +
          '{{?tapse:TAPSE is {{tapse}}mm{{tapse:normal: (normal)| (reduced)}}.}}',
        defaultSentence: '',
      },
    },

    // ── 5. Diastolic Function ───────────────────────────────────────────
    {
      id: 'diastolic_function',
      title: 'Diastolic Function',
      order: 5,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'e_velocity',
          label: 'E Velocity',
          type: 'number',
          unit: 'cm/s',
          precision: 1,
          step: 0.1,
        },
        {
          id: 'a_velocity',
          label: 'A Velocity',
          type: 'number',
          unit: 'cm/s',
          precision: 1,
          step: 0.1,
        },
        {
          id: 'e_prime',
          label: "E'",
          type: 'number',
          unit: 'cm/s',
          precision: 1,
          step: 0.1,
        },
        {
          id: 'e_e_prime_ratio',
          label: "E/E' Ratio",
          type: 'number',
          unit: '',
          precision: 1,
          normalRange: { min: 0, max: 14, unit: '' },
          step: 0.1,
        },
        {
          id: 'diastolic_grade',
          label: 'Diastolic Grade',
          type: 'select',
          options: [
            {
              value: 'normal',
              label: 'Normal',
              sentenceFragment:
                'normal diastolic function is observed',
            },
            {
              value: 'grade1',
              label: 'Grade I (Impaired Relaxation)',
              sentenceFragment:
                'Grade I diastolic dysfunction (impaired relaxation) is observed',
            },
            {
              value: 'grade2',
              label: 'Grade II (Pseudonormal)',
              sentenceFragment:
                'Grade II diastolic dysfunction (pseudonormal pattern) is observed',
            },
            {
              value: 'grade3',
              label: 'Grade III (Restrictive)',
              sentenceFragment:
                'Grade III diastolic dysfunction (restrictive filling pattern) is observed',
            },
          ],
          defaultValue: 'normal',
        },
      ],
      sentencePattern: {
        template:
          '{{?e_velocity:Mitral E velocity is {{e_velocity}} cm/s, }}' +
          '{{?a_velocity:A velocity is {{a_velocity}} cm/s, }}' +
          "{{?e_prime:E' is {{e_prime}} cm/s, }}" +
          "{{?e_e_prime_ratio:E/E' ratio is {{e_e_prime_ratio}}{{e_e_prime_ratio:normal: (normal)| (elevated)}}, and }}" +
          '{{diastolic_grade:sentence}}.',
        defaultSentence: '',
      },
    },

    // ── 6. Valve Assessment ─────────────────────────────────────────────
    {
      id: 'valves',
      title: 'Valve Assessment',
      order: 6,
      omitWhenEmpty: false,
      fields: [
        {
          id: 'mr_grade',
          label: 'Mitral Regurgitation',
          type: 'select',
          options: [
            {
              value: 'none',
              label: 'None',
              sentenceFragment:
                'No mitral regurgitation is identified',
            },
            {
              value: 'trace',
              label: 'Trace',
              sentenceFragment:
                'Trace mitral regurgitation is noted',
            },
            {
              value: 'mild',
              label: 'Mild',
              sentenceFragment:
                'Mild mitral regurgitation is noted',
            },
            {
              value: 'moderate',
              label: 'Moderate',
              sentenceFragment:
                'Moderate mitral regurgitation is noted',
            },
            {
              value: 'severe',
              label: 'Severe',
              sentenceFragment:
                'Severe mitral regurgitation is noted',
            },
          ],
          defaultValue: 'none',
        },
        {
          id: 'ar_grade',
          label: 'Aortic Regurgitation',
          type: 'select',
          options: [
            {
              value: 'none',
              label: 'None',
              sentenceFragment:
                'No aortic regurgitation is identified',
            },
            {
              value: 'trace',
              label: 'Trace',
              sentenceFragment:
                'Trace aortic regurgitation is noted',
            },
            {
              value: 'mild',
              label: 'Mild',
              sentenceFragment:
                'Mild aortic regurgitation is noted',
            },
            {
              value: 'moderate',
              label: 'Moderate',
              sentenceFragment:
                'Moderate aortic regurgitation is noted',
            },
            {
              value: 'severe',
              label: 'Severe',
              sentenceFragment:
                'Severe aortic regurgitation is noted',
            },
          ],
          defaultValue: 'none',
        },
        {
          id: 'tr_grade',
          label: 'Tricuspid Regurgitation',
          type: 'select',
          options: [
            {
              value: 'none',
              label: 'None',
              sentenceFragment:
                'No tricuspid regurgitation is identified',
            },
            {
              value: 'trace',
              label: 'Trace',
              sentenceFragment:
                'Trace tricuspid regurgitation is noted',
            },
            {
              value: 'mild',
              label: 'Mild',
              sentenceFragment:
                'Mild tricuspid regurgitation is noted',
            },
            {
              value: 'moderate',
              label: 'Moderate',
              sentenceFragment:
                'Moderate tricuspid regurgitation is noted',
            },
            {
              value: 'severe',
              label: 'Severe',
              sentenceFragment:
                'Severe tricuspid regurgitation is noted',
            },
          ],
          defaultValue: 'none',
        },
        {
          id: 'tr_velocity',
          label: 'TR Velocity',
          type: 'number',
          unit: 'm/s',
          precision: 2,
          normalRange: { min: 0, max: 2.8, unit: 'm/s' },
          step: 0.01,
        },
        {
          id: 'rvsp',
          label: 'RVSP',
          type: 'number',
          unit: 'mmHg',
          precision: 0,
          normalRange: { min: 0, max: 35, unit: 'mmHg' },
          step: 1,
        },
      ],
      sentencePattern: {
        template:
          '{{mr_grade:sentence}}. {{ar_grade:sentence}}. {{tr_grade:sentence}}. ' +
          '{{?tr_velocity:The peak TR velocity is {{tr_velocity}} m/s. }}' +
          '{{?rvsp:The estimated RVSP is {{rvsp}} mmHg{{rvsp:normal: (normal)| (elevated)}}.}}',
        defaultSentence: 'No significant valvular regurgitation is identified.',
      },
    },

    // ── 7. Other Findings ───────────────────────────────────────────────
    {
      id: 'other_findings',
      title: 'Other Findings',
      order: 7,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'pericardial_effusion',
          label: 'Pericardial Effusion',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence: 'Pericardial effusion is present.',
        },
        {
          id: 'pleural_effusion',
          label: 'Pleural Effusion',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence: 'Pleural effusion is present.',
        },
        {
          id: 'additional_findings',
          label: 'Additional Findings',
          type: 'text',
          placeholder: 'Enter any additional findings',
          maxLength: 500,
        },
      ],
      sentencePattern: {
        template:
          '{{?pericardial_effusion:{{pericardial_effusion:checked}} }}' +
          '{{?pleural_effusion:{{pleural_effusion:checked}} }}' +
          '{{?additional_findings:{{additional_findings}}}}',
        defaultSentence: '',
      },
    },
  ],
  conclusionPattern: {
    template: '',
    builderId: 'cardiac_echo_conclusion',
    defaultSentence: 'Conclusion: No significant abnormality identified.',
  },
};
