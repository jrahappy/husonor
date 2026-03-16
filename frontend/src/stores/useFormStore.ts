import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FormValues } from '../types/report';

interface FormState {
  values: FormValues;
  setFieldValue: (fieldId: string, value: string | number | boolean | null) => void;
  setAllValues: (values: FormValues) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      values: {},
      setFieldValue: (fieldId, value) =>
        set((state) => ({
          values: { ...state.values, [fieldId]: value },
        })),
      setAllValues: (values) => set({ values }),
      resetForm: () => set({ values: {} }),
    }),
    {
      name: 'husonor-form-values',
    },
  ),
);
