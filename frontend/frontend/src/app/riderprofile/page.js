"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';

export default function RiderProfile() {
  const [riderDetails, setRiderDetails] = useState(null);

  useEffect(() => {
    // Fetch rider details when the component mounts
    const fetchRiderDetails = async () => {
      try {
        const response = await axios.get('/api/rider/profile');
        setRiderDetails(response.data);
      } catch (error) {
        console.error('Error fetching rider details:', error);
      }
    };

    fetchRiderDetails();
  }, []);

  if (!riderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h2 className={styles.heading}>Rider Profile</h2>
        <div className={styles.profileCard}>
          <h3 className={styles.profileName}>{riderDetails.name}</h3>
          <p className={styles.profileEmail}>{riderDetails.email}</p>

          <div className={styles.profileDetails}>
            <p><strong>Phone:</strong> {riderDetails.phone}</p>
            <p><strong>Address:</strong> {riderDetails.address}</p>
            <p><strong>Total Rides:</strong> {riderDetails.totalRides}</p>
            <p><strong>Rating:</strong> {riderDetails.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
