"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AvailableRides() {
  const [availableRides, setAvailableRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchAvailableRides = async () => {
      setLoading(true); // Start loading
      setError(''); // Reset error state
      try {
        const response = await axios.get('http://localhost:3002/api/rides'); // Updated API endpoint
        setAvailableRides(response.data);
      } catch (error) {
        setError('Error fetching available rides. Please try again later.');
        console.error('Error fetching available rides:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAvailableRides();
  }, []);

  const handleBookRide = async (rideId) => {
    try {
      await axios.post(`http://localhost:3002/api/rides/book/${rideId}`);
      setAvailableRides(availableRides.filter(ride => ride.id !== rideId)); // Remove from the list after booking
      alert('Ride booked successfully!');
    } catch (error) {
      console.error('Error booking ride:', error);
      alert('Error booking ride. Please try again.');
    }
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h2 className={styles.heading}>Available Rides</h2>
        {loading ? (
          <p>Loading available rides...</p>
        ) : error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : availableRides.length > 0 ? (
          <ul className={styles.rideList}>
            {availableRides.map((ride) => (
              <li key={ride.id} className={styles.rideItem}>
                <h3 className={styles.rideTitle}>
                  {ride.start} to {ride.end}
                </h3>
                <p className={styles.rideDetails}>
                  <strong>Date & Time:</strong> {new Date(ride.date).toLocaleString()}<br />
                  <strong>Available Seats:</strong> {ride.seats}
                </p>
                <div className={styles.buttonroup}>
                  <button className={styles.button} onClick={() => handleBookRide(ride.id)}>
                    Book Ride
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noRidesMessage}>No available rides found.</p>
        )}
      </div>
    </div>
  );
}
