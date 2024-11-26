
export const formatDateTime = (date: string, time: string) =>
  `${new Date(date).toLocaleDateString()} ${time}`;

export const calculateLeaveDays = (leave: any) => {
  const startDate = new Date(leave.startDate);
  const endDate = new Date(leave.endDate);
  if (startDate.toDateString() === endDate.toDateString()) {
    const startDateDuration =
      parseFloat(leave.startDateEndTime) - parseFloat(leave.startDateStartTime);
    return startDateDuration / 8;
  }
  const totalDays =
    Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) +
    1;
  const startDateDuration =
    parseFloat(leave.startDateEndTime) - parseFloat(leave.startDateStartTime);
  const endDateDuration =
    parseFloat(leave.endDateEndTime) - parseFloat(leave.endDateStartTime);
  const totalDuration = startDateDuration + endDateDuration;
  return totalDays - 2 + totalDuration / 8;
};