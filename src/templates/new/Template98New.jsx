import React from 'react';
import { CompactFormalTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-98',
  family: 'formal',
  groom: 'Hải Nam',
  bride: 'Mỹ Linh',
  date: '2027-10-18T10:30:00+07:00',
  accent: '#b49d53',
  paper: '#153823',
  ink: '#efe4b9',
  font: 'OpenSans',
  script: 'Lobster',
  intro: true,
};

export default function Template98New() {
  return <CompactFormalTemplate config={config} />;
}
