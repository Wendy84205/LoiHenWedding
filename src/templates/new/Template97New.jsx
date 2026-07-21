import React from 'react';
import { CompactFormalTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-97',
  family: 'formal',
  groom: 'Hoàng Quân',
  bride: 'Mai Anh',
  date: '2027-09-17T10:30:00+07:00',
  accent: '#c3a445',
  paper: '#122d59',
  ink: '#f4e8bd',
  font: 'OpenSans',
  script: 'Lobster',
  intro: true,
};

export default function Template97New() {
  return <CompactFormalTemplate config={config} />;
}
