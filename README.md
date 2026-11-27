# 🐾 Pata Amiga

Aplicativo Android que conecta **donos de pets** a **cuidadores, petshops e ONGs da vizinhança**, para que nenhum animal fique sem atenção enquanto o tutor está fora, no Vale do Itajaí e na Grande Florianópolis (SC).

> ✅ **Versão 1.0.0 (MVP) entregue em novembro de 2026.** Projeto acadêmico do Projeto Integrador _Hands-on Work VIII_ do curso de Análise e Desenvolvimento de Sistemas da **UNIVALI**, desenvolvido com **TDD (Test-Driven Development)** e validado com 12 usuários da comunidade.

## 📲 Baixar o APK

O APK está na página de [releases](https://github.com/marcusteixeirabr/pata-amiga/releases/latest) do repositório. Para instalar, permita a instalação de apps de fontes desconhecidas no Android.

> ⚠️ Os parceiros do app são **fictícios**, e os números de WhatsApp deles também. Por isso, nesta versão pública, o botão "Chamar no WhatsApp" abre o WhatsApp, mas os números não pertencem a pessoas reais.

---

## 🐶 O que o app faz

Um serviço **comunitário e gratuito**: o app apenas **conecta** as pessoas. Não há intermediação, pagamento nem agendamento; tutor e parceiro combinam tudo diretamente.

| Perfil       | Quem é                             | O que faz no app                                                    |
| ------------ | ---------------------------------- | ------------------------------------------------------------------- |
| **Tutor**    | Dono de cães e gatos               | Escolhe o serviço de que precisa e encontra parceiros na sua cidade |
| **Parceiro** | Cuidador autônomo, petshop, ONG... | Cadastra-se e indica quais serviços oferece                         |

**Serviços:**

- 🦮 **Passeio**: o parceiro busca o pet para passear.
- 🏠 **Cuidados em casa**: o parceiro cuida do pet na casa do tutor.
- 🛏️ **Hospedagem**: o pet fica na casa ou no estabelecimento do parceiro.

### Histórias de usuário

- **Como dono de pet**, quero encontrar no app um cuidador cadastrado próximo da minha residência para vir à minha casa diariamente e cuidar do(s) meu(s) pet(s) até eu voltar.
- **Como cuidador**, quero me cadastrar para oferecer passeios periódicos de pets num raio de 5 km da minha residência.
- **Como dono de petshop**, quero me cadastrar para oferecer meus serviços de hospedagem de pets.

## 🎯 Escopo do MVP

**Incluído:**

- Perfil do **tutor**, sem login: os dados ficam salvos no próprio celular.
- Foto do tutor (pela **câmera** ou pela **galeria**) e de até **dois pets**.
- Busca de parceiros **por cidade** e **por tipo de serviço**.
- Botão que abre uma conversa no **WhatsApp** com o parceiro escolhido.
- **Nota e selo fictícios** dos parceiros, com um aviso de que os dados são de demonstração.
- Regras de negócio desenvolvidas com **TDD**.

**Limitação assumida:** nesta versão de demonstração, os parceiros vêm de uma **base de exemplo embutida no app**. Não há servidor. A tela de cadastro de parceiro aparece apenas como **prévia**, indicando que o cadastro chega na próxima versão.

**Fora do escopo:** pagamentos, agendamentos, avaliações e verificação de parceiros.

**Não entregue na v1:** as fotos do tutor e dos pets no topo do painel de busca (RF09). Ficou para a próxima versão.

## 🗺️ Próximas versões

- [ ] Backend real com **Supabase** e **cadastro de parceiros**: quem se cadastra aparece para todos os tutores
- [ ] Busca por **raio de distância** ajustável, a partir do CEP
- [ ] **Avaliações** feitas pelos tutores e a **verificação real**
- [ ] **Fotos do tutor e dos pets** no topo do painel de busca (RF09)
- [ ] **Histórico** dos parceiros contatados
- [ ] Opções de **enviar ou editar** a foto do perfil antes do recorte

---

## 🧰 Stack

|              |                                                     |
| ------------ | --------------------------------------------------- |
| Framework    | React Native 0.86 + Expo SDK 57                     |
| Navegação    | Expo Router (cada arquivo em `src/app/` é uma tela) |
| Linguagem    | TypeScript 6 (modo `strict`)                        |
| Testes       | Jest + jest-expo + React Native Testing Library 14  |
| Build do APK | EAS Build                                           |
| Ambiente     | Devcontainer (Node 24)                              |

## 📁 Estrutura

```
src/
  app/            → telas (somente telas: todo arquivo aqui vira uma rota)
  components/     → componentes visuais reutilizáveis
  dados/          → dados fixos do app (parceiros fictícios)
  estilos/        → estilos compartilhados entre as telas
  hooks/          → hooks reutilizáveis (ex.: voltar duas vezes para sair)
  modelos/        → contratos de dados e o serviço que grava o perfil no celular
  regras/         → regras de negócio (funções puras, desenvolvidas com TDD)
  utils/          → utilitários (ex.: gravar as fotos no celular)
```

Os testes **espelham o caminho** do código que testam:

```
src/regras/gerarIniciais.ts   →   __tests__/regras/gerarIniciais.test.ts
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

## 📦 Gerando o APK

O APK é gerado na nuvem pelo **EAS Build**. O perfil `preview` do `eas.json` gera um APK para instalar direto no celular.

```bash
npm install -g eas-cli
eas whoami                                 # confere a conta
eas build -p android --profile preview     # gera o APK (leva alguns minutos)
```

No fim, o EAS mostra um link e um QR code para baixar o APK.

## 🧯 Problemas comuns

**Expo Go: "Failed to download remote update".** O celular não alcança o computador. Rode `npx expo start --tunnel`, ou libere o Node.js no firewall do Windows (rede privada) e confira se os dois estão na mesma rede Wi-Fi.

**`eas login` trava no devcontainer** (o botão de aprovar fica girando). O navegador não consegue devolver a resposta para dentro do container. Crie um token em expo.dev → Access tokens e use:

```bash
read -rs EXPO_TOKEN && export EXPO_TOKEN
```

Nunca coloque o token em arquivo do repositório público.

**Aviso "missing the required default export".** Existe em `src/app/` um arquivo que não é tela. Mova-o para fora (por exemplo, `src/estilos/` ou `src/components/`).

## ✅ Testes e TDD

Cada regra de negócio nasce de um teste: **vermelho → verde → refatorar**.

- **Jest** (com o preset `jest-expo`): executa os testes. As regras de negócio são funções puras e são testadas só com ele.
- **React Native Testing Library 14**: desenha as telas em memória, sem celular nem emulador, e permite buscar o que o usuário vê (textos, botões) e simular toques e digitação. Na versão 14, `render` e `fireEvent` são assíncronos: use `await`.
- **test-renderer**: motor que a Testing Library usa por baixo. A versão acompanha a do React (React 19.2 → test-renderer 1.2); ao atualizar o React, atualize os dois juntos.

```bash
npm run check        # typecheck + testes (rodar antes de cada commit)
npm run test:watch   # modo TDD: reexecuta os testes a cada salvamento
```

O Jest não verifica tipos; por isso o `check` roda o `tsc` **e** os testes.

Na versão 1.0.0 são **716 testes em 25 arquivos**, todos aprovados, com **100% de cobertura** nas regras de negócio. Para ver o relatório de cobertura:

```bash
npx jest --coverage
```

## 🔀 Como contribuir

1. **Ninguém mexe direto no `main`.** O `main` é a versão oficial do app.
2. **Uma tarefa do Trello = um branch**, com nome no padrão `tipo/descricao-curta`:
   - `feat/busca-parceiros` · `test/link-whatsapp` · `fix/bugs-teste-aceitacao` · `docs/readme-equipe`
3. **Commits** no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):
   - `feat:` funcionalidade · `test:` testes · `fix:` correção · `docs:` documentação · `chore:` configuração
4. Antes de abrir o PR, rode `npm run check`: **tudo verde**.
5. Abra um **Pull Request** para o `main`, com o link do card do Trello na descrição.
6. De preferência, outro integrante revisa antes do merge. Quando o merge for feito sem revisão, registre isso na mensagem do merge.

## 👥 Equipe

Cada integrante adiciona o próprio nome **por meio de um Pull Request**. É a nossa primeira tarefa no GitHub.

- **Marcus Teixeira**: [@marcusteixeirabr](https://github.com/marcusteixeirabr)

- **Natasha Caroline da Silva Pereira**: [@NatashaPereira](https://github.com/natashaPereira)

- **Carlos Martins Espinoza Filho**: [@carlosespinozagmc-bit](https://github.com/carlosespinozagmc-bit)

- **Guilherme Bobany Tavares de Oliveira**: [@guilhermebobanytavares-cmyk](https://github.com/guilhermebobanytavares-cmyk)

- **José Agostinho Renner da Silva**: [@AgostinhoRenner](https://github.com/AgostinhoRenner)

## 📄 Licença

[MIT](LICENSE)
