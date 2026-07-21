import { useEffect, useState } from 'react';

export function calculateWeddingCountdown(targetDate, now = Date.now()) {
  const difference = Math.max(0, new Date(targetDate).getTime() - now);
  return [
    Math.floor(difference / 86_400_000),
    Math.floor((difference / 3_600_000) % 24),
    Math.floor((difference / 60_000) % 60),
    Math.floor((difference / 1_000) % 60),
  ];
}

export default function useWeddingCountdown(targetDate) {
  const [countdown, setCountdown] = useState(() => calculateWeddingCountdown(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(calculateWeddingCountdown(targetDate)), 1_000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return countdown;
}
