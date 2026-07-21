import React from 'react';
import { ModernGridTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-74',
  family: 'modern',
  groom: 'Tuấn Minh',
  bride: 'Khánh Vy',
  date: '2027-10-12T10:30:00+07:00',
  accent: '#a35b64',
  paper: '#f8f1ee',
  ink: '#332b2a',
  font: 'PlayfairDisplay',
  script: 'Signora',
  intro: false,
};

export default function Template74New() {
  return <ModernGridTemplate config={config} />;
}
