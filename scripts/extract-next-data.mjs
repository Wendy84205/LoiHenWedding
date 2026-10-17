import { readFileSync } from 'fs';

const html = readFileSync('/tmp/t63_live/rendered.html', 'utf8');
const idx = html.indexOf('<script id="__NEXT_DATA__"');
if (idx === -1) {
  console.error('No __NEXT_DATA__ found');
  process.exit(1);
}
const start = html.indexOf('>', idx) + 1;
const end = html.indexOf('</script>', start);
const json = html.slice(start, end);
let data;
try {
  data = JSON.parse(json);
} catch (e) {
  console.error('Parse error:', e.message);
  console.error('JSON snippet:', json.slice(0, 500));
  process.exit(1);
}

const templateData = data.props.pageProps.templateData || {};
console.log(JSON.stringify(templateData, null, 2));
