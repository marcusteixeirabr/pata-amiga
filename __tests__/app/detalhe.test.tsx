import { renderRouter, screen } from "expo-router/testing-library";

import TelaDetalhe from "@/app/detalhe/[id]";
import { PARCEIROS } from "@/dados";
import { Parceiro } from "@/modelos/parceiro";

function parceiro(id: string): Parceiro {
  const encontrado = PARCEIROS.find((p) => p.id === id);
  if (!encontrado) throw new Error(`Parceiro ${id} não está nos dados`);
  return encontrado;
}

function abrirDetalhe(url: string) {
  return renderRouter({ "detalhe/[id]": TelaDetalhe }, { initialUrl: url });
}

describe("Detalhe do parceiro", () => {
  test("mostra os dados do parceiro (RF12)", async () => {
    const ana = parceiro("p01");
    await abrirDetalhe("/detalhe/p01");

    expect(screen.getByText(ana.nome)).toBeOnTheScreen();
    expect(screen.getByText("AS")).toBeOnTheScreen();
    expect(screen.getByText(ana.tipo)).toBeOnTheScreen();
    expect(screen.getByText("Passeio, cuidados em casa")).toBeOnTheScreen();
    expect(screen.getByText(ana.cidade)).toBeOnTheScreen();
    expect(screen.getByText(ana.horarioAtendimento)).toBeOnTheScreen();
    expect(screen.getByText(ana.faixaPreco)).toBeOnTheScreen();
    expect(screen.getByText("★ 4,8 (12 avaliações)")).toBeOnTheScreen();
    expect(screen.getByText("✓ Verificado")).toBeOnTheScreen();
  });

  test("parceiro sem selo não mostra Verificado", async () => {
    await abrirDetalhe("/detalhe/p02");
    expect(screen.getByText(parceiro("p02").nome)).toBeOnTheScreen();
    expect(screen.queryByText("✓ Verificado")).not.toBeOnTheScreen();
  });

  test("id que não existe mostra uma mensagem", async () => {
    await abrirDetalhe("/detalhe/xyz");
    expect(screen.getByText("Parceiro não encontrado")).toBeOnTheScreen();
  });
});
