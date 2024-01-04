'use client';
import Card from '../../components/Cards';
import styles from './cards.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <Card title="Long Body" body="Example Body Text 1 wefwqefqwefqwefwkefhiqweoiqgroiqegrpiqgroiqregoqiyre goqirg oqiur goqir goqirgoqirg oqirgoqirgowqefefqoweu hou hefoquwefoqiuehofqu weoiuhwe oihewofu hqwioefh oiqweuhfioqhwe oihqwioe" />
      <Card title="Normal" body="Example Body Text 2" />
      <Card title="Really Long Title and No Body" body="" />
    </div>
  );
}
