"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function DriverLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages
  const router = useRouter();

  const handleLogin = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      // Send the login data to the backend
      const response = await fetch('http://localhost:3002/api/driver/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      // Check if login was successful
      if (response.ok) {
        // Store the JWT token in localStorage
        localStorage.setItem('token', result.token);

        // Redirect to the driver dashboard on success
        router.push(result.redirect || '/driverdashboard');
      } else {
        // If login failed, show the error message
        setErrorMessage(result.error || 'Invalid login credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h2 className={styles.heading}>Driver Login</h2>

        {/* Show error message if login fails */}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <input
          type="email"
          className={styles.inputField}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className={styles.inputField}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
