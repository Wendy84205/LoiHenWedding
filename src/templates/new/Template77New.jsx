import React from 'react';
import { BotanicalFrameTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-77',
  family: 'botanical',
  groom: 'Minh Phúc',
  bride: 'Kiều Anh',
  date: '2027-09-15T10:30:00+07:00',
  accent: '#75685c',
  paper: '#f8f3ef',
  ink: '#302b27',
  font: 'PlayfairDisplay',
  script: 'Signora',
  intro: false,
};

export default function Template77New() {
  return <BotanicalFrameTemplate config={config} />;
}
