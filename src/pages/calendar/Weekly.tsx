import { useState } from "react";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import WeekGrid from "../../components/calendar/WeekGrid";
import "../../styles/Weekly.css";

export default function Weekly() {
  const [date, setDate] = useState<Date>(new Date());
  const [showHours, setShowHours] = useState<boolean>(false);

  return (
    <div>
      <CalendarHeader view="weekly" date={date} onDateChange={setDate} />

      <div className="weekly-controls">
        <label className="switch">
          <input
            type="checkbox"
            checked={showHours}
            onChange={(e) => setShowHours(e.target.checked)}
          />
          <span className="slider" />
        </label>
        <span className="switch-label">Hourly</span>
      </div>

      <WeekGrid
        date={date}
        startOnMonday={false}
        showHours={showHours}
        startHour={9}
        endHour={20}
        onCellClick={(day, hour) => console.log("clicked", day, hour)}
        renderCell={() => null}
      />
    </div>
  );
}
