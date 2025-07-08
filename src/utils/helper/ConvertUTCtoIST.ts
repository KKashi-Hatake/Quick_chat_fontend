export default function convertUTCToIST(utcDateString: Date | string): string {
  const date = new Date(utcDateString); // Treat it as UTC

  return date.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}