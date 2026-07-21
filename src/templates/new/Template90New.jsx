import React from 'react';
import { DarkCinematicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-90',
  family: 'cinematic',
  groom: 'Thomas',
  bride: 'Alice',
  date: '2027-10-10T10:30:00+07:00',
  accent: '#b88a7a',
  paper: '#191615',
  ink: '#f5ede8',
  font: 'Quicksand',
  script: 'scarlet-bradley.regular',
  intro: false,
};

export default function Template90New() {
  return <DarkCinematicTemplate config={config} />;
}
