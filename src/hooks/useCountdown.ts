import { useState, useEffect } from 'react';
import { CountdownTime } from '../types';
import { calculateCountdown } from '../utils/time';

export function useCountdown(deadlineISO: string): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>(() => calculateCountdown(deadlineISO));

  useEffect(() => {
    // Initial calculation
    setCountdown(calculateCountdown(deadlineISO));

    const interval = window.setInterval(() => {
      setCountdown(calculateCountdown(deadlineISO));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [deadlineISO]);

  return countdown;
}
