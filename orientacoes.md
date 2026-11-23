# Revisão Programação Web - Next.js

**App: Pokédex** - mostra os 151 Pokémon da primeira geração, com busca pelo nome, filtro por tipo e uma janela com os detalhes de cada um. Os dados vêm da [PokéAPI](https://pokeapi.co) (gratuita, sem chave).

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000. É preciso ter o Node.js 20.9 ou mais novo.

Ao abrir, aparece uma tela de carregamento (uma Poké Bola). Na primeira vez ela demora alguns segundos, porque o servidor baixa os 151 Pokémon. Depois eles ficam guardados em cache.

### Sem internet

Se a internet ou a PokéAPI não estiverem funcionando, troque `USE_MOCK` para `true` em `src/api.ts`. O app passa a usar os dados salvos em `src/mock.ts` e as imagens da pasta `public/sprites`, e funciona sem internet.

### Onde aparecem os erros

- **na própria página**: o botão vermelho **"Issues"** no canto inferior esquerdo abre a janela de erros do Next.js;
- **no console do navegador**: F12 → aba Console;
- **no terminal** onde o `npm run dev` está rodando.

## Estrutura

As páginas ficam em `src/app` (o nome da pasta vira o endereço). As telas seguem MVVM: cada tela tem uma View (`*Screen.tsx`) e um ViewModel (`use*ViewModel.ts`) com o estado e a lógica.

```
src/app/layout.tsx                          -> layout de todas as páginas: busca a lista e mostra a tela de carregamento
src/app/page.tsx                            -> página "/": só a lista, sem janela aberta
src/app/pokemon/[id]/page.tsx               -> página "/pokemon/25": abre a janela do Pokémon da URL
src/api.ts                                  -> Model: tipos e busca dos dados (PokéAPI ou mock)
src/mock.ts                                 -> dados salvos dos 151 Pokémon (não altere)
src/utils.ts                                -> formatação (número, nome, altura, peso) e tabelas de tipos e status
src/modules/pokedex/PokedexScreen.tsx       -> View da lista (busca, filtro por tipo, cards e "Ver mais")
src/modules/pokedex/usePokedexViewModel.ts  -> ViewModel da lista
src/modules/pokemon/PokemonScreen.tsx       -> View da janela de detalhes
src/modules/pokemon/usePokemonViewModel.ts  -> ViewModel da janela
src/components/LoadingScreen.tsx            -> tela de carregamento
src/components/Modal.tsx                    -> janela por cima da lista (fundo escuro + botão ✕)
src/components/PokemonCard.tsx              -> card de um Pokémon na lista
src/components/TypeBadge.tsx                -> etiqueta colorida de um tipo
src/components/InfoBox.tsx                  -> caixa com título e valor (altura, peso...)
src/components/AbilityList.tsx              -> lista de habilidades
src/components/StatBar.tsx                  -> barra de um status base
src/components/Pokeball.tsx                 -> desenho da Poké Bola
public/sprites/                             -> imagens salvas (usadas pelo mock)
```

Como as partes se encaixam:

- O `layout.tsx` baixa os 151 Pokémon no servidor. Enquanto isso, mostra a `LoadingScreen`. Quando a lista chega, passa os Pokémon para a `PokedexScreen` por props.
- A lista mostra 24 Pokémon por vez. O botão **"Ver mais"** mostra mais 24.
- Ao clicar em um card, o endereço muda para `/pokemon/6` e a janela abre por cima da lista. Ao fechar, a lista continua do mesmo jeito (busca, filtro e posição).
- A janela busca o Pokémon com `useEffect` (`usePokemonViewModel.ts`).

Cada componente tem o seu arquivo `.module.css`, com as classes já prontas (`styles.badge`, `styles.fill`...).

## Regras

- Não altere `src/mock.ts`.
- Não instale bibliotecas.
- Não renomeie arquivos, pastas, funções ou componentes.
- Não é preciso alterar os arquivos `.css`: todas as classes usadas nas questões já existem.
- No final, o app deve abrir sem erros e sem avisos na página, no console do navegador e no terminal.

---

## Parte 1 - Corrigir erros

Encontre a causa de cada problema e corrija.

### Questão 01 - Campo de busca não aceita texto (`src/modules/pokedex/PokedexScreen.tsx`)

Ao digitar em "Buscar Pokémon pelo nome", nada aparece no campo, e aparece o aviso _"You provided a `value` prop to a form field without an `onChange` handler."_

Faça o texto aparecer e filtrar a lista. Esperado: ao digitar `char`, sobram **Charmander**, **Charmeleon** e **Charizard**.

Dica: o `<input>` é controlado pelo `value`. Para o texto mudar, é preciso atualizar o estado a cada tecla.

### Questão 02 - Filtro por tipo não funciona (`src/modules/pokedex/usePokedexViewModel.ts`)

Ao clicar em um tipo, como **"Fogo"**, o botão fica colorido, mas nenhum card aparece. Em **"Dragão"**, aparecem só Dragonair e Dragonite. O filtro deve mostrar os Pokémon que **têm** o tipo escolhido.

Esperado: "Fogo" → **12 Pokémon** (Charmander, Charmeleon, Charizard, Vulpix...); "Dragão" → **Dratini**, **Dragonair** e **Dragonite**; "Todos" → todos de novo.

Dica: cada Pokémon tem a lista `types` (ex.: `["fire", "flying"]`), e `selectedType` guarda o tipo escolhido (ex.: `"fire"`).

### Questão 03 - Contador sempre em 151 (`src/modules/pokedex/PokedexScreen.tsx`)

No canto da barra de cima, o texto mostra sempre **151 Pokémon**. Ao buscar `char`, aparecem 3 cards, e ao clicar em "Fogo", aparecem 12, mas o texto continua 151. Ele deve mostrar quantos Pokémon passam na busca e no filtro.

Esperado: busca `char` → **3 Pokémon**; tipo "Fogo" → **12 Pokémon**; "Todos" sem busca → **151 Pokémon** (mesmo com só 24 cards na tela).

Dica: o ViewModel devolve três listas:

- `pokemons`: todos os 151;
- `filteredPokemons`: os que passam na busca e no filtro de tipo;
- `visiblePokemons`: os que já estão desenhados na tela (por causa do "Ver mais").

### Questão 04 - Mensagem de lista vazia invertida (`src/modules/pokedex/PokedexScreen.tsx`)

Ao abrir o app, aparece **"Nenhum Pokémon encontrado."** em cima dos cards. E ao buscar `zzz`, a lista fica vazia, mas a mensagem **não** aparece.

A mensagem deve aparecer **só** quando nenhum Pokémon for encontrado.

### Questão 05 - Janela presa em "Carregando" (`src/modules/pokemon/usePokemonViewModel.ts`)

Ao clicar em um card, a janela fica presa em **"Carregando Pokémon..."**. O console mostra `Carregando Pokémon 6` sem parar e aparece o erro _"Maximum update depth exceeded"_.

Carregue o Pokémon **uma vez** ao abrir a janela, e de novo só quando o `id` mudar.

Observação: no modo de desenvolvimento, `Carregando Pokémon 6` aparecer **2 vezes** é normal. O React roda os efeitos duas vezes de propósito, para ajudar a achar erros.

### Questão 06 - Total dos status errado (`src/modules/pokemon/PokemonScreen.tsx`)

Depois da Questão 05: a janela do Charizard mostra **Total 100**, mas os status dele são 78, 84, 78, 109, 85 e 100, que somam **534**. O total está saindo igual ao último status.

Esperado: Bulbasaur → **318**; Charizard → **534**; Mew (Nº 151) → **600**.

Dica: a cada volta do `for`, o total precisa **somar** o status ao valor que já tinha.

### Questão 07 - Botão Shiny não funciona (`src/modules/pokemon/usePokemonViewModel.ts`)

Ao clicar em **"✨ Shiny"**, nada acontece. Ao clicar, a imagem deve trocar para a versão shiny (o Charizard fica preto) e o botão deve ficar dourado. Clicando de novo, volta ao normal.

Dica: `toggleShiny` deve **inverter** o valor de `shiny` (`true` vira `false` e `false` vira `true`).

---

## Parte 2 - Criar componentes

Procure os comentários `// TODO Questão NN` no código. Hoje cada componente retorna `null`. As classes CSS de cada um já estão prontas no `.module.css` ao lado dele.

### Questão 08 - Componente TypeBadge (`src/components/TypeBadge.tsx`)

Os cards e a janela aparecem sem os tipos. O componente recebe `type` (ex.: `"grass"`). Mostre um `<span>` com:

- a classe `styles.badge`;
- o nome do tipo em português: `typeInfo(type).label`;
- a cor de fundo do tipo: `typeInfo(type).color`.

Esperado: Bulbasaur → **PLANTA** (verde) e **VENENOSO** (roxo); Charizard → **FOGO** (laranja) e **VOADOR** (lilás). O CSS já deixa o texto em maiúsculas.

Dica: a cor de fundo vai no `style`: `style={{ backgroundColor: "red" }}`.

### Questão 09 - Componente InfoBox (`src/components/InfoBox.tsx`)

Na janela, Altura, Peso e Exp. base não aparecem. O componente recebe `label` e `value`. Mostre, dentro de um `<div>` com a classe `styles.box`:

- o `label`, num `<span>` com a classe `styles.label`;
- o `value`, num `<span>` com a classe `styles.value`.

Esperado: Charizard → **ALTURA 1,7 m**, **PESO 90,5 kg**, **EXP. BASE 240**.

### Questão 10 - Componente AbilityList (`src/components/AbilityList.tsx`)

A seção "Habilidades" da janela está vazia. O componente recebe a lista `abilities` (ex.: `["blaze", "solar-power"]`). Dentro de um `<div>` com a classe `styles.list`, mostre cada habilidade num `<span>` com a classe `styles.pill`, com o nome formatado por `formatName`.

Esperado: Charizard → **Blaze** e **Solar Power**; Mr Mime (Nº 122) → **Soundproof**, **Filter** e **Technician**. Sem o aviso _"Each child in a list should have a unique "key" prop"_.

Dica: `abilities.map(...)`.

### Questão 11 - Componente StatBar (`src/components/StatBar.tsx`)

A seção "Status base" mostra só o total. O componente recebe um `stat` (ex.: `{ name: "hp", value: 78 }`). Mostre, numa linha (`<div>` com a classe `styles.row`):

- o nome do status em português, com `statInfo(stat.name).label` (classe `styles.label`);
- o valor, `stat.value` (classe `styles.value`);
- a barra: um trilho cinza (`<div>` com a classe `styles.track`) com um preenchimento dentro (`<div>` com a classe `styles.fill`), na cor `statInfo(stat.name).color`. A largura do preenchimento é `stat.value / MAX_STAT`, em %.

Esperado: em Charizard, a barra de **Atq. Especial (109)** ocupa cerca de 43% do trilho; em Chansey (Nº 113), a barra de **HP (250)** fica quase cheia.

Dica: um estilo pode ser calculado na hora:

```tsx
<div style={{ width: `${percent}%`, backgroundColor: "red" }} />
```
