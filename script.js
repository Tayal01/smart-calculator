let input = "";
let history = [];

const userInputDisplay = document.getElementById("user-input");
const historyPanel = document.getElementById("history");
const buttons = document.querySelectorAll("button");

function updateDisplay() {
    userInputDisplay.textContent = input || "0";
}

function updateHistory() {
    historyPanel.innerHTML = "";
    history.slice().reverse().forEach(entry => {
        const p = document.createElement("p");
        p.textContent = entry;
        historyPanel.appendChild(p);
    });
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "AC") {
            input = "";
        } else if (value === "DEL") {
            input = input.slice(0, -1);
        } else if (value === "=") {
            try {
                let result = eval(input);
                if (result !== undefined) {
                    history.push(`${input} = ${result}`);
                    input = result.toString();
                    updateHistory();
                }
            } catch (err) {
                input = "Error";
            }
        } else if (value === "+/-") {
            // Toggle last number's sign
            const match = input.match(/(-?\d+\.?\d*)$/);
            if (match) {
                const number = match[0];
                const toggled = number.startsWith("-")
                    ? number.slice(1)
                    : "-" + number;
                input = input.slice(0, -number.length) + toggled;
            }
        } else {
            input += value;
        }

        updateDisplay();
    });
});

updateDisplay();
