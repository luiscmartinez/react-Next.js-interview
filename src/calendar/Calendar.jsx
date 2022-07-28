import { useState } from "react";
// dayjs
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
// components
import { Date } from "./Date";
// css
import styles from "./cal.module.scss";
dayjs.extend(isToday);
const now = dayjs();
export const Calendar = () => {
  const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // react app state
  const [currentMonth, setCurrentMonth] = useState(now.date(1));
  // dayjs stuff
  const daysInMonth = currentMonth.daysInMonth();
  const firstOfTheMonth = currentMonth.date(1);
  const startingDay = currentMonth.startOf("month").day();
  const daysInFirstWeek = 7 - startingDay;
  const remainDays = daysInMonth - daysInFirstWeek;
  const weeksToDisplay = Math.ceil(remainDays / 7);
  const daysOfAWeek = Array.from({ length: 7 }, (v, i) => i);
  const weeks = Array.from({ length: weeksToDisplay + 1 }, (v, i) => i);
  const lastDay = currentMonth.endOf("month").day();
  let dayCounter = -1;

  console.log("DAYS IN MONTH", daysInMonth);
  console.log("END OF MONTH day", lastDay);

  const renderDay = (date, isGrayOut) => {
    return <Date date={date} isGrayOut={isGrayOut} />;
  };

  const changeMonth = (step) => {
    setCurrentMonth((prev) => prev.add(step, "month"));
  };
  return (
    <div>
      <div className={styles.calYears}>
        <button onClick={() => changeMonth(-1)}>⬅️</button>
        <h2>{currentMonth.format("MMMM YYYY")}</h2>
        <button onClick={() => changeMonth(1)}>➡️</button>
      </div>
      <div className={styles.calHeader}>
        {weekdaysShort.map((dayName) => {
          return <div className="header-item">{dayName} </div>;
        })}
      </div>
      <div>
        {weeks.map((week) => {
          return (
            <div className={styles.calWeek}>
              {daysOfAWeek.map((dayBox, i) => {
                // handle displaying previous month days
                if (dayBox < startingDay && week === 0) {
                  return renderDay(
                    firstOfTheMonth.subtract(startingDay - dayBox, "day"),
                    true
                  );
                }
                // gray out the displaying dates of next month
                dayCounter++;
                const isGrayedOut = dayCounter >= daysInMonth;

                return renderDay(
                  firstOfTheMonth.add(dayCounter, "day"),
                  isGrayedOut
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
