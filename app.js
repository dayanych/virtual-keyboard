const symbolsLowEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&uArr;', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '&lArr;', '&dArr;', '&rArr;', 'Ctrl'];
const symbolsUpperEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'Delete', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '&uArr;', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '&lArr;', '&dArr;', '&rArr;', 'Ctrl'];
const symbolsLowRu = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&uArr;', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '&lArr;', '&dArr;', '&rArr;', 'Ctrl'];
const symbolsUpperRu = ['Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Delete', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '&uArr;', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '&lArr;', '&dArr;', '&rArr;', 'Ctrl'];

const code = [['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'], ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'], ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'], ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'], ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']];

let lang = 'en';

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
  const keyboardLayout = arr.reduce((acc, curr, index) => {
    if (['Tab', 'CapsLock', 'Shift', 'Ctrl'].includes(curr) && index !== arr.length - 1 && index !== 54) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, [[]]);
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
  desc.innerText = 'Клавиатура создана в операционной системе Windows\nДля переключения языка комбинация: левые ctrl + alt';
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
  document.querySelector('.textarea').addEventListener('keydown', e => e.preventDefault());
};
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

window.addEventListener('keydown', (event) => {
  if ((event.ctrlKey && event.altKey)) {
    document.querySelector('.keyboard').remove();
    if (lang === 'ru') {
      lang = 'en';
      if (event.getModifierState && event.getModifierState('CapsLock')) {
        document.querySelector('.textarea').after(drawKeyboard(symbolsUpperEn));
      } else {
        document.querySelector('.textarea').after(drawKeyboard(symbolsLowEn));
      }
    } else {
      lang = 'ru';
      if (event.getModifierState && event.getModifierState('CapsLock')) {
        document.querySelector('.textarea').after(drawKeyboard(symbolsUpperRu));
      } else {
        document.querySelector('.textarea').after(drawKeyboard(symbolsLowRu));
      }
    }
    updateChars();
  }
  if (event.code === 'CapsLock') {
    document.querySelector('.keyboard').remove();
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      if (lang === 'ru') {
        document.querySelector('.textarea').after(drawKeyboard(symbolsUpperRu));
      }
      if (lang === 'en') {
        document.querySelector('.textarea').after(drawKeyboard(symbolsUpperEn));
      }
    } else {
      if (lang === 'ru') {
        document.querySelector('.textarea').after(drawKeyboard(symbolsLowRu));
      }
      if (lang === 'en') {
        document.querySelector('.textarea').after(drawKeyboard(symbolsLowEn));
      }
    }
    updateChars();
  }
});

document.onkeydown = (event) => {
  const char = document.querySelector(`[data="${event.code}"]`);
  char.classList.add('active');
};
document.onkeyup = (event) => {
  const char = document.querySelector(`[data="${event.code}"]`);
  char.classList.remove('active');
  pushChar(event.code, char);
};

// отмена дефолтного поведения клавиш
window.addEventListener('keydown', (event) => {
  if (event.code === 'Tab' || event.key === 'Alt') {
    event.preventDefault();
  }
  if (event.ctrlKey && (event.code === 'KeyD')) {
    event.preventDefault();
  }
  if (event.ctrlKey && (event.code === 'KeyC')) {
    event.preventDefault();
  }
  if (event.ctrlKey && (event.code === 'KeyF')) {
    event.preventDefault();
  }
});

// постоянный фокус
// document.onclick = () => {
//   document.querySelector('.textarea').focus();
// };
