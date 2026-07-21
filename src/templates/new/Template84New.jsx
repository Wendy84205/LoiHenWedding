import React from 'react';
import { TraditionalSplitTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-84',
  family: 'traditional',
  groom: 'Trọng Vinh',
  bride: 'Hà Linh',
  date: '2027-08-22T10:30:00+07:00',
  accent: '#9f2630',
  paper: '#fffdf9',
  ink: '#332728',
  font: 'PlayfairDisplay',
  script: 'Signora',
  intro: false,
};

export default function Template84New() {
  return <TraditionalSplitTemplate config={config} />;
}
