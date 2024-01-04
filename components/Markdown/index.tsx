import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

import styles from 'components/Markdown/index.module.css';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  children: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ children }) => {
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : "plaintext"; // Default to plaintext if no language is specified

      return !inline ? (
        <SyntaxHighlighter style={okaidia} language={language} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={styles.regularCode} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className={styles.markdown}>
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
