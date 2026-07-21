import React from 'react';
import { TypographicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-72',
  family: 'typographic',
  groom: 'Hữu Quân',
  bride: 'Tuấn Tú',
  date: '2027-08-10T10:30:00+07:00',
  accent: '#111111',
  paper: '#fffdf9',
  ink: '#191919',
  font: 'PlayfairDisplay',
  script: 'Anisa Signature',
  intro: false,
};

export default function Template72New() {
  return <TypographicTemplate config={config} />;
}
