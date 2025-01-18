function numberToWords(num) {
    if (num < 0) {
        return `минус ${numberToWords(-num)}`; 
    }

    const units = ["ноль", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"];
    const teens = ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"];
    const tens = ["", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
    const hundreds = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];

    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + " " + (num % 10 !== 0 ? units[num % 10] : "");
    if (num < 1000) return hundreds[Math.floor(num / 100)] + " " + (num % 100 !== 0 ? numberToWords(num % 100) : "");
    return num.toString();
}

function getRandomQuestion(number) {
    const text = numberToWords(number);
    return text.length < 20 ? `Вы загадали число ${text}?` : `Вы загадали число ${number}?`;
}

function getRandomSuccessMessage() {
    const messages = [
        `Я всегда угадываю!\n\u{1F60E}`,
        `Ура! Я угадал!\n\u{1F389}`,
        `Это было просто!\n\u{1F913}`
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

let minValue, maxValue, answerNumber, orderNumber, gameRun;

function initGame() {
    minValue = parseInt(document.getElementById('minInput').value) || 0;
    maxValue = parseInt(document.getElementById('maxInput').value) || 100;

    minValue = isNaN(minValue) ? 0 : minValue;
    maxValue = isNaN(maxValue) ? 100 : maxValue;

    minValue = minValue < -999 ? -999 : minValue;
    maxValue = maxValue > 999 ? 999 : maxValue;

    if (minValue > maxValue) {
        [minValue, maxValue] = [maxValue, minValue];
    }

    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;

    document.getElementById('orderNumberField').innerText = orderNumber;
    document.getElementById('answerField').innerText = getRandomQuestion(answerNumber);

    $('#inputCollapse').collapse('hide');
    $('#gameCollapse').collapse('show');
}

document.getElementById('startGame').addEventListener('click', initGame);

document.getElementById('btnRetry').addEventListener('click', function () {
    $('#inputCollapse').collapse('show');
    $('#gameCollapse').collapse('hide');
});

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        maxValue = answerNumber - 1;
        if (minValue > maxValue) {
            document.getElementById('answerField').innerText = `Вы загадали неправильное число!\n\u{1F914}`;
            gameRun = false;
        } else {
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            document.getElementById('orderNumberField').innerText = orderNumber;
            document.getElementById('answerField').innerText = getRandomQuestion(answerNumber);
        }
    }
});

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        minValue = answerNumber + 1;
        if (minValue > maxValue) {
            document.getElementById('answerField').innerText = `Вы загадали неправильное число!\n\u{1F914}`;
            gameRun = false;
        } else {
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            document.getElementById('orderNumberField').innerText = orderNumber;
            document.getElementById('answerField').innerText = getRandomQuestion(answerNumber);
        }
    }
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        document.getElementById('answerField').innerText = getRandomSuccessMessage();
        gameRun = false;
    }
});

