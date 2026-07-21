import React from 'react';
import { ModernGridTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-106',
  family: 'modern',
  groom: 'Jonh',
  bride: 'Ammy',
  date: '2027-10-26T10:30:00+07:00',
  accent: '#b34450',
  paper: '#fbf4f1',
  ink: '#392d2e',
  font: 'Quicksand',
  script: 'Signora',
  intro: false,
};

export default function Template106New() {
  return <ModernGridTemplate config={config} />;
}
