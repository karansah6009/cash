const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("#From-select");
const toCurr = document.querySelector("#To-select");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = Number(amount.value);
 if (!amtVal || amtVal < 1) {
  amtVal = 1;
  amount.value = "1";
  }


  const fromCode = fromCurr.value.toLowerCase();
  const toCode = toCurr.value.toLowerCase();

console.log("fromCurr:", fromCurr);
console.log("toCurr:", toCurr);

  // Fix: Use 'from' currency for the API endpoint
  const URL = `${BASE_URL}/${fromCode}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  
 console.log(data);   //new line
  let rate = data[fromCode][toCode];
  console.log("rate:", rate);  //new line

  if (!rate) {   //new line
  alert("Rate not found for " + fromCode + " → " + toCode);
  return;
}

  // Calculate converted amount
  let convertedAmount = amtVal * rate;
  console.log(`Converted amount: ${convertedAmount}`);

  // You can display this value in your UI as needed

  let msg = document.querySelector('.msg');
  msg.innerText = `Converted amount: ${convertedAmount}`; 
});





