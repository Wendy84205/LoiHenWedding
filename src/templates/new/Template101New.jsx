import React from 'react';
import { ModernGridTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-101',
  family: 'modern',
  groom: 'Yến Nhi',
  bride: 'Hải Đăng',
  date: '2027-09-21T10:30:00+07:00',
  accent: '#738e68',
  paper: '#fffdf8',
  ink: '#2b3329',
  font: 'PlayfairDisplay',
  script: 'Signora',
  intro: false,
};

export default function Template101New() {
  return <ModernGridTemplate config={config} />;
}
