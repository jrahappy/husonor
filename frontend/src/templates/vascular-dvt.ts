import type { ExamTemplate } from '../types/template';

export const vascularDvtTemplate: ExamTemplate = {
  id: 'vascular_dvt',
  name: 'Vascular DVT Ultrasound',
  nameKo: '심부정맥혈전증 초음파',
  category: 'vascular',
  version: '1.0.0',
  reportHeader: 'DVT ULTRASOUND',
  findingsIntro: '',
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
          placeholder: 'Relevant clinical history',
          maxLength: 500,
        },
        {
          id: 'sonographer',
          label: 'Sonographer',
          labelKo: '검사자',
          type: 'text',
          placeholder: 'Sonographer name / initials',
          maxLength: 100,
        },
        {
          id: 'dvt_side',
          label: 'Side',
          labelKo: '검사 측',
          type: 'select',
          options: [
            { value: 'right', label: 'Right', sentenceFragment: 'right' },
            { value: 'left', label: 'Left', sentenceFragment: 'left' },
            { value: 'bilateral', label: 'Bilateral', sentenceFragment: 'bilateral' },
          ],
          defaultValue: 'right',
        },
        {
          id: 'dvt_limb',
          label: 'Limb',
          labelKo: '사지 유형',
          type: 'select',
          options: [
            { value: 'upper', label: 'Upper', sentenceFragment: 'upper extremity' },
            { value: 'lower', label: 'Lower', sentenceFragment: 'lower extremity' },
          ],
          defaultValue: 'lower',
        },
      ],
      sentencePattern: {
        template:
          '{{dvt_limb:sentence}} DVT ultrasound of the {{dvt_side:sentence}} limb.' +
          '{{?clinical_history: Clinical history: {{clinical_history}}.}}' +
          '{{?sonographer: Sonographer: {{sonographer}}.}}',
        defaultSentence: '',
      },
    },

    // ── Section 1: Upper Limb Veins ──────────────────────────────────
    {
      id: 'upper_limb_veins',
      title: 'Upper Limb Veins',
      titleKo: '상지 정맥',
      order: 1,
      omitWhenEmpty: true,
      fields: [
        // Internal Jugular
        {
          id: 'ij_patent',
          label: 'Internal Jugular – Patent',
          labelKo: '내경정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The internal jugular vein is patent.',
          uncheckedSentence: 'The internal jugular vein is not patent.',
        },
        {
          id: 'ij_compress',
          label: 'Internal Jugular – Compressible',
          labelKo: '내경정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The internal jugular vein is compressible.',
          uncheckedSentence: 'The internal jugular vein is non-compressible.',
        },
        // Subclavian
        {
          id: 'subclavian_patent',
          label: 'Subclavian – Patent',
          labelKo: '쇄골하정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The subclavian vein is patent.',
          uncheckedSentence: 'The subclavian vein is not patent.',
        },
        {
          id: 'subclavian_compress',
          label: 'Subclavian – Compressible',
          labelKo: '쇄골하정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The subclavian vein is compressible.',
          uncheckedSentence: 'The subclavian vein is non-compressible.',
        },
        // Axillary
        {
          id: 'axillary_patent',
          label: 'Axillary – Patent',
          labelKo: '액와정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The axillary vein is patent.',
          uncheckedSentence: 'The axillary vein is not patent.',
        },
        {
          id: 'axillary_compress',
          label: 'Axillary – Compressible',
          labelKo: '액와정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The axillary vein is compressible.',
          uncheckedSentence: 'The axillary vein is non-compressible.',
        },
        // Brachial
        {
          id: 'brachial_patent',
          label: 'Brachial – Patent',
          labelKo: '상완정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The brachial vein is patent.',
          uncheckedSentence: 'The brachial vein is not patent.',
        },
        {
          id: 'brachial_compress',
          label: 'Brachial – Compressible',
          labelKo: '상완정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The brachial vein is compressible.',
          uncheckedSentence: 'The brachial vein is non-compressible.',
        },
        // Cephalic
        {
          id: 'cephalic_patent',
          label: 'Cephalic – Patent',
          labelKo: '요측피정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The cephalic vein is patent.',
          uncheckedSentence: 'The cephalic vein is not patent.',
        },
        {
          id: 'cephalic_compress',
          label: 'Cephalic – Compressible',
          labelKo: '요측피정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The cephalic vein is compressible.',
          uncheckedSentence: 'The cephalic vein is non-compressible.',
        },
        // Basilic
        {
          id: 'basilic_patent',
          label: 'Basilic – Patent',
          labelKo: '척측피정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The basilic vein is patent.',
          uncheckedSentence: 'The basilic vein is not patent.',
        },
        {
          id: 'basilic_compress',
          label: 'Basilic – Compressible',
          labelKo: '척측피정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The basilic vein is compressible.',
          uncheckedSentence: 'The basilic vein is non-compressible.',
        },
      ],
      sentencePattern: {
        template:
          '{{?ij_patent:{{ij_patent:checked}} }}' +
          '{{?ij_compress:{{ij_compress:checked}} }}' +
          '{{?subclavian_patent:{{subclavian_patent:checked}} }}' +
          '{{?subclavian_compress:{{subclavian_compress:checked}} }}' +
          '{{?axillary_patent:{{axillary_patent:checked}} }}' +
          '{{?axillary_compress:{{axillary_compress:checked}} }}' +
          '{{?brachial_patent:{{brachial_patent:checked}} }}' +
          '{{?brachial_compress:{{brachial_compress:checked}} }}' +
          '{{?cephalic_patent:{{cephalic_patent:checked}} }}' +
          '{{?cephalic_compress:{{cephalic_compress:checked}} }}' +
          '{{?basilic_patent:{{basilic_patent:checked}} }}' +
          '{{?basilic_compress:{{basilic_compress:checked}} }}',
        defaultSentence:
          'The deep and superficial veins of the upper limb are patent and demonstrate ' +
          'normal venous flow, compressibility and augmentation. Normal vascular waveform ' +
          'noted in the subclavian, axillary, brachial, radial and ulnar veins. ' +
          'There is no evidence of deep vein thrombosis.',
        abnormalConclusion:
          'Abnormal findings identified in one or more upper limb veins. ' +
          'Please see individual vein findings above.',
      },
    },

    // ── Section 2: Lower Limb Veins ──────────────────────────────────
    {
      id: 'lower_limb_veins',
      title: 'Lower Limb Veins',
      titleKo: '하지 정맥',
      order: 2,
      omitWhenEmpty: true,
      fields: [
        // Common Femoral Vein
        {
          id: 'cfv_patent',
          label: 'CFV – Patent',
          labelKo: '총대퇴정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The common femoral vein is patent.',
          uncheckedSentence: 'The common femoral vein is not patent.',
        },
        {
          id: 'cfv_compress',
          label: 'CFV – Compressible',
          labelKo: '총대퇴정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The common femoral vein is compressible.',
          uncheckedSentence: 'The common femoral vein is non-compressible.',
        },
        // Superficial Femoral Vein
        {
          id: 'sfv_patent',
          label: 'SFV – Patent',
          labelKo: '표재대퇴정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The superficial femoral vein is patent.',
          uncheckedSentence: 'The superficial femoral vein is not patent.',
        },
        {
          id: 'sfv_compress',
          label: 'SFV – Compressible',
          labelKo: '표재대퇴정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The superficial femoral vein is compressible.',
          uncheckedSentence: 'The superficial femoral vein is non-compressible.',
        },
        // Popliteal
        {
          id: 'popliteal_patent',
          label: 'Popliteal – Patent',
          labelKo: '슬와정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The popliteal vein is patent.',
          uncheckedSentence: 'The popliteal vein is not patent.',
        },
        {
          id: 'popliteal_compress',
          label: 'Popliteal – Compressible',
          labelKo: '슬와정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The popliteal vein is compressible.',
          uncheckedSentence: 'The popliteal vein is non-compressible.',
        },
        // Anterior Tibial Vein
        {
          id: 'atv_patent',
          label: 'ATV – Patent',
          labelKo: '전경골정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The anterior tibial vein is patent.',
          uncheckedSentence: 'The anterior tibial vein is not patent.',
        },
        {
          id: 'atv_compress',
          label: 'ATV – Compressible',
          labelKo: '전경골정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The anterior tibial vein is compressible.',
          uncheckedSentence: 'The anterior tibial vein is non-compressible.',
        },
        // Posterior Tibial Vein
        {
          id: 'ptv_patent',
          label: 'PTV – Patent',
          labelKo: '후경골정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The posterior tibial vein is patent.',
          uncheckedSentence: 'The posterior tibial vein is not patent.',
        },
        {
          id: 'ptv_compress',
          label: 'PTV – Compressible',
          labelKo: '후경골정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The posterior tibial vein is compressible.',
          uncheckedSentence: 'The posterior tibial vein is non-compressible.',
        },
        // Peroneal
        {
          id: 'peroneal_patent',
          label: 'Peroneal – Patent',
          labelKo: '비골정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The peroneal vein is patent.',
          uncheckedSentence: 'The peroneal vein is not patent.',
        },
        {
          id: 'peroneal_compress',
          label: 'Peroneal – Compressible',
          labelKo: '비골정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The peroneal vein is compressible.',
          uncheckedSentence: 'The peroneal vein is non-compressible.',
        },
        // Great Saphenous Vein
        {
          id: 'gsv_patent',
          label: 'GSV – Patent',
          labelKo: '대복재정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The great saphenous vein is patent.',
          uncheckedSentence: 'The great saphenous vein is not patent.',
        },
        {
          id: 'gsv_compress',
          label: 'GSV – Compressible',
          labelKo: '대복재정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The great saphenous vein is compressible.',
          uncheckedSentence: 'The great saphenous vein is non-compressible.',
        },
        // Small Saphenous Vein
        {
          id: 'ssv_patent',
          label: 'SSV – Patent',
          labelKo: '소복재정맥 – 개통',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The small saphenous vein is patent.',
          uncheckedSentence: 'The small saphenous vein is not patent.',
        },
        {
          id: 'ssv_compress',
          label: 'SSV – Compressible',
          labelKo: '소복재정맥 – 압박 가능',
          type: 'checkbox',
          defaultValue: true,
          checkedSentence: 'The small saphenous vein is compressible.',
          uncheckedSentence: 'The small saphenous vein is non-compressible.',
        },
      ],
      sentencePattern: {
        template:
          '{{?cfv_patent:{{cfv_patent:checked}} }}' +
          '{{?cfv_compress:{{cfv_compress:checked}} }}' +
          '{{?sfv_patent:{{sfv_patent:checked}} }}' +
          '{{?sfv_compress:{{sfv_compress:checked}} }}' +
          '{{?popliteal_patent:{{popliteal_patent:checked}} }}' +
          '{{?popliteal_compress:{{popliteal_compress:checked}} }}' +
          '{{?atv_patent:{{atv_patent:checked}} }}' +
          '{{?atv_compress:{{atv_compress:checked}} }}' +
          '{{?ptv_patent:{{ptv_patent:checked}} }}' +
          '{{?ptv_compress:{{ptv_compress:checked}} }}' +
          '{{?peroneal_patent:{{peroneal_patent:checked}} }}' +
          '{{?peroneal_compress:{{peroneal_compress:checked}} }}' +
          '{{?gsv_patent:{{gsv_patent:checked}} }}' +
          '{{?gsv_compress:{{gsv_compress:checked}} }}' +
          '{{?ssv_patent:{{ssv_patent:checked}} }}' +
          '{{?ssv_compress:{{ssv_compress:checked}} }}',
        defaultSentence:
          'The deep veins of the lower extremity including the common femoral, superficial femoral, ' +
          'popliteal, anterior tibial, posterior tibial and peroneal veins are patent and compressible ' +
          'with normal venous flow, compressibility and augmentation. There is no evidence of deep vein thrombosis. ' +
          'The superficial venous system is normal, without evidence of superficial venous thrombophlebitis. ' +
          'No collections are seen.',
        abnormalConclusion:
          'Abnormal findings identified in one or more lower limb veins. ' +
          'Please see individual vein findings above.',
      },
    },

    // ── Section 3: DVT Findings ──────────────────────────────────────
    {
      id: 'dvt_findings',
      title: 'DVT Findings',
      titleKo: 'DVT 소견',
      order: 3,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'dvt_comments',
          label: 'DVT Comments',
          labelKo: 'DVT 소견 기술',
          type: 'text',
          placeholder: 'Describe thrombosis findings if any',
          maxLength: 1000,
        },
      ],
      sentencePattern: {
        template: '{{?dvt_comments:{{dvt_comments}}}}',
        defaultSentence: '',
      },
    },
  ],
  conclusionPattern: {
    template: '',
    builderId: 'vascular_dvt_conclusion',
    defaultSentence:
      'No evidence of deep vein thrombosis. ' +
      'The superficial venous system is normal, without evidence of superficial venous thrombophlebitis. ' +
      'No collections are seen.',
  },
};
