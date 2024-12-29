"use client";
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import axios from 'axios';

export default function JourneyStatus({ userType }) {
  const [journeyStatus, setJourneyStatus] = useState('on-the-way'); // Example initial status
  const [journeyDetails, setJourneyDetails] = useState(null);

  useEffect(() => {
    const fetchJourneyDetails = async () => {
      try {
        const response = await axios.get('/api/journey/status'); // Fetch journey details from API
        setJourneyStatus(response.data.status);
        setJourneyDetails(response.data.details);
      } catch (error) {
        console.error('Error fetching journey details:', error);
      }
    };

    fetchJourneyDetails();
  }, []);

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h2 className={styles.heading}>Journey Status</h2>
        <div className={styles.statusContainer}>
          <p className={styles.journeyStatus}>
            Current Status: <strong>{journeyStatus.replace(/-/g, ' ')}</strong>
          </p>
          {journeyDetails && (
            <div className={styles.journeyDetails}>
              {userType === 'rider' ? (
                <>
                  <h3>Driver Details</h3>
                  <p><strong>Driver Name:</strong> {journeyDetails.driverName}</p>
                  <p><strong>Vehicle:</strong> {journeyDetails.vehicleDetails}</p>
                  <p><strong>Contact Number:</strong> {journeyDetails.driverContact}</p>
                </>
              ) : (
                <>
                  <h3>Rider Details</h3>
                  <p><strong>Rider Name:</strong> {journeyDetails.riderName}</p>
                  <p><strong>Contact Number:</strong> {journeyDetails.riderContact}</p>
                </>
              )}
              <h3>Journey Details</h3>
              <p><strong>Start Location:</strong> {journeyDetails.startLocation}</p>
              <p><strong>Destination:</strong> {journeyDetails.endLocation}</p>
              <p><strong>Start Time:</strong> {journeyDetails.startTime}</p>
              <p><strong>Estimated Arrival:</strong> {journeyDetails.estimatedArrival}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
