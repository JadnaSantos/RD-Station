import { render, screen } from "@testing-library/react";
import RecommendationList from "./RecommendationList";

describe("RecommendationList", () => {
  it("Renderizar mensagem de nenhuma recomendação encontrada quando não houver lista", () => {
    render(<RecommendationList recommendations={[]} />);

    expect(
      screen.getByText("Nenhuma recomendação encontrada.")
    ).toBeInTheDocument();
  });

  it("Renderizar lista de MultipleProducts com base nas preferências selecionadas", () => {
    render(
      <RecommendationList
        recommendations={[
          { name: "RD Station Marketing" },
          { name: "RD Station Conversas" },
          { name: "RD Station Inteligência Artificial" },
        ]}
      />
    );

    expect(screen.getByText("RD Station Marketing")).toBeInTheDocument();
    expect(screen.getByText("RD Station Conversas")).toBeInTheDocument();
    expect(
      screen.getByText("RD Station Inteligência Artificial")
    ).toBeInTheDocument();
  });

  it("Renderizar um  SingleProduct com base nas preferências selecionadas", () => {
    render(
      <RecommendationList
        recommendations={[{ name: "RD Station Marketing" }]}
      />
    );

    expect(screen.getByText("RD Station Marketing")).toBeInTheDocument();
  });
})