import React from 'react';
import { TraditionalSplitTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-25',
  family: 'traditional',
  groom: 'Duy Anh',
  bride: 'Hồng Ngọc',
  date: '2027-09-17T10:30:00+07:00',
  accent: '#ae1d28',
  paper: '#fffaf2',
  ink: '#302523',
  font: 'Quicksand',
  script: 'Signora',
  intro: false,
};

export default function Template25New() {
  return <TraditionalSplitTemplate config={config} />;
}
