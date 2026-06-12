// YYYY/MM/DD(weekDay)に変換
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  const weekday = weekdays[date.getDay()];

  return `${year}/${month}/${day}(${weekday})`;
};

// YYYY/MM/DD(weekDay) HH:MMに変換
export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  const hour = String(date.getHours()).padStart(2, "0");

  const minute = String(date.getMinutes()).padStart(2, "0");

  const weekday = weekdays[date.getDay()];

  return `${year}/${month}/${day}(${weekday}) ${hour}:${minute}`;
};
