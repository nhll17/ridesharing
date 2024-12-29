"use client";
import { useEffect } from 'react';
import styles from './page.module.css';

export default function DriverConfirmation() {
  useEffect(() => {
    // This could be used for any side effects, like fetching additional data
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Ride Published!</h1>
        <p className={styles.message}>
          Your ride has been successfully published. You can now wait for riders to book!
        </p>
        <div className={styles.animation}>
          <div className={styles.checkmark}></div>
        </div>
      </div>
    </div>
  );
}
