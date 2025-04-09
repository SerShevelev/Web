// Константа: коефіцієнт переводу з кВт у МВт
const KW_TO_MW = 1000;

// Базовий клас для всіх елементів мережі
class NetworkElement {
  // Повертає денну потужність (0 за замовчуванням)
  getDayPower() { return 0; }

  // Повертає нічну потужність (0 за замовчуванням)
  getNightPower() { return 0; }
}

// Клас електростанції
class PowerPlant extends NetworkElement {
  constructor(outputMW) {
    super();
    this.outputMW = outputMW; // МВт генерує і вдень, і вночі
  }

  getDayPower() { return this.outputMW; }     // Денна генерація
  getNightPower() { return this.outputMW; }   // Нічна генерація
}

// Клас сонячної панелі
class SolarPanel extends NetworkElement {
  constructor(outputMW) {
    super();
    this.outputMW = outputMW; // Генерація вдень (1–5), вночі = 0
  }

  getDayPower() { return this.outputMW; }   // Генерація вдень
  getNightPower() { return 0; }             // Вночі не працює
}

// Клас житлового будинку
class ResidentialBuilding extends NetworkElement {
  constructor(apartmentsCount) {
    super();
    this.apartmentsCount = apartmentsCount; // Кількість квартир
  }

  getDayPower() {
    // Споживання 4 кВт * кількість / 1000 => МВт
    return -(this.apartmentsCount * 4) / KW_TO_MW;
  }

  getNightPower() {
    // Споживання 1 кВт * кількість / 1000 => МВт
    return -(this.apartmentsCount * 1) / KW_TO_MW;
  }
}

// Клас лінії електропередач
class PowerLine {
  constructor(capacityMW, pricePerMW) {
    this.capacityMW = capacityMW;   // Максимальна потужність передачі
    this.pricePerMW = pricePerMW;   // Вартість за 1 МВт (грн)
  }
}

// Основний клас мережі
class ElectricNetwork {
  constructor() {
    this.elements = [];     // Список елементів (панелі, будинки тощо)
    this.powerLines = [];   // Список ліній передач
  }

  // Додає елемент до мережі
  addElement(element) {
    this.elements.push(element);
  }

  // Додає лінію передач до мережі
  addPowerLine(line) {
    this.powerLines.push(line);
  }

  // Основна функція: підрахунок балансу та вартості
  calculateBalanceAndCost() {
    // Сума денного балансу
    const totalDay = this.elements.reduce((sum, el) => sum + el.getDayPower(), 0);
    // Сума нічного балансу
    const totalNight = this.elements.reduce((sum, el) => sum + el.getNightPower(), 0);

    // Розрахунок результату по денному і нічному балансу
    const dayResult = this._resolveWithPowerLines(totalDay);
    const nightResult = this._resolveWithPowerLines(totalNight);

    return {
      totalDay: dayResult,
      totalNight: nightResult
    };
  }

  // Приватна функція: обробка балансу з використанням ліній
  _resolveWithPowerLines(balance) {
    let cost = 0;         // Підсумкова вартість
    let transferred = 0;  // Скільки передано/отримано

    // Сортуємо лінії: найдешевші для купівлі, найдорожчі для продажу
    const sortedLines = this.powerLines.slice().sort((a, b) => {
      return balance < 0
        ? a.pricePerMW - b.pricePerMW // Купівля: від дешевої
        : b.pricePerMW - a.pricePerMW; // Продаж: від дорогої
    });

    for (const line of sortedLines) {
      if (balance === 0) break;

      const delta = Math.min(Math.abs(balance), line.capacityMW); // Скільки можемо передати
      const direction = balance < 0 ? 1 : -1; // Напрямок: купуємо чи продаємо

      balance += delta * direction;
      cost += delta * line.pricePerMW * direction;
      transferred += delta;
    }

    return {
      balance,       // Залишковий баланс
      cost,          // Фінансова сума
      transferred,   // Скільки передано
      type: cost < 0 ? 'закуплено' : 'продано' // Тип транзакції
    };
  }
}

// Основна функція: збирає дані з інтерфейсу та обраховує
function calculate() {
  // Зчитування значень з input'ів
  const solar = parseFloat(document.getElementById('solar').value);
  const powerplant = parseFloat(document.getElementById('powerplant').value);
  const apartments = parseFloat(document.getElementById('apartments').value);
  const linePower = parseFloat(document.getElementById('linePower').value);
  const linePrice = parseFloat(document.getElementById('linePrice').value);

  // Створення екземпляру мережі
  const network = new ElectricNetwork();

  // Додаємо об'єкти в мережу
  network.addElement(new SolarPanel(solar));
  network.addElement(new PowerPlant(powerplant));
  network.addElement(new ResidentialBuilding(apartments));
  network.addPowerLine(new PowerLine(linePower, linePrice));

  // Отримуємо результати балансу
  const result = network.calculateBalanceAndCost();

  // Виводимо результат у DOM
  document.getElementById('result').innerText =
    `Баланс:\n` +
    `- День: ${result.totalDay.balance.toFixed(2)} МВт, ` +
    `Було ${result.totalDay.type} ${result.totalDay.transferred.toFixed(2)} МВт, ` +
    `Вартість: ${result.totalDay.cost.toFixed(2)} грн\n` +
    `- Ніч: ${result.totalNight.balance.toFixed(2)} МВт, ` +
    `Було ${result.totalNight.type} ${result.totalNight.transferred.toFixed(2)} МВт, ` +
    `Вартість: ${result.totalNight.cost.toFixed(2)} грн`;
}