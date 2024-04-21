const input = document.getElementById("cash");
const btn = document.getElementById("purchase-btn");
const displayer = document.getElementById("change-due");

btn.addEventListener("click", purchase);

function purchase() {
    let cash = Number(input.value);
    cash = cash * 100;
    let price = 19.5;
    price = price * 100;
    let changeArr = [];
    let cid = [["PENNY", 0], 
    ["NICKEL", 0], 
    ["DIME", 0.2], 
    ["QUARTER", .5], 
    ["ONE", 0],
    ["FIVE", 0], 
    ["TEN", 0], 
    ["TWENTY", 0], 
    ["ONE HUNDRED", 0]];

    cid.forEach(item => item[1] = item[1] * 100);

    let totalCash = cid.reduce((sum, item) => sum + item[1], 0).toFixed(2);

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

    if(price > cash) {
        alert("Customer does not have enough money to purchase the item");
    } else if (cash === price) {
        return displayer.innerHTML = "No cahnge due - customer paid with exact cash"
    } else {
        let changeAmount = cash - price;
        for (let i = cid.length - 1; i >= 0; i--){
            let cidName = cid[i][0];
            let currencyUnitValue = currencyUnits[cidName];
            let currencyAmount = cid[i][1]/currencyUnitValue; 
            let amountToGive = 0;

            while(changeAmount >= currencyUnitValue && currencyAmount > 0) {
                changeAmount -= currencyUnitValue;
                cid[i][1] -= currencyUnitValue;
                amountToGive++;
                currencyAmount--;
            }

            if (amountToGive > 0) {
                let changeValue = amountToGive * currencyUnitValue;
                changeArr.push([`${cidName}: $${changeValue/100}`]);
            }
        }

        if(changeAmount > 0) {
            return displayer.innerHTML = "Status: INSUFFICIENT_FUNDS";
        }

        totalCash = cid.reduce((sum, item) => sum + item[1], 0);

        let changeList = changeArr.join(" ");
        if (totalCash === 0) {
            return displayer.innerHTML = `Status: CLOSED ${changeList}`
        }

    }
    
    
    




}