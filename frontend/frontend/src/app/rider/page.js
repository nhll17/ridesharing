"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function RiderLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(''); // To show error message

  const handleLogin = async () => {
    // Prepare login data
    const loginData = {
      email,
      password,
    };

    try {
      // Send login data to backend
      const response = await fetch('http://localhost:3002/api/rider/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      // Check if login was successful
      if (response.ok) {
        // Store the JWT token in localStorage for future requests if needed
        localStorage.setItem('token', result.token);

        // If login is successful, redirect to the rider booking page
        router.push(result.redirect || '/ridebooking');
      } else {
        // If login failed, show an error message
        setErrorMessage(result.error || 'Login failed. Please check your credentials.');
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
        <h2 className={styles.heading}>Rider Login</h2>

        {/* Display error if login fails */}
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
