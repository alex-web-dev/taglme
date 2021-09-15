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
    document.body.classList.toggle('body_lock');  
  });
});

const featuresSwiper = new Swiper('.features__swiper-container', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2,
  spaceBetween: 15,
  allowTouchMove: true,
  enabled: true,
  autoplay: {
    delay: 3000,
  },
  breakpoints: {
    1140: {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    768: {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    640: {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    }
  },
  pagination: {
    el: '.features__pagination',
    clickable: true
  },
});

const howWorkSwiper = new Swiper('.how-work__swiper-container',{
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 15,
  allowTouchMove: true,
  enabled: true,
  autoplay: {
    delay: 30200,
  },
  breakpoints: {
    1140: {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    768: {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    640: {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    480: {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: true,
    }
  },
  pagination: {
    el: '.how-work__pagination',
    clickable: true
  },
});

const clientsSwiper = new Swiper('.clients__swiper-container',{
  direction: 'horizontal',
  loop: true,
  slidesPerView: 3,
  spaceBetween: 15,
  allowTouchMove: true,
  enabled: true,
  autoplay: {
    delay: 30200,
  },
  breakpoints: {
    992: {
      loop: true,
      slidesPerView: 6,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    640: {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 0,
      allowTouchMove: true,
      enabled: true,
    }
  },
  pagination: {
    el: '.clients__pagination',
    clickable: true
  },
});

/* Smoothscroll to anchors */
const $anchors = document.querySelectorAll('a[href^="#"]');
for (let $anchor of $anchors) {
  $anchor.addEventListener('click',  (e) => {
    e.preventDefault()
    
    const blockID = $anchor.getAttribute('href');
    const $elem = document.querySelector(blockID);

    if (blockID === '#' || !$elem) {
      return;
    }
    
    const blockOffsetTop = $elem.getBoundingClientRect().top;
    
    window.scrollBy({ top: (blockOffsetTop), left: 0, behavior: 'smooth' });
  });
}


const $cardCountRange = document.querySelector('.calc__range_card .calc__range-input');
const $cardCountField = document.querySelector('.calc__field_card');
const $personCountRange = document.querySelector('.calc__range_person .calc__range-input');
const $personCountField = document.querySelector('.calc__field_person');

if ($cardCountRange && $personCountRange) {
  rangeInputsUpdate($cardCountRange, 'card-count-range');
  rangeInputsUpdate($personCountRange, 'person-count-range');

  $cardCountRange.addEventListener("input", () => { 
    rangeInputsUpdate($cardCountRange, 'card-count-range');
  });

  $personCountRange.addEventListener("input", () => { 
    rangeInputsUpdate($personCountRange, 'person-count-range');
  });

  $cardCountField.addEventListener("input", () => { 
    if ($cardCountField.value > 1000) {
      $cardCountField.value = 1000;
    } else if ($cardCountField.value < 1) {
      $cardCountField.value = 1;
    }

    updateTotal();
  });

  $personCountField.addEventListener("input", () => { 
    if ($personCountField.value > 1000) {
      $personCountField.value = 1000;
    } else if ($personCountField.value < 1) {
      $personCountField.value = 1;
    }
  });
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
});

window.addEventListener('load', () => {
  moveElems();
});

window.addEventListener('resize', () => {
  moveElems();
});

const $fileInputs = document.querySelectorAll('.file-field__input');
$fileInputs.forEach($input => {
  $input.addEventListener('change', () => {
    $fileField = $input.closest('.file-field');
    const $fileName = $fileField.querySelector('.file-field__names');
    
    $fileName.innerHTML += `
      <span class="file-field__name">${$input.files[0].name}</span>
      <button class="file-field__delete"></button>
    `;

    const $delete = $fileField.querySelector('.file-field__delete');
    $delete.addEventListener('click', (e) => {
      $input.value = '';
      $fileName.innerHTML = '';
      e.preventDefault();
    });
  });
});

const $tarif = document.querySelector('.tarif');

if ($tarif) {
  const $tarifClose = $tarif.querySelector('.tarif__close');
  const $calcSettingsBtn = document.querySelector('.calc__btn-settings');
  const $tarifBtns = $tarif.querySelectorAll('.tarif__btn');

  $tarif.addEventListener('click', (e) => {
    if (e.target === $tarif) {
      $tarif.classList.add('tarif_hide');
    }
  });

  $tarifClose.addEventListener('click', () => {
    $tarif.classList.add('tarif_hide');
  });

  $calcSettingsBtn.addEventListener('click', () => {
    $tarif.classList.remove('tarif_hide');
  });

  $tarifBtns.forEach($btn => {
    $btn.addEventListener('click', () => {
      $tarif.classList.add('tarif_hide');
    });
  });
}

function moveElems() {
  moveElem('stages__bg', 'stages__left', 'stages__content', 992);
  moveElem('footer__copyright', 'footer__column_first', 'footer__content', 992);
  moveElem('footer__privacy-policy', 'footer__column_first', 'footer__content', 992);
  moveElem('footer__social-links', 'footer__column_last', 'footer__content', 640);
}

function moveStagesBg() {
  const $stagesBg = document.querySelector('.stages__bg');
  const $stagesContent = document.querySelector('.stages__content');
  const $stagesLeft = document.querySelector('.stages__left');

  if (window.innerWidth <= 992 && $stagesBg.closest('.stages__left')) {
    $stagesContent.append($stagesBg);
  } else if (window.innerWidth > 992 && !$stagesBg.closest('.stages__left')) {
    $stagesLeft.append($stagesBg);
  }
}

function moveElem(elemClass, fromClass, toClass, width) {
  const $elem = document.querySelector(`.${elemClass}`);
  const $from = document.querySelector(`.${fromClass}`);
  const $to = document.querySelector(`.${toClass}`);

  if (!$elem || $from || $to) {
    return;
  }

  if (window.innerWidth <= width && $elem.closest(`.${fromClass}`)) {
    $to.append($elem);
  } else if (window.innerWidth > width && !$elem.closest(`.${fromClass}`)) {
    $from.append($elem);
  }
}


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
  const cardsCount = $cardCountField.value;

  const $cardsCount = document.querySelector('.calc__result-cards-count');
  $cardsCount.innerHTML = cardsCount;

  const $cardsPrice = document.querySelector('.calc__result-value_cards');
  $cardsPrice.innerHTML = `${cardsCount * cardPrice} ₽`;

  const total = rateTotal + cardPrice * cardsCount;
  $value.innerHTML = `${total} ₽`;
}