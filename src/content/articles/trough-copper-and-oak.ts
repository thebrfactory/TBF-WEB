// =============================================================================
// CONTEÚDO: "TROUGH, COPPER & OAK." / "COCHO, COBRE E CARVALHO."
// Série UMA DOSE DE CERRADO BAIANO (A SHOT OF BAHIAN CERRADO), 2 de 3 na ordem
// de lançamento (a ordem da série é visita, processo, história).
//
// PROCEDÊNCIA. Investigação JORNADAZED em
// `_SHARED/JORNADAZED/investigacoes/2026-10-26-cotegipana-cachaca-cerrado-baiano`,
// texto revisado em `10-texto-leitura.md` (26/10/2026). O milho torrado e os
// marimbondos são relato do fundador, confirmado em 26/10/2026, 19:17.
//
// 🔴 O dono fica sem nome e sem fala direta (decisão do fundador). "Pé de
// cocho" é o nome que ELE deu ao fermento; o texto não diz que o nome é dele
// em sentido de marca, só que não está escrito em lugar nenhum.
//
// FOTOGRAFIA. Do fundador. `pair` só onde as duas peças são a mesma coisa vista
// de dois jeitos (regra de types.ts). Ver `public/images/editorial/cotegipe/_CREDITOS.md`.
// =============================================================================

import type { ManifestoArticle } from './types'

const CREDITO = 'TAVARÍSTICO / .TBF. inc'
const F = '/images/editorial/cotegipe'

