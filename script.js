let calculatedVal = document.getElementById("integrated-value");
let mpform = document.getElementById("mpint");

function setFinalValue(mpResult) {
  let valueText = calculatedVal.innerText.split(":");
  calculatedVal.innerText = `${valueText[0]}: ${mpResult}`;
}

mpform.addEventListener("submit", (e) => {
  // preventDefault stops the form submission from performing its default actions, specifically in this 
  // case we want to stop it from reloading the page when the form is submitted
  e.preventDefault();

  // sets a new variable named numbers equal to a FormData object that contains sort of a hash-map
  // of the data that was submitted through the form.
  let numbers = new FormData(e.target);
  
  // Object.fromEntries(FormData(e.target).entries())
  // this sets formVars equal to an object containing the key-value
  // pairs in the formdata we took in the last step.
  let formVars = Object.fromEntries(numbers.entries());

  // now we create variables for each piece of user input and 
  // cast the variables into integers by surrounding them with
  // Number()
  let lowerLimit = Number(formVars.lowerLimit);
  let upperLimit = Number(formVars.upperLimit);
  let subintervals = Number(formVars.subIntervals);


  // now that we have our variables we can use them to begin performing calculations:

  // First we calculate our delta x value and set it equal to variable h:
  let h = (upperLimit - lowerLimit) / subintervals;
  // now variable "left" is initially set to our lowerlimit:
  let left = lowerLimit;
  // "right" is set to the next value (lowerlimit + delta x):
  let right = lowerLimit + h;
  
  // "eq" is our placeholder variable that will store calculations in each loop
  let eq = 0;

  // while the value of our left pointer is less than the value of
  // the upper limit of our integration, continue calculations.
  // once the left value reaches the upper limit, there is nothing more to calculate!
  while (left < upperLimit) {

    // "currentMid" is a variable unique to midpoint integration because we have to 
    // find the value directly between the left and right pointers
    let currentMid = (left + right) / 2;

    // here eq is performing our f(x), in this case x^2, I chose not to 
    // calculate the multiplication with delta x at each step but rather when
    // the loop is complete just multiply delta x with the final value of eq
    eq += currentMid * currentMid;

    // to increment our pointers left becomes the value of right, and right
    // increases based on the value of delta x
    left = right;
    right = right + h;
  }

  // "mpResult" gets the final value we are looking for by multiplying
  // delta x with the value stored in eq
  let mpResult = h * eq;
  // the setFinalValue function gives the result to the HTML to display it
  setFinalValue(mpResult);
});

tpform.addEventListener("submit", (e) => {
  e.preventDefault();

   // sets a new variable named numbers equal to a FormData object that contains sort of a hash-map
  // of the data that was submitted through the form.
  let numbers = new FormData(e.target);
  
  // Object.fromEntries(FormData(e.target).entries())
  // this sets formVars equal to an object containing the key-value
  // pairs in the formdata we took in the last step.
  let formVars = Object.fromEntries(numbers.entries());

  let upperLimit = formVars(upperLimit);
  console.log(upperLimit);
})

smpform.addEventListener("submit", (e) => {
  
})

function homepage() {
  window.location.href = "index.html";
}

function integrate() {
  let queryString = window.URL();
  console.log(queryString);
}