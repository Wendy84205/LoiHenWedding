import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

const html = readFileSync('/tmp/t63_live/rendered.html', 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

const items = [];
doc.querySelectorAll('[contenteditable="false"]').forEach((el) => {
  const cls = el.className || '';
  const text = el.textContent || '';
  if (text.trim().length > 0) {
    items.push({ cls: cls.slice(0, 80), text: text.trim().slice(0, 120) });
  }
});

console.log(JSON.stringify(items, null, 2));