export const troughCopperAndOak: ManifestoArticle = {
  slug: 'trough-copper-and-oak',
  loaderTitle: { en: 'TROUGH, COPPER & OAK', pt: 'COCHO, COBRE E CARVALHO' },
  heroTitle: {
    en: 'TROUGH, COPPER & OAK.',
    pt: 'COCHO, COBRE E CARVALHO.',
  },
  heroSubtitle: {
    en: 'Field notes from a mill in Cotegipe, Bahia: from the cane field to the barrel, by way of the starter the owner calls pé de cocho.',
    pt: 'Notas de campo de um engenho em Cotegipe, Bahia: do canavial ao barril, passando pelo fermento que o dono chama de pé de cocho.',
  },
  category: 'Field Research',
  publishedAt: '2026-11-30',
  deck: {
    en: 'Science describes the method in papers and theses. The name the owner gives it I could not find written anywhere.',
    pt: 'A ciência descreve o método em artigo e tese. O nome que o dono dá a ele eu não achei escrito em lugar nenhum.',
  },
  cover: {
    src: `${F}/moenda.webp`,
    alt: {
      en: 'The red cane press at the mill, its green gears exposed.',
      pt: 'A moenda vermelha do engenho, com as engrenagens verdes à mostra.',
    },
    credit: '.TBF. inc',
  },
  ogImage: `${F}/og-moenda.jpg`,

  heroBelt: {
    en: 'A SHOT OF BAHIAN CERRADO, 2 of 3. Cotegipe, Bahia, from juice to barrel.',
    pt: 'UMA DOSE DE CERRADO BAIANO, 2 de 3. Cotegipe, Bahia, do caldo ao barril.',
  },

  sources: [
    {
      label: {
        en: 'Ceccato-Antonini et al., fermento caipira, Ciência e Tecnologia de Alimentos, 2010.',
        pt: 'Ceccato-Antonini e outros, fermento caipira, Ciência e Tecnologia de Alimentos, 2010.',
      },
      url: 'https://www.redalyc.org/pdf/3959/395940101037.pdf',
    },
    {
      label: {
        en: 'Gabriel, 2010 UFSCar thesis on fermento caipira and ageing.',
        pt: 'Gabriel, tese de 2010 na UFSCar sobre fermento caipira e envelhecimento.',
      },
      url: 'https://repositorio.ufscar.br/handle/ufscar/64',
    },
  ],

  blocks: [
    {
      kind: 'pinned',
      kicker: { en: 'COTEGIPE, BAHIA, BRAZIL', pt: 'COTEGIPE, BAHIA, BRASIL' },
      text: {
        en: 'The owner showed us everything, from the very beginning.',
        pt: 'O dono mostrou tudo, desde o começo.',
      },
    },

    // ─── A CANA.
    { kind: 'word', label: { en: 'THE CANE', pt: 'A CANA' }, theme: 'dark' },
    {
      kind: 'pair',
      ratio: '3 / 2',
      items: [
        {
          src: `${F}/cana-cortada-1.webp`,
          alt: {
            en: 'Cut sugarcane piled on the ground, close up.',
            pt: 'Cana cortada amontoada no chão, de perto.',
          },
          caption: { en: 'The cut cane.', pt: 'A cana cortada.' },
          credit: CREDITO,
        },
        {
          src: `${F}/cana-cortada-2.webp`,
          alt: {
            en: 'The same pile of cut cane, from a little further back.',
            pt: 'O mesmo monte de cana cortada, um pouco mais de longe.',
          },
          credit: CREDITO,
        },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The cane goes into the red press. Out comes the juice.', pt: 'A cana vai para a moenda vermelha. Dali sai o caldo.' },
      ],
    },

    // ─── O COCHO.
    { kind: 'word', label: { en: 'THE TROUGH', pt: 'O COCHO' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'The real beginning, he called pé de cocho.', pt: 'O começo de verdade ele chamou de pé de cocho.' },
        { en: 'Corn, toasted and ground, he explained, left to ferment in cane juice.', pt: 'Milho torrado e moído, explicou, fermentando no caldo da cana.' },
      ],
      emphasize: [0],
    },
    {
      kind: 'pair',
      ratio: '2 / 3',
      items: [
        {
          src: `${F}/fermento-tambor.webp`,
          alt: {
            en: 'Golden starter foaming inside a blue drum.',
            pt: 'Fermento dourado espumando dentro de um tambor azul.',
          },
          caption: { en: 'The starter, in the drum.', pt: 'O fermento, no tambor.' },
          credit: CREDITO,
        },
        {
          src: `${F}/fermento-panela.webp`,
          alt: {
            en: 'The same starter in a steel pot.',
            pt: 'O mesmo fermento numa panela de inox.',
          },
          caption: { en: 'And in the pot.', pt: 'E na panela.' },
          credit: CREDITO,
        },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The corn sat there until it turned into something else.', pt: 'O milho ficava ali até virar outra coisa.' },
        { en: 'By the end it was so sweet that wasps and bees hovered all around it.', pt: 'No fim, era tão doce que havia marimbondos e abelhas em volta.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'I went looking for the name afterwards, in papers and theses.', pt: 'Fui atrás do nome depois, em artigo e em tese.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'The literature describes the same gesture under another name, fermento caipira: cane juice and ground corn, fed every day for five to seven days, with the yeast already living in the juice, the equipment and the vats.', pt: 'A literatura descreve o mesmo gesto com outro nome, fermento caipira: caldo de cana e milho moído, alimentados todo dia por cinco a sete dias, com a levedura que já vive no caldo, no equipamento e nas dornas.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'A paper from UFSCar, the federal university of São Carlos, credits the flavour of the drink to those wild yeasts, and even to bacteria.', pt: 'Um artigo da UFSCar atribui o sabor da bebida a essas leveduras selvagens, e até a bactérias.' },
        { en: 'The same paper notes the cost: with that many contaminants, quality is hard to control.', pt: 'O mesmo artigo anota o custo: com tanto contaminante, a qualidade é difícil de controlar.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'Pé de cocho I found written nowhere.', pt: 'Pé de cocho eu não achei escrito em lugar nenhum.' },
      ],
      emphasize: [0],
    },
    {
      kind: 'fullbleed',
      text: { en: 'The recipe lives with whoever makes it.', pt: 'A receita está com quem faz.' },
      theme: 'dark',
    },

    // ─── O COBRE.
    { kind: 'word', label: { en: 'THE COPPER', pt: 'O COBRE' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'After the starter comes the copper still.', pt: 'Depois do fermento, o alambique de cobre.' },
      ],
    },
    {
      kind: 'pair',
      ratio: '3 / 2',
      items: [
        {
          src: `${F}/alambique-frente.webp`,
          alt: {
            en: 'The copper still head on, its dome and column in the dark.',
            pt: 'O alambique de cobre de frente, a cúpula e a coluna no escuro.',
          },
          caption: { en: 'Copper, head on.', pt: 'O cobre, de frente.' },
          credit: CREDITO,
        },
        {
          src: `${F}/alambique-perfil.webp`,
          alt: {
            en: 'The same still in profile, the column and the pipe to the condenser.',
            pt: 'O mesmo alambique de perfil, a coluna e o cano para o condensador.',
          },
          caption: { en: 'And in profile.', pt: 'E de perfil.' },
          credit: CREDITO,
        },
      ],
    },

    // ─── O CARVALHO.
    { kind: 'word', label: { en: 'THE OAK', pt: 'O CARVALHO' }, theme: 'dark' },
    {
      kind: 'lines',
      lines: [
        { en: 'After the still, the tanks and the barrels.', pt: 'Depois do alambique, os tanques e os barris.' },
        { en: 'This is where Ouro Especial comes from, aged in oak, 45%.', pt: 'É dali que sai a Ouro Especial, envelhecida em carvalho, 45%.' },
      ],
    },
    {
      kind: 'lines',
      lines: [
        { en: 'In a 2010 thesis at the same university, cachaças made with fermento caipira came out of the oak smelling different from those made with commercial yeast.', pt: 'Numa tese de 2010, na mesma universidade, as cachaças de fermento caipira saíram do carvalho com aroma diferente das de fermento comercial.' },
        { en: 'All of them within the law.', pt: 'Todas dentro da lei.' },
      ],
    },
    {
      kind: 'pair',
      ratio: '2 / 3',
      items: [
        {
          src: `${F}/barris-1.webp`,
          alt: {
            en: 'Oak barrels on a rack, with red valves and hoses.',
            pt: 'Barris de carvalho na estante, com registros vermelhos e mangueiras.',
          },
          caption: { en: 'Oak barrels.', pt: 'Barris de carvalho.' },
          credit: CREDITO,
        },
        {
          src: `${F}/barris-2.webp`,
          alt: {
            en: 'The same rack of barrels, from another angle.',
            pt: 'A mesma estante de barris, de outro ângulo.',
          },
          credit: CREDITO,
        },
      ],
    },
    {
      kind: 'image',
      src: `${F}/bagaco.webp`,
      alt: {
        en: 'Dry bagasse piled up, pale stalks crossing each other.',
        pt: 'Bagaço seco amontoado, talos claros cruzados.',
      },
      caption: {
        en: 'Bagasse, what is left of the cane.',
        pt: 'O bagaço, o que sobra da cana.',
      },
      credit: CREDITO,
      variant: 'plate',
      width: 1365,
      height: 2048,
    },
    {
      kind: 'closing',
      text: {
        en: 'The bagasse stays at the mill. So does the name of the starter.',
        pt: 'O bagaço fica no engenho. O nome do fermento também.',
      },
    },
  ],
}
