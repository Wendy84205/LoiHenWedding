import React from 'react';
import { DarkCinematicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-9',
  family: 'cinematic',
  groom: 'Tuấn Kiệt',
  bride: 'Gia Vy',
  date: '2027-09-19T10:30:00+07:00',
  accent: '#c58a92',
  paper: '#14120f',
  ink: '#f8f1e9',
  font: 'Signora',
  script: 'Mallong',
  intro: false,
};

export default function Template9New() {
  return <DarkCinematicTemplate config={config} />;
}
