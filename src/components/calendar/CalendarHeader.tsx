import "../../styles/CalendarHeader.css";

// type: a strict list of allowed values tells Typescript what values should look like
// "|" : or; must be one of these values
type View = "daily" | "weekly" | "monthly" | "yearly";

// creating a new type "Prop" - describes the shape of an object; everything inside is required
type Props = {
  view: View;                               // view : property name; has type "View" (above)
  date: Date;                               // date: is a JS Date obj
  onDateChange: (next: Date) => void;       // onDateChange : callback function that takes in a Date & returns nothing
  onToday?: () => void;                     // ? : is optional; the obj can include/not; no arguments; return nothing
};

// creates new date; when shifted forwards/backwards; doesn't change original date (bc Date modifies that same obj in memory)
// parameters: Date object & n : how many days to move
    // +1 = tomorrow; -1 = yesterday; +7 = next week
function addDays(d: Date, n: number) {
  const x = new Date(d);                // creates copy of the date; so it doesn't change original
  x.setDate(x.getDate() + n);           // get the date -> does the math -> sets the date
  return x;                             // returns the new adjusted date
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
// every date belongs to a week block; calendars are stacked rows of week -> must know the Sunday (for the right row/alignment)
function startOfWeekSunday(d: Date) {
  const x = new Date(d);
  x.setDate(x.getDate() - x.getDay());      // getDay() : returns day of the week Sunday = 0 - 6
  x.setHours(0, 0, 0, 0);
  return x;
}

// creates human-readable header text
function formatHeaderTitle(view: View, date: Date) {
  const locale = undefined;       // locale : tells browswer language and regional formate to use; "undefined" = use whatever the user's browser is set to

  // one date
  if (view === "daily") {
    return date.toLocaleDateString(locale, {
      // gets users local date format
      weekday: "long",       // e/data type
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  // week range
  if (view === "weekly") {
    // finds the week range (Sun -> Sat)
    const start = startOfWeekSunday(date);
    const end = addDays(start, 6);

    // detects boundaries; if they are in the same year (ex: Dec 29 - Jan 4)
    const sameYear = start.getFullYear() === end.getFullYear();

    // formates the start dates; includes year if crosses
    const startStr = start.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      ...(sameYear ? {} : { year: "numeric" }),
    });

    // formates end dates; year is always shown
    const endStr = end.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return `${startStr} – ${endStr}`;
  }

  // returns month and year
  if (view === "monthly") {
    return date.toLocaleDateString(locale, { month: "long", year: "numeric" });
  }

  // year/fallback
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
  }
}

// puts it all together; receives props
function CalendarHeader({ view, date, onDateChange, onToday }: Props) {
  const title = formatHeaderTitle(view, date); // computes text shown    

  const prev = () => onDateChange(getNextDate(view, date, -1)); // navigation helpers; runs function; gets the newDate & calculation -> updates date with onDateChange
  const next = () => onDateChange(getNextDate(view, date, 1));

  // render UI
  return (
    <div className="cal-header">
      <div className="cal-header-center">
        <button type="button" onClick={prev} aria-label="Previous">
          ←
        </button>

        <h2 className="cal-header-title">{title}</h2>

        <button type="button" onClick={next} aria-label="Next">
          →
        </button>
      </div>

      <div className="cal-header-actions">
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
