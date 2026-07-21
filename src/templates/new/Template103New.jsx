import React from 'react';
import { DarkCinematicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-103',
  family: 'cinematic',
  groom: 'Minh Tuấn',
  bride: 'Hà Anh',
  date: '2027-11-23T10:30:00+07:00',
  accent: '#658449',
  paper: '#142219',
  ink: '#edf1e8',
  font: 'Quicksand',
  script: 'Signora',
  intro: false,
};

export default function Template103New() {
  return <DarkCinematicTemplate config={config} />;
}
