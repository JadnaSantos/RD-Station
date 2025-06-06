import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Preferences from "./Preferences";

jest.mock('../../../shared/Checkbox', () => (props) => (
  <input
    type="checkbox"
    data-testid={`checkbox-mock-${props.value}`}
    onChange={props.onChange}
    checked={props.checked}
  />
));

describe('PreferencesComponent', () => {

  const preferences = ['Preferences 1', 'Preferences 2'];
  const onPreferenceChange = jest.fn();

  test('Renderizar o component corretamente', () => {
    render(
      <Preferences
        preferences={[]}
        selectedPreferences={[]}
        onPreferenceChange={() => { }}
      />)

    expect(screen.getByText('Preferências:')).toBeInTheDocument()
  })

  test('Atualizar o state quando uma preferência for selecionada', () => {
    render(<Preferences preferences={preferences} selectedPreferences={[]} onPreferenceChange={onPreferenceChange} />);

    const checkboxes = screen.getAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
    expect(onPreferenceChange).toHaveBeenCalled();
  })


  test("Adicionar a Preferências ao selecionar o checkbox", () => {
    render(<Preferences preferences={preferences} selectedPreferences={[]} onPreferenceChange={onPreferenceChange} />);

    const checkboxes = screen.getByTestId('checkbox-mock-Preferences 1');
    userEvent.click(checkboxes);
    expect(onPreferenceChange).toHaveBeenCalledWith(['Preferences 1']);
  })

  test("Remove a Preferências ao desmarcar o checkbox", () => {
    render(
      <Preferences
        preferences={preferences}
        selectedPreferences={["Preferences 1"]}
        onPreferenceChange={onPreferenceChange}
      />
    );
    const checkbox = screen.getByTestId('checkbox-mock-Preferences 1');
    userEvent.click(checkbox);
    expect(onPreferenceChange).toHaveBeenCalledWith([]);
  });
})