"use client";
import { useEffect } from 'react';
import styles from './page.module.css';

export default function BookingConfirmation() {
  useEffect(() => {
    // This could be used for any side effects, like fetching additional data
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Booking Confirmed!</h1>
        <p className={styles.message}>
          Thank you for your booking! Your ride is confirmed.
        </p>
        <div className={styles.animation}>
          <div className={styles.checkmark}></div>
        </div>
      </div>
    </div>
  );
}
