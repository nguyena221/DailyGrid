import { useState } from "react";
import MonthGrid from "../../components/calendar/MonthGrid";
import CalendarHeader from "../../components/calendar/CalendarHeader";

export default function Monthly() {
  // returns an array with two things : sata value & function to update that value
  // useState : gives your component memory
  // date : JS Date object
  // () => : lazy initialization
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div>
      <CalendarHeader
        view="monthly"
        date={date}
        onDateChange={setDate}
        onToday={() => setDate(new Date())}
      />

      <MonthGrid
        date={date}
        weekStartsOnMonday={false}
        onDayClick={(d) => console.log("clicked", d)}
        renderDayContent={(d) => null}
      />
    </div>
  );
}
  