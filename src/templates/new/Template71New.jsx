import React from 'react';
import { TypographicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-71',
  family: 'typographic',
  groom: 'Hải Đăng',
  bride: 'Ngọc Mai',
  date: '2027-11-27T10:30:00+07:00',
  accent: '#c28d9e',
  paper: '#f9f5f1',
  ink: '#2e2927',
  font: 'Quicksand',
  script: 'Mallong',
  intro: false,
};

export default function Template71New() {
  return <TypographicTemplate config={config} />;
}
