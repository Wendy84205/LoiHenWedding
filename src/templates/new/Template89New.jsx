import React from 'react';
import { IllustratedPosterTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-89',
  family: 'illustrated',
  groom: 'Hải Nam',
  bride: 'Mỹ Linh',
  date: '2027-09-27T10:30:00+07:00',
  accent: '#e26765',
  paper: '#fffdfa',
  ink: '#3e2f2e',
  font: 'Signora',
  script: 'Mallong',
  intro: false,
};

export default function Template89New() {
  return <IllustratedPosterTemplate config={config} />;
}
