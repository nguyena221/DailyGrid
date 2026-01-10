import { useState } from "react";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import WeekGrid from "../../components/calendar/WeekGrid";
import "../../styles/Weekly.css";

export default function Weekly() {
  const [date, setDate] = useState(new Date());
  const [showHours, setShowHours] = useState(false);

  return (
    <div>
      <CalendarHeader
        view="weekly"
        date={date}
        onDateChange={setDate}
        showHourlyToggle
        hourlyEnabled={showHours}
        onHourlyToggle={setShowHours}
      />

      <WeekGrid
        date={date}
        showHours={showHours}
        startOnMonday={false}
        startHour={9}
        endHour={20}
        onCellClick={(day, hour) => console.log(day, hour)}
        renderCell={() => null}
      />
    </div>
  );
}
