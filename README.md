# 🐾 Pata Amiga

Aplicativo Android que conecta **donos de pets** a **cuidadores, passeadores e petshops da vizinhança**, para que nenhum animal fique sem atenção enquanto o tutor está fora, no Vale do Itajaí e na Grande Florianópolis (SC).

> 🚧 **Em desenvolvimento.** MVP acadêmico do Projeto Integrador _Hands-on Work VIII_ do curso de Análise e Desenvolvimento de Sistemas da **UNIVALI** (2026), desenvolvido com **TDD (Test-Driven Development)**. O escopo do MVP está sendo definido pela equipe.

---

## 🐶 O que o app faz

Um serviço **comunitário e gratuito**: o app apenas **conecta** as pessoas. Não há intermediação, pagamento nem agendamento; tutor e parceiro combinam tudo diretamente.

| Perfil       | Quem é                             | O que faz no app                                                    |
| ------------ | ---------------------------------- | ------------------------------------------------------------------- |
| **Tutor**    | Dono de cães e gatos               | Escolhe o serviço de que precisa e encontra parceiros na sua cidade |
| **Parceiro** | Cuidador autônomo, petshop, ONG... | Cadastra-se e indica quais serviços oferece                         |

**Serviços:**

- 🦮 **Passeio**: o parceiro busca o pet para passear.
- 🏠 **Visita**: o parceiro cuida do pet na casa do tutor.
- 🛏️ **Hospedagem**: o pet fica na casa ou no estabelecimento do parceiro.

### Histórias de usuário

- **Como dono de pet**, quero encontrar no app um cuidador cadastrado próximo da minha residência para vir à minha casa diariamente e cuidar do(s) meu(s) pet(s) até eu voltar.
- **Como cuidador**, quero me cadastrar para oferecer passeios periódicos de pets num raio de 5 km da minha residência.
- **Como dono de petshop**, quero me cadastrar para oferecer meus serviços de hospedagem de pets.

## 🎯 Escopo do MVP

**Incluído:**

- Perfil do **tutor**, sem login: os dados ficam salvos no próprio celular.
- Foto do tutor e de até **dois pets**, tiradas com a **câmera** do aparelho.
- Busca de parceiros **por cidade** e **por tipo de serviço**.
- Botão que abre uma conversa no **WhatsApp** com o parceiro escolhido.
- Regras de negócio desenvolvidas com **TDD**.

**Limitação assumida:** nesta versão de demonstração, os parceiros vêm de uma **base de exemplo embutida no app**. Não há servidor. A tela de cadastro de parceiro aparece apenas como **prévia**, indicando que o cadastro chega na próxima versão.

**Fora do escopo:** pagamentos, agendamentos, avaliações e verificação de parceiros.

## 🗺️ Próximas versões

- [ ] Backend real com **Supabase** e **cadastro de parceiros**: quem se cadastra aparece para todos os tutores
- [ ] Busca por **raio de distância** ajustável, a partir do CEP
- [ ] **Avaliações** e **verificação** dos parceiros, para dar mais confiança ao tutor

---

## 🧰 Stack

|              |                                                     |
| ------------ | --------------------------------------------------- |
| Framework    | React Native 0.86 + Expo SDK 57                     |
| Navegação    | Expo Router (cada arquivo em `src/app/` é uma tela) |
| Linguagem    | TypeScript 6 (modo `strict`)                        |
| Testes       | Jest + jest-expo                                    |
| Build do APK | EAS Build                                           |
| Ambiente     | Devcontainer (Node 24)                              |

## 📁 Estrutura

```
src/
  app/          → telas (somente telas: todo arquivo aqui vira uma rota)
  regras/       → regras de negócio (funções puras, desenvolvidas com TDD)
__tests__/      → testes automatizados, espelhando a estrutura de src/
```

Os testes **espelham o caminho** do código que testam:

```
src/regras/urgencia.ts   →   __tests__/regras/urgencia.test.ts
```

## 🛠️ Rodando localmente

**Requisitos:** Node.js 24 LTS e o app **Expo Go** no celular Android. O repositório também traz um **devcontainer** (`.devcontainer/`) com o ambiente pronto.

```bash
git clone https://github.com/marcusteixeirabr/pata-amiga.git
cd pata-amiga
npm ci
npm run check
npx expo start --tunnel   # escaneie o QR code com o Expo Go
```

## ✅ Testes e TDD

Cada regra de negócio nasce de um teste: **vermelho → verde → refatorar**.

```bash
npm run check        # typecheck + testes (rodar antes de cada commit)
npm run test:watch   # modo TDD: reexecuta os testes a cada salvamento
```

O Jest não verifica tipos; por isso o `check` roda o `tsc` **e** os testes.

## 🔀 Como contribuir

1. **Ninguém mexe direto no `main`.** O `main` é a versão oficial do app.
2. **Uma tarefa do Trello = um branch**, com nome no padrão `tipo/descricao-curta`:
   - `feat/cadastro-animal` · `test/score-urgencia` · `fix/filtro-cidade` · `docs/readme-equipe`
3. **Commits** no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
   - `feat:` funcionalidade · `test:` testes · `fix:` correção · `docs:` documentação · `chore:` configuração
4. Antes de abrir o PR, rode `npm run check`: **tudo verde**.
5. Abra um **Pull Request** para o `main`, com o link do card do Trello na descrição.
6. Outro integrante revisa e faz o merge.

## 👥 Equipe

Cada integrante adiciona o próprio nome **por meio de um Pull Request**. É a nossa primeira tarefa no GitHub.

- **Marcus Teixeira**: [@marcusteixeirabr](https://github.com/marcusteixeirabr)

- **Natasha Caroline da Silva Pereira**: [@NatashaPereira] (https://github.com/natashaPereira)

- **Carlos Martins Espinoza Filho**: [@carlosespinozagmm-bit] (https://github.com/carlosespinozagmc-bit)

- **Guilherme Bobany Tavares de Oliveira**: [guilhermebobanytavares-cmyk](https://github.com/guilhermebobanytavares-cmyk)

- **José Agostinho Renner da Silva**: [@AgostinhoRenner](https://github.com/AgostinhoRenner)

## 📄 Licença

[MIT](LICENSE)
