// ------------------------------------
//       Format Time
//-----------------------------------------
export const formatTime = (dateString: string | Date): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
