import React from 'react';
import { ModernGridTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-27',
  family: 'modern',
  groom: 'Anh Quân',
  bride: 'Như Ý',
  date: '2027-11-19T10:30:00+07:00',
  accent: '#8e8a80',
  paper: '#f8f7f2',
  ink: '#202020',
  font: 'Quicksand',
  script: 'Mallong',
  intro: false,
};

export default function Template27New() {
  return <ModernGridTemplate config={config} />;
}
