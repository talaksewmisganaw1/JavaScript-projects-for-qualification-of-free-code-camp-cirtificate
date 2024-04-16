const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const input = document.getElementById("user-input");
const result = document.getElementById("results-div");

checkBtn.addEventListener("click", checkFunction);
clearBtn.addEventListener("click", clearFunction)

//*********functions*********
function checkFunction() {
    const value = input.value;
    const regex = /^(1\s?)?(\d{3}|\(\d{3}\))[-\s]?\d{3}[-\s]?\d{4}$/;
    if(!value) {
        alert("Please provide a phone number")
    } else if(value && regex.test(value)) {
        result.innerHTML = `Valid US number: ${value}`;
        result.style.color = "rgb(243, 255, 13)";
    } else if(value && !regex.test(value)) {
        result.style.color = "rgb(185, 7, 7)";
        result.innerHTML = `Invalid US number: ${value}`;
    }
}

function clearFunction() {
    input.value = "";
    result.innerHTML = "";
}
