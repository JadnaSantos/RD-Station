import { render, screen } from "@testing-library/react";
import App from './App';

describe("App", () => {
  const handleRecommend = jest.fn()

  test("Renderizar o App corretamente", () => {
    render(<App />);

    expect(
      screen.getByText("Recomendador de Produtos RD Station")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos. Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.")
    ).toBeInTheDocument();
  });

  test("Renderizar estado inicial das recomendações quando estiver vazio", () => {
    render(<App />);

    expect(
      screen.getByText("Nenhuma recomendação encontrada.")
    ).toBeInTheDocument();
  })
});