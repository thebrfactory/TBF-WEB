// Capa do story do CRIVO: o wordmark, na fonte e na cor do proprio deck.
// Sora 700, ls .015em, branco --text sobre --bg, os mesmos tokens do index.html
// do repo crivo-pitch. 1000x1000 como as outras capas de venture.
// O circulo do story corta os cantos: o wordmark ocupa 66% da largura para caber
// no quadrado seguro inscrito na roda.
import { chromium } from 'playwright';

const OUT = process.argv[2];
const html = `<!doctype html><meta charset=utf8>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@700&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;height:100%;}
  body{background:#0D1017; display:grid; place-items:center;}
  h1{margin:0; font:700 202px/1 "Sora",sans-serif; letter-spacing:.015em;
     color:#F3F5F8; -webkit-font-smoothing:antialiased;}
</style>
<h1>CRIVO</h1>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 500 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
// ajusta o corpo ate o wordmark ocupar ALVO da largura: o circulo do story corta
// os cantos, entao o que cabe e o quadrado inscrito, nao o quadro inteiro.
const ALVO = 0.66;
const w = await page.evaluate((alvo) => {
  const h = document.querySelector('h1');
  const atual = h.getBoundingClientRect().width;
  const corpo = parseFloat(getComputedStyle(h).fontSize);
  h.style.fontSize = (corpo * (500 * alvo) / atual) + 'px';
  return h.getBoundingClientRect().width;
}, ALVO);
console.log('largura do wordmark:', Math.round(w), 'de 500 =', Math.round(w / 5) + '%');
await page.screenshot({ path: OUT });
await browser.close();
