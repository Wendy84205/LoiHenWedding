import React from 'react';
import { TraditionalSplitTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-35',
  family: 'traditional',
  groom: 'Mạnh Tùng',
  bride: 'Ngọc Linh',
  date: '2027-11-27T10:30:00+07:00',
  accent: '#b72634',
  paper: '#fffafa',
  ink: '#34272a',
  font: 'PlayfairDisplay',
  script: 'Signora',
  intro: false,
};

export default function Template35New() {
  return <TraditionalSplitTemplate config={config} />;
}
