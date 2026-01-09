// useState : stores components (like memory)
// useMemo : caches computed values (saves; so we dont have to load again) 
import { useMemo, useState } from "react";

// defines types & vars it can accept (Props)
type MonthGridProps = { 
  initialDate?: Date;                                       // optional ? if not set, has a default value
  weekStartsOnMonday?: boolean;                             // optional ? if true -> Mon ; if false -> Sun-Sat
  renderDayContent?: (date: Date) => React.ReactNode;       // optional ? can render content of that day
  onDayClick?: (date: Date) => void;                        // optional ? callback; returns the date they clicked 
};

// resets a Date to midnight so date comparisons are reliable (easier comparison; sets time to zero)
// comparisons still work even if one of hte times is zero

// "d: Date" : parameters
// "Date" : return type
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// returns a new Date that is `amount` days after `date`
function addDays(date: Date, amount: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}

// true if both dates are the same calendar day (ignores time DIFF)
function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// finds the date the goes in the top left cell
function gridStartDate(firstOfMonth: Date, weekStartsOnMonday: boolean): Date {
  const d = startOfDay(firstOfMonth);
  const day = d.getDay(); // 0 Sun ... 6 Sat

  if (!weekStartsOnMonday) {
    return addDays(d, -day);
  }

  // Convert Sun-based index to Mon-based index:
  // Sun(0)->6, Mon(1)->0, Tue(2)->1, ... Sat(6)->5
  const mondayIndex = (day + 6) % 7;
  return addDays(d, -mondayIndex);
}

export default function MonthGrid({
  initialDate = new Date(),
  weekStartsOnMonday = false,
  renderDayContent,
  onDayClick,
}: MonthGridProps) {
  // Anchor month being displayed
  const [viewDate, setViewDate] = useState<Date>(() => startOfDay(initialDate));

  const { monthLabel, days } = useMemo(() => {
    const firstOfMonth = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      1
    );

    const monthLabel = firstOfMonth.toLocaleString(undefined, {
      month: "long",
      year: "numeric",
    });

    const start = gridStartDate(firstOfMonth, weekStartsOnMonday);

    // Always 42 cells (6 rows x 7 columns)
    const days = Array.from({ length: 42 }, (_, i) => addDays(start, i));

    return { monthLabel, days };
  }, [viewDate, weekStartsOnMonday]);

  const today = startOfDay(new Date());
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const dowLabels = weekStartsOnMonday
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function goPrevMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function goNextMonth() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function goToday() {
    const now = new Date();
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
  }

  return (
    <div className="calendar">
      <header className="calendar-header">
        <button onClick={goPrevMonth} aria-label="Previous month">
          ‹
        </button>
        <h2>{monthLabel}</h2>
        <button onClick={goNextMonth} aria-label="Next month">
          ›
        </button>
        <button onClick={goToday}>Today</button>
      </header>

      <div className="calendar-dow">
        {dowLabels.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((date) => {
          const isOutsideMonth =
            date.getMonth() !== currentMonth ||
            date.getFullYear() !== currentYear;

          const isTodayCell = isSameDay(date, today);

          return (
            <button
              key={date.toISOString()}
              className={`day-cell ${isOutsideMonth ? "outside" : ""} ${
                isTodayCell ? "today" : ""
              }`}
              onClick={() => onDayClick?.(date)}
              type="button"
            >
              <span className="date-number">{date.getDate()}</span>
              {renderDayContent?.(date)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
