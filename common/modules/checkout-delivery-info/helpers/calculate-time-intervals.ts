export const calculateTimeIntervals = () => {
  const now = new Date(
    new Date("Mon Oct 14 2024 12:00:53 GMT+0300 (Москва, стандартное время)").getTime() + 10 * 60 * 1000
  );
  const currentHour = now.getHours();
  const currentMinute = Math.ceil(now.getMinutes() / 15) * 15;

  const slots = ["Побыстрее"];
  const endHour = 23;

  for (let hour = currentHour; hour <= endHour; hour++) {
    for (let minute = hour === currentHour ? currentMinute : 0; minute < 60; minute += 15) {
      const start = `${hour}:${minute < 10 ? "0" + minute : minute}`;
      const endMinute = minute + 30;
      const endHourAdjusted = hour + Math.floor(endMinute / 60);
      const endMinuteAdjusted = endMinute % 60;
      const end = `${endHourAdjusted}:${
        endMinuteAdjusted < 10 ? "0" + endMinuteAdjusted : endMinuteAdjusted
      }`;

      if (endHourAdjusted < 24) {
        slots.push(`${start} - ${end}`);
      }
    }
  }

  return slots;
};
