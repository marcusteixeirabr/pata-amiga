import { Link } from "expo-router";
import { fireEvent, renderRouter, screen } from "expo-router/testing-library";

import { Voltar } from "@/components/BtnVoltar";
import { cores } from "@/estilos/cores";

function Inicio() {
  return <Link href="/segunda">Ir para a segunda</Link>;
}

function Segunda() {
  return <Voltar />;
}

function abrir(url: string) {
  return renderRouter({ index: Inicio, segunda: Segunda }, { initialUrl: url });
}

describe("Botão Voltar", () => {
  test("segue o padrão do app: seta e texto laranja, sem fundo colorido", async () => {
    await abrir("/segunda");

    expect(screen.getByText("← Voltar")).toHaveStyle({ color: cores.laranja });
    expect(screen.getByRole("button", { name: "Voltar" })).not.toHaveStyle({
      backgroundColor: cores.ciano,
    });
  });

  test("volta para a tela anterior", async () => {
    const app = abrir("/");
    await app;
    await fireEvent.press(screen.getByText("Ir para a segunda"));
    expect(app.getPathname()).toBe("/segunda");

    await fireEvent.press(screen.getByRole("button", { name: "Voltar" }));

    expect(app.getPathname()).toBe("/");
  });
});
