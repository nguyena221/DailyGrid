import { useState } from "react";
import CalendarHeader from "../../components/calendar/CalendarHeader";

function Weekly() {
  const [date, setDate] = useState(() => new Date());

  return (
    <CalendarHeader view="weekly" date={date} onDateChange={setDate} />
  );
}

export default Weekly;