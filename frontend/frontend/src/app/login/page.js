"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';

export default function Login() {
  const router = useRouter();
  const [userType, setUserType] = useState('');

  const handleRedirect = () => {
    if (userType === 'driver') {
      router.push('/driver'); // Redirect to driver login page
    } else if (userType === 'rider') {
      router.push('/rider'); // Redirect to rider login page
    }
  };

  return (
    <div>
      <div className={styles.loginBackground}></div>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginHeading}>Login / Register</h2>
        <p className={styles.loginSubHeading}>Are you a Driver or a Rider?</p>
        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.button} ${userType === 'driver' ? styles.activeButton : ''}`} 
            onClick={() => setUserType('driver')}
          >
            Driver
          </button>
          <button 
            className={`${styles.button} ${userType === 'rider' ? styles.activeButton : ''}`} 
            onClick={() => setUserType('rider')}
          >
            Rider
          </button>
        </div>

        {/* Always displayed text for new users */}
        <div className={styles.newUserPrompt}>
          <p>{`Are you a new user?`}</p>
          <a href="/registration">Click Here</a>
          <p>{` to register as a ${userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : 'Driver or Rider'}.`}</p>
        </div>

        <div className={styles.registrationToggle}>
          <button 
            className={`${styles.toggleButton}`} 
            onClick={handleRedirect}
            disabled={!userType} // Disable until a user type is selected
          >
            Login {userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : ''} {/* Display empty string if no user type is selected */}
          </button>
        </div>
      </div>
    </div>
  );
}
