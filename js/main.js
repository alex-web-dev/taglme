const $header = document.querySelector('.header');
const $headerMenu = $header.querySelector('.header__menu');
const $menuToggle = $header.querySelector('.menu__toggle');

$menuToggle.addEventListener('click', () => {
  $headerMenu.classList.toggle('menu_active');
  $header.classList.toggle('header_white');
  document.body.classList.toggle('body_lock');  
});

const $menuLinks = $headerMenu.querySelectorAll('.menu__link');
$menuLinks.forEach($link => {
  if (window.innerWidth > 992) {
    return;
  }
  
  $link.addEventListener('click', () => {
    $headerMenu.classList.toggle('menu_active');
    $header.classList.toggle('header_white');
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


const cardCountRange = document.querySelector('.calc__range_card .calc__range-input');
const cardCountField = document.querySelector('.calc__field_card');
const personCountRange = document.querySelector('.calc__range_person .calc__range-input');
const personCountField = document.querySelector('.calc__field_person');

if (cardCountRange && personCountRange) {
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
}

function rangeInputsUpdate (input, cssVar) {
  const value = input.value;
  const fieldCount = input.closest('.calc__group').querySelector(".calc__field");
  const percent = Math.floor(value / 10);

  fieldCount.value = value;
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

const $playVideoBtns = document.querySelectorAll('.player__play');
$playVideoBtns.forEach($btn => {
  $btn.addEventListener('click', () => {
    const $player = $btn.closest('.player');
    const url = $player.dataset.url;

    if (!url || $player.querySelector('iframe')) {
      return;
    }
    
    const $frame = getYoutubeFrame(url);
    $player.appendChild($frame);
  });
})


function getYoutubeFrame(src) {
  const $frame = document.createElement('iframe');

  $frame.setAttribute('src', `${src}?autoplay=1`);
  $frame.setAttribute('width', '100%');
  $frame.setAttribute('height', '100%');
  $frame.setAttribute('title', 'YouTube video player');
  $frame.setAttribute('autoplay', '1');
  $frame.setAttribute('frameborder', '0');
  $frame.setAttribute('allowfullscreen', '');

  return $frame;
}