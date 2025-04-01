document.addEventListener("DOMContentLoaded", function () {
    let container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);

    let display = document.createElement("input");
    display.id = "display";
    display.readOnly = true;
    display.value = "0"; // Устанавливаем базовый 0
    container.appendChild(display);

    let buttons = [
        ["AC", "+/-", "%", "/"],
        ["7", "8", "9", "*"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["0", "", ".", "="] // Убираем дубликат 0
    ];

    let calculator = document.createElement("div");
    calculator.id = "calculator";
    container.appendChild(calculator);

    buttons.forEach(row => {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        row.forEach(text => {
            if (text !== "") {
                let button = document.createElement("button");
                button.textContent = text;
                button.classList.add("button");
                button.addEventListener("click", () => handleButtonClick(text));
                rowDiv.appendChild(button);
            } else {
                let emptyButton = document.createElement("div");
                emptyButton.classList.add("empty-button");
                rowDiv.appendChild(emptyButton);
            }
        });
        calculator.appendChild(rowDiv);
    });

    let expression = "";

    function handleButtonClick(value) {
        if (value === "AC") {
            expression = "0"; // При сбросе устанавливаем 0
        } else if (value === "=") {
            try {
                expression = eval(expression).toString();
            } catch {
                expression = "Error";
            }
        } else if (value === "+/-") {
            expression = (-parseFloat(expression)).toString();
        } else if (value === "%") {
            expression = (parseFloat(expression) / 100).toString();
        } else {
            if (display.value === "0") {
                expression = value;
            } else {
                expression += value;
            }
        }
        display.value = expression;
    }

    let style = document.createElement("style");
    style.textContent = `
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: black;
            overflow: hidden;
            margin: 0;
        }
        #container {
            width: 90%;
            max-width: 280px;
            background-color: black;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
            position: absolute;
        }
        #display {
            width: 100%;
            height: 80px;
            font-size: 2.5rem;
            text-align: right;
            padding: 10px;
            border: none;
            border-radius: 10px;
            margin-bottom: 20px;
            background: black;
            color: white;
        }
        .row {
            display: flex;
            justify-content: space-between;
        }
        .button {
            width: 60px;
            height: 60px;
            font-size: 1.8rem;
            margin: 5px;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            background-color: gray;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .button:nth-child(4), .button:last-child {
            background-color: orange;
        }
        .button:nth-child(1), .button:nth-child(2), .button:nth-child(3) {
            background-color: lightgray;
            color: black;
        }
        .empty-button {
            width: 60px;
            height: 60px;
            margin: 5px;
            visibility: hidden;
        }
        #container {
            transform-origin: top;
        }
        @media (max-height: 600px) {
            #container {
                transform: scale(calc(100vh / 600));
            }
        }
        @media (max-width: 500px) {
            #container {
                transform: scale(calc(100vw / 500));
            }
        }
    `;
    document.head.appendChild(style);
});
