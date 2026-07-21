import React from 'react';
import { ModernGridTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-70',
  family: 'modern',
  groom: 'Quang Thịnh',
  bride: 'Lan Hương',
  date: '2027-10-26T10:30:00+07:00',
  accent: '#c11820',
  paper: '#fffdf8',
  ink: '#25211f',
  font: 'PlayfairDisplay',
  script: 'Signora',
  intro: false,
};

export default function Template70New() {
  return <ModernGridTemplate config={config} />;
}
