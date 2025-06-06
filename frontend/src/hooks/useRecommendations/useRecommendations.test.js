import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useRecommendations from '../useRecommendations/useRecommendations';
import recommendationService from '../../services/recommendation.service';

jest.mock('../../services/recommendation.service');

describe('useRecommendations', () => {
  const products = [{ id: 1 }];
  const formData = { field: 'value' };

  test('getRecommendations chama o serviço com formData e produtos', () => {
    recommendationService.getRecommendations.mockReturnValue(['r']);
    const { result } = renderHook(() => useRecommendations(products));

    const res = result.current.getRecommendations(formData);

    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
      formData,
      products
    );
    expect(res).toEqual(['r']);
  });

  test('setRecommendations atualiza o estado', () => {
    const { result } = renderHook(() => useRecommendations(products));

    act(() => {
      result.current.setRecommendations(['a']);
    });
    expect(result.current.recommendations).toEqual(['a']);
  });
});