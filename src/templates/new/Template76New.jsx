import React from 'react';
import { TypographicTemplate } from './SourceTemplateFamilies.jsx';

const config = {
  slug: 'thiep-cuoi-76',
  family: 'typographic',
  groom: 'Tuấn Anh',
  bride: 'Hà My',
  date: '2027-08-14T10:30:00+07:00',
  accent: '#8b1b7c',
  paper: '#fffefd',
  ink: '#362c36',
  font: 'Cinelove Times',
  script: 'Mallong',
  intro: false,
};

export default function Template76New() {
  return <TypographicTemplate config={config} />;
}
