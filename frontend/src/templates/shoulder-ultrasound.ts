import type { ExamTemplate } from '../types/template';

export const shoulderUltrasoundTemplate: ExamTemplate = {
  id: 'shoulder_ultrasound',
  name: 'Shoulder Ultrasound',
  nameKo: '어깨 초음파',
  category: 'musculoskeletal',
  version: '1.0.0',
  reportHeader: 'SHOULDER ULTRASOUND',
  findingsIntro:
    'High resolution, real-time, dynamic ultrasound of the shoulder was performed.',
  sections: [
    // ── 0. Patient Info ──────────────────────────────────────────────
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
          placeholder: 'Name of sonographer',
        },
        {
          id: 'shoulder_side',
          label: 'Shoulder Side',
          labelKo: '검사 측',
          type: 'select',
          options: [
            { value: 'right', label: 'Right', sentenceFragment: 'Right' },
            { value: 'left', label: 'Left', sentenceFragment: 'Left' },
            {
              value: 'bilateral',
              label: 'Bilateral',
              sentenceFragment: 'Bilateral',
            },
          ],
          defaultValue: 'right',
        },
      ],
      sentencePattern: {
        template:
          '{{shoulder_side:sentence}} shoulder ultrasound.' +
          '{{?clinical_history: Clinical history: {{clinical_history}}.}}' +
          '{{?sonographer: Sonographer: {{sonographer}}.}}',
        defaultSentence: '',
      },
    },

    // ── 1. Long Head Biceps ──────────────────────────────────────────
    {
      id: 'long_head_biceps',
      title: 'Long Head Biceps',
      titleKo: '이두근 장두',
      order: 1,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'lhb_nad',
          label: 'NAD',
          labelKo: '정상',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence:
            'The long head of biceps tendon is intact and seated within the bicipital groove.',
        },
        {
          id: 'lhb_comment',
          label: 'Comments',
          labelKo: '소견',
          type: 'text',
          placeholder: 'Additional findings',
          maxLength: 500,
        },
      ],
      sentencePattern: {
        template:
          '{{?lhb_nad:{{lhb_nad:checked}}}}' +
          '{{?lhb_comment: {{lhb_comment}}}}',
        defaultSentence: '',
      },
    },

    // ── 2. Subscapularis ─────────────────────────────────────────────
    {
      id: 'subscapularis',
      title: 'Subscapularis',
      titleKo: '견갑하근',
      order: 2,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'subscap_nad',
          label: 'NAD',
          labelKo: '정상',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence:
            'The subscapularis tendon demonstrates normal fibrillar pattern and echotexture.',
        },
        {
          id: 'subscap_comment',
          label: 'Comments',
          labelKo: '소견',
          type: 'text',
          placeholder: 'Additional findings',
          maxLength: 500,
        },
      ],
      sentencePattern: {
        template:
          '{{?subscap_nad:{{subscap_nad:checked}}}}' +
          '{{?subscap_comment: {{subscap_comment}}}}',
        defaultSentence: '',
      },
    },

    // ── 3. Rotator Interval Flow ─────────────────────────────────────
    {
      id: 'rotator_interval_flow',
      title: 'Rotator Interval Flow',
      titleKo: '회전근 간격 혈류',
      order: 3,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'rif_nad',
          label: 'NAD',
          labelKo: '정상',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence:
            'No significant hyperaemia is identified within the rotator interval on power Doppler assessment.',
        },
        {
          id: 'rif_comment',
          label: 'Comments',
          labelKo: '소견',
          type: 'text',
          placeholder: 'Additional findings',
          maxLength: 500,
        },
      ],
      sentencePattern: {
        template:
          '{{?rif_nad:{{rif_nad:checked}}}}' +
          '{{?rif_comment: {{rif_comment}}}}',
        defaultSentence: '',
      },
    },

    // ── 4. Supraspinatus ─────────────────────────────────────────────
    {
      id: 'supraspinatus',
      title: 'Supraspinatus',
      titleKo: '극상근',
      order: 4,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'supra_nad',
          label: 'NAD',
          labelKo: '정상',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence:
            'The supraspinatus tendon demonstrates normal fibrillar pattern and echotexture. There is no evidence of tendinosis or tear.',
        },
        {
          id: 'supra_tendinosis',
          label: 'Tendinosis',
          labelKo: '건증',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence: 'Mild tendinosis noted.',
        },
        {
          id: 'supra_tear',
          label: 'Tear',
          labelKo: '파열',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence: 'Tear identified.',
        },
        {
          id: 'supra_tear_type',
          label: 'Tear Type',
          labelKo: '파열 유형',
          type: 'select',
          options: [
            {
              value: 'ftt',
              label: 'Full Thickness Tear',
              sentenceFragment: 'Full thickness tear',
            },
            {
              value: 'ptt',
              label: 'Partial Thickness Tear',
              sentenceFragment: 'Partial thickness tear',
            },
            {
              value: 'interstitial',
              label: 'Interstitial',
              sentenceFragment: 'Interstitial tear',
            },
          ],
        },
        {
          id: 'supra_comment',
          label: 'Comments',
          labelKo: '소견',
          type: 'text',
          placeholder: 'Additional findings',
          maxLength: 500,
        },
      ],
      sentencePattern: {
        template:
          '{{?supra_nad:{{supra_nad:checked}}}}' +
          '{{?supra_tendinosis: {{supra_tendinosis:checked}}}}' +
          '{{?supra_tear: {{supra_tear:checked}}}}' +
          '{{?supra_tear_type: {{supra_tear_type:sentence}}.}}' +
          '{{?supra_comment: {{supra_comment}}}}',
        defaultSentence: '',
        abnormalConclusion:
          'Supraspinatus abnormality identified — see findings.',
      },
    },

    // ── 5. Infraspinatus ─────────────────────────────────────────────
    {
      id: 'infraspinatus',
      title: 'Infraspinatus',
      titleKo: '극하근',
      order: 5,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'infra_nad',
          label: 'NAD',
          labelKo: '정상',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence:
            'The infraspinatus tendon demonstrates normal fibrillar pattern and echotexture.',
        },
        {
          id: 'infra_tendinosis',
          label: 'Tendinosis',
          labelKo: '건증',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence:
            'Tendinosis of the infraspinatus tendon is identified.',
        },
        {
          id: 'infra_comment',
          label: 'Comments',
          labelKo: '소견',
          type: 'text',
          placeholder: 'Additional findings',
          maxLength: 500,
        },
      ],
      sentencePattern: {
        template:
          '{{?infra_nad:{{infra_nad:checked}}}}' +
          '{{?infra_tendinosis: {{infra_tendinosis:checked}}}}' +
          '{{?infra_comment: {{infra_comment}}}}',
        defaultSentence: '',
      },
    },

    // ── 6. Teres Minor ───────────────────────────────────────────────
    {
      id: 'teres_minor',
      title: 'Teres Minor',
      titleKo: '소원근',
      order: 6,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'teres_nad',
          label: 'NAD',
          labelKo: '정상',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence:
            'The teres minor demonstrates normal echotexture.',
        },
        {
          id: 'teres_comment',
          label: 'Comments',
          labelKo: '소견',
          type: 'text',
          placeholder: 'Additional findings',
          maxLength: 500,
        },
      ],
      sentencePattern: {
        template:
          '{{?teres_nad:{{teres_nad:checked}}}}' +
          '{{?teres_comment: {{teres_comment}}}}',
        defaultSentence: '',
      },
    },

    // ── 7. Bursa ─────────────────────────────────────────────────────
    {
      id: 'bursa',
      title: 'Bursa',
      titleKo: '점액낭',
      order: 7,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'bursa_nad',
          label: 'NAD',
          labelKo: '정상',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence:
            'The subdeltoid bursa demonstrates normal thickness without any fluid distension.',
        },
        {
          id: 'bursa_thickened',
          label: 'Thickened',
          labelKo: '비후',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence: 'The subdeltoid bursa is thickened.',
        },
        {
          id: 'bursa_bunching',
          label: 'Bunching',
          labelKo: '뭉침',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence: 'Bursal bunching is noted.',
        },
        {
          id: 'bursa_pain_abduction',
          label: 'Pain on Abduction',
          labelKo: '외전 시 통증',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence: 'Pain on abduction is present.',
        },
        {
          id: 'bursa_comment',
          label: 'Comments',
          labelKo: '소견',
          type: 'text',
          placeholder: 'Additional findings',
          maxLength: 500,
        },
      ],
      sentencePattern: {
        template:
          '{{?bursa_nad:{{bursa_nad:checked}}}}' +
          '{{?bursa_thickened: {{bursa_thickened:checked}}}}' +
          '{{?bursa_bunching: {{bursa_bunching:checked}}}}' +
          '{{?bursa_pain_abduction: {{bursa_pain_abduction:checked}}}}' +
          '{{?bursa_comment: {{bursa_comment}}}}',
        defaultSentence: '',
      },
    },

    // ── 8. Dynamic Study ─────────────────────────────────────────────
    {
      id: 'dynamic_study',
      title: 'Dynamic Study',
      titleKo: '동적 검사',
      order: 8,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'dynamic_nad',
          label: 'NAD',
          labelKo: '정상',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence:
            'There is no bunching or impingement of the bursa on dynamic assessment.',
        },
        {
          id: 'dynamic_comment',
          label: 'Comments',
          labelKo: '소견',
          type: 'text',
          placeholder: 'Additional findings',
          maxLength: 500,
        },
      ],
      sentencePattern: {
        template:
          '{{?dynamic_nad:{{dynamic_nad:checked}}}}' +
          '{{?dynamic_comment: {{dynamic_comment}}}}',
        defaultSentence: '',
      },
    },

    // ── 9. Posterior Joint ────────────────────────────────────────────
    {
      id: 'posterior_joint',
      title: 'Posterior Joint',
      titleKo: '후방 관절',
      order: 9,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'post_joint_nad',
          label: 'NAD',
          labelKo: '정상',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence:
            'The posterior joint recess demonstrates no significant effusion or synovitis.',
        },
        {
          id: 'post_joint_comment',
          label: 'Comments',
          labelKo: '소견',
          type: 'text',
          placeholder: 'Additional findings',
          maxLength: 500,
        },
      ],
      sentencePattern: {
        template:
          '{{?post_joint_nad:{{post_joint_nad:checked}}}}' +
          '{{?post_joint_comment: {{post_joint_comment}}}}',
        defaultSentence: '',
      },
    },

    // ── 10. AC Joint ─────────────────────────────────────────────────
    {
      id: 'ac_joint',
      title: 'AC Joint',
      titleKo: '견봉쇄골 관절',
      order: 10,
      omitWhenEmpty: true,
      fields: [
        {
          id: 'ac_joint_nad',
          label: 'NAD',
          labelKo: '정상',
          type: 'checkbox',
          defaultValue: false,
          checkedSentence:
            'The acromioclavicular joint demonstrates normal appearance with no significant osteophytic change.',
        },
        {
          id: 'ac_joint_comment',
          label: 'Comments',
          labelKo: '소견',
          type: 'text',
          placeholder: 'Additional findings',
          maxLength: 500,
        },
      ],
      sentencePattern: {
        template:
          '{{?ac_joint_nad:{{ac_joint_nad:checked}}}}' +
          '{{?ac_joint_comment: {{ac_joint_comment}}}}',
        defaultSentence: '',
      },
    },
  ],
  conclusionPattern: {
    template: '',
    builderId: 'shoulder_conclusion',
    defaultSentence: 'Normal shoulder ultrasound. No significant abnormality detected.',
  },
};
