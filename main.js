const requestURL = "https://api.exchangerate.host/convert?";
const amountLeft = document.querySelector(".amount-one");
const amountRight = document.querySelector(".amount-two");
const currencyLeft = document.querySelector("#currency-one");
const currencyRight = document.querySelector("#currency-two");
const rateInfo = document.querySelector(".rate-info");
const btnSwap = document.querySelector(".swap");
let previousValue;
let timer;

async function exchange() {
  {
    const URL =
      requestURL + "from=" + currencyLeft.value + "&to=" + currencyRight.value;
    try {
      const res = await axios.get(URL);
      const rate = res.data.result;
      const sumExchange = (parseInt(amountLeft.value) * rate).toFixed(2);
      if (isNaN(sumExchange)) {
        return 1;
      } else {
        textConent(rate, sumExchange);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

const textConent = (rate, sum) => {
  exchange().then((result) => {
    if (result === 1) {
      console.log("seima");
      amountRight.value = "";
    } else {
      rateInfo.textContent = `1 ${currencyLeft.value} = ${rate} ${currencyRight.value}`;
      amountRight.value = sum;
    }
  });
};

const swapCurreny = () => {
  const leftValue = currencyLeft.value;
  currencyLeft.value = currencyRight.value;
  currencyRight.value = leftValue;
};

btnSwap.addEventListener("click", swapCurreny);

amountLeft.addEventListener("keyup", () => {
  if (amountLeft.value !== previousValue && amountLeft.value > 0) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      exchange();
      previousValue = amountLeft.value;
    }, 500);
  }
});
currencyLeft.addEventListener("change", () => {
  if (amountLeft.value !== previousValue && amountLeft.value > 0) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      exchange();
      previousValue = amountLeft.value;
    }, 500);
  }
});
currencyRight.addEventListener("change", () => {
  if (amountLeft.value !== previousValue && amountLeft.value > 0) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      exchange();
      previousValue = amountLeft.value;
    }, 500);
  }
});
