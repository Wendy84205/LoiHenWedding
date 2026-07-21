import React from 'react';
import { ModernGridTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-32',
  family: 'modern',
  groom: 'Đức Minh',
  bride: 'Hải Yến',
  date: '2027-08-24T10:30:00+07:00',
  accent: '#b55231',
  paper: '#faf5ed',
  ink: '#26201d',
  font: 'PlayfairDisplay',
  script: 'Carlytte',
  intro: false,
};

export default function Template32New() {
  return <ModernGridTemplate config={config} />;
}
