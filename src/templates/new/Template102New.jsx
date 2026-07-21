import React from 'react';
import { CompactFormalTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-102',
  family: 'formal',
  groom: 'Anh Tuấn',
  bride: 'Thu Trang',
  date: '2027-10-22T10:30:00+07:00',
  accent: '#b9984d',
  paper: '#7d1115',
  ink: '#f7e2b8',
  font: 'Cinelove Times',
  script: 'Signora',
  intro: true,
};

export default function Template102New() {
  return <CompactFormalTemplate config={config} />;
}
