"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ApprovedRequests() {
  const [approvedRides, setApprovedRides] = useState([]);
  const router = useRouter();

  // Fetch approved rides on component mount
  useEffect(() => {
    const fetchApprovedRides = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/rides/rideStatus');
        setApprovedRides(response.data);
      } catch (error) {
        console.error('Error fetching approved rides:', error);
      }
    };

    fetchApprovedRides();
  }, []);

 
  // Handle navigation to ride details (optional)
  const handleRideDetails = (rideId) => {
    router.push(`/driver/rides/${rideId}`);
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h2 className={styles.heading}>CONGRATULATIONS! <br/>YOUR RIDE HAS BEEN APPROVED</h2>
        {approvedRides.length > 0 ? (
          <ul className={styles.rideList}>
            {approvedRides.map((ride) => (
              <li key={ride.id} className={styles.rideItem}>
                 <h3>Contact your Driver:</h3>{ride.phone_no}<br/><br/>
                <h3 className={styles.rideTitle}>{ride.start} to {ride.end}</h3>
                <p className={styles.rideDetails}>
               
                  <strong>Date & Time:</strong> {new Date(ride.date).toLocaleString()}<br />
                  <strong>Rate:</strong> Rs {ride.price}<br/>
                  
                </p>
                
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noRidesMessage}>No approved rides found.</p>
        )}
      </div>
    </div>
  );
}
