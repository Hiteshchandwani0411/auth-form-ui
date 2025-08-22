let form = document.querySelector("form");
let emailField = document.querySelector("#email");
let passwordField = document.querySelector("#password");
let hidePassword = document.querySelector("#hidePassword");
let showPassword = document.querySelector("#showPassword");
let icon = document.querySelectorAll(".passwordIcon");
let confirmPasswordField = document.querySelector("#confirmPassword");
let hideConfirmPassword = document.querySelector("#hideConfirmPassword");
let showConfirmPassword = document.querySelector("#showConfirmPassword");

form.addEventListener("submit", function (ev) {
  ev.preventDefault();

  const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  isCheck(regexEmail.test(emailField.value), emailField);
  isCheck(regexPassword.test(passwordField.value), passwordField);
});

passwordField.addEventListener("input", () => {
  if (passwordField.value === "") {
    showPassword.style.visibility = "hidden";
    hidePassword.style.visibility = "hidden";
  } else {
    showPassword.style.visibility = "visible"; 
    hidePassword.style.visibility = "hidden"; 
  }
});

showPassword.addEventListener("click", () => {
  passwordField.type = "text";
  showPassword.style.visibility = "hidden";
  hidePassword.style.visibility = "visible";
});

hidePassword.addEventListener("click", () => {
  passwordField.type = "password";
  hidePassword.style.visibility = "hidden";
  showPassword.style.visibility = "visible";
});

function isCheck(isValid, field) {
  if (
    field.nextElementSibling &&
    field.nextElementSibling.tagName === "SMALL"
  ) {
    field.nextElementSibling.remove();
  }

  if (!isValid) {
    displayMessage(field);
  } else {
    field.style.border = "";
  }
}

function displayMessage(show) {
  let message = document.createElement("small");
  show.style.border = "1px solid red";
  if (show.name === "email") {
    message.innerText = "Please enter a valid email address";
  } else if (show.name === "password") {
    message.innerText =
      "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.";
  }

  show.insertAdjacentElement("afterend", message);
}
