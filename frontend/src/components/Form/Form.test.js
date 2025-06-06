import Form from "./Form"
import { render, screen } from "@testing-library/react";
import useForm from "../../hooks/useForm/useForm";
import useProducts from "../../hooks/useProducts/useProducts";
import useRecommendations from "../../hooks/useRecommendations/useRecommendations";
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/useForm/useForm');
jest.mock('../../hooks/useRecommendations/useRecommendations');
jest.mock('../../hooks/useProducts/useProducts');

describe("Form", () => {
  const setRecommendations = jest.fn();
  const preferences = ['Preference 1', 'Preference 2'];
  const features = ['Feature 1', 'Feature 2'];
  const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];


  beforeEach(() => {
    useForm.mockReturnValue({
      formData: {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: '',
      },
      handleChange: jest.fn(),
    });
    useRecommendations.mockReturnValue({
      getRecommendations: jest.fn(),
    });
    useProducts.mockReturnValue({
      preferences,
      features,
      products,
    });
  });


  test("Renderizar o componente corretamente", () => {
    render(<Form setRecommendations={setRecommendations} />)

    expect(screen.getByText('Preferências:')).toBeInTheDocument();
    expect(screen.getByText('Funcionalidades:')).toBeInTheDocument();
    expect(screen.getByText('Tipo de Recomendação:')).toBeInTheDocument();
    expect(screen.getByText('Obter recomendação')).toBeInTheDocument();
  })

  test("Chamar getRecommendations com o formData quando o formulário for submetido", () => {
    render(<Form setRecommendations={setRecommendations} />)

    const button = screen.getByRole('button', { name: 'Obter recomendação' });
    userEvent.click(button);
    expect(useRecommendations().getRecommendations).toHaveBeenCalledTimes(1);
    expect(useRecommendations().getRecommendations).toHaveBeenCalledWith({ selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: '' });
  })
})