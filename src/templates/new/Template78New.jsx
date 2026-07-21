import React from 'react';
import { IllustratedPosterTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-78',
  family: 'illustrated',
  groom: 'Gia Huy',
  bride: 'An Nhiên',
  date: '2027-10-16T10:30:00+07:00',
  accent: '#f28aa8',
  paper: '#fffafa',
  ink: '#393034',
  font: 'PlayfairDisplay',
  script: 'Mallong',
  intro: false,
};

export default function Template78New() {
  return <IllustratedPosterTemplate config={config} />;
}
