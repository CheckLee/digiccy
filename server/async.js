const Promise = require('promise')
/*
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
})*/

/*function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello', 1000);*/

function getFirstName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('hello');
      resolve('hello');
    }, 2000);
  });
}
function getLastName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('world');
      resolve('world');
    }, 1000);
  });
}

async function say() {
  let firstName = await getFirstName();
  let lastName = await getLastName();
  return firstName + lastName;
}
console.log(say())
