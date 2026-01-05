import { useState } from "react";
import CalendarHeader from "../../components/calendar/CalendarHeader";

function Yearly() {
  const [date, setDate] = useState(() => new Date());

  return (
    <CalendarHeader view="yearly" date={date} onDateChange={setDate} />
  );
}

export default Yearly;