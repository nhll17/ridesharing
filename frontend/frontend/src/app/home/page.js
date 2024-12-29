"use client";
import styles from './page.module.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className={styles.gradientBackground}>
      <div className={styles.homeContainer}>
        <h1 className={styles.homeHeading}>Welcome to Ride Sharing</h1>
        <p className={styles.homeText}>
          Your one-stop solution for convenient, affordable, and comfortable rides. Our platform connects drivers and passengers seamlessly, making every trip a breeze.
        </p>
        <Link href="/login">
          <button className={styles.homeButton}>Book a Ride Now</button>
        </Link>
      </div>

      {/* About Section */}
      <div className={styles.aboutContainer}>
        <h2 className={styles.aboutHeading}>About Us</h2>
        <p className={styles.aboutText}>
          At Ride Sharing, we believe in transforming the way people travel by creating a community-driven platform. Whether you’re a driver looking to share your ride or a passenger seeking an affordable trip, we’re here to connect you with the perfect match. 
        </p>
        <p className={styles.aboutText}>
          Our mission is to make commuting hassle-free, eco-friendly, and economical. By sharing rides, we help reduce traffic congestion, lower carbon footprints, and offer a flexible, sustainable alternative to traditional transportation.
        </p>
        <h3 className={styles.aboutSubheading}>Why Choose Us?</h3>
        <ul className={styles.aboutList}>
          <li>Easy-to-use platform for booking and managing rides</li>
          <li>Secure and reliable with verified drivers and passengers</li>
          <li>Cost-effective alternative to taxis and ride-hailing services</li>
          <li>Environmentally friendly by reducing vehicle emissions</li>
        </ul>
        <Link href="/about">
          <button className={styles.learnMoreButton}>Learn More About Us</button>
        </Link>
      </div>
    </div>
  );
}
