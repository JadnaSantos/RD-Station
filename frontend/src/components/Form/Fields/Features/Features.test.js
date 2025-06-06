import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Features from "./Features";

jest.mock('../../../shared/Checkbox', () => (props) => (
  <input
    type="checkbox"
    data-testid={`checkbox-mock-${props.value}`}
    onChange={props.onChange}
    checked={props.checked}
  />
));

describe('FeaturesComponent', () => {
  const features = ['Feature 1', 'Feature 2'];

  const onFeatureChange = jest.fn();

  test("Renderizar o componente corretamente", () => {
    render(
      <Features
        features={[]}
        onFeatureChange={() => { }}
        selectedFeatures={[]}
      />)

    expect(screen.getByText('Funcionalidades:')).toBeInTheDocument()
  })

  test("Atualizar o state quando uma funcionalidade for selecionada", () => {
    render(
      <Features
        features={features}
        onFeatureChange={onFeatureChange}
        selectedFeatures={[]}
      />)

    const checkboxes = screen.getAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
    expect(onFeatureChange).toHaveBeenCalled();
  });


  test("Adiciona a funcionalidade ao selecionar o checkbox", () => {
    render(
      <Features
        features={features}
        onFeatureChange={onFeatureChange}
        selectedFeatures={[]}
      />)

    const checkboxes = screen.getByTestId('checkbox-mock-Feature 1');
    userEvent.click(checkboxes);
    expect(onFeatureChange).toHaveBeenCalledWith(['Feature 1']);

  })

  test("Remove a funcionalidade ao desmarcar o checkbox", () => {
    render(
      <Features
        features={features}
        selectedFeatures={['Feature 1']}
        onFeatureChange={onFeatureChange}
      />
    );
    const checkbox = screen.getByTestId('checkbox-mock-Feature 1');
    userEvent.click(checkbox);
    expect(onFeatureChange).toHaveBeenCalledWith([]);
  });
})