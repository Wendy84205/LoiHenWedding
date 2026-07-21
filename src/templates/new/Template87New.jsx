import React from 'react';
import { BotanicalFrameTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-87',
  family: 'botanical',
  groom: 'Thanh Nam',
  bride: 'Vân Anh',
  date: '2027-11-25T10:30:00+07:00',
  accent: '#8f6265',
  paper: '#faf3f1',
  ink: '#362e2f',
  font: 'Quicksand',
  script: 'Mallong',
  intro: false,
};

export default function Template87New() {
  return <BotanicalFrameTemplate config={config} />;
}
