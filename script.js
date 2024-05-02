const calculatedVal = document.getElementById("integrated-value");
const mpform = document.getElementById("mpint");
const tpform = document.getElementById("tpint");
const spform = document.getElementById("spint");
const currentPage = window.location.pathname;

// TODO: Make this stuff do something
const currentURL = window.location.href;
const urlParams = new URLSearchParams(window.location.search);
if (currentURL.includes("shareable")) {
  setFinalValue(urlParams.get("ans"));
}

function setFinalValue(result) {
  let valueText = calculatedVal.innerText.split(":");
  calculatedVal.innerText = `${valueText[0]}: ${result}`;
}

// * MIDPOINT INTEGRATION HERE
if (currentPage.includes("midpoint.html")) {
  mpform.addEventListener("submit", (e) => {
    // preventDefault stops the form submission from performing its default actions, specifically in this case we want to stop it from reloading the page when the form is submitted
    e.preventDefault();

    // Sets a new variable named numbers equal to a FormData object that contains sort of a hash-map of the data that was submitted through the form.
    let numbers = new FormData(e.target);

    // Object.fromEntries(FormData(e.target).entries()) sets formVars equal to an object containing the key-value pairs in the formdata we took in the last step.
    let formVars = Object.fromEntries(numbers.entries());

    // Here we create variables for each piece of user input and cast the variables into integers by surrounding them with Number()
    let equation = math.compile(formVars.userEquation);
    let lowerLimit = Number(formVars.lowerLimit);
    let upperLimit = Number(formVars.upperLimit);
    let subIntervals = Number(formVars.subIntervals);

    // This if statement checks if the user has entered an upper limit that is less than the lower limit. if this is the case, we will swap the sign in our final answer using the "negative" boolean value
    let negative = false;
    if (upperLimit <= lowerLimit) {
      negative = true;
      let temp = upperLimit;
      upperLimit = lowerLimit;
      lowerLimit = temp;
    }

    // Now that we have our user input we can use it to begin performing calculations:

    // First we calculate our delta x value and set it equal to variable h:
    let h = (upperLimit - lowerLimit) / subIntervals;

    // Now variable "left" is set to our lowerlimit:
    let left = lowerLimit;

    // "right" is set to the next value (lowerlimit + delta x):
    let right = lowerLimit + h;

    // "sum" is our placeholder variable that will store calculations in each loop
    let sum = 0;

    // While the value of our left pointer is less than the value of the upper limit of our integration, continue calculations. When the left value reaches the upper limit, there is nothing more to calculate!
    while (left < upperLimit) {
      // "currentMid" is a variable unique to midpoint integration because we have to find the value directly between the left and right pointers
      let currentMid = (left + right) / 2;

      // Here "sum" stores the value of the current loop of the function
      sum += equation.evaluate({ x: currentMid });

      // To increment our pointers left becomes the value of right, and right increases based on the value of delta x
      left = right;
      right = right + h;
    }

    // "mpResult" gets the final value we are looking for by multiplying delta x with the value stored in sum
    let mpResult = h * sum;

    // Here we check on that "negative" boolean and if it is true we change the sign of the final result
    if (negative) {
      mpResult *= -1;
    }

    // the setFinalValue function gives the result to the HTML to display it
    setFinalValue(mpResult);

    // TODO: Store variables for calculations in the URL for sharing links as well as preserving user input when navigating between methods
    //// window.location.href = `http://127.0.0.1:5500/midpoint.html?shareable&eq=${formVars.userEquation}&lolim=${lowerLimit}&ulim=${upperLimit}&subints=${subIntervals}&ans=${mpResult}`;
  });
}

