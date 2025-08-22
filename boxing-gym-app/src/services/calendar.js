export async function createEvent(event) {
  const response = await fetch("http://localhost:5000/api/calendar/book-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  return await response.json();
}
