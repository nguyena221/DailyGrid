import "../../styles/WeekGrid.css";

// useMemo : caches computed values (so we don't recompute on every render)
import { useMemo } from "react";

// defines types & vars it can accept (Props)
type WeekGridProps = {
  date: Date;                                               // required: controlled by parent/header
  startOnMonday?: boolean;                                   // optional ? if true -> Mon-Sun ; if false -> Sun-Sat
  showHours?: boolean;                                       // optional ? if true -> show hourly grid
  startHour?: number;                                        // optional ? first hour shown (default 9)
  endHour?: number;                                          // optional ? last hour shown (default 20)
  renderCell?: (day: Date, hour?: number) => React.ReactNode;// optional ? if showHours=false, hour is undefined
  onCellClick?: (day: Date, hour?: number) => void;          // optional ? click day area or hour cell
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

  if (!startOnMonday) return addDays(x, -day);

  // convert Sun-based index to Mon-based index
  const mondayIndex = (day + 6) % 7;
  return addDays(x, -mondayIndex);
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
  showHours = false,
  startHour = 9,
  endHour = 20,
  renderCell,
  onCellClick,
}: WeekGridProps) {
  const anchor = startOfDay(date);

  const { days, hours } = useMemo(() => {
    const weekStart = startOfWeek(anchor, startOnMonday);
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const hours = Array.from(
      { length: endHour - startHour + 1 },
      (_, i) => startHour + i
    );

    return { days, hours };
  }, [anchor, startOnMonday, startHour, endHour]);

  return (
    <div className="week">
      {/* Header row */}
      <div
        className="week-header"
        style={{
          gridTemplateColumns: showHours ? "72px repeat(7, 1fr)" : "repeat(7, 1fr)",
        }}
      >
        {showHours && <div className="week-corner" />}

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

      {/* BODY */}
      {showHours ? (
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
          <div className="week-grid" role="grid" aria-label="Weekly hourly grid">
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
      ) : (
        /* No-hour view: one big “day column” area per day */
        <div className="week-nohours">
          {days.map((day) => (
            <button
              key={day.toISOString()}
              className="week-daycolumn"
              type="button"
              onClick={() => onCellClick?.(day)}
            >
              {renderCell?.(day)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
