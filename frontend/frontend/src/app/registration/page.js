"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Registration() {
  const router = useRouter();
  const [userType, setUserType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(''); // New phone number state
  const [vehicleType, setVehicleType] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const handleLogin = () =>{
    router.push('/login');
  }

  const handleRegistration = async (e) => {
    e.preventDefault();

    const registrationData = {
      name,
      email,
      password,
      phone, // Add phone number to registration data
      vehicleType: userType === 'driver' ? vehicleType : undefined,
      licensePlate: userType === 'driver' ? licensePlate : undefined,
    };

    const url = userType === 'driver' ? 'http://localhost:3002/api/driver/register' : 'http://localhost:3002/api/rider/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Registration successful!'); // Alert for successful registration
        router.push('/login'); // Redirect to login page on success
      } else {
        console.error('Registration error:', result.error);
        alert(`Registration failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <div className={styles.loginBackground}></div>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginHeading}>
          Register as a {userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : 'Driver or Rider'}
        </h2>

        {/* User Type Selection */}
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

        {/* Registration Form */}
        <form onSubmit={handleRegistration} className={styles.registrationForm}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className={styles.inputField}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className={styles.inputField}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="tel"
            className={styles.inputField}
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="[0-9]{10}" // Ensures a 10-digit phone number
            required
          />

          {/* Vehicle details input and license plate input for drivers only */}
          {userType === 'driver' && (
            <>
              <input
                type="text"
                className={styles.inputField}
                placeholder="Vehicle Type (e.g., two/four wheeler)"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                required
              />
              <input
                type="text"
                className={styles.inputField}
                placeholder="License Plate"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit" onClick={handleLogin} className={styles.button}>
            Register as {userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : ''}
          </button>
        

        </form>
        {/* Link to login page */}
        <p className={styles.loginLink}>
           <a href="/login">Back to Login</a>
          
        </p>
      </div>
    </div>
  );
}
