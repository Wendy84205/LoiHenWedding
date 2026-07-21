import React from 'react';
import { DarkCinematicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-22',
  family: 'cinematic',
  groom: 'Trí Hưng',
  bride: 'Thùy An',
  date: '2027-10-14T10:30:00+07:00',
  accent: '#a77f70',
  paper: '#2e211a',
  ink: '#eadfd6',
  font: 'Quicksand',
  script: 'Signora',
  intro: false,
};

export default function Template22New() {
  return <DarkCinematicTemplate config={config} />;
}
