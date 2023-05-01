const symbolsLowEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&uArr;', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '&lArr;', '&dArr;', '&rArr;', 'Ctrl'];
const symbolsLowRu = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&uArr;', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '&lArr;', '&dArr;', '&rArr;', 'Ctrl'];

const charsEn = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
const charsRu = ['ё', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю'];

const numbers = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
const specialСharactersEn = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];
const specialСharactersRu = ['!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+'];

const code = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];

let lang = 'en';
let capsLockOn = false;
let isTrappedKeyPressed = false;

const getPosition = () => {
  return document.querySelector('.textarea').selectionStart;
};

const pushChar = (eventCode, char) => {
  const textarea = document.querySelector('.textarea');
  const index = getPosition();
  if (eventCode === 'ControlLeft' || eventCode === 'ControlRight' || eventCode === 'AltLeft' || eventCode === 'AltRight' || eventCode === 'ShiftLeft' || eventCode === 'ShiftRight' || eventCode === 'CapsLock' || eventCode === 'MetaLeft' || eventCode === 'Win' || eventCode === 'Ctrl' || eventCode === 'Alt' || eventCode === 'Shift') {
    return;
  }
  switch (eventCode) {
    case 'Space':
      textarea.value += ' ';
      break;
    case '':
      textarea.value += ' ';
      break;
    case 'Tab':
      textarea.value += '    ';
      break;
    case 'Enter':
      textarea.value += '\n';
      break;
    case 'Backspace':
      textarea.value = textarea.value.slice(0, index - 1) + textarea.value.slice(index, textarea.value.length);
      break;
    case 'Delete':
      textarea.value = textarea.value.slice(0, index) + textarea.value.slice(index + 1, textarea.value.length);
      break;
    default:
      textarea.value += char.innerText;
      break;
  }
};

const updateChars = () => {
  const chars = document.querySelectorAll('.char');
  chars.forEach((char) => {
    char.addEventListener('click', () => {
      pushChar(char.innerText, char);
    });
  });
};

const drawKeyboard = (arr) => {
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  const keyboardLayout = arr.reduce(
    (acc, curr, index) => {
      if (['Tab', 'CapsLock', 'Shift', 'Ctrl'].includes(curr) && index !== arr.length - 1 && index !== 54) {
        acc.push([curr]);
      } else {
        acc[acc.length - 1].push(curr);
      }
      return acc;
    },
    [[]]
  );
  for (let i = 0; i < keyboardLayout.length; i += 1) {
    const row = document.createElement('div');
    row.className = 'row';
    for (let j = 0; j < keyboardLayout[i].length; j += 1) {
      row.innerHTML += `<div class="char" data="${code[i][j]}">${keyboardLayout[i][j]}</div>`;
    }
    keyboard.appendChild(row);
  }
  return keyboard;
};

const drawHtml = (arr) => {
  const title = document.createElement('h1');
  const desc = document.createElement('p');
  const textArea = document.createElement('textarea');
  title.className = 'title';
  title.innerText = 'Virtual Keyboard';
  desc.className = 'desc';
  desc.innerText = 'Клавиатура создана в операционной системе Windows\nДля переключения языка: alt';
  textArea.className = 'textarea';
  // textArea.setAttribute('disabled', 'disabled');
  document.body.prepend(desc);
  document.body.prepend(drawKeyboard(arr));
  document.body.prepend(textArea);
  document.body.prepend(title);
};

const setLocalStorage = () => {
  localStorage.setItem('lang', lang);
};
const getLocalStorage = () => {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
    if (lang === 'ru') {
      drawHtml(symbolsLowRu);
    }
    if (lang === 'en') {
      drawHtml(symbolsLowEn);
    }
  } else {
    drawHtml(symbolsLowEn);
  }
  updateChars();
  document.querySelector('.textarea').addEventListener('keydown', (e) => e.preventDefault());
};
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

window.addEventListener('keydown', (event) => {
  const chars = document.querySelectorAll('.char');
  const char = document.querySelector(`[data="${event.code}"]`);
  char.classList.add('active');
  if (event.key === 'Alt') {
    if (lang === 'ru') {
      lang = 'en';
      chars.forEach((char, i) => {
        char.innerHTML = symbolsLowEn[i];
      });
    } else {
      lang = 'ru';
      chars.forEach((char, i) => {
        char.innerHTML = symbolsLowRu[i];
      });
    }
    chars.forEach((char) => {
      if (charsEn.includes(char.innerText) || charsRu.includes(char.innerText)) {
        if (!capsLockOn) {
          char.innerText = char.innerText.toLowerCase();
        }
        if (capsLockOn) {
          char.innerText = char.innerText.toUpperCase();
        }
      }
    });
  }
  if (event.code === 'CapsLock') {
    capsLockOn = !capsLockOn;
    chars.forEach((char) => {
      if (charsEn.includes(char.innerText) || charsRu.includes(char.innerText)) {
        if (!capsLockOn) {
          char.innerText = char.innerText.toLowerCase();
        }
        if (capsLockOn) {
          char.innerText = char.innerText.toUpperCase();
        }
      }
    });
  }
  if (event.shiftKey && !isTrappedKeyPressed) {
    isTrappedKeyPressed = true;
    capsLockOn = !capsLockOn;
    const chars = document.querySelectorAll('.char');
    let i = 0;
    chars.forEach((char) => {
      if (charsEn.includes(char.innerText) || charsRu.includes(char.innerText)) {
        if (!capsLockOn) {
          char.innerText = char.innerText.toLowerCase();
        }
        if (capsLockOn) {
          char.innerText = char.innerText.toUpperCase();
        }
      }
      if (numbers.includes(char.innerText)) {
        if (lang === 'ru') {
          char.innerHTML = specialСharactersRu[i];
        } else {
          char.innerHTML = specialСharactersEn[i];
        }
        i++;
      }
    });
  }
  if (event.code === 'Tab') {
    event.preventDefault();
  }
  if (event.code === 'AltLeft') {
    event.preventDefault();
  }
  if (event.ctrlKey && event.code === 'KeyD') {
    event.preventDefault();
  }
  if (event.ctrlKey && event.code === 'KeyC') {
    event.preventDefault();
  }
  if (event.ctrlKey && event.code === 'KeyF') {
    event.preventDefault();
  }
  updateChars();
});

window.addEventListener('keyup', (event) => {
  console.log();
  const chars = document.querySelectorAll('.char');
  chars.forEach((char) => {
    char.classList.remove('active');
  });
  const char = document.querySelector(`[data="${event.code}"]`);
  if (event.shiftKey) {
    isTrappedKeyPressed = false;
    capsLockOn = !capsLockOn;
    let i = 0;
    chars.forEach((char) => {
      if (charsEn.includes(char.innerText) || charsRu.includes(char.innerText)) {
        if (!capsLockOn) {
          char.innerText = char.innerText.toLowerCase();
        }
        if (capsLockOn) {
          char.innerText = char.innerText.toUpperCase();
        }
      }
      if (lang === 'ru') {
        if (specialСharactersRu.includes(char.innerText)) {
          char.innerHTML = numbers[i];
        }
      } else {
        if (specialСharactersEn.includes(char.innerText)) {
          char.innerHTML = numbers[i];
        }
      }
      i++;
    });
  }
  const doc = document.documentElement;
  const e = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    view: window,
    buttons: 1,
  });
  doc.dispatchEvent(e);
  pushChar(event.code, char);
});

// постоянный фокус
document.onkeydown = () => {
  document.querySelector('.textarea').focus();
};
