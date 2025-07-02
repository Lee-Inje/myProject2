// app/form/FormViewModel.ts
'use client'

import { useFormStore } from '../store/formStore'
import { useState } from 'react'

// ViewModel 훅: 상태와 submit 로직을 View와 분리해서 관리
export function useFormViewModel() {
  const form = useFormStore()
  const [submitted, setSubmitted] = useState(false)

  // 상태 변경 핸들러: View에서 이 함수로 값 변경
  const handleChange = <T extends keyof typeof form>(key: T, value: typeof form[T]) => {
    form.setField(key, value)
  }

  // 제출 핸들러
  const handleSubmit = () => {
    setSubmitted(true)
    console.log('제출된 폼 데이터:', { ...form })
    alert('폼이 제출되었습니다.')
  }

  return {
    form,
    submitted,
    handleChange,
    handleSubmit,
  }
}