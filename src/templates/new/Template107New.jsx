import React from 'react';
import { TypographicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-107',
  family: 'typographic',
  groom: 'Minh Tuệ',
  bride: 'Hải Minh',
  date: '2027-11-27T10:30:00+07:00',
  accent: '#c9beb0',
  paper: '#f7f4ee',
  ink: '#25221f',
  font: 'scarlet-bradley.regular',
  script: 'Signora',
  intro: false,
};

export default function Template107New() {
  return <TypographicTemplate config={config} />;
}
