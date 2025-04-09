// Об'єкт із назвами днів тижня двома мовами
const weekDays = {
    ua: ["Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота", "Неділя"],
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  };
  
  // Функція для введення мови
  function getLanguage() {
    while (true) {
      const langInput = prompt('Виберіть мову “ua” або “en”?').toLowerCase();
      if (langInput === 'ua' || langInput === 'en') {
        return langInput;
      } else {
        alert("Невірне значення мови. Спробуйте ще раз.");
      }
    }
  }
  
  // Функція для введення дня тижня
  function getDayNumber(lang) {
    const promptMessage = lang === 'ua'
      ? 'Введіть номер дня неділі від 1 до 7?'
      : 'Enter the day number of the week (from 1 to 7)?';
  
    while (true) {
      const dayInput = prompt(promptMessage);
      const dayNumber = parseInt(dayInput, 10);
  
      if (dayNumber >= 1 && dayNumber <= 7) {
        return dayNumber;
      } else {
        alert(lang === 'ua'
          ? 'Невірний ввід. Спробуйте ще раз.'
          : 'Invalid input. Please try again.');
      }
    }
  }
  
  // Основна функція
  function main() {
    const language = getLanguage(); // Запит мови
    const dayNumber = getDayNumber(language); // Запит дня
    const dayName = weekDays[language][dayNumber - 1]; // Отримання назви дня
    alert(dayName); // Виведення результату
  }
  
  // Запуск
  main();  