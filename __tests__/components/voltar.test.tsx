import { Link } from "expo-router";
import { fireEvent, renderRouter, screen } from "expo-router/testing-library";

import { Voltar } from "@/components/BtnVoltar";
import { cores } from "@/estilos/cores";

// As rotas precisam existir no app: o typedRoutes do Expo só aceita href conhecido.
function Inicio() {
  return <Link href="/parceiro">Ir para a outra tela</Link>;
}

function OutraTela() {
  return <Voltar />;
}

function abrir(url: string) {
  return renderRouter(
    { index: Inicio, parceiro: OutraTela },
    { initialUrl: url },
  );
}

describe("Botão Voltar", () => {
  test("segue o padrão do app: seta e texto laranja, sem fundo colorido", async () => {
    await abrir("/parceiro");

    expect(screen.getByText("← Voltar")).toHaveStyle({ color: cores.laranja });
    expect(screen.getByRole("button", { name: "Voltar" })).not.toHaveStyle({
      backgroundColor: cores.ciano,
    });
  });

  test("volta para a tela anterior", async () => {
    const app = abrir("/");
    await app;
    await fireEvent.press(screen.getByText("Ir para a outra tela"));
    expect(app.getPathname()).toBe("/parceiro");

    await fireEvent.press(screen.getByRole("button", { name: "Voltar" }));

    expect(app.getPathname()).toBe("/");
  });
});
