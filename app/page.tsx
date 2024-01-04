'use client';
import styles from 'app/page.module.css';
import Navbar from 'components/LandingPageNavbar';
import Link from 'next/link';
export default function Home() {
  return (
    <body
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, rgba(214.52, 213.96, 216.02, 0.02) 68%, rgba(98, 71, 170, 0.76) 100%)',
        backgroundColor: '#191825',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
      }}
    >
      <div>
        <Navbar />
        <div className={styles.border} />
      </div>

      <div className={styles.content}>
        <div className={styles.containerText} style={{ fontSize: '40px' }}>
          <div className={styles.action}>
            <div className={`${styles.button} ${styles.account}`}>
              <Link href="/chat">
                <span className={styles.iconTextContainer}>
                  Try Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    className={styles.icon}
                  >
                    <path
                      d="M3.75 11.25V6.75C3.75 5.09315 5.09315 3.75 6.75 3.75H23.25C24.9069 3.75 26.25 5.09315 26.25 6.75V23.25C26.25 24.9069 24.9069 26.25 23.25 26.25H18.75"
                      stroke="#FFA3FD"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 10V9H21V10H20ZM12.5821 18.8321C12.1916 19.2226 11.5584 19.2226 11.1679 18.8321C10.7774 18.4416 10.7774 17.8084 11.1679 17.4179L12.5821 18.8321ZM19 17.5V10H21V17.5H19ZM20 11H12.5V9H20V11ZM20.7071 10.7071L12.5821 18.8321L11.1679 17.4179L19.2929 9.29289L20.7071 10.7071Z"
                      fill="#FFA3FD"
                    />
                    <rect
                      x="3.75"
                      y="17.5"
                      width="8.75"
                      height="8.75"
                      rx="2"
                      stroke="#FFA3FD"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          Ask Away with RecurseAI
        </div>

        <div className={styles.containerText} style={{ fontSize: '20px' }}>
          RecurseAI aims to transform PaLM 2 into a project focused,
          self-prompting language model that can autonomously complete complex
          tasks and goals with the aid and guidance of the user. By enabling
          PaLM 2 to reprompt itself, RecurseAI allows for an extremely
          functional, goal focused AI to meet your demands.
        </div>
      </div>
    </body>
  );
}
