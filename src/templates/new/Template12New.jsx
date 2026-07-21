import React from 'react';
import { IllustratedPosterTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-12',
  family: 'illustrated',
  groom: 'Quốc Thiên',
  bride: 'Thanh Tú',
  date: '2027-08-22T10:30:00+07:00',
  accent: '#b9222c',
  paper: '#fff8ef',
  ink: '#361b20',
  font: 'Quicksand',
  script: 'Signora',
  intro: false,
};

export default function Template12New() {
  return <IllustratedPosterTemplate config={config} />;
}
