// 'use client';
import fs from 'fs';
import { notFound } from 'next/navigation';
import styles from 'app/docs/[slug]/page.module.css';
import LandingPageNavbar from 'components/LandingPageNavbar';
import MarkdownContent from 'components/Markdown';

function getDoc(slug: string): string {
  const file = `./docs/${slug}.md`;
  if (!fs.existsSync(file)) {
    return '';
  }

  return fs.readFileSync(file, 'utf-8');
}

interface DocsProps {
  params: {
    slug: string;
  };
}

export default function Docs({ params }: DocsProps) {
  const doc = getDoc(params.slug);

  if (!doc) {
    return notFound();
  }

  return (
    <body style={{ backgroundColor: '#191825' }}>
      <LandingPageNavbar/>
      <div className={styles.border}>
        <div className={styles.box}>
          <MarkdownContent>{doc}</MarkdownContent>
        </div>
      </div>
    </body>
  );
}
