const requestURL = "https://api.exchangerate.host/convert?";
const amountLeft = document.querySelector(".amount-one");
const amountRight = document.querySelector(".amount-two");
const currencyLeft = document.querySelector("#currency-one");
const currencyRight = document.querySelector("#currency-two");
const rateInfo = document.querySelector(".rate-info");
const btnSwap = document.querySelector(".swap");

async function exchange() {
  {
    const URL =
      requestURL + "from=" + currencyLeft.value + "&to=" + currencyRight.value;
    try {
      const res = await axios.get(URL);
      const rate = res.data.result;
      console.log(rate);
      const sumExchange = (parseInt(amountLeft.value) * rate).toFixed(2);
      textConent(rate, sumExchange);
    } catch (error) {
      console.error(error);
    }
  }
}

const textConent = (rate, sum) => {
  rateInfo.textContent = `1 ${currencyLeft.value} = ${rate} ${currencyRight.value}`;
  amountRight.value = sum;
};

const swapCurreny = () => {
  const leftValue = currencyLeft.value;
  currencyLeft.value = currencyRight.value;
  currencyRight.value = leftValue;
  exchange();
};

btnSwap.addEventListener(
  "click",
  _.debounce(() => {
    swapCurreny();
  }, 500)
);

amountLeft.addEventListener(
  "input",
  _.debounce(() => {
    if (amountLeft.value.trim().length === 0) {
      amountRight.value = "";
      return;
    }
    if (amountLeft.value > 0) {
      exchange();
    }
  }, 500)
);

currencyLeft.addEventListener(
  "change",
  _.debounce(() => {
    if (amountLeft.value > 0) {
      exchange();
    }
  }, 500)
);

currencyRight.addEventListener(
  "change",
  _.debounce(() => {
    if (amountLeft.value > 0) {
      exchange();
    }
  }, 500)
);
