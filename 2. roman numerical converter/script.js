//the output element should contain "Please enter a valid number" when clicking the btn without entering the value

//the output element should contain "Please enter a number greater than or equal to 1" when clicking the btn entering -1

//the output element should contain "Please enter a number less than or equal to 3999" when clicking the btn entering 4000

const input = document.getElementById("number");
const button = document.getElementById("convert-btn");
const output = document.getElementById("output");
let roman = []

const dictionary = [
    {arabic: 1000, roman: "M"},
    {arabic: 900, roman: "CM"},
    {arabic: 500, roman: "D"},
    {arabic: 400, roman: "CD"},
    {arabic: 100, roman: "C"},
    {arabic: 90, roman: "XC"},
    {arabic: 50, roman: "L"},
    {arabic: 40, roman: "XL"},
    {arabic: 10, roman: "X"},
    {arabic: 9, roman: "IX"},
    {arabic: 5, roman: "V"},
    {arabic: 4, roman: "IV"},
    {arabic: 1, roman: "I"}
]

button.addEventListener("click", () => {
    const value = Number(input.value);
    output.classList.remove("hide");
    if(value < 4000 && value >= 1) {
        output.innerHTML = generate(value).join("");
        roman = [];
    } else if(value < 0) {
        output.innerHTML = "Please enter a number greater than or equal to 1";
    } else if(value >= 4000) {
        output.innerHTML = "Please enter a number less than or equal to 3999";
    } else {
        output.innerHTML = "Please enter a valid number";
    }
})


function generate(num) {
    for (let i = 0; i < dictionary.length; i++) {
        const item = dictionary[i];
        const arabic = item.arabic;
        const romNum = item.roman;

        if(num === arabic) {
            roman.push(romNum)
            return roman
        } else if(num > arabic) {
            roman.push(romNum)
            return generate(num - arabic)
        }
    }
}
