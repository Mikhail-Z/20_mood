DEBUG_ENABLED = false;
myStorage = window.localStorage;
isDebugMode = myStorage.getItem("DEBUG");

if (isDebugMode == "true")
  DEBUG_ENABLED = true;


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

function insertTextOnPage(json) {
  var phrase_with_car = json[CURRENT_PHRASE_NUM];
  var phrase = document.createElement("p");
  phrase.className = "phrase";
  phrase.innerText = phrase_with_car.phrase;
  document.getElementsByClassName("phrase_with_car")[0].insertBefore(phrase, document.getElementsByClassName("pager")[0]);
  var lineBreak = document.createElement("br");
  insertAfter(lineBreak, phrase);
  var car = document.createElement("p");
  car.className = "car";
  car.innerText = phrase_with_car.car;
  document.getElementsByClassName("phrase_with_car")[0].insertBefore(car, document.getElementsByClassName("pager")[0]);

}

$.getJSON("js/phrases.json", function(json) {
  CURRENT_PHRASE_NUM = getRandomInt(0, json.length);
  JSON_DATA_LIST = json;
  insertTextOnPage(json);
});


function showNextPhrase() {
  CURRENT_PHRASE_NUM = (CURRENT_PHRASE_NUM+1) % JSON_DATA_LIST.length;
  if (DEBUG_ENABLED == true)
    console.log(CURRENT_PHRASE_NUM);
  document.getElementsByClassName("phrase")[0].innerText = JSON_DATA_LIST[CURRENT_PHRASE_NUM].phrase;
  document.getElementsByClassName("car")[0].innerText = JSON_DATA_LIST[CURRENT_PHRASE_NUM].car;
}

function showPreviousPhrase() {
  if (CURRENT_PHRASE_NUM === 0)
    CURRENT_PHRASE_NUM = JSON_DATA_LIST.length-1;
  else
    CURRENT_PHRASE_NUM = (CURRENT_PHRASE_NUM-1) % JSON_DATA_LIST.length;
  if (DEBUG_ENABLED == true)
    console.log(CURRENT_PHRASE_NUM);
  document.getElementsByClassName("phrase")[0].innerText = JSON_DATA_LIST[CURRENT_PHRASE_NUM].phrase;
  document.getElementsByClassName("car")[0].innerText = JSON_DATA_LIST[CURRENT_PHRASE_NUM].car;
}

$('#previous').click(function() {
  showPreviousPhrase()
});

$('#next').click(function() {
  showNextPhrase()
});

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowDown":
      showPreviousPhrase();
      break;
    case "ArrowUp":
      showNextPhrase();
      break;
    case "ArrowLeft":
      showPreviousPhrase();
      break;
    case "ArrowRight":
      showNextPhrase();
      break;
  }
});