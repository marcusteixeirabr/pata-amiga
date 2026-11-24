import app from "../../app.json";

// A tela de recorte de foto (expo-image-picker) é nativa: as cores vêm do app.json.
// Bug do teste no Pixel 7 (24/11): barra preta com ícone e texto pretos,
// o botão de confirmar o recorte ficava invisível no modo claro.

type CoresRecorte = Partial<
  Record<
    "cropToolbarColor" | "cropToolbarIconColor" | "cropToolbarActionTextColor" | "cropBackButtonIconColor",
    string
  >
>;
type OpcoesImagePicker = { colors?: CoresRecorte; dark?: { colors?: CoresRecorte } };

const entrada = (app.expo.plugins as unknown[]).find(
  (plugin): plugin is [string, OpcoesImagePicker] => Array.isArray(plugin) && plugin[0] === "expo-image-picker",
);
const opcoes = entrada?.[1] ?? {};

describe("Cores da tela de recorte de foto", () => {
  test.each([
    ["claro", opcoes.colors],
    ["escuro", opcoes.dark?.colors],
  ])("modo %s: botões e textos aparecem sobre a barra", (_modo, cores) => {
    const barra = cores?.cropToolbarColor?.toLowerCase();
    expect(barra).toBeDefined();

    for (const elemento of ["cropToolbarIconColor", "cropToolbarActionTextColor", "cropBackButtonIconColor"] as const) {
      const cor = cores?.[elemento]?.toLowerCase();
      expect(cor).toBeDefined();
      expect(cor).not.toBe(barra);
    }
  });
});
