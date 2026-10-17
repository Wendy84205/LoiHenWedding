import { readFileSync, writeFileSync } from 'fs';

const json = readFileSync('/tmp/t63_live/template-data.json', 'utf8');
const data = JSON.parse(json);
const b64 = data.templateData;
const decoded = Buffer.from(b64, 'base64').toString('utf8');
writeFileSync('/tmp/t63_live/template-data-decoded.json', decoded, 'utf8');
console.log('Decoded JSON length:', decoded.length);
console.log(decoded.slice(0, 1500));
