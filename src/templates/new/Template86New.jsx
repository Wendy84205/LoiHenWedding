import React from 'react';
import { TypographicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-86',
  family: 'typographic',
  groom: 'Minh Đức',
  bride: 'Ngân Hà',
  date: '2027-10-24T10:30:00+07:00',
  accent: '#9a8d55',
  paper: '#f5f4e9',
  ink: '#36342c',
  font: 'Quicksand',
  script: 'Signora',
  intro: false,
};

export default function Template86New() {
  return <TypographicTemplate config={config} />;
}
