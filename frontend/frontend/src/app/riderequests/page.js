"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function RequestedRides() {
  const [requestedRides, setRequestedRides] = useState([]);
  const router = useRouter();

  // Fetch rides with status "booked" on component mount
  useEffect(() => {
    const fetchRequestedRides = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/rides/requested');
        setRequestedRides(response.data);
      } catch (error) {
        console.error('Error fetching requested rides:', error);
      }
    };

    fetchRequestedRides();
  }, []);

  // Handle approving a ride
  const handleApprove = async (rideId) => {
    try {
      await axios.post(`http://localhost:3002/api/rides/approve/${rideId}`);
      setRequestedRides(requestedRides.filter(ride => ride.id !== rideId)); // Remove from list after approval
      alert('Ride approved successfully!');
    } catch (error) {
      console.error('Error approving ride:', error);
      alert('Failed to approve the ride. Please try again.');
    }
  };

  // Handle rejecting a ride
  const handleReject = async (rideId) => {
    try {
      await axios.post(`http://localhost:3002/api/rides/reject/${rideId}`);
      setRequestedRides(requestedRides.filter(ride => ride.id !== rideId)); // Remove from list after rejection
      alert('Ride rejected successfully!');
    } catch (error) {
      console.error('Error rejecting ride:', error);
      alert('Failed to reject the ride. Please try again.');
    }
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h2 className={styles.heading}>Requested Rides (Booked)</h2>
        {requestedRides.length > 0 ? (
          <ul className={styles.rideList}>
            {requestedRides.map((ride) => (
              <li key={ride.id} className={styles.rideItem}>
                <h3 className={styles.rideTitle}>{ride.start} to {ride.end}</h3>
                <p className={styles.rideDetails}>
                  <strong>Date & Time:</strong> {new Date(ride.date).toLocaleString()}<br />
                  <strong>Available Seats:</strong> {ride.seats}<br />
                  <strong>Rate:</strong> Rs {ride.price}
                </p>
                <div className={styles.buttonGroup}>
                  <button className={styles.button} onClick={() => handleApprove(ride.id)}>
                    Approve
                  </button>
                  <button className={`${styles.button} ${styles.rejectButton}`} onClick={() => handleReject(ride.id)}>
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noRidesMessage}>No booked rides found.</p>
        )}
      </div>
    </div>
  );
}