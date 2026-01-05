import { useState } from "react";
import CalendarHeader from "../../components/calendar/CalendarHeader";

function Daily() {
  const [date, setDate] = useState(() => new Date());

  return (
    <CalendarHeader view="daily" date={date} onDateChange={setDate} />
  );
}

export default Daily;
  