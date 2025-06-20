import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you requested does not exist.</p>
    </div>
  );
}
