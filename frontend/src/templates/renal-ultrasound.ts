import type { ExamTemplate } from '../types/template';

export const renalUltrasoundTemplate: ExamTemplate = {
  id: 'renal_ultrasound',
  name: 'Renal Ultrasound',
  nameKo: '신장 초음파',
  category: 'renal',
  version: '1.0.0',
  reportHeader: 'RENAL ULTRASOUND',
  findingsIntro:
    'Real-time, high resolution ultrasound imaging of the kidneys, ureters and bladder was performed.',
  sections: [
    // ── Section 0: Patient Info ──────────────────────────────────────
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
          placeholder: 'Enter clinical history',
          maxLength: 500,
        },
        {
          id: 'sonographer',
          label: 'Sonographer',
          labelKo: '초음파 검사자',
          type: 'text',
          placeholder: 'Enter sonographer name',
          maxLength: 100,
        },
      ],
      sentencePattern: {
        template:
          '{{?clinical_history:Clinical History: {{clinical_history}}. }}' +
          '{{?sonographer:Sonographer: {{sonographer}}.}}',
        defaultSentence: '',
      },
    },

    // ── Section 1: Right Kidney ──────────────────────────────────────
    {
      id: 'right_kidney',
      title: 'Right Kidney',
      titleKo: '우측 신장',
      order: 1,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'rk_nad',
          label: 'NAD',
          labelKo: '이상 소견 없음',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          id: 'rk_length',
          label: 'Length',
          labelKo: '길이',
          type: 'number',
          unit: 'mm',
          precision: 0,
          normalRange: { min: 90, max: 130, unit: 'mm' },
          step: 1,
          placeholder: 'Bipolar length',
        },
        {
          id: 'rk_pathology',
          label: 'Pathology',
          labelKo: '병변',
          type: 'select',
          options: [
            {
              value: 'none',
              label: 'None',
              sentenceFragment:
                'There is no suspicious renal lesion on the right',
            },
            {
              value: 'cyst',
              label: 'Cyst',
              sentenceFragment: 'A cyst is identified in the right kidney',
            },
            {
              value: 'calculus',
              label: 'Calculus',
              sentenceFragment:
                'A renal calculus is identified in the right kidney',
            },
            {
              value: 'mass',
              label: 'Mass',
              sentenceFragment:
                'A suspicious mass is identified in the right kidney',
            },
            {
              value: 'hydronephrosis',
              label: 'Hydronephrosis',
              sentenceFragment:
                'There is evidence of right-sided hydronephrosis',
            },
          ],
          defaultValue: 'none',
        },
        {
          id: 'rk_lesion_size',
          label: 'Lesion Size',
          labelKo: '병변 크기',
          type: 'text',
          placeholder: 'e.g. 15 x 12 x 10',
          maxLength: 50,
        },
      ],
      sentencePattern: {
        template:
          'The right kidney measures {{rk_length}}mm in bipolar length. ' +
          '{{rk_nad:checked}}' +
          '{{?rk_pathology:{{rk_pathology:sentence}}. }}' +
          '{{?rk_lesion_size:The lesion measures {{rk_lesion_size}}mm.}}',
        defaultSentence:
          'The right kidney is of normal size, shape and cortical thickness.',
      },
    },

    // ── Section 2: Left Kidney ───────────────────────────────────────
    {
      id: 'left_kidney',
      title: 'Left Kidney',
      titleKo: '좌측 신장',
      order: 2,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'lk_nad',
          label: 'NAD',
          labelKo: '이상 소견 없음',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          id: 'lk_length',
          label: 'Length',
          labelKo: '길이',
          type: 'number',
          unit: 'mm',
          precision: 0,
          normalRange: { min: 90, max: 130, unit: 'mm' },
          step: 1,
          placeholder: 'Bipolar length',
        },
        {
          id: 'lk_pathology',
          label: 'Pathology',
          labelKo: '병변',
          type: 'select',
          options: [
            {
              value: 'none',
              label: 'None',
              sentenceFragment:
                'There is no suspicious renal lesion on the left',
            },
            {
              value: 'cyst',
              label: 'Cyst',
              sentenceFragment: 'A cyst is identified in the left kidney',
            },
            {
              value: 'calculus',
              label: 'Calculus',
              sentenceFragment:
                'A renal calculus is identified in the left kidney',
            },
            {
              value: 'mass',
              label: 'Mass',
              sentenceFragment:
                'A suspicious mass is identified in the left kidney',
            },
            {
              value: 'hydronephrosis',
              label: 'Hydronephrosis',
              sentenceFragment:
                'There is evidence of left-sided hydronephrosis',
            },
          ],
          defaultValue: 'none',
        },
        {
          id: 'lk_lesion_size',
          label: 'Lesion Size',
          labelKo: '병변 크기',
          type: 'text',
          placeholder: 'e.g. 15 x 12 x 10',
          maxLength: 50,
        },
      ],
      sentencePattern: {
        template:
          'The left kidney measures {{lk_length}}mm in bipolar length. ' +
          '{{lk_nad:checked}}' +
          '{{?lk_pathology:{{lk_pathology:sentence}}. }}' +
          '{{?lk_lesion_size:The lesion measures {{lk_lesion_size}}mm.}}',
        defaultSentence:
          'The left kidney is of normal size, shape and cortical thickness.',
      },
    },

    // ── Section 3: Urinary Bladder ───────────────────────────────────
    {
      id: 'urinary_bladder',
      title: 'Urinary Bladder',
      titleKo: '방광',
      order: 3,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'bladder_nad',
          label: 'NAD',
          labelKo: '이상 소견 없음',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence:
            'The urinary bladder is of normal size, shape and wall thickness.',
        },
        {
          id: 'bladder_pre_mict',
          label: 'Pre-mict Volume',
          labelKo: '배뇨 전 용적',
          type: 'number',
          unit: 'ml',
          precision: 0,
          step: 1,
          placeholder: 'Pre micturition volume',
        },
        {
          id: 'bladder_post_mict',
          label: 'Post-mict Residual',
          labelKo: '배뇨 후 잔뇨량',
          type: 'number',
          unit: 'ml',
          precision: 0,
          normalRange: { min: 0, max: 100, unit: 'ml' },
          step: 1,
          placeholder: 'Post micturition residual',
        },
        {
          id: 'bladder_contour',
          label: 'Contour',
          labelKo: '윤곽',
          type: 'select',
          options: [
            {
              value: 'normal',
              label: 'Normal',
              sentenceFragment: 'The bladder contour is normal',
            },
            {
              value: 'abnormal',
              label: 'Abnormal',
              sentenceFragment: 'The bladder contour is abnormal',
            },
          ],
          defaultValue: 'normal',
        },
        {
          id: 'bladder_wall',
          label: 'Wall Thickness',
          labelKo: '벽 두께',
          type: 'select',
          options: [
            {
              value: 'normal',
              label: 'Normal',
              sentenceFragment: 'Wall thickness is normal',
            },
            {
              value: 'thickened',
              label: 'Thickened',
              sentenceFragment: 'The bladder wall is thickened',
            },
          ],
          defaultValue: 'normal',
        },
        {
          id: 'bladder_ureteric_jets',
          label: 'Ureteric Jets',
          labelKo: '요관 분출',
          type: 'select',
          options: [
            {
              value: 'yes',
              label: 'Yes',
              sentenceFragment:
                'Bilateral vesicoureteric jets are identified',
            },
            {
              value: 'no',
              label: 'No',
              sentenceFragment:
                'Vesicoureteric jets are not clearly identified',
            },
          ],
          defaultValue: 'yes',
        },
      ],
      sentencePattern: {
        template:
          '{{bladder_nad:checked}} ' +
          '{{bladder_contour:sentence}}. {{bladder_wall:sentence}}. ' +
          '{{bladder_ureteric_jets:sentence}}. ' +
          '{{?bladder_pre_mict:Pre micturition, the urinary bladder has a volume of {{bladder_pre_mict}}ml. }}' +
          '{{?bladder_post_mict:Post micturition the urinary bladder demonstrates a residual volume of {{bladder_post_mict}}ml.}}',
        defaultSentence:
          'The urinary bladder is of normal size, shape and wall thickness. Bilateral vesicoureteric jets are identified.',
      },
    },

    // ── Section 4: Prostate ──────────────────────────────────────────
    {
      id: 'prostate',
      title: 'Prostate',
      titleKo: '전립선',
      order: 4,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'prostate_status',
          label: 'Status',
          labelKo: '상태',
          type: 'select',
          options: [
            {
              value: 'normal',
              label: 'Normal',
              sentenceFragment: 'The prostate is normal in size',
            },
            {
              value: 'enlarged',
              label: 'Enlarged',
              sentenceFragment: 'The prostate is enlarged',
            },
            {
              value: 'prostatectomy',
              label: 'Prostatectomy',
              sentenceFragment:
                'The prostate is absent in keeping with previous prostatectomy',
            },
          ],
          defaultValue: 'normal',
        },
        {
          id: 'prostate_volume',
          label: 'Volume',
          labelKo: '용적',
          type: 'number',
          unit: 'ml',
          precision: 0,
          normalRange: { min: 0, max: 30, unit: 'ml' },
          step: 1,
          placeholder: 'Prostate volume',
        },
      ],
      sentencePattern: {
        template:
          '{{prostate_status:sentence}}. ' +
          '{{?prostate_volume:The prostate volume measures approximately {{prostate_volume}}ml.}}',
        defaultSentence: 'The prostate is normal in size.',
      },
    },
  ],
  conclusionPattern: {
    template:
      'The kidneys are of normal size, shape and cortical thickness. ' +
      'The right kidney measures {{rk_length}}mm in bipolar length and the left kidney {{lk_length}}mm in bipolar length. ' +
      'There is no suspicious renal lesion. There is no renal calculus. ' +
      'There is no evidence of hydronephrosis or proximal hydroureter. ' +
      'The urinary bladder is of normal size, shape and wall thickness. ' +
      'Bilateral vesicoureteric jets are identified. ' +
      '{{?bladder_pre_mict:Pre micturition, the urinary bladder has a volume of {{bladder_pre_mict}}ml. }}' +
      '{{?bladder_post_mict:Post micturition the urinary bladder demonstrates a small residual volume of {{bladder_post_mict}}ml.}}',
    builderId: 'renal_conclusion',
    defaultSentence:
      'Normal renal ultrasound. No evidence of renal calculi, hydronephrosis or suspicious renal lesion.',
    abnormalConclusion:
      'Abnormal findings identified. Please correlate clinically.',
  },
};
