// https://www.cuemath.com/measurement/area-of-triangle/
// https://www.lememento.fr/volume-dun-parallelepipede-rectangle

const selectInputShape = document.querySelector('.shape-select');
const radioInputsTypeFormula = document.querySelectorAll('.radio-group input');
const btnResult = document.querySelector('.btn-result');

// get area of rectangle
function getAreaRectangle(w, h) {
  return w * h;
}

// get perimeter of rectangle
function getPerimeterRectangle(w, h) {
  return 2 * (w + h);
}

// get area of triangle - Heron's Formula
function getAreaTriangle(a, b, c) {
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}
// get perimeter of triangle
function getPerimeterTriangle(a, b, c) {
  return a + b + c;
}

// get area of circle
function getAreaCircle(r) {
  return Math.PI * (r * r);
}

// get Circumference of circle
function getCircumferenceCircle(r) {
  return 2 * Math.PI * r;
}

// get area of parallelepiped
function getAreaParallelepiped(w, h, d) {
  return 2 * h * w + 2 * h * d + 2 * w * d;
}
// get volume of parallelepiped
function getVolumeParallelepiped(w, h, d) {
  return w * h * d;
}

// get area of sphere
function getAreaSphere(r) {
  return 4 * Math.PI * r * r;
}
// get volume of sphere
function getVolumeSphere(r) {
  return (4 * Math.PI * r * r * r) / 3;
}

// load squares + circles shapes for animation
window.addEventListener('DOMContentLoaded', () => {
  const colors = [
    '#BF130433',
    '#F2714133',
    '#F2A34133',
    '#F2E53033',
    '#52A8F233',
  ];
  let body = document.querySelector('body');
  let nbRnd = Math.floor(Math.random() * 18 + 21);
  for (let i = 0; i < nbRnd; i++) {
    const divEl = document.createElement('div');
    i % 2
      ? divEl.classList.add('circle-anim')
      : divEl.classList.add('square-anim');
    let size = Math.floor(Math.random() * 35 + 15);
    divEl.style.height = `${size}px`;
    divEl.style.width = `${size}px`;

    divEl.style.backgroundColor = colors[`${Math.floor(Math.random() * 5)}`];
    let posX = Math.floor(Math.random() * (innerWidth - size));
    divEl.style.left = `${posX}px`;

    divEl.style.animationDelay = `${Math.floor(Math.random() * 2 + i / 3)}s`;
    divEl.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
    body.append(divEl);
  }
});

const init = (e) => {
  const opt = e.target.value;
  animCover();
  displayShape(opt);
  displayRadioBtns(opt);
  displayInputsValues(opt);
  initInputs();
  initResult();
  displayFormulas();
};

const initInputs = () => {
  const inputsValues = document.querySelectorAll('.input-group input');
  inputsValues.forEach((el) => {
    el.value = 0;
    el.classList.remove('error');
  });
};
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getNameFunctionFormula = (formulaName, formShape) => {
  return `get${capitalizeFirstLetter(formulaName)}${capitalizeFirstLetter(
    formShape
  )}`;
};

const checkInputs = () => {
  const inputsValues = document.querySelectorAll(
    '.input-group:not(.d-none) input'
  );
  inputsValues.forEach((el) =>
    el.value == 0 ? el.classList.add('error') : el.classList.remove('error')
  );
};

const handleResult = () => {
  const inputsValues = document.querySelectorAll(
    '.input-group:not(.d-none) input'
  );
  const typeFormula = [...radioInputsTypeFormula].filter((el) => el.checked)[0]
    .id;

  const nameFunctionFormula = getNameFunctionFormula(
    typeFormula,
    selectInputShape.value
  );
  let valuesShape = [];

  valuesShape = [...inputsValues].map((el) => +el.value);

  const result = window[nameFunctionFormula](...valuesShape);
  let decimalResult = result - Math.floor(result);
  let nbFloat = decimalResult == 0 ? 0 : 1;
  checkInputs();
  displayResult(capitalizeFirstLetter(typeFormula), result.toFixed(nbFloat));
};

const initResult = () => {
  const wrapperResultValueEl = document.querySelector('.wrapper-result-value');
  const resultValueEl = document.querySelector('.result-value');
  resultValueEl.innerText = '';
  wrapperResultValueEl.classList.add('inactive');
};
const displayResult = (typeFormula, result) => {
  const wrapperResultValueEl = document.querySelector('.wrapper-result-value');
  const resultValueEl = document.querySelector('.result-value');
  let unit;
  let convertedResult = null;

  wrapperResultValueEl.classList.contains('inactive') &&
    wrapperResultValueEl.classList.remove('inactive');
  resultValueEl.classList.remove('active');
  setTimeout(() => {
    resultValueEl.classList.add('active');
  }, 200);

  switch (typeFormula) {
    case 'Area':
      convertedResult = result / 10000 > 1 && result / 10000;
      unit = convertedResult ? 'm<sup>2</sup>' : 'cm<sup>2</sup>';
      break;
    case 'Volume':
      convertedResult = result / 1000000 > 1 && result / 1000000;
      unit = convertedResult ? 'm<sup>3</sup>' : 'cm<sup>3</sup>';
      break;
    case 'Circumference':
    case 'Perimeter':
      convertedResult = result / 100 > 1 && result / 100;
      unit = convertedResult ? 'm' : 'cm';
      break;
    default:
      break;
  }
  resultValueEl.innerHTML = `${typeFormula} : ${
    convertedResult ? convertedResult.toFixed(2) : result
  } ${unit}`;
};

