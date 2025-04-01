// Функция возвращает остаток от деления total на 60
function calculateSeconds() {
    let input = document.getElementById("totalSeconds");
    let output = document.getElementById("secondsResult");

    if (input && output) {
        let total = parseInt(input.value);
        if (!isNaN(total)) {
            output.textContent = total % 60;
        } else {
            output.textContent = "Введите число!";
        }
    } else {
        console.error("Input or output element not found!");
    }
}

// Функция вычисляет периметр правильного многоугольника
function calculatePerimeter() {
    let side = parseFloat(document.getElementById("sideInput").value);
    let count = parseInt(document.getElementById("countInput").value);
    alert(`Периметр: ${side * count}`);
}

// Функция FizzBuzz
function runFizzBuzz() {
    for (let i = 1; i <= 10; i++) {
        if (i % 3 === 0 && i % 5 === 0) console.log("fizzbuzz");
        else if (i % 3 === 0) console.log("fizz");
        else if (i % 5 === 0) console.log("buzz");
        else console.log(i);
    }
}

// Функция вычисляет среднее арифметическое
function calculateAverage() {
    let a = parseFloat(document.getElementById("num1").value);
    let b = parseFloat(document.getElementById("num2").value);
    let c = parseFloat(document.getElementById("num3").value);
    alert(`Среднее арифметическое: ${(a + b + c) / 3}`);
}

// Проверка делимости числа
function checkDivisibility() {
    let n = parseInt(document.getElementById("divNum").value);
    let x = parseInt(document.getElementById("divX").value);
    let y = parseInt(document.getElementById("divY").value);
    let message = `Число ${n} `;
    if (n % x === 0 && n % y === 0) message += `делится на ${x} и на ${y}`;
    else if (n % x === 0) message += `делится на ${x}, но не на ${y}`;
    else if (n % y === 0) message += `делится на ${y}, но не на ${x}`;
    else message += `не делится на ${x} и ${y}`;
    alert(message);
}

// Генерация случайного массива и расчет его параметров
function generateAndProcessArray() {
    let array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100 - 50));
    console.log("Сгенерированный массив:", array);
    console.log("Максимальное значение:", Math.max(...array));
    console.log("Минимальное значение:", Math.min(...array));
    let sum = array.reduce((acc, val) => acc + val, 0);
    console.log("Сумма всех элементов:", sum);
    console.log("Среднее арифметическое:", sum / array.length);
    console.log("Непарные значения:", array.filter(num => num % 2 !== 0));
}

// Генерация 5x5 массива и его обработка
function generateAndProcessMatrix() {
    let matrix = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.random() < 0.5 ? Math.floor(Math.random() * 100 - 50) : String.fromCharCode(65 + Math.floor(Math.random() * 26))));
    console.log("Оригинальная матрица:", matrix);
    let modifiedMatrix = matrix.map((row, i) => row.map((val, j) => (i === j && typeof val === "number") ? (val < 0 ? 0 : 1) : val));
    console.log("Измененная матрица:", modifiedMatrix);
}

// Калькулятор
function calculate() {
    let num1 = parseFloat(document.getElementById("calcNum1").value);
    let num2 = parseFloat(document.getElementById("calcNum2").value);
    let operation = document.getElementById("operation").value;
    let result;

    switch (operation) {
        case "add": result = num1 + num2; break;
        case "sub": result = num1 - num2; break;
        case "mul": result = num1 * num2; break;
        case "div": result = num2 !== 0 ? num1 / num2 : "Ошибка: деление на ноль"; break;
    }
    document.getElementById("calcResult").textContent = result;
}

// Анализ числа
function analyzeNumber() {
    let n = parseInt(document.getElementById("analyzeNum").value);
    let result = `${n >= 0 ? "Положительное" : "Отрицательное"}, ${isPrime(n) ? "Простое" : "Не простое"}`;
    [2, 3, 5, 6, 9].forEach(x => result += `\nДелится на ${x}: ${n % x === 0}`);
    alert(result);
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Переворот массива и возведение в квадрат
function reverseAndSquareArray() {
    let input = document.getElementById("reverseArrayInput").value.split(",").map(el => isNaN(el) ? el : Math.pow(Number(el), 2));
    document.getElementById("reversedArrayResult").textContent = input.reverse().join(", ");
}

// Удаление дубликатов из массива
function removeDuplicatesArray() {
    let input = document.getElementById("uniqueArrayInput").value.split(",").map(el => el.trim());
    document.getElementById("uniqueArrayResult").textContent = [...new Set(input)].join(", ");
}