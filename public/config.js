// define the fetch
function getUsers() {
  fetch("http://localhost:3000/api/address/")
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < data.length; i++) {
        let card = document.createElement("div");
        let cardContainer = document.createElement("div");
        let cardContainer2 = document.createElement("div");
        let cardContainer3 = document.createElement("div");
        let idCard = document.createElement("p");
        let avatar = document.createElement("img");
        let name = document.createElement("h4");
        let email = document.createElement("h4");
        let street = document.createElement("h4");
        let city = document.createElement("h4");
        let postcode = document.createElement("h4");
        let country = document.createElement("h4");
        let editIcon = document.createElement("img");
        let deleteIcon = document.createElement("img");
        card.classList.add("card");
        cardContainer.classList.add("cardContainer");
        cardContainer2.classList.add("cardContainer2");
        cardContainer3.classList.add("cardContainer3");
        avatar.classList.add("avatar");
        editIcon.classList.add("editIcon");
        deleteIcon.classList.add("deleteIcon");
        editIcon.addEventListener("click", function handleClick(event) {
          editContact(event);
        });
        avatar.src = data[i].avatar;
        idCard.innerHTML = data[i].id;
        name.innerHTML = "NAME: " + `<span>` + data[i].name + `</span>`;
        email.innerHTML = "EMAIL: " + `<span>` + data[i].email + `</span>`;
        street.innerHTML = "STREET: " + `<span>` + data[i].street + `</span>`;
        city.innerHTML = "CITY: " + `<span>` + data[i].city + `</span>`;
        postcode.innerHTML =
          "POSTCODE: " + `<span>` + data[i].postcode + `</span>`;
        country.innerHTML =
          "COUNTRY: " +
          `<span>` +
          data[i].country +
          " - " +
          data[i].countryCode +
          `</span>`;
        editIcon.src = "./images/pencil.png";
        deleteIcon.src = "./images/trashIcon.png";
        document
          .getElementsByClassName("container")[0]
          .appendChild(card)
          .appendChild(cardContainer)
          .appendChild(idCard);
        document
          .getElementsByClassName("container")[0]
          .appendChild(card)
          .appendChild(cardContainer)
          .appendChild(avatar);
        document
          .getElementsByClassName("container")[0]
          .appendChild(card)
          .appendChild(cardContainer)
          .appendChild(name);
        document
          .getElementsByClassName("container")[0]
          .appendChild(card)
          .appendChild(cardContainer)
          .appendChild(email);
        document
          .getElementsByClassName("container")[0]
          .appendChild(card)
          .appendChild(cardContainer2)
          .appendChild(street);
        document
          .getElementsByClassName("container")[0]
          .appendChild(card)
          .appendChild(cardContainer2)
          .appendChild(city);
        document
          .getElementsByClassName("container")[0]
          .appendChild(card)
          .appendChild(cardContainer2)
          .appendChild(postcode);
        document
          .getElementsByClassName("container")[0]
          .appendChild(card)
          .appendChild(cardContainer2)
          .appendChild(country);
        document
          .getElementsByClassName("container")[0]
          .appendChild(card)
          .appendChild(cardContainer2)
          .appendChild(cardContainer3)
          .appendChild(editIcon);
        document
          .getElementsByClassName("container")[0]
          .appendChild(card)
          .appendChild(cardContainer2)
          .appendChild(cardContainer3)
          .appendChild(deleteIcon);
      }
    });
}

function addContact() {
  const modals = document.querySelectorAll("[data-modal]");
  modals.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      const modal = document.getElementById(trigger.dataset.modal);
      modal.classList.add("open");
      const exits = modal.querySelectorAll(".modalExit");
      exits.forEach(function (exit) {
        exit.addEventListener("click", function (event) {
          event.preventDefault();
          modal.classList.remove("open");
        });
      });
    });
  });
}

function validate(event) {
  if (
    document.getElementsByName("name")[0].value === "" &&
    document.getElementsByName("email")[0].value === "" &&
    document.getElementsByName("street")[0].value === "" &&
    document.getElementsByName("city")[0].value === "" &&
    document.getElementsByName("postcode")[0].value === "" &&
    document.getElementsByName("country")[0].value === "" &&
    document.getElementsByName("countryCode")[0].value === ""
  ) {
    event.preventDefault();
    alert("Please add some data.");
  } else {
    document.getElementsByClassName("formContainer").submit();
  }
}

function editContact(event) {
  document.getElementsByClassName("modalUpdate")[0].style.display = "block";

  // TAKE THE CARD ID
  const cardId = event.path[3].childNodes[0].childNodes[0].innerHTML;
}

function closeModalUpdate() {
  document.getElementsByClassName("modalUpdate")[0].style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  getUsers();
});
