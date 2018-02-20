/*
JavaScript, often abbreviated as JS, is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language. Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production. It is used to make webpages interactive and provide online programs, including video games. The majority of websites employ it, and all modern web browsers support it without the need for plug-ins by means of a built-in JavaScript engine. Each of the many JavaScript engines represent a different implementation of JavaScript, all based on the ECMAScript specification, with some engines not supporting the spec fully, and with many engines supporting additional features beyond ECMA.

As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has an API for working with text, arrays, dates, regular expressions, and basic manipulation of the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities, relying for these upon the host environment in which it is embedded.

Initially only implemented client-side in web browsers, JavaScript engines are now embedded in many other types of host software, including server-side in web servers and databases, and in non-web programs such as word processors and PDF software, and in runtime environments that make JavaScript available for writing mobile and desktop applications, including desktop widgets.

Although there are strong outward similarities between JavaScript and Java, including language name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design; JavaScript was influenced by programming languages such as Self and Scheme.

*/

//$(document).on('ready', function() {
  $('#start').on('click', function() {
    startOrPause();
  });
  $('#stop').on('click', function() {
    stop();
  });
//});

function getFormattedText() {
  return $('#text').val();
}

class State {
  constructor(text, paragraphIndex, wordIndex) {
    this.running = true;
    this.isCompleted = false;
    this.text = text + ' '; // @TODO remove this quick hack to avoid skipping the last word because there isn't another space
    this.textLength = text.length;
    this.paragraphIndex = paragraphIndex;
    this.wordIndex = wordIndex;
    this.baseSpeed = $('#speedBase').val();
    this.punctuationSpeed = $('#speedPunctuation').val();
    this.specialSpeed = $('#speedSpecial').val();
  }

  increaseWordIndexBy(offset) {
    this.wordIndex = this.wordIndex + offset;
  }

  calculateIndexOfNextSpace() {
    var index = this.text.indexOf(' ', this.wordIndex + 1);
    if (index === -1) {
      this.isCompleted = true;
    }
    return index;
  }

  pause() {
    this.running = false;
  }

  resume() {
    this.running = true;
    this.isCompleted = false;
  }

  restart() {
    this.running = true;
    this.isCompleted = false;
  }

  stop() {
    this.running = false;
    this.paragraphIndex = 0;
    this.wordIndex = 0;
  }

  shouldContinue() {
    return this.running && !this.isCompleted;
  }

  debug() {
    return "Word Index:" + this.wordIndex
  }
}

/*
class Factory {
  constructor() {
    this.instance = null;
  }

  create(text) {
    var state = new State(text, 0, 0)
    this.instance = state;
    return state;
  }

  destroyInstance() {
    this.instance = null;
  }

  getInstance() {
    return this.instance;
  }
}

var factory = new Factory();
*/

var state;

function startOrPause() {
  if (typeof state === 'undefined') {
    console.log('Page is new and no state has been run before.');
    start();
  } else if (state.isCompleted === true) {
    console.log('State is completed. We need to resume.')
    state.resume()
    nextWord(state)
  } else if (state.running === false) {
    console.log('State is present but not running. We need to restart.')
    state.resume();
    nextWord(state)
  } else {
    console.log('State is unfinished and was runnning. We need to pause.')
    state.pause();
  }
}

function stop() {
  if (typeof state !== 'undefined') {
    state.stop();
  }
  clearReadport();  // @TODO do this in a timeout because when we stop, there's a timeout already running
}

function start() {
  state = new State(getFormattedText(), 0, 0);
  nextWord(state);
}

function nextWord(state) {
  var textString = state.text;
  var wordIndex = state.wordIndex;

  var nextSpacePosition = state.calculateIndexOfNextSpace()


  var substr = textString.substr(wordIndex, nextSpacePosition - wordIndex).trim();
  displayText(substr);
  var offsetToNextWord = nextSpacePosition - wordIndex;

  state.increaseWordIndexBy(offsetToNextWord)
  if (state.shouldContinue()) {
    setTimeout(nextWord, calculateTimeout(substr, state), state);
  }
}

function calculateLengthMultiplier(length) {
  var multiplier = 1 + 1 / length**2;
  console.log(multiplier)
  return multiplier
}

function calculateTimeout(word, state) {
  var base = state.baseSpeed;
  if (word.match(/\W+/ig) || word.match(/\d+/)) {
    // @TODO revisit special cases and impact these changes in the UI
    base = base * state.specialSpeed
  }

  return base;// * calculateLengthMultiplier(word.length)
}

function displayText(text) {
  $('#readport').text(text.trim());
}

function clearReadport() {
  $('#readport').text('');
}