const displayFormulas = () => {
  const formulas = document.querySelectorAll('.formulas');
  const typeFormula = [...radioInputsTypeFormula].filter((el) => el.checked)[0]
    .id;

  [...formulas].filter((el) => {
    if (el.classList.contains(`formulas-${selectInputShape.value}`)) {
      el.classList.remove('d-none');
      [...el.childNodes]
        .filter((el) => el.nodeName == 'P')
        .forEach((el) => {
          el.classList.contains(
            `formulas-${selectInputShape.value}-${typeFormula}`
          )
            ? el.classList.remove('d-none')
            : el.classList.add('d-none');
        });
    } else {
      el.classList.add('d-none');
    }
  });
};

const animCover = () => {
  const wrapperLeft = document.querySelector('.wrapper-left');
  const wrapperLeftContent = document.querySelector('.wrapper-left-content');
  wrapperLeft.classList.add('active');
  wrapperLeftContent.classList.remove('opac-0');
};

const displayShape = (opt) => {
  const shapes = document.querySelectorAll('.shape');
  const wrapperRightBg = document.querySelector('.wrapper-right-bg');
  // display shape
  wrapperRightBg.classList.add('opac-10');
  [...shapes].filter((el) =>
    el.classList.contains(`${opt}`)
      ? el.classList.remove('opac-0')
      : el.classList.add('opac-0')
  );
};

const displayRadioBtns = (opt) => {
  const radioGroup = document.querySelectorAll('.radio-group span');

  switch (opt) {
    case 'rectangle':
    case 'triangle':
      [...radioGroup].forEach((el, i) => {
        if (i == 1 || i == 2) el.classList.remove('d-none');
        else el.classList.add('d-none');
        i == 1 && initCheckedRadioBtn(el);
      });
      break;
    case 'circle':
      [...radioGroup].forEach((el, i) => {
        if (i == 0 || i == 2) el.classList.remove('d-none');
        else el.classList.add('d-none');
        i == 0 && initCheckedRadioBtn(el);
      });
      break;
    case 'sphere':
    case 'parallelepiped':
      [...radioGroup].forEach((el, i) => {
        if (i == 2 || i == 3) el.classList.remove('d-none');
        else el.classList.add('d-none');
        i == 2 && initCheckedRadioBtn(el);
      });
      break;
    default:
      break;
  }
};

const initCheckedRadioBtn = (el) => {
  const radioInputs = document.querySelectorAll('.radio-group span input');
  radioInputs.forEach((input) => input.removeAttribute('checked'));
  el.childNodes[1].checked = true;
};

const displayInputsValues = (opt) => {
  const inputs = document.querySelectorAll('.values .input-group');
  const labelsTriangle = ['a (cm)', 'b (cm)', 'c (cm)'];
  const labelsRectangle = ['height (cm)', 'width (cm)'];
  const labelsParallelepiped = [...labelsRectangle, 'deepth (cm)'];
  const labelCircle = (labelSphere = ['r (cm)']);

  switch (opt) {
    case 'rectangle':
      [...inputs].forEach((el, i) => {
        if (i != 2) el.classList.remove('d-none');
        else el.classList.add('d-none');
        el.childNodes[1].innerText = labelsRectangle[i];
      });
      break;
    case 'triangle':
      [...inputs].forEach((el, i) => {
        el.classList.remove('d-none');
        el.childNodes[1].innerText = labelsTriangle[i];
      });
      break;
    case 'circle':
      [...inputs].forEach((el, i) => {
        if (i == 0) el.classList.remove('d-none');
        else el.classList.add('d-none');
        el.childNodes[1].innerText = labelCircle[i];
      });
      break;
    case 'parallelepiped':
      [...inputs].forEach((el, i) => {
        el.classList.remove('d-none');
        el.childNodes[1].innerText = labelsParallelepiped[i];
      });
      break;
    case 'sphere':
      [...inputs].forEach((el, i) => {
        if (i == 0) el.classList.remove('d-none');
        else el.classList.add('d-none');
        el.childNodes[1].innerText = labelSphere[i];
      });
      break;
    default:
      break;
  }
};

/** event listener **/
selectInputShape.addEventListener('change', (e) => init(e));

[...radioInputsTypeFormula].forEach((el) =>
  el.addEventListener('change', displayFormulas)
);

btnResult.addEventListener('click', handleResult);
document.addEventListener('keyup', (e) => e.key === 'Enter' && handleResult());
