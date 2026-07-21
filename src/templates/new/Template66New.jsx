import React from 'react';
import { ModernGridTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-66',
  family: 'modern',
  groom: 'Minh Đức',
  bride: 'Ngân Hà',
  date: '2027-10-22T10:30:00+07:00',
  accent: '#8e3542',
  paper: '#f9f3f1',
  ink: '#332c2d',
  font: 'Cinelove Times',
  script: 'Signora',
  intro: false,
};

export default function Template66New() {
  return <ModernGridTemplate config={config} />;
}