// * TRAPEZOID INTEGRATION HERE
if (currentPage.includes("trapz.html")) {
  tpform.addEventListener("submit", (e) => {
    // preventDefault stops the form submission from performing its default actions, specifically in this case we want to stop it from reloading the page when the form is submitted
    e.preventDefault();

    // Sets a new variable named numbers equal to a FormData object that contains sort of a hash-map of the data that was submitted through the form.
    let numbers = new FormData(e.target);

    // Object.fromEntries(FormData(e.target).entries()) sets formVars equal to an object containing the key-value pairs in the formdata we took in the last step.
    let formVars = Object.fromEntries(numbers.entries());

    // Here we create variables for each piece of user input and cast the variables into integers by surrounding them with Number()
    let equation = math.compile(formVars.userEquation);
    let upperLimit = Number(formVars.upperLimit);
    let lowerLimit = Number(formVars.lowerLimit);
    let subIntervals = Number(formVars.subIntervals);

    // This if statement checks if the user has entered an upper limit that is less than the lower limit. if this is the case, we will swap the sign in our final answer using the "negative" boolean value
    let negative = false;
    if (upperLimit <= lowerLimit) {
      negative = true;
      let temp = upperLimit;
      upperLimit = lowerLimit;
      lowerLimit = temp;
    }

    // Now that we have our user input we can use it to begin performing calculations:

    // First we set "pointer" equal to our lower limit
    let pointer = lowerLimit;
    // Next created "sum" as our variable to hold the sum through each loop
    let sum = 0;
    // Finally "h" will be our delta x
    let h = (upperLimit - lowerLimit) / subIntervals;

    // While the value of our pointer is less than or equal to the upper limit, calculations will continue.
    while (pointer <= upperLimit) {
      // If our pointer is equal to the lower limit or the upper limit, we do not multiply the function by two. Otherwise, the function is multiplied by two as is required by trapezoid rule.
      if (pointer === lowerLimit || pointer === upperLimit) {
        sum += equation.evaluate({ x: pointer });
      } else {
        sum += 2 * equation.evaluate({ x: pointer });
      }

      // Pointer is incremented by delta x to move to the next subinterval
      pointer += h;
    }

    // The result is the sum multiplied by (delta x/2)
    let tpResult = (h / 2) * sum;

    // Here we check on that "negative" boolean and if it is true we change the sign of the final result
    if (negative) {
      tpResult *= -1;
    }

    // the setFinalValue function gives the result to the HTML to display it
    setFinalValue(tpResult);
  });
}

// * SIMPSON'S INTEGRATION HERE
if (currentPage.includes("simps.html")) {
  spform.addEventListener("submit", (e) => {
    // preventDefault stops the form submission from performing its default actions, specifically in this case we want to stop it from reloading the page when the form is submitted
    e.preventDefault();

    // Sets a new variable named numbers equal to a FormData object that contains sort of a hash-map of the data that was submitted through the form.
    let numbers = new FormData(e.target);

    // Object.fromEntries(FormData(e.target).entries()) sets formVars equal to an object containing the key-value pairs in the formdata we took in the last step.
    let formVars = Object.fromEntries(numbers.entries());
    
    // Here we create variables for each piece of user input and cast the variables into integers by surrounding them with Number()
    let equation = math.compile(formVars.userEquation);
    let upperLimit = Number(formVars.upperLimit);
    let lowerLimit = Number(formVars.lowerLimit);
    let subIntervals = Number(formVars.subIntervals);
    
    // This if statement checks if the user has entered an upper limit that is less than the lower limit. if this is the case, we will swap the sign in our final answer using the "negative" boolean value
    let negative = false;
    if (upperLimit <= lowerLimit) {
      negative = true;
      let temp = upperLimit;
      upperLimit = lowerLimit;
      lowerLimit = temp;
    }

    // Now that we have our user input we can use it to begin performing calculations:
    let h = (upperLimit - lowerLimit) / subIntervals;

    // First we set "pointer" equal to our lower limit
    let pointer = lowerLimit;
    // Next create "sum" as our variable to hold the sum through each loop
    let sum = 0;
    // "xPlace" variable will track the current iteration of the loop
    let xPlace = 0;
    // "xPlaceEven" will be our flag to determine how we calculate the current iteration of the loop
    let xPlaceEven = false;

    // While the value of our pointer is less than or equal to the upper limit, calculations will continue
    while (pointer <= upperLimit) {
      // At the beginning of each loop we ensure the "xPlaceEven" flag is set correctly before calculating anything
      if (xPlace % 2 === 0) {
        xPlaceEven = true;
      } else {
        xPlaceEven = false;
      }

      // If pointer is at the very beginning or the very end, there is no need to multiply the current iteration by anything. If we are not at the very beginning or very end, we check our xPlaceEven and if it is true, we multiply that iteration of the function by two, if not it is multiplied by four.
      if (pointer === lowerLimit || pointer === upperLimit) {
        sum += equation.evaluate({ x: pointer });
      } else if (xPlaceEven) {
        sum += 2 * equation.evaluate({ x: pointer });
      } else if (!xPlaceEven) {
        sum += 4 * equation.evaluate({ x: pointer });
      }

      // Pointer is incremented by delta x to move to the next subinterval
      pointer += h;
      
      // xPlace is incremented by one to keep track of odd or even
      xPlace++;

    }
    
    // "spResult" geths the final value we are looking for by multiplying (deltaX/3) with the value stored in sum
    let spResult = (h / 3) * sum;
    
    // Here we check on that "negative" boolean and if it is true we change the sign of the final result
    if (negative) {
      spResult *= -1;
    }
    
    // the setFinalValue function gives the result to the HTML to display it
    setFinalValue(spResult);
  });
}