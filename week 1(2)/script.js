
const apiKey = 'YOUR_API_KEY';  // Replace with your ExchangeRate-API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const swapBtn = document.getElementById('swap-btn');
const result = document.getElementById('result');
const form = document.getElementById('currency-form');

async function populateCurrencies() {
    const response = await fetch(apiUrl + 'USD');
    const data = await response.json();
    const currencies = Object.keys(data.conversion_rates);
    
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

populateCurrencies();


swapBtn.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
});

async function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = amount.value;

    if (amountValue === '') {
        result.textContent = 'Please enter an amount';
        return;
    }

    const response = await fetch(apiUrl + from);
    const data = await response.json();
    const rate = data.conversion_rates[to];
    const convertedAmount = (amountValue * rate).toFixed(2);

    result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
}

form.addEventListener('submit', event => {
    event.preventDefault();
    convertCurrency();
});
