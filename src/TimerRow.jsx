import { useState, useEffect } from "react";
import FlipCard from "./FlipCard";
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { Trash2, Edit2, Maximize2 } from "lucide-react";

const TimerRow = ({ id, title, date, theme, onDelete, onEdit, onSelect, isFullscreen = false }) => {
  const [time, setTime] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const targetDate = new Date(date);
      const isPast = now > targetDate;
      const start = isPast ? targetDate : now;
      const end = isPast ? now : targetDate;

      setTime({
        years: differenceInYears(end, start),
        months: differenceInMonths(end, start) % 12,
        days: differenceInDays(end, start) % 30,
        hours: differenceInHours(end, start) % 24,
        minutes: differenceInMinutes(end, start) % 60,
        seconds: differenceInSeconds(end, start) % 60
      });
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [date]);

  // --- FULLSCREEN MODE ---
  if (isFullscreen) {
    const bgClass = theme === 'casio' ? 'bg-zinc-800' : theme === 'nixie' ? 'bg-black' : 'bg-gray-50 dark:bg-zinc-950';
    
    return (
      <div className={`flex flex-col items-center justify-center h-screen w-screen p-4 animate-in zoom-in-95 duration-500 ${bgClass}`}>
        <h1 className={`text-[4vw] md:text-[2vw] font-bold mb-[4vh] tracking-tight text-center uppercase opacity-80 ${theme === 'nixie' ? 'text-orange-900' : 'text-gray-500'}`}>
          {title}
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {time.years > 0 && <FlipCard number={time.years} unit="Yrs" isFullscreen={true} theme={theme} />}
          <FlipCard number={time.months} unit="Mos" isFullscreen={true} theme={theme} />
          <FlipCard number={time.days} unit="Days" isFullscreen={true} theme={theme} />
          <FlipCard number={time.hours} unit="Hrs" isFullscreen={true} theme={theme} />
          <FlipCard number={time.minutes} unit="Min" isFullscreen={true} theme={theme} />
          <FlipCard number={time.seconds} unit="Sec" isFullscreen={true} theme={theme} />
        </div>
      </div>
    );
  }

  // --- DASHBOARD MODE ---
  return (
    <div 
      onClick={() => onSelect(id)}
      className="relative group bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg dark:hover:bg-zinc-900/60 transition-all cursor-pointer hover:border-cyan-500/30"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-200 tracking-tight flex items-center gap-2">
            {title} <Maximize2 size={12} className="text-gray-400 dark:text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity"/>
          </h3>
          <p className="text-xs text-gray-500 dark:text-zinc-500 font-mono mt-1">
            {new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); onEdit(id); }} className="text-gray-400 hover:text-cyan-500 transition-colors p-2"><Edit2 size={18} /></button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(id); }} className="text-gray-400 hover:text-red-500 transition-colors p-2"><Trash2 size={18} /></button>
        </div>
      </div>

      {/* CHANGED BACK: flex-wrap + justify-center for mobile */}
      <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start items-center">
        {time.years > 0 && <FlipCard number={time.years} unit="Yrs" theme={theme} />}
        <FlipCard number={time.months} unit="Mos" theme={theme} />
        <FlipCard number={time.days} unit="Days" theme={theme} />
        <FlipCard number={time.hours} unit="Hrs" theme={theme} />
        <FlipCard number={time.minutes} unit="Min" theme={theme} />
        <FlipCard number={time.seconds} unit="Sec" theme={theme} />
      </div>
    </div>
  );
};

export default TimerRow;