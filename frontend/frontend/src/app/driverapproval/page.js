"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';

export default function DriverApprovalPage() {
  const [rideRequests, setRideRequests] = useState([]);
  const [approvedRides, setApprovedRides] = useState([]);

  useEffect(() => {
    // Fetch ride requests from the backend
    const fetchRideRequests = async () => {
      try {
        const response = await axios.get('/api/rides/requests');
        setRideRequests(response.data);
      } catch (error) {
        console.error('Error fetching ride requests:', error);
      }
    };

    // Fetch approved rides from the backend
    const fetchApprovedRides = async () => {
      try {
        const response = await axios.get('/api/rides/approved');
        setApprovedRides(response.data);
      } catch (error) {
        console.error('Error fetching approved rides:', error);
      }
    };

    fetchRideRequests();
    fetchApprovedRides();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post(`/api/rides/approve`, { id });
      setRideRequests(rideRequests.filter((request) => request.id !== id));
      const approvedRequest = rideRequests.find((request) => request.id === id);
      setApprovedRides([...approvedRides, approvedRequest]);
    } catch (error) {
      console.error('Error approving ride request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`/api/rides/reject`, { id });
      setRideRequests(rideRequests.filter((request) => request.id !== id));
    } catch (error) {
      console.error('Error rejecting ride request:', error);
    }
  };

  const handleStartJourney = async (id) => {
    try {
      await axios.post(`/api/rides/start`, { id });
      // Optionally update the state or fetch rides again to reflect the start
    } catch (error) {
      console.error('Error marking journey as started:', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.post(`/api/rides/complete`, { id });
      setApprovedRides(approvedRides.filter((ride) => ride.id !== id));
    } catch (error) {
      console.error('Error marking ride as completed:', error);
    }
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h2 className={styles.heading}>Ride Requests for Approval</h2>
        {rideRequests.length > 0 ? (
          rideRequests.map((request) => (
            <div key={request.id} className={styles.rideRequest}>
              <h3>{request.riderName}</h3>
              <p>
                <strong>Pickup Location:</strong> {request.pickupLocation}
              </p>
              <p>
                <strong>Destination:</strong> {request.destination}
              </p>
              <p>
                <strong>Seats Requested:</strong> {request.seatsRequested}
              </p>
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.button} ${styles.approveButton}`}
                  onClick={() => handleApprove(request.id)}
                >
                  Approve
                </button>
                <button
                  className={`${styles.button} ${styles.rejectButton}`}
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noRequests}>No ride requests at the moment.</p>
        )}

        <h2 className={styles.heading}>Approved Rides</h2>
        {approvedRides.length > 0 ? (
          approvedRides.map((ride) => (
            <div key={ride.id} className={styles.rideRequest}>
              <h3>{ride.riderName}</h3>
              <p>
                <strong>Pickup Location:</strong> {ride.pickupLocation}
              </p>
              <p>
                <strong>Destination:</strong> {ride.destination}
              </p>
              <p>
                <strong>Seats Requested:</strong> {ride.seatsRequested}
              </p>
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.button} ${styles.startButton}`}
                  onClick={() => handleStartJourney(ride.id)}
                >
                  Start Journey
                </button>
                <button
                  className={`${styles.button} ${styles.completeButton}`}
                  onClick={() => handleComplete(ride.id)}
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noRequests}>No approved rides at the moment.</p>
        )}
      </div>
    </div>
  );
}
