import React from 'react';
import { RedPopTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-88',
  family: 'redpop',
  groom: 'Quốc Bảo',
  bride: 'Ngọc Mai',
  date: '2027-08-26T10:30:00+07:00',
  accent: '#8e1018',
  paper: '#fffdf8',
  ink: '#3b2525',
  font: 'Cinelove Times',
  script: 'Signora',
  intro: true,
};

export default function Template88New() {
  return <RedPopTemplate config={config} />;
}
