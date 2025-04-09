// script.js

// Масив днів тижня українською мовою
const days = [
    'неділя', 'понеділок', 'вівторок',
    'середа', 'четвер', 'п’ятниця', 'субота'
  ];
  
  // Масив назв місяців українською мовою
  const months = [
    'січня', 'лютого', 'березня', 'квітня',
    'травня', 'червня', 'липня', 'серпня',
    'вересня', 'жовтня', 'листопада', 'грудня'
  ];
  
  // Функція, що повертає та виводить поточний час у форматі:
  // 09:15:56, середа, 06 травня 2025 року
  function showCurrentTime() {
    const now = new Date();
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const dayOfWeek = days[now.getDay()];
    const day = String(now.getDate()).padStart(2, '0');
    const month = months[now.getMonth()];
    const year = now.getFullYear();
  
    const formattedTime = `${hours}:${minutes}:${seconds}, ${dayOfWeek}, ${day} ${month} ${year} року`;
  
    console.log(formattedTime);
  }
  
  // Виклик функції при завантаженні сторінки
  showCurrentTime();
  