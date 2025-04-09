// Функція для отримання поточного часу
function getCurrentTimestamp() {
    const now = new Date(); // Отримуємо поточний час
    const dd = String(now.getDate()).padStart(2, '0'); // День
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // Місяць
    const yyyy = now.getFullYear(); // Рік
  
    const hh = String(now.getHours()).padStart(2, '0'); // Година
    const min = String(now.getMinutes()).padStart(2, '0'); // Хвилини
    const ss = String(now.getSeconds()).padStart(2, '0'); // Секунди
  
    return `${dd}.${mm}.${yyyy} ${hh}:${min}:${ss}`; // Формат часу
}
  
// Основна функція гри
function playGame() {
    let playAgain = true; // Перемикач для повтору гри
  
    while (playAgain) { // Цикл гри
        const target = Math.floor(Math.random() * 51); // Випадкове число від 0 до 50
        let attempts = 0; // Лічильник спроб
        let guessed = false; // Статус відгаданого числа
  
        while (!guessed) { // Цикл для вгадування числа
            const input = prompt("Вгадай число від 0 до 50:"); // Запит числа у користувача
            const guess = Number(input); // Перетворення вводу на число
            attempts++; // Збільшення кількості спроб
  
            const timestamp = getCurrentTimestamp(); // Отримання часу
            let logMessage = `${timestamp} Спроба ${attempts}: число ${guess} – `; // Форматування повідомлення
  
            if (Number.isNaN(guess) || guess < 0 || guess > 50) { // Перевірка на правильність числа
                alert("Будь ласка, введи коректне число від 0 до 50.");
                continue; // Пропускаємо неправильний ввід
            }
  
            if (guess === target) { // Перевірка на вгадане число
                console.log(logMessage + "вірно!"); // Логування успіху
                alert(`За ${attempts} спроб ви вгадали число ${target}`);
                guessed = true; // Встановлюємо статус вгадано
            } else { // Якщо число не вгадано
                const diff = Math.abs(guess - target); // Різниця між числом і ціллю
                let hint = '';
  
                if (diff <= 2) hint = "гаряче"; // Близько до числа
                else if (diff <= 5) hint = "тепло"; // Помірна відстань
                else hint = "холодно"; // Далеко від числа
  
                console.log(logMessage + `не вірно (${hint})`); // Логування підказки
            }
        }
  
        playAgain = confirm("Бажаєш спробувати ще раз?"); // Питання на повтор гри
    }
}
  
// Запуск гри при завантаженні
playGame();