("use strict");

const addedPlayerSelect = document.querySelector("#addedPlayer");
const allOptions = document.querySelectorAll("option");
const playerForm = document.querySelector("#playerForm");
const inputPlayer = document.querySelector(".input");
const overlay = document.querySelector(".overlay");
const btnStart = document.querySelector(".start");
const btnAdd = document.querySelector(".add");
const btnsResAndRep = document.querySelector(".btnsResAndRep");
const btnRepeat = document.querySelector(".rePeat");
const btnRestart = document.querySelector(".reStart");
const btnRemove = document.querySelector(".btnRemove");
const btnDelete = document.querySelector(".deleteSelected");

// create option using DOM
const addNewPlayer = function (e) {
  e.preventDefault();
  const newOption = document.createElement("option");
  const optionText = document.createTextNode(`${inputPlayer.value}`);
  if (!inputPlayer.value) {
    Swal.fire(`Sorki`, "Musisz wpisać imie uczestnika", "error");
  } else {
    // set option text
    newOption.appendChild(optionText);
    // and option value
    newOption.setAttribute("value", "Option Value");

    // add the option to the select box
    addedPlayerSelect.appendChild(newOption);
    newOption.innerHTML = `${inputPlayer.value}`;
    btnDelete.style.display = "block";

    //Delete option on double click
    newOption.addEventListener("dblclick", removeSelectedPlayer);

    // allPlayers.push(inputPlayer.value);
    inputPlayer.value = "";
  }
};
//Restart Select
const restartSelect = function () {
  addedPlayerSelect.innerHTML = "";
  btnsResAndRep.style.display = "none";
  btnDelete.style.display = "none";
  btnStart.style.display = "block";
};
// remove selected player
const removeSelectedPlayer = (e) => {
  e.preventDefault();
  // save the selected option
  let selected = [];
  for (let i = 0; i < addedPlayerSelect.options.length; i++) {
    selected[i] = addedPlayerSelect.options[i].selected;
  }
  // remove all selected option
  let index = addedPlayerSelect.options.length;
  while (index--) {
    if (selected[index]) {
      addedPlayerSelect.remove(index);
    }
  }
};

const winnerPicker = async function () {
  //declare empty array to put the options in
  const optionsArray = [...document.querySelectorAll("option")];
  console.log(optionsArray);
  //function for checking for empty user input boxes
  function checkBoxLength(option) {
    return option.value.length;
  }
  //Filtr array of otions
  const filteredOptions = optionsArray.filter(checkBoxLength);

  if (filteredOptions.length < 0) {
    btnDelete.style.display = "none";
  } else {
    btnDelete.style.display = "block";
  }

  //Error if there are not anoughp players!

  //alert the user to the option that the function has selected
  if (filteredOptions.length >= 2) {
    // Async loading animation for 2 sec
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    SlickLoader.enable();
    await delay(1500);
    SlickLoader.disable();
    //randomise number to be used to select array index position
    const optionsRandom = Math.floor(Math.random() * filteredOptions.length);
    const winner = filteredOptions[optionsRandom].text;
    //Change buttons after plyed
    btnStart.style.display = "none";
    btnsResAndRep.style.display = "block";
    Swal.fire(`${winner}`, "Gratuljue! Ty wygrałęś", "success");
    // SlickLoader.disable();
  }
  if (filteredOptions.length <= 1) {
    Swal.fire(`Sorki`, "Ma byc co najmnej 2 uczesntnika", "error");
  }
};

//EventListeners
btnStart.addEventListener("click", winnerPicker);
btnRepeat.addEventListener("click", winnerPicker);
playerForm.addEventListener("submit", addNewPlayer);
btnAdd.addEventListener("click", addNewPlayer);
btnDelete.addEventListener("click", removeSelectedPlayer);

// btnRemove.addEventListener("click", removeSelectedPlayer);

btnRestart.addEventListener("click", restartSelect);

// console.log(allPlayers);

//Jquery for flipp coin
jQuery(document).ready(function ($) {
  $("#coin").on("click", function () {
    var flipResult = Math.random();
    $("#coin").removeClass();
    setTimeout(function () {
      if (flipResult <= 0.5) {
        $("#coin").addClass("heads");
        console.log("it is head");
      } else {
        $("#coin").addClass("tails");
        console.log("it is tails");
      }
    }, 100);
  });
});
