'use client';

import { useState, useEffect } from 'react';

interface Props {
  targetDate: string;
  label: string;
}

export default function CountdownTimer({ targetDate, label }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div className="flex flex-col items-center gap-3.5">
      <p className="eyebrow">{label}</p>
      <div className="flex items-center gap-2.5">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2.5">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-[76px] md:h-[76px] rounded-xl flex items-center justify-center font-display text-3xl md:text-4xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)', color: 'var(--text)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] tracking-[0.16em] uppercase mt-2 font-semibold" style={{ color: 'var(--muted)' }}>{unit.label}</div>
            </div>
            {i < 3 && <span className="font-display text-xl mb-5" style={{ color: 'var(--muted)' }}>:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
