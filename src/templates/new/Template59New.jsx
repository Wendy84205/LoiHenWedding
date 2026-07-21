import React from 'react';
import { BotanicalFrameTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-59',
  family: 'botanical',
  groom: 'Văn Khang',
  bride: 'Phúc Hương',
  date: '2027-11-15T10:30:00+07:00',
  accent: '#7a1521',
  paper: '#fffdf8',
  ink: '#382a27',
  font: 'Cinelove Times',
  script: 'Signora',
  intro: true,
};

export default function Template59New() {
  return <BotanicalFrameTemplate config={config} />;
}
