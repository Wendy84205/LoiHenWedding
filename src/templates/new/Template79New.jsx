import React from 'react';
import { DarkCinematicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-79',
  family: 'cinematic',
  groom: 'Đức Huy',
  bride: 'Bảo Trâm',
  date: '2027-11-17T10:30:00+07:00',
  accent: '#6b8060',
  paper: '#142119',
  ink: '#edf2e9',
  font: 'Poppins',
  script: 'Signora',
  intro: false,
};

export default function Template79New() {
  return <DarkCinematicTemplate config={config} />;
}
