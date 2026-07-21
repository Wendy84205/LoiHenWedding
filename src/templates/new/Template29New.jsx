import React from 'react';
import { DarkCinematicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-29',
  family: 'cinematic',
  groom: 'Minh Châu',
  bride: 'Huyền Anh',
  date: '2027-09-21T10:30:00+07:00',
  accent: '#d09b73',
  paper: '#171615',
  ink: '#f8eee4',
  font: 'Quicksand',
  script: 'Signora',
  intro: false,
};

export default function Template29New() {
  return <DarkCinematicTemplate config={config} />;
}
