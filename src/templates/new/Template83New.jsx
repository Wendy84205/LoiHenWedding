import React from 'react';
import { TraditionalSplitTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-83',
  family: 'traditional',
  groom: 'Quốc Bảo',
  bride: 'Nguyễn Nhi',
  date: '2027-11-21T10:30:00+07:00',
  accent: '#930000',
  paper: '#fffdf8',
  ink: '#342523',
  font: 'Cinelove Times',
  script: 'scarlet-bradley.regular',
  intro: false,
};

export default function Template83New() {
  return <TraditionalSplitTemplate config={config} />;
}
