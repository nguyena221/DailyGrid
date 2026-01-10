import { useState } from "react";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import WeekGrid from "../../components/calendar/WeekGrid";

export default function Weekly() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div>
      <CalendarHeader view="weekly" date={date} onDateChange={setDate} />

      <WeekGrid
        date={date}
        startOnMonday={false}
        startHour={9}
        endHour={20}
        onCellClick={(day, hour) => console.log("clicked", day, hour)}
        renderCell={() => null}
      />
    </div>
  );
}
