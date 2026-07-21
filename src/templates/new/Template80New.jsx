import React from 'react';
import { RedPopTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-80',
  family: 'redpop',
  groom: 'Trọng Nghĩa',
  bride: 'Tâm An',
  date: '2027-08-18T10:30:00+07:00',
  accent: '#d95e6b',
  paper: '#fffafa',
  ink: '#382629',
  font: 'PlayfairDisplay',
  script: 'Signora',
  intro: false,
};

export default function Template80New() {
  return <RedPopTemplate config={config} />;
}
