"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';

export default function RideBooking() {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false); // State for toggling dropdown menu

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.container}>
        {/* Profile Dropdown */}
        <div className={styles.profileContainer}>
          <button className={styles.profileButton} onClick={toggleDropdown}>
            Profile
          </button>
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <ul>
                <li onClick={() => router.push('/riderprofile')}>View Profile</li>
                <li onClick={() => router.push('/home')}>Logout</li>
                <li onClick={() => router.push('/home')}>Delete</li>
              </ul>
            </div>
          )}
        </div>

        <h2 className={styles.heading}>Book a Ride</h2>
        
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={() => router.push('/availablerides')} style={{ marginRight: '10px' }}>
            Find Rides
          </button>
          <button className={styles.button} onClick={() => router.push('/riderapprove')}>
            Booking Status
          </button>
        </div>
      </div>
    </div>
  );
}
