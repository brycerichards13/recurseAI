// components/ToggleSwitch.js
import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`${styles.toggleSwitch} ${isDarkMode ? styles.darkMode : ''}`}
      onClick={handleToggle}
    >
      <div className={`${styles.circle} ${isDarkMode ? 'active' : ''}`}>
        <IonIcon
          icon={isDarkMode ? sunnyOutline : moonOutline}
          className={`${styles.icon} ${isDarkMode ? styles.iconDark : ''}`}
        />
        
      </div>
    </div>
  );
};

export default ToggleSwitch;
