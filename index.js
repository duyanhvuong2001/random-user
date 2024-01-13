const setTitleAndValue = (element, title, value) => {
  element.setAttribute("data-title", title);
  element.setAttribute("data-value", value);
};

async function init() {
  data = await fetch("https://randomuser.me/api/")
    .then((data) => data.json())
    .catch((err) => console.log(err));

  const user = await data.results[0];
  console.log(user);

  //Set avatar source
  document.getElementById("avatar").src = user.picture.large;

  //Set other properties
  nameElement = document.getElementById("name");
  emailElement = document.getElementById("email");
  birthdayElement = document.getElementById("birthday");
  phoneElement = document.getElementById("phone");
  addressElement = document.getElementById("address");
  passwordElement = document.getElementById("password");

  setTitleAndValue(
    nameElement,
    "Hi, my name is",
    user.name.first + " " + user.name.last
  );

  setTitleAndValue(emailElement, "Hi, my email is", user.email);

  setTitleAndValue(
    addressElement,
    "Hi, my address is",
    user.location.street.number + " " + user.location.street.name
  );

  setTitleAndValue(
    birthdayElement,
    "Hi, my birthday is",
    new Date(user.dob.date).toLocaleDateString("en-GB")
  );

  setTitleAndValue(phoneElement, "Hi, my phone number is", user.phone);

  setTitleAndValue(passwordElement, "Hi, my password is", user.login.password);

  //add event listener
  nameElement.addEventListener("click", showData);
  emailElement.addEventListener("click", showData);
  birthdayElement.addEventListener("click", showData);
  phoneElement.addEventListener("click", showData);
  addressElement.addEventListener("click", showData);
  passwordElement.addEventListener("click", showData);

  //set default message
  const messageElement = document.getElementById("message");
  messageElement.textContent =
    nameElement.getAttribute("data-title") +
    " " +
    nameElement.getAttribute("data-value");
}

const showData = (e) => {
  const messageElement = document.getElementById("message");
  const selectedElement = e.target;

  messageElement.textContent =
    selectedElement.getAttribute("data-title") +
    " " +
    selectedElement.getAttribute("data-value");
};

window.addEventListener("load", init);
