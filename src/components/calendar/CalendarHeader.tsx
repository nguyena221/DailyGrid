import "../../styles/CalendarHeader.css";
import { ChevronLeft, ChevronRight, Clock, X } from "lucide-react";

// type: a strict list of allowed values tells TypeScript what values should look like
// "|" : or; must be one of these values
type View = "daily" | "weekly" | "monthly" | "yearly";

// creating a new type "Props" - describes the shape of an object
type Props = {
  view: View;                              // view : property name; has type "View" (above)
  date: Date;                              // date : JS Date object
  onDateChange: (next: Date) => void;      // callback to update the date
  onToday?: () => void;                   // optional; jumps to today

  showHourlyToggle?: boolean;              // optional: whether to show the toggle in header
  hourlyEnabled?: boolean;                 // optional: current toggle value
  onHourlyToggle?: (next: boolean) => void;// optional: callback when toggled
};

// creates new date; when shifted forwards/backwards; doesn't change original date
// parameters: Date object & n : how many days to move
// +1 = tomorrow; -1 = yesterday; +7 = next week
function addDays(d: Date, n: number) {
  const x = new Date(d);                   // creates copy of the date
  x.setDate(x.getDate() + n);              // updates day value
  return x;                                // returns adjusted date
}

function addMonths(d: Date, n: number) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + n);
  return x;
}

function addYears(d: Date, n: number) {
  const x = new Date(d);
  x.setFullYear(x.getFullYear() + n);
  return x;
}

// gets the date (Sunday) of any given date
// calendars are stacked rows of weeks -> need consistent starting point
function startOfWeekSunday(d: Date) {
  const x = new Date(d);
  x.setDate(x.getDate() - x.getDay());     // getDay(): Sunday = 0
  x.setHours(0, 0, 0, 0);                  // normalize time
  return x;
}

// creates human-readable header text
function formatHeaderTitle(view: View, date: Date) {
  const locale = undefined;                // use browser locale

  // daily view (single date)
  if (view === "daily") {
    return date.toLocaleDateString(locale, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  // weekly view (Sun -> Sat range)
  if (view === "weekly") {
    const start = startOfWeekSunday(date);
    const end = addDays(start, 6);

    // checks if week crosses into another year
    const sameYear = start.getFullYear() === end.getFullYear();

    const startStr = start.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      ...(sameYear ? {} : { year: "numeric" }),
    });

    const endStr = end.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return `${startStr} – ${endStr}`;
  }

  // monthly view
  if (view === "monthly") {
    return date.toLocaleDateString(locale, {
      month: "long",
      year: "numeric",
    });
  }

  // yearly view / fallback
  return String(date.getFullYear());
}

// gets new date when user clicks prev or next
function getNextDate(view: View, date: Date, dir: 1 | -1) {
  switch (view) {
    case "daily":
      return addDays(date, dir);
    case "weekly":
      return addDays(date, dir * 7);
    case "monthly":
      return addMonths(date, dir);
    case "yearly":
      return addYears(date, dir);
    default:
      return date;
  }
}

// main header component
function CalendarHeader({
  view,
  date,
  onDateChange,
  onToday,
  showHourlyToggle,
  hourlyEnabled,
  onHourlyToggle,
}: Props) {
  const title = formatHeaderTitle(view, date); // computes text shown in header

  const prev = () =>
    onDateChange(getNextDate(view, date, -1)); // go backward
  const next = () =>
    onDateChange(getNextDate(view, date, 1));  // go forward

  return (
    <div className="cal-header">
      <div className="cal-header-center">
        <button type="button" onClick={prev} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>

        <h2 className="cal-header-title">{title}</h2>

        <button type="button" onClick={next} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="cal-header-actions">
        {showHourlyToggle && (
          <div className="switch-tooltip">
            <label className="switch">
              <input
                type="checkbox"
                checked={!!hourlyEnabled}
                onChange={(e) => onHourlyToggle?.(e.target.checked)}
              />
              <span className="slider">
                <span className="knob">
                  {hourlyEnabled ? <Clock size={14} /> : <X size={14} />}
                </span>
              </span>
            </label>

            <span className="tooltip">Hourly view</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => (onToday ? onToday() : onDateChange(new Date()))}
        >
          Today
        </button>
      </div>
    </div>
  );
}

export default CalendarHeader;
