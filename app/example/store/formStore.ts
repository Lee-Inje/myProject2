// app/form/formStore.ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

// 폼 상태 타입 정의
export interface FormState {
  email: string
  password: string
  agree: boolean
  gender: 'male' | 'female'
  city: string
  darkMode: boolean
  setField: <T extends keyof FormState>(key: T, value: FormState[T]) => void
}

// 초기 상태 및 zustand + immer 스토어 정의
export const useFormStore = create<FormState>()(
  immer((set) => ({
    email: '',
    password: '',
    agree: false,
    gender: 'male',
    city: 'seoul',
    darkMode: false,
    // 필드별 set 함수 정의 (immer 사용으로 불변성 유지)
    setField: (key, value) =>
      set((state) => {
        state[key] = value
      }),
  }))
)