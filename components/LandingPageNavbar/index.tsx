import styles from 'app/page.module.css';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { options } from 'app/api/auth/[...nextauth]/options';

export default async function LandingPageNavbar() {
  const session = await getServerSession(options);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.brand}>
            <Link href="/">RecurseAI</Link>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.action}>
            <div className={`${styles.button} ${styles.documentation}`}>
              <Link href="/docs/[slug]" as={'/docs/documentation'}>Documentation</Link>
            </div>
          </div>
          <div className={styles.action}>
            <div className={`${styles.button} ${styles.account}`}>
              <Link href="/chat">{session?.user ? 'Chat' : 'Login'}</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
