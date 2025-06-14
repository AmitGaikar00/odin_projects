const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const countryInput = document.querySelector("#country");
const countryError = document.querySelector("#countryError");
const postalCodeInput = document.querySelector("#postalCode");
const postalCodeError = document.querySelector("#postalCodeError");
const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");
const passwordConfirmationInput = document.querySelector(
  "#passwordConfirmation"
);
const passwordConfirmationError = document.querySelector(
  "#passwordConfirmationError"
);

emailInput.addEventListener("input", () => {
  if (!emailInput.checkValidity()) {
    emailError.innerHTML = emailInput.validationMessage;
  } else {
    emailError.innerHTML = "";
  }
});

postalCodeInput.addEventListener("input", () => {
  if (!postalCodeInput.checkValidity()) {
    postalCodeError.innerHTML = postalCodeInput.validationMessage;
  } else {
    postalCodeError.innerHTML = "";
  }
});

passwordInput.addEventListener("input", () => {
  if (!passwordInput.checkValidity()) {
    passwordError.innerHTML = passwordInput.attributes.title.value;
  } else {
    passwordError.innerHTML = "";
  }
});

passwordConfirmationInput.addEventListener("input", () => {
  if(passwordInput.value !== passwordConfirmationInput.value){
    passwordConfirmationError.innerHTML = "Passwords do not match";
  }else{
    passwordConfirmationError.innerHTML = "";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !emailInput.checkValidity() ||
    !countryInput.checkValidity() ||
    !postalCodeInput.checkValidity() ||
    !passwordInput.checkValidity() ||
    !passwordConfirmationInput.checkValidity()
  ) {
    alert("Please fill out all fields");
  } else {
    // alert("Form submitted successfully");
    console.log("Form submitted successfully");
  }
});