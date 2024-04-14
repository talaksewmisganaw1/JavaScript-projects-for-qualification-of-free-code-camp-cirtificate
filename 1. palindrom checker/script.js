const form = document.getElementById('form');
const input = document.getElementById('text-input');
const button = document.getElementById('check-btn');
const result = document.getElementById('result');

form.addEventListener("submit", clickFunction);

function clickFunction(e) {
    e.preventDefault();
    const value = input.value;
    if(value) {
        //remove non digit and non number characters from the value
        let reduced = value.toLowerCase().match(/[\da-z]/ig);
        let reversed = reduced.slice().reverse();
        reduced = reduced.join("");
        reversed = reversed.join("");
        result.classList.add("displayer")
        input.value = "";
        if(reduced === reversed) {
            result.innerHTML = `${value} is a palindrome`
        } else {
            result.innerHTML = `${value} is not a palindrome`
        }
    } else {
        alert("Please input a value")
    }
}
