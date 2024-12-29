"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';

export default function DriverProfile() {
  const [driverDetails, setDriverDetails] = useState(null);

  useEffect(() => {
    // Fetch driver details when the component mounts
    const fetchDriverDetails = async () => {
      try {
        const response = await axios.get('/api/driver/profile');
        setDriverDetails(response.data);
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    };

    fetchDriverDetails();
  }, []);

  if (!driverDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h2 className={styles.heading}>Driver Profile</h2>
        <div className={styles.profileCard}>
          <img src={driverDetails.profilePicture} alt="Driver's Profile" className={styles.profilePicture} />
          <h3 className={styles.profileName}>{driverDetails.name}</h3>
          <p className={styles.profileEmail}>{driverDetails.email}</p>

          <div className={styles.profileDetails}>
            <p><strong>Phone:</strong> {driverDetails.phone}</p>
            <p><strong>Vehicle:</strong> {driverDetails.vehicleDetails}</p>
            <p><strong>License Plate:</strong> {driverDetails.licensePlate}</p>
            <p><strong>Total Rides:</strong> {driverDetails.totalRides}</p>
            <p><strong>Rating:</strong> {driverDetails.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
