export function getFormattedDateTime() {
  // Get today's date
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const hours = today.getHours();
  const minutes = String(today.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;

  const formattedDateTime = `${day}/${month}/${year} - ${formattedHours}:${minutes}${ampm}`;
  return formattedDateTime;
}

