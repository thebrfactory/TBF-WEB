# Créditos e procedência das imagens, artigo "Brazilian Country Side"

## capa.webp

O que é: capa provisória SEM TEXTO. Campo escuro em gradiente (#1A1816 a
#0A0A0A), um filete âmbar (`--tbf-color-amber` #FF6500) e uma régua fina cinza.
1600 × 2100 px, 7 KB.

🔴 **O TEXTO SAIU DA CAPA em 10/09/2026, no QA visual.** A primeira versão trazia
o título em corpo grande, e o hero da matéria desenha o `<h1>` POR CIMA da capa:
o resultado era o mesmo título duas vezes, sobreposto e ilegível, no mobile e no
desktop. A segunda versão trocou o título pela marca da série, e o choque
continuou, menor. Capa de hero não carrega texto nenhum: quem escreve o título
é o hero.

Gerada por comando local (ImageMagick), sem foto e sem banco de imagem de
terceiro.

**NÃO é fotografia. NÃO é a capa final.** É placeholder para a matéria não subir
sem capa nenhuma.

🔴 **A CAPA CONTINUA PROVISÓRIA.** O fundador está desenhando a capa real no
Photoshop (doc `DOPAMINE ARTICLE thumbs`, pranchetas 1920x1280 e 1200x630).
Quando ela sair, substituir `capa.webp` e ligar o campo `ogImage`.

## 01 a 15: fotografia de campo (10/09/2026)

**Autor: TAVARÍSTICO (.TBF. inc).** Fotografia própria, feita em Posse (GO)
em 24 de maio, no mesmo campo que o texto descreve. Não há licença de terceiro
envolvida: o crédito `TAVARÍSTICO / .TBF. inc` em cada bloco é autoria, não
atribuição obrigatória de CC.

Origem dos arquivos: `/Volumes/TAV05/0. TBF inc/RAW/TBF GOIÁS COOLHUNTING
PACK/SAÍDA` (JPEG de câmera, 1365x2048 na maioria, um 6000x4000 e um panorama
2048x835).

Conversão (ImageMagick, 10/09/2026): WebP `q82`, `method=6`, metadados
removidos, largura limitada a 1920 px e nada foi ampliado. O teto de 1920 vem
do `deviceSizes` do `next.config.ts`: acima disso o `next/image` nunca gera
recorte, então o byte a mais nunca chega em tela. Os verticais couberam
nativos (1365 px de largura), só o `_MG_0645` e o panorama foram reduzidos.

| arquivo | fonte | o que é |
|---|---|---|
| `01-bandeira-do-divino.webp` | `_MG_0630` | a bandeira de fitas da Folia |
| `02-sanfona.webp` | `_MG_0580` | sanfoneiro no meio da festa |
| `03-palhaco-ao-volante.webp` | `_MG_0652` | palhaço ao volante do carro rosa |
| `04-palhaco-no-rallye.webp` | `_MG_0662` | palhaço em pé na porta do carro branco |
| `05-cavaleiro-silhueta.webp` | `_MG_0731` | cavaleiro em silhueta contra o céu |
| `06-mouro-azul-montado.webp` | `_MG_0737` | mouro de azul, montado (par) |
| `07-mouro-azul-cavalo.webp` | `_MG_0774` | o mesmo mouro, a pé (par) |
| `08-cavalhada-panorama.webp` | `_MG_0783.CR2` (revelado do RAW em 08/10/2026, sem o HDR da SAÍDA; recorte na faixa dos cavaleiros) | panorama da fila de cavaleiros (`plate`) |
| `09-cristao-vermelho-frente.webp` | `_MG_0748` | cristão de vermelho, de frente (par) |
| `10-cristao-vermelho-costas.webp` | `_MG_0747` | a mesma fantasia, por trás (par) |
| `11-cristaos-retrato.webp` | `_MG_0771` | a companhia esperando (par) |
| `12-cristaos-cavalos.webp` | `_MG_0773` | a companhia com os cavalos (par) |
| `13-mascara-no-carro.webp` | `_MG_0790` | jovem vestindo a máscara |
| `14-calca-de-bolinhas.webp` | `_MG_0769` | tênis por baixo da fantasia |
| `15-entardecer.webp` | `_MG_0786` | a procissão no fim do dia |

O `_MG_0645` (carro rosa com os palhaços em cima) NÃO entrou no corpo: é a foto
que o fundador está usando na capa, no Photoshop. Repetir capa dentro da
matéria é a coisa que mais denuncia acervo curto.
