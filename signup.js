let form = document.querySelector("form");
let emailField = document.querySelector("#email");
let passwordField = document.querySelector("#password");
let confirmPasswordField = document.querySelector("#confirmPassword");
let username = document.querySelector("#username");

let showPassword = document.querySelector("#showPassword");
let hidePassword = document.querySelector("#hidePassword");
let showConfirmPassword = document.querySelector("#showConfirmPassword");
let hideConfirmPassword = document.querySelector("#hideConfirmPassword");

// Create dedicated <small> elements
let passwordMessage = document.createElement("small");
let confirmMessage = document.createElement("small");

// passwordField.insertAdjacentElement("afterend", passwordMessage);
// confirmPasswordField.insertAdjacentElement("afterend", confirmMessage);

form.addEventListener("submit", function (ev) {
  ev.preventDefault();

  const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const regexFullName = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  isCheck(regexEmail.test(emailField.value), emailField);
  isCheck(regexPassword.test(passwordField.value), passwordField);
  isCheck(regexFullName.test(username.value), username);
});

// Count characters for password
let countCharacter = 0;
passwordField.addEventListener("input", (ev) => {
  if (ev.data == null && countCharacter > 0) {
    countCharacter--;
  } else {
    countCharacter++;
  }

  if (passwordField.value === "") {
    showPassword.style.visibility = "hidden";
    hidePassword.style.visibility = "hidden";
    countCharacter = 0;
  } else {
    showPassword.style.visibility = "visible";
    hidePassword.style.visibility = "hidden";
  }

  checkStrength(passwordField.value.trim());
});

// Toggle Password Visibility
function togglePassword(field, showBtn, hideBtn) {
  showBtn.addEventListener("click", () => {
    field.type = "text";
    showBtn.style.visibility = "hidden";
    hideBtn.style.visibility = "visible";
  });
  hideBtn.addEventListener("click", () => {
    field.type = "password";
    hideBtn.style.visibility = "hidden";
    showBtn.style.visibility = "visible";
  });
}
togglePassword(passwordField, showPassword, hidePassword);
togglePassword(confirmPasswordField, showConfirmPassword, hideConfirmPassword);

// Field Validation
function isCheck(isValid, field) {
  if (field.nextElementSibling?.tagName === "SMALL") {
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
    message.innerText =
      show.value.trim() === ""
        ? "Please enter your email address"
        : "Please enter a valid email address";
  } else if (show.name === "password") {
    message.innerText =
      "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.";
  } else if (show.name === "username") {
    message.innerText = "Please enter a valid name";
  }
  show.insertAdjacentElement("afterend", message);
}

// Confirm Password Check
confirmPasswordField.addEventListener("input", function () {
  if (confirmPasswordField.value === "") {
    confirmMessage.innerText =
      passwordField.value === ""
        ? "First fill the above password field"
        : "Please re-enter your password";
    confirmMessage.style.color = "#ff6b6b";
  } else if (confirmPasswordField.value === passwordField.value) {
    confirmMessage.innerText = "Password is Matched";
    confirmMessage.style.color = "#4ded4dff";
  } else {
    confirmMessage.innerText = "Password doesn't Match";
    confirmMessage.style.color = "#ff6b6b";
  }
  confirmPasswordField.insertAdjacentElement("afterend", confirmMessage);
});

// Password Strength Checker
function checkStrength(password) {
  const hasLowercase = /[a-z]/;
  const hasUppercase = /[A-Z]/;
  const hasDigit = /[0-9]/;
  const hasSpecialChar = /[@$!%*?&]/;

  let catCount = 0;
  if (hasLowercase.test(password)) catCount++;
  if (hasUppercase.test(password)) catCount++;
  if (hasDigit.test(password)) catCount++;
  if (hasSpecialChar.test(password)) catCount++;

  passwordFeedback(catCount, countCharacter);
}

function passwordFeedback(catCount, charCount) {
  if (charCount === 0) {
    passwordMessage.innerText = "Please enter a strong password";
    passwordMessage.style.color = "#ff6b6b";
  } else if (charCount < 6 || catCount === 1) {
    passwordMessage.innerText = "Your Password is 'Weak'.";
    passwordMessage.style.color = "#ff6b6b";
  } else if (charCount >= 6 && catCount === 2) {
    passwordMessage.innerText = "Your Password is 'Medium'.";
    passwordMessage.style.color = "orange";
  } else if (charCount > 10 && catCount >= 3) {
    passwordMessage.innerText = "Your Password is 'Strong'.";
    passwordMessage.style.color = "#4ded4dff";
  }
  passwordField.insertAdjacentElement("afterend", passwordMessage);
}
