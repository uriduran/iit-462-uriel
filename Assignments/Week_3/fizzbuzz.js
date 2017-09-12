var num1, num2;

num1 = window.prompt("Range: Smallest number", "0");
num2 = window.prompt("Range: Largest number", "0");

if (num1 <= num2) {//To make sure the user inputs the smaller number first.
    fizzbuzz(num1,num2); //Calls and executes function if input is correct.
}else{
    window.alert("Please input smaller number in the range first.")
}

    
function fizzbuzz(num1, num2) {
    for (var i = num1; i <= num2; i++) {
        if (i % 3 == 0 && i % 5 !== 0) {
                console.log(i + " Fizz");
        }
        if (i % 3 !== 0 && i % 5 == 0) {
                console.log(i + " Buzz");
        }
         if (i % 3 == 0 && i % 5 == 0) {
                console.log(i + " Fizzbuzz");
            }
        if (i % 3 !== 0 && i % 5 !== 0) {
                console.log(i);
        }
    }
}