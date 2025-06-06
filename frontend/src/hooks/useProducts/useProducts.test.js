import { renderHook, waitFor } from '@testing-library/react';
import useProducts from '../useProducts/useProducts';
import getProducts from '../../services/product.service';

jest.mock('../../services/product.service', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useProducts', () => {
  const mockData = [
    {
      id: 1,
      preferences: ['Preference 1', 'Preference 2', 'Preference 3'],
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      id: 2,
      preferences: ['Preference 4', 'Preference 5', 'Preference 5'],
      features: ['Feature 4', 'Feature 5', 'Feature 6'],
    },
  ];

  beforeEach(() => {
    getProducts.mockResolvedValue(mockData);
    jest.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Busca produtos e expoe as preferências e funcionalidades', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.products.length).toBe(2));

    expect(getProducts).toHaveBeenCalled();
    expect(result.current.products).toEqual(mockData);
    expect(result.current.preferences.length).toBe(4);
    expect(result.current.features.length).toBe(4);
  });
});