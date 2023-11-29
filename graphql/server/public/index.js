// Home page html elements
const inputName = document.querySelector("#input_name");
const basicInfoForm = document.querySelector("#basic_info_form");

// Global Variables
let userName;

basicInfoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userName = inputName.value;
  console.log(userName);
  window.location.href = `http://localhost:4000/chat?name=${userName}`;
});
