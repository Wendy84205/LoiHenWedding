import React from 'react';
import { CompactFormalTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-100',
  family: 'formal',
  groom: 'Văn Toàn',
  bride: 'Phương Nhi',
  date: '2027-08-20T10:30:00+07:00',
  accent: '#c5a64d',
  paper: '#651217',
  ink: '#f7e6bd',
  font: 'OpenSans',
  script: 'Lobster',
  intro: true,
};

export default function Template100New() {
  return <CompactFormalTemplate config={config} />;
}
