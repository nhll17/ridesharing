"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';

export default function DriverInput() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [time, setTime] = useState('');
  const [availableSeats, setAvailableSeats] = useState(1);
  const [vehicleDetails, setVehicleDetails] = useState('');
  const [rate, setRate] = useState('');
  const [phone, setPhone] = useState(''); // New state for phone number
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const fetchRideRequests = async () => {
    router.push('/riderequests');
  };

  const fetchApprovedRequests = () => {
    router.push('/approvedrides');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3002/api/drives', {
        startLocation,
        endLocation,
        time,
        availableSeats,
        vehicleDetails,
        rate,
        phone, // Send phone number with request
      });

      if (response.status === 201) {
        router.push('/driverconfirmation'); // Redirect after successful submission
      } else {
        alert('Failed to save drive details');
      }
    } catch (error) {
      console.error('Error submitting drive details:', error);
      alert('An error occurred while submitting drive details.');
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <button className={styles.profileButton} onClick={toggleDropdown}>
            Profile
          </button>
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <ul>
                <li onClick={() => router.push('/profile')}>View Profile</li>
                <li onClick={() => router.push('/settings')}>Settings</li>
                <li onClick={() => router.push('/home')}>Logout</li>
              </ul>
            </div>
          )}
        </div>

        <h2 className={styles.heading}>Input Drive Details</h2>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Starting Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        />
        <input
          type="text"
          className={styles.inputField}
          placeholder="Destination Location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
        />
        <input
          type="datetime-local"
          className={styles.inputField}
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="number"
          className={styles.inputField}
          placeholder="Available Seats"
          value={availableSeats}
          min="1"
          max="8"
          onChange={(e) => setAvailableSeats(e.target.value)}
        />
        <input
          type="text"
          className={styles.inputField}
          placeholder="Vehicle Details (two/four wheeler)"
          value={vehicleDetails}
          onChange={(e) => setVehicleDetails(e.target.value)}
        />
        <input
          type="number"
          className={styles.inputField}
          placeholder="Rate of the Journey"
          value={rate}
          min="0"
          step="0.01"
          onChange={(e) => setRate(e.target.value)}
        />
        <input
          type="tel"
          className={styles.inputField}
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className={styles.button} onClick={handleSubmit}>
          Submit
        </button>

        <button className={styles.button} onClick={fetchApprovedRequests}>
          View Approved Rides
        </button>

        <button className={styles.button} onClick={fetchRideRequests}>
          View Ride Requests
        </button>
      </div>
    </div>
  );
}
