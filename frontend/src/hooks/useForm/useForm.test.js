import { renderHook } from '@testing-library/react';
import useForm from '../useForm/useForm';
import { act } from 'react-dom/test-utils';

describe("useForm", () => {
  test("Retornar o estado inicial do formulário", () => {
    const initialState = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    };

    const { result } = renderHook(() => useForm(initialState));

    expect(result.current.formData).toEqual(initialState);
  })

  test("Atualiza o campo do formulário quando handleChange é chamado", () => {
    const initialState = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    };

    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleChange('selectedPreferences', ['Preference 1']);
    })
    expect(result.current.formData.selectedPreferences).toEqual(['Preference 1']);

    act(() => {
      result.current.handleChange('selectedRecommendationType', 'SingleProduct');
    });
    expect(result.current.formData.selectedRecommendationType).toBe('SingleProduct');
  })
});