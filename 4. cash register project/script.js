const cashInput = document.getElementById("cash");
const btn = document.getElementById("purchase-btn");
const changeDisplay = document.getElementById("change-due");
const currencyUnits = {
    "PENNY": 1, 
    "NICKEL": 5, 
    "DIME": 10, 
    "QUARTER": 25, 
    "ONE": 100,
    "FIVE": 500, 
    "TEN": 1000, 
    "TWENTY": 2000, 
    "ONE HUNDRED": 10000
}

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

//make the changeDisplay item hidden when having no value
changeDisplay.classList.add("hide");

//**************EVENT LISTENER*************//
btn.addEventListener("click", purchase)

//**************FUNCTIONS*************//
function purchase() {
    const cash = Number(cashInput.value);
    changeDisplay.innerHTML = checkCashRegister(price, cash, cid);
}

function checkCashRegister(price, cash, cid) {
    let change = cash * 100 - price * 100;
    let cidMultiplied = cid.map(item => {return [item[0], Math.round(item[1] * 100)]});
    let totalCash = cidMultiplied.reduce((sum, item) => sum + item[1], 0);
    let changeArr = [];
    // let status = '';

    if (cash < price) {
        window.alert("Customer does not have enough money to purchase the item")
    } else if(cash === price) {
        changeDisplay.classList.remove("hide");
        return `No change due - customer paid with exact cash`
    } else if(totalCash < change) {
        changeDisplay.classList.remove("hide");
        return `Status: INSUFFICIENT_FUNDS`;
    } else {
        for (let i = cidMultiplied.length - 1; i >= 0; i--) {
            let element = cidMultiplied[i];
            let cidName = element[0];
            let cidValue = element[1];
            let currencyUnit = currencyUnits[cidName];
            let currencyUnitAmount = cidValue / currencyUnit;
            let amountToGive = 0;

            while(change >= currencyUnit && currencyUnitAmount > 0) {
                change -= currencyUnit;
                // cidMultiplied[i][1] -= currencyUnit;
                totalCash -= currencyUnit;
                amountToGive++;
                currencyUnitAmount--;
            }

            if(amountToGive !== 0) {
                changeArr.push([`${cidName}: $${currencyUnit * amountToGive / 100}`])
            }
        }

        if (change > 0) {
            changeDisplay.classList.remove("hide");
            return `Status: INSUFFICIENT_FUNDS`;
        } 
        // totalCash = cidMultiplied.reduce((sum, item) => sum + item[1], 0);
        let changeList = changeArr.join(" ")
        if (totalCash == 0) {
            changeDisplay.classList.remove("hide");
            return `Status: CLOSED ${changeList}`;
        }

        changeDisplay.classList.remove("hide");
        return `Status: OPEN ${changeList}`;
    }
}