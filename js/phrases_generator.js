
var CURRENT_PHRASE_NUM = 0;
var JSON_DATA_LIST = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function dataChanger(json) {
  var phrase_with_car = json[CURRENT_PHRASE_NUM];
  var phrase = document.createElement("p");
  phrase.id = "phrase";
  phrase.innerText = phrase_with_car.phrase;
  document.getElementById("phrase_with_car").insertBefore(phrase, document.getElementsByClassName("pager")[0]);
  var lineBreak = document.createElement("br");
  insertAfter(lineBreak, phrase);
  var car = document.createElement("p");
  car.id = "car";
  car.innerText = phrase_with_car.car;
  document.getElementById("phrase_with_car").insertBefore(car, document.getElementsByClassName("pager")[0]);

}

$.getJSON("js/phrases.json", function(json) {
  CURRENT_PHRASE_NUM = getRandomInt(0, json.length);
  JSON_DATA_LIST = json;
  dataChanger(json);
});


function getNextPhrase() {
  CURRENT_PHRASE_NUM = (CURRENT_PHRASE_NUM+1) % JSON_DATA_LIST.length;
  console.log(CURRENT_PHRASE_NUM);
  document.getElementById("phrase").innerText = JSON_DATA_LIST[CURRENT_PHRASE_NUM].phrase;
  document.getElementById("car").innerText = JSON_DATA_LIST[CURRENT_PHRASE_NUM].car;
}

function getPrevousPhrase() {
  if (CURRENT_PHRASE_NUM === 0)
    CURRENT_PHRASE_NUM = JSON_DATA_LIST.length-1;
  else
    CURRENT_PHRASE_NUM = (CURRENT_PHRASE_NUM-1) % JSON_DATA_LIST.length;
  console.log(CURRENT_PHRASE_NUM);
  document.getElementById("phrase").innerText = JSON_DATA_LIST[CURRENT_PHRASE_NUM].phrase;
  document.getElementById("car").innerText = JSON_DATA_LIST[CURRENT_PHRASE_NUM].car;
}

$('#previous').click(function() {
  getPrevousPhrase()
});

$('#next').click(function() {
  getNextPhrase()
});

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowDown":
      getPrevousPhrase();
      break;
    case "ArrowUp":
      getNextPhrase();
      break;
    case "ArrowLeft":
      getPrevousPhrase();
      break;
    case "ArrowRight":
      getNextPhrase();
      break;
  }
});