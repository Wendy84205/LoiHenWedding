import React from 'react';
import { IllustratedPosterTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-13',
  family: 'illustrated',
  groom: 'Minh Khang',
  bride: 'Hà My',
  date: '2027-09-23T10:30:00+07:00',
  accent: '#ce7a20',
  paper: '#ffd77f',
  ink: '#4e2b1d',
  font: 'Poppins',
  script: 'Mallong',
  intro: false,
};

export default function Template13New() {
  return <IllustratedPosterTemplate config={config} />;
}
