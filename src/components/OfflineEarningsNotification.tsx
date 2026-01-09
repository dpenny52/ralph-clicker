interface OfflineEarningsNotificationProps {
  earnings: string;
  onDismiss: () => void;
}

export function OfflineEarningsNotification({
  earnings,
  onDismiss,
}: OfflineEarningsNotificationProps) {
  return (
    <div className="offline-earnings-notification">
      <div className="notification-content">
        <h3>Welcome back!</h3>
        <p>You earned {earnings} gold while away!</p>
        <button onClick={onDismiss}>Collect</button>
      </div>
    </div>
  );
}
