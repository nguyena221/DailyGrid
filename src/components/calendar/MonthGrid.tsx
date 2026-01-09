// MonthGrid.tsx
import "../../styles/MonthGrid.css";

// useMemo : caches computed values (so we don't recompute on every render)
import { useMemo } from "react";

// defines types & vars it can accept (Props)
type MonthGridProps = {
  date: Date;                                              // required: the month/week anchor controlled by parent
  weekStartsOnMonday?: boolean;                             // optional ? if true -> Mon-Sun ; if false -> Sun-Sat
  renderDayContent?: (date: Date) => React.ReactNode;       // optional ? lets parent render extra content in a day cell
  onDayClick?: (date: Date) => void;                        // optional ? callback; returns the date they clicked
};

// resets a Date to midnight so date comparisons are reliable (sets time to zero)
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// returns a new Date that is `amount` days after `date`
function addDays(date: Date, amount: number): Date {
  const d = new Date(date);                                 // copy so we don't mutate original
  d.setDate(d.getDate() + amount);                          // move forward/backward by `amount` days
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

// finds the date that goes in the top-left cell (start of the grid)
function gridStartDate(firstOfMonth: Date, weekStartsOnMonday: boolean): Date {
  const d = startOfDay(firstOfMonth);
  const day = d.getDay();                                   // 0 Sun ... 6 Sat

  if (!weekStartsOnMonday) {
    return addDays(d, -day);                                 // go back to Sunday
  }

  // Convert Sun-based index to Mon-based index:
  // Sun(0)->6, Mon(1)->0, Tue(2)->1, ... Sat(6)->5
  const mondayIndex = (day + 6) % 7;
  return addDays(d, -mondayIndex);                           // go back to Monday
}

export default function MonthGrid({
  date,
  weekStartsOnMonday = false,
  renderDayContent,
  onDayClick,
}: MonthGridProps) {
  // viewDate is controlled by parent; we normalize to midnight for stable math
  const viewDate = startOfDay(date);

  // builds the 42 dates needed for a fixed 7x6 grid
  const { days } = useMemo(() => {
    const firstOfMonth = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      1
    );

    const start = gridStartDate(firstOfMonth, weekStartsOnMonday);

    // always 42 cells (6 rows x 7 columns)
    const days = Array.from({ length: 42 }, (_, i) => addDays(start, i));

    return { days };
  }, [viewDate, weekStartsOnMonday]);

  const today = startOfDay(new Date());
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const dowLabels = weekStartsOnMonday
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar">
      <div className="calendar-dow">
        {dowLabels.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((cellDate) => {
          const isOutsideMonth =
            cellDate.getMonth() !== currentMonth ||
            cellDate.getFullYear() !== currentYear;

          const isTodayCell = isSameDay(cellDate, today);

          return (
            <button
              key={cellDate.toISOString()}
              className={`day-cell ${isOutsideMonth ? "outside" : ""} ${
                isTodayCell ? "today" : ""
              }`}
              onClick={() => onDayClick?.(cellDate)}
              type="button"
            >
              <span className="date-number">{cellDate.getDate()}</span>
              {renderDayContent?.(cellDate)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
