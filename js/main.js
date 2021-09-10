const $header = document.querySelector('.header');
const $headerMenu = $header.querySelector('.header__menu');
const $menuToggle = $header.querySelector('.menu__toggle');

$menuToggle.addEventListener('click', () => {
  $headerMenu.classList.toggle('menu_active');
  document.body.classList.toggle('body_lock');  
});

const $menuLinks = $headerMenu.querySelectorAll('.menu__link');
$menuLinks.forEach($link => {
  $link.addEventListener('click', () => {
    $headerMenu.classList.toggle('menu_active');
  });
});


/* Smoothscroll to anchors */
const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
  anchor.addEventListener('click',  (e) => {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href');
    const blockOffsetTop = document.querySelector(blockID).getBoundingClientRect().top;

    window.scrollBy({ top: (blockOffsetTop), left: 0, behavior: 'smooth' });
  })
}


const cardCountRange = document.querySelector('.calc__range_card');
const cardCountField = document.querySelector('.calc__field_card');
const personCountRange = document.querySelector('.calc__range_person');
const personCountField = document.querySelector('.calc__field_person');

rangeInputsUpdate(cardCountRange, 'card-count-range');
rangeInputsUpdate(personCountRange, 'person-count-range');

cardCountRange.addEventListener("input", () => { 
  rangeInputsUpdate(cardCountRange, 'card-count-range');
});

personCountRange.addEventListener("input", () => { 
  rangeInputsUpdate(personCountRange, 'person-count-range');
});

cardCountField.addEventListener("input", () => { 
  if (cardCountField.value > 1000) {
    cardCountField.value = 1000;
  } else if (cardCountField.value < 1) {
    cardCountField.value = 1;
  }

  updateTotal();
});

personCountField.addEventListener("input", () => { 
  if (personCountField.value > 1000) {
    personCountField.value = 1000;
  } else if (personCountField.value < 1) {
    personCountField.value = 1;
  }
});

function rangeInputsUpdate (input, cssVar) {
  const value = input.value;
  const fieldCount = input.parentNode.querySelector(".calc__field");

  fieldCount.value = value;
  
  
  const percent = Math.floor(value / 10);

  document.documentElement.style.setProperty(`--${cssVar}`, `${percent}%`);

  updateTotal();
}

function updateTotal() {
  const $value = document.querySelector('.calc__total-value');
  const rateTotal = 1200;
  const cardPrice = 50;
  const cardsCount = cardCountField.value;

  const $cardsCount = document.querySelector('.calc__result-cards-count');
  $cardsCount.innerHTML = cardsCount;

  const $cardsPrice = document.querySelector('.calc__result-value_cards');
  $cardsPrice.innerHTML = `${cardsCount * cardPrice} ₽`;

  const total = rateTotal + cardPrice * cardsCount;
  $value.innerHTML = `${total} ₽`;
}