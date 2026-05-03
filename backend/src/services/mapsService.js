// Service to generate Google Maps links and Calendar links

const generateMapsLink = (zipCodeOrAddress) => {
  if (!zipCodeOrAddress) return null;
  const encodedAddress = encodeURIComponent(zipCodeOrAddress + ' polling location');
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};

const generateCalendarLink = (eventName, dateStr, details) => {
  // Simple link generation for Google Calendar
  const encodedName = encodeURIComponent(eventName);
  const encodedDetails = encodeURIComponent(details);
  // Date format needs to be YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ
  // For MVP, we just use a generic query link or all day event format.
  // Assuming dateStr is simple like '20241105' (Nov 5, 2024)
  const dates = `${dateStr}/${dateStr}`; 
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedName}&dates=${dates}&details=${encodedDetails}`;
};

module.exports = {
  generateMapsLink,
  generateCalendarLink
};
