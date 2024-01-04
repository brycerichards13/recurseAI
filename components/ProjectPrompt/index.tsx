// import { Link } from 'react-router-dom';
import Link from 'next/link';
import Card from '../Cards'
import styles from './projectprompt.module.css';

interface ProjectPromptProps {
  key: number;
  data: string;
  detail: string;
}

export default function ProjectPrompt({ key, data, detail }: ProjectPromptProps) {
  return (
    <>
      <Card title={data} body={detail} />
    </>
  );
}
