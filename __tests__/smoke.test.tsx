/**
 * SMOKE TEST DO AMBIENTE
 * Confere se Jest + jest-expo + Testing Library conseguem desenhar uma tela.
 * Fica na raiz de __tests__ porque não testa uma regra de src/: testa o ambiente.
 *
 * ⚠️ MANTIDO DE PROPÓSITO COMO EXEMPLO PARA SE TER CUIDADO COM TESTES ASSÍNCRONOS
 *
 * A tela de boas-vindas é desenhada em src/app/index.tsx. O teste abaixo
 * importa o componente e chama render() para desenhá-lo em memória.
 * Na Testing Library 14, render() devolve uma Promise. Aqui ela não é
 * aguardada: a função do teste não é async e não há await nem return.
 * O teste só falha quando deve porque esta tela é desenhada muito rápido,
 * antes de o Jest encerrar o teste. Numa tela mais lenta (por exemplo,
 * uma que carrega dados do AsyncStorage), a falha do expect pode se
 * perder e o teste fica verde mesmo errado.
 * O .catch que só relança o erro não muda nada.
 *
 * Forma correta, para usar nos testes novos:
 *
 *   it("desenha a tela de boas-vindas", async () => {
 *     await render(<App />);
 *     expect(screen.getByText("Bem-vindo ao Pata Amiga")).toBeOnTheScreen();
 *   });
 *
 * Prefira também verificar o que o usuário vê (getByText) em vez de
 * toJSON(), que só confirma que algo foi desenhado.
 */

import { render } from "@testing-library/react-native";
import App from "../src/app/index";

describe("App Smoke Test", () => {
  it("deve renderizar o aplicativo corretamente", () => {
    render(<App />) // ⚠️ sem await: ver o comentário no topo do arquivo
      .then((data) => {
        expect(data.toJSON()).toBeTruthy();
      })
      .catch((error) => {
        throw error;
      });
  });
});
