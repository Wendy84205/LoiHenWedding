import React from 'react';
import { ModernGridTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-33',
  family: 'modern',
  groom: 'Minh Trí',
  bride: 'Bảo Anh',
  date: '2027-09-25T10:30:00+07:00',
  accent: '#a43842',
  paper: '#fffdf8',
  ink: '#201d1c',
  font: 'PlayfairDisplay',
  script: 'Mallong',
  intro: false,
};

export default function Template33New() {
  return <ModernGridTemplate config={config} />;
}
