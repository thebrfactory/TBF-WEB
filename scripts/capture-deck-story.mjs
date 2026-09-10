// Gerador dos quadros de story do CRIVO (1080x1920) a partir de ~/Desktop/CRIVO/deck-v3.html.
// Viewport mobile REAL (540x960 @2x): o deck e responsivo, entao a slide PREENCHE o quadro.
// Print de desktop colado no meio de tela vertical foi o erro que isto conserta (10/09/2026).
// uso: node scripts/capture-deck-story.mjs <pasta-de-saida> <indice da slide>...

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const SRC = process.env.HOME + '/Desktop/CRIVO/deck-v3.html';
const OUT = process.argv[2];
const SLIDES = process.argv.slice(3).map(Number);

// tira o preambulo de artifact (frame-runtime + base href), que nao existe fora do claude.ai
let html = fs.readFileSync(SRC, 'utf8');
html = html.replace(/<!-- frame-runtime -->[\s\S]*?<!-- \/frame-runtime -->/, '');
html = html.replace(/<base href="[^"]*">/, '');
const tmp = path.join(OUT, '_deck-limpo.html');
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(tmp, html);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 540, height: 960 },   // 1080x1920 com dsf 2
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);           // fontes + blobs do fundo

// chrome de interacao nao existe em story estatico
await page.addStyleTag({ content: '.navb,.hint{display:none!important} .slide{transition:none!important}' });

for (const n of SLIDES) {
  const label = await page.evaluate((i) => {
    const ss = [...document.querySelectorAll('.slide')];
    ss.forEach((s, k) => s.classList.toggle('active', k === i));
    const rail = document.querySelector('.rail i');
    if (rail) rail.style.width = ((i + 1) / ss.length * 100) + '%';
    const c = document.querySelector('.count');
    if (c) c.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(ss.length).padStart(2, '0');
    return ss[i].getAttribute('aria-label');
  }, n);
  await page.waitForTimeout(600);
  const f = path.join(OUT, `slide-${String(n).padStart(2, '0')}.png`);
  await page.screenshot({ path: f });
  console.log(`${n}\t${label}\t${f}`);
}
await browser.close();
