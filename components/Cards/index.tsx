import { useState } from 'react';
import Link from 'next/link';
import styles from './cards.module.css';
import Image from 'next/image';

function Modal({ show, onClose, title, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
interface CardsProps {
  title: string;
  body: string;
}

export default function Cards({ title, body }: CardsProps) {
  'use client';

  const [showBody, setShowBody] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePreviewClick = () => {
    setShowModal(true);
  };

  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.title}>{title}</div>
          <p>{body}</p>
          {showBody && <p>{body}</p>}
          <div className={styles.foot}>
            <button onClick={handlePreviewClick}>
              <span>Preview</span>
            </button>
            <Link href="/chat">
              <Image src="/forward.svg" alt="forward" width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} title={title}>
        <p>{body}</p>
      </Modal>
    </div>
  );
}
