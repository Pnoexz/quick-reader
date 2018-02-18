/*
JavaScript, often abbreviated as JS, is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language. Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production. It is used to make webpages interactive and provide online programs, including video games. The majority of websites employ it, and all modern web browsers support it without the need for plug-ins by means of a built-in JavaScript engine. Each of the many JavaScript engines represent a different implementation of JavaScript, all based on the ECMAScript specification, with some engines not supporting the spec fully, and with many engines supporting additional features beyond ECMA.

As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has an API for working with text, arrays, dates, regular expressions, and basic manipulation of the DOM, but the language itself does not include any I/O, such as networking, storage, or graphics facilities, relying for these upon the host environment in which it is embedded.

Initially only implemented client-side in web browsers, JavaScript engines are now embedded in many other types of host software, including server-side in web servers and databases, and in non-web programs such as word processors and PDF software, and in runtime environments that make JavaScript available for writing mobile and desktop applications, including desktop widgets.

Although there are strong outward similarities between JavaScript and Java, including language name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design; JavaScript was influenced by programming languages such as Self and Scheme.

*/

//$(document).on('ready', function() {
  $('#start').on('click', function() {
    start();
  });
//});

function getFormattedText() {
  return $('#text').val();
}

var paragraphIndex = 0;
var startIndex = 0;
var paragraphs;

function start() {
  var text = getFormattedText();
  paragraphs = text.split(/\n/gm);
//  console.debug(paragraphs)

  startInterval();

  /*for (var i = 0; i < paragraphs.length; i++) {
    console.log('One p: ' + i)
    $('#readport').text(paragraphs[i]);
  }*/
}

var interval;

function startInterval() {
  interval = setInterval(
    displayText,
    500
  )
}

function displayText(interval) {
  var textString = "JavaScript, often abbreviated as JS, is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language.";

  var nextSpacePosition = textString.indexOf(' ', startIndex);
  if (nextSpacePosition < 0)  return; // @TODO this removes the last word



  var substr = textString.substr(startIndex, nextSpacePosition - startIndex);


  console.log(substr + ' [nextSpace:' + nextSpacePosition + ', startIndex: ' + startIndex + ']');
  startIndex = nextSpacePosition + 1;
}





start();
