// define the fetch
function getUsers() {
  fetch("http://localhost:3000/api/address/")
    .then((response) => response.json())
    .then((data) => {
      // create all card with the contacts
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
          editContactModal(event);
        });
        deleteIcon.addEventListener("click", function handleClick(event) {
          deleteModal(event);
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

// open AddContactModal
function addContactModal() {
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

// controller add new contact and save changes
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

// open the modal editContact
function editContactModal(event) {
  // TAKE THE CARD data
  const cardId = event.path[3].childNodes[0].childNodes[0].innerHTML;
  const avatar = event.path[3].childNodes[0].childNodes[1].currentSrc;
  const name = event.path[3].childNodes[0].childNodes[2].innerHTML;
  const email = event.path[3].childNodes[0].childNodes[3].innerHTML;
  const street = event.path[3].childNodes[1].childNodes[0].innerHTML;
  const city = event.path[3].childNodes[1].childNodes[1].innerHTML;
  const postcode = event.path[3].childNodes[1].childNodes[2].innerHTML;
  const country = event.path[3].childNodes[1].childNodes[3].innerHTML;

  // set data on patch Modal
  document.getElementsByClassName("idPatch")[0].innerHTML = cardId;
  document.getElementsByClassName("patchAvatar")[0].src = avatar;
  document.getElementsByClassName("patchName")[0].innerHTML = name;
  document.getElementsByClassName("patchEmail")[0].innerHTML = email;
  document.getElementsByClassName("patchStreet")[0].innerHTML = street;
  document.getElementsByClassName("patchCity")[0].innerHTML = city;
  document.getElementsByClassName("patchPostcode")[0].innerHTML = postcode;
  document.getElementsByClassName("patchCountry")[0].innerHTML = country;

  // make span editable
  document
    .getElementsByClassName("patchName")[0]
    .querySelector("span").contentEditable = true;
  document
    .getElementsByClassName("patchEmail")[0]
    .querySelector("span").contentEditable = true;
  document
    .getElementsByClassName("patchStreet")[0]
    .querySelector("span").contentEditable = true;
  document
    .getElementsByClassName("patchCity")[0]
    .querySelector("span").contentEditable = true;
  document
    .getElementsByClassName("patchPostcode")[0]
    .querySelector("span").contentEditable = true;
  document
    .getElementsByClassName("patchCountry")[0]
    .querySelector("span").contentEditable = true;
  // open modalUpdate
  document.getElementsByClassName("modalUpdate")[0].style.display = "block";
}

// close modal update
function closeModalUpdate() {
  document.getElementsByClassName("modalUpdate")[0].style.display = "none";
}

// patch data to backend
function patchData(event) {
  let data = {
    id: event.path[2].childNodes[7].childNodes[1].childNodes[1].innerHTML,
    avatar: event.path[2].childNodes[7].childNodes[1].childNodes[3].currentSrc,
    name: event.path[2].childNodes[7].childNodes[1].childNodes[5].lastChild
      .innerHTML,
    email:
      event.path[2].childNodes[7].childNodes[1].childNodes[7].lastChild
        .innerHTML,
    street:
      event.path[2].childNodes[7].childNodes[3].childNodes[1].lastChild
        .innerHTML,
    city: event.path[2].childNodes[7].childNodes[3].childNodes[3].lastChild
      .innerHTML,
    postcode:
      event.path[2].childNodes[7].childNodes[3].childNodes[5].lastChild
        .innerHTML,
    country: "",
    countryCode: "",
  };

  const countryAndCode =
    event.path[2].childNodes[7].childNodes[3].childNodes[7].lastChild.innerHTML;
  const splitText = countryAndCode.split("-");

  // controller for country and countryCode
  if (splitText[1] === undefined) {
    alert(`Please divide Contry with " - " to your country code`);
  } else {
    data.countryCode = splitText[1];
  }
  data.country = splitText[0];

  // PATCH data
  fetch(`http://localhost:3000/api/address/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((resp) => {
    if (resp.status !== 200) {
      alert("Something went wrong, try again");
    }
    location.reload();
  });
}

// open Delete modal
function deleteModal(event) {
  document.getElementsByClassName("modalDelete")[0].style.display = "block";
  // save id card on modal
  document.getElementsByClassName("idDelete")[0].innerHTML =
    event.path[3].childNodes[0].childNodes[0].innerHTML;
}

// close modal delete
function closeModalDelete() {
  document.getElementsByClassName("modalDelete")[0].style.display = "none";
}

// delete data from DB
function deleteData(event) {
  const idDelete = event.path[2].childNodes[5].innerHTML;

  // delete data
  fetch(`http://localhost:3000/api/address/${idDelete}`, {
    method: "DELETE",
  }).then((resp) => {
    if (resp.status !== 204) {
      alert("Something went wrong, try again");
    }
    location.reload();
  });
}

// get all user from db
document.addEventListener("DOMContentLoaded", function () {
  getUsers();
});
