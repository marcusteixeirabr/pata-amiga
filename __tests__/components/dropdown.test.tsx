import { fireEvent, render, screen, within } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { SelectDropdown } from "@/components/dropdown";
import { CIDADES, type CidadeTutor } from "@/modelos/cidade";

const OPCOES = [
  ...CIDADES.map((cidade) => ({ label: cidade, value: cidade as CidadeTutor })),
  { label: "Outra", value: "Outra" as CidadeTutor },
];

const METRICAS = {
  frame: { x: 0, y: 0, width: 411, height: 891 },
  insets: { top: 32, bottom: 48, left: 0, right: 0 },
};

async function renderizar(props: { value?: CidadeTutor | null; desabilitado?: boolean; onChange?: jest.Mock }) {
  const onChange = props.onChange ?? jest.fn();
  await render(
    <SafeAreaProvider initialMetrics={METRICAS}>
      <SelectDropdown<CidadeTutor>
        label="Cidade"
        placeholder="Onde você mora?"
        options={OPCOES}
        value={props.value ?? null}
        onChange={onChange}
        desabilitado={props.desabilitado}
      />
    </SafeAreaProvider>,
  );
  return onChange;
}

describe("Lista de cidades (bug do CT05)", () => {
  test("as opções ficam numa lista rolável e a última (Outra) pode ser escolhida", async () => {
    const onChange = await renderizar({});

    await fireEvent.press(screen.getByText("Onde você mora?"));

    const lista = screen.getByTestId("lista-opcoes");
    expect(lista.type).toBe("RCTScrollView");
    for (const opcao of OPCOES) {
      expect(within(lista).getByText(opcao.label)).toBeOnTheScreen();
    }

    await fireEvent.press(within(lista).getByText("Outra"));
    expect(onChange).toHaveBeenCalledWith("Outra");
    expect(screen.queryByTestId("lista-opcoes")).not.toBeOnTheScreen();
  });

  test("desabilitado, mostra a cidade escolhida e não abre a lista", async () => {
    await renderizar({ value: "Itajaí", desabilitado: true });

    await fireEvent.press(screen.getByText("Itajaí"));

    expect(screen.queryByText("Blumenau")).not.toBeOnTheScreen();
  });
});
