import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import RecommendationType from "./RecommendationType";

describe("RecommendationTypeField", () => {
  const onRecommendationTypeChange = jest.fn();

  test("Rendizar o component corretamente", () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={() => { }}
      />)

    expect(screen.getByText('Tipo de Recomendação:')).toBeInTheDocument()
  })

  test("Chamar o onRecommendationTypeChange quando um recommendationType SingleProduct for selecionado", () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={onRecommendationTypeChange}
      />)

    const checkboxes = screen.getAllByRole('radio');
    userEvent.click(checkboxes[0]);
    expect(onRecommendationTypeChange).toHaveBeenCalledTimes(1);
    expect(onRecommendationTypeChange).toHaveBeenCalledWith('SingleProduct');
  })

  test("Chamar o onRecommendationTypeChange quando um recommendationType MultipleProducts for selecionado", () => {
    render(
      <RecommendationType
        onRecommendationTypeChange={onRecommendationTypeChange}
      />)

    const checkboxes = screen.getAllByRole('radio');
    userEvent.click(checkboxes[1]);
    expect(onRecommendationTypeChange).toHaveBeenCalledTimes(1);
    expect(onRecommendationTypeChange).toHaveBeenCalledWith('MultipleProducts');
  })
})