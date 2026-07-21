import React from 'react';
import { DarkCinematicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-93',
  family: 'cinematic',
  groom: 'Mai Anh',
  bride: 'Tuấn Kiệt',
  date: '2027-09-13T10:30:00+07:00',
  accent: '#a50f1c',
  paper: '#0d0d0d',
  ink: '#f5f1eb',
  font: 'Signora',
  script: 'Mallong',
  intro: false,
};

export default function Template93New() {
  return <DarkCinematicTemplate config={config} />;
}
