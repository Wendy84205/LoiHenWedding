import React from 'react';
import { TraditionalSplitTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-3',
  family: 'traditional',
  groom: 'Hương',
  bride: 'Anh',
  date: '2027-11-13T10:30:00+07:00',
  accent: '#b04d59',
  paper: '#fffaf2',
  ink: '#402c31',
  font: 'PlayfairDisplay',
  script: 'Signora',
  intro: false,
};

export default function Template3New() {
  return <TraditionalSplitTemplate config={config} />;
}
