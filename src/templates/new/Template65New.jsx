import React from 'react';
import { IllustratedPosterTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-65',
  family: 'illustrated',
  groom: 'Hoàng Anh',
  bride: 'Yến Nhi',
  date: '2027-09-21T10:30:00+07:00',
  accent: '#b45d60',
  paper: '#fff8f5',
  ink: '#4a3330',
  font: 'PlayfairDisplay',
  script: 'Aquarelle',
  intro: false,
};

export default function Template65New() {
  return <IllustratedPosterTemplate config={config} />;
}
