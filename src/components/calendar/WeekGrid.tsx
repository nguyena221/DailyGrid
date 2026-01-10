import "../../styles/WeekGrid.css";

// useMemo : caches computed values (so we don't recompute on every render)
import { useMemo } from "react";

// defines types & vars it can accept (Props)
type WeekGridProps = {
  date: Date;                                              // required: anchor date controlled by parent/header
  startOnMonday?: boolean;                                  // optional ? if true -> Mon-Sun ; if false -> Sun-Sat
  startHour?: number;                                       // optional ? first hour shown (default 9)
  endHour?: number;                                         // optional ? last hour shown (default 20)
  renderCell?: (day: Date, hour: number) => React.ReactNode;// optional ? custom content inside each hour cell
  onCellClick?: (day: Date, hour: number) => void;          // optional ? callback for clicking an hour cell
};

// resets a Date to midnight so date comparisons are reliable
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// returns a new Date that is `amount` days after `date`
function addDays(date: Date, amount: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}

// gets the start of the week for a given date (Sun or Mon)
function startOfWeek(d: Date, startOnMonday: boolean): Date {
  const x = startOfDay(d);
  const day = x.getDay(); // 0 Sun ... 6 Sat

  if (!startOnMonday) {
    return addDays(x, -day); // go back to Sunday
  }

  // convert Sun-based index to Mon-based index
  const mondayIndex = (day + 6) % 7;
  return addDays(x, -mondayIndex); // go back to Monday
}

// formats "9 AM", "10 AM", etc.
function formatHourLabel(hour24: number): string {
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const ampm = hour24 < 12 ? "AM" : "PM";
  return `${hour12} ${ampm}`;
}

export default function WeekGrid({
  date,
  startOnMonday = false,
  startHour = 9,
  endHour = 20,
  renderCell,
  onCellClick,
}: WeekGridProps) {
  const anchor = startOfDay(date);

  const { weekStart, days, hours } = useMemo(() => {
    const weekStart = startOfWeek(anchor, startOnMonday);

    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const hours = Array.from(
      { length: endHour - startHour + 1 },
      (_, i) => startHour + i
    );

    return { weekStart, days, hours };
  }, [anchor, startOnMonday, startHour, endHour]);

  return (
    <div className="week">
      {/* Header row: blank corner + 7 day headers */}
      <div className="week-header">
        <div className="week-corner" />

        {days.map((d) => (
          <div key={d.toISOString()} className="week-dayhead">
            <div className="week-dayname">
              {d.toLocaleDateString(undefined, { weekday: "short" })}
            </div>
            <div className="week-daynum">
              {d.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </div>
          </div>
        ))}
      </div>

      {/* Body: left time column + grid */}
      <div className="week-body">
        {/* Time column */}
        <div className="week-times">
          {hours.map((h) => (
            <div key={h} className="week-time">
              {formatHourLabel(h)}
            </div>
          ))}
        </div>

        {/* Hour grid */}
        <div className="week-grid" role="grid" aria-label="Weekly calendar grid">
          {hours.map((hour) =>
            days.map((day) => (
              <button
                key={`${day.toISOString()}-${hour}`}
                className="week-cell"
                type="button"
                onClick={() => onCellClick?.(day, hour)}
              >
                {renderCell?.(day, hour)}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
