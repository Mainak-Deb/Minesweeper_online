const title = document.querySelector("h1");
const CHAR_TIME = 30;

let tt, index;

function requestCharAnimation(char, value) {
  setTimeout(function() {
    char.textContent = value;
    char.classList.add("fade-in");
  }, CHAR_TIME);
}

function addChar() {
  const char = document.createElement("span");
  char.classList.add("char");
  char.textContent = "▌";
  title.appendChild(char);
  requestCharAnimation(char,tt.substr(index++, 1));
  if (index <tt.length) {
    requestChar();
  }
}

function requestChar(delay = 0) {
  setTimeout(addChar, CHAR_TIME + delay);
}

function start() {
  index = 0;
 tt = title.textContent.trim();
  title.textContent = "<  ";
  requestChar(1000);
}

start();