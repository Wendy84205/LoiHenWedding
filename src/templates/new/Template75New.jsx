import React from 'react';
import { RedPopTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-75',
  family: 'redpop',
  groom: 'Quang Anh',
  bride: 'Khả Hân',
  date: '2027-11-13T10:30:00+07:00',
  accent: '#bc101b',
  paper: '#fff8ef',
  ink: '#2d2020',
  font: 'PlayfairDisplay',
  script: 'Signora',
  intro: false,
};

export default function Template75New() {
  return <RedPopTemplate config={config} />;
}
