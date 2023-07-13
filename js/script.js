const langHead = document.querySelector('.js_lang_head');
const langBody = document.querySelector('.js_lang_body');

langHead.addEventListener('click', () => {
    langHead.classList.toggle('active');
    langBody.classList.toggle('open');
});

document.body.addEventListener('click', (e) => {
   if (!e.target.closest('.js_langs_select')) {
       langHead.classList.remove('active');
       langBody.classList.remove('open');
   }
});

const headerBurger = document.querySelector('.header__burger');
const headerNav = document.querySelector('.header__nav');

headerBurger.addEventListener('click', () => {
    headerNav.classList.toggle('show');
    headerBurger.classList.toggle('active');
    document.body.classList.toggle('this--overflow');
});

const header = document.querySelector('.header');

if (window.pageYOffset > 0 && !header.classList.contains('scroll')) {
    header.classList.add('scroll');
} else if (window.pageYOffset === 0) {
    header.classList.remove('scroll');
}
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0 && !header.classList.contains('scroll')) {
        header.classList.add('scroll');
    } else if (window.pageYOffset === 0) {
        header.classList.remove('scroll');
    }
});

const headeMenuLinks = header.querySelectorAll('.header__menu_link');

headeMenuLinks.forEach(link => {

    link.addEventListener('click', function (e) {
        e.preventDefault();
        headerNav.classList.remove('show');
        headerBurger.classList.remove('active');
        document.body.classList.remove('this--overflow');
        let href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        let topOffset = header.offsetHeight;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});;
new Swiper('.why__slider', {
    speed: 400,
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    spaceBetween: 10,
    navigation: {
        nextEl: ".why__slider_next",
        prevEl: ".why__slider_prev",
    },
    pagination: {
        el: '.why__slider_pagination',
        type: 'bullets',
        clickable: true,
    },
    breakpoints: {
        768: {
            spaceBetween: 10,
            slidesPerView: 3,
        },
        1024: {
            spaceBetween: 40,
            slidesPerView: 3,
        },
    },
});;
if (document.querySelector('.instructors__slider')) {
    const offerSlider = new Swiper('.instructors__slider', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: ".instructors__slider_next",
            prevEl: ".instructors__slider_prev",
        },
        autoHeight: true,
        pagination: {
            el: '.instructors__slider_pagination',
            clickable: true
        }

    });

    window.addEventListener('DOMContentLoaded', () => {
        offerSlider.update();
    });
};
new Swiper('.reviews__slider', {
    speed: 400,
    slidesPerView: 1,
    loop: true,
    spaceBetween: 10,
    navigation: {
        nextEl: ".reviews__slider_next",
        prevEl: ".reviews__slider_prev",
    },
    pagination: {
        el: '.reviews__slider_pagination',
        type: 'bullets',
        clickable: true,
    },
    breakpoints: {
        1024: {
            slidesPerView: 2,
            spaceBetween: 60,
        },
    },
});;
const openPopupBtns = document.querySelectorAll('.js_open_popup');

if (openPopupBtns.length > 0) {
    const callbackPopup = document.querySelector('.callback');
    const callbackClose = callbackPopup.querySelectorAll('.js_callback_close');
    const callbackContents = callbackPopup.querySelectorAll('.callback__content');

    openPopupBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            callbackPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
            callbackContents.forEach((content) => {
                if (content.dataset.content === 'form') {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        })
    })
    callbackClose.forEach((close) => {
        close.addEventListener('click', () => {
            callbackPopup.classList.remove('show');
            document.body.style.overflow = 'visible';
        });
    });
    callbackPopup.addEventListener('click', (e) => {
        if (!e.target.closest('.callback__body')) {
            callbackPopup.classList.remove('show');
            document.body.style.overflow = 'visible';
        }
    });

    const callbackForm = callbackPopup.querySelector('.callback__form');
    const inputTel = callbackForm.querySelector('.js_input_tel');

    $('.js_input_tel').inputmask('+9999999999[9]');

    callbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let valid = true;
        if (inputTel.value.indexOf('_') !== -1 || inputTel.value === '') {
            inputTel.classList.add('error');
            valid = false;
        }
        if (valid) {
            let response = await fetch('form-action.php', {
                method: 'POST',
                body: new FormData(callbackForm)
            });
            if (response.ok) {
                callbackForm.reset();
                callbackContents.forEach((content) => {
                    if (content.dataset.content === 'thanks') {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            } else {
                alert('Произошла ошибка отправки, попробуйте еще раз!');
            }
        }
    });

    inputTel.addEventListener('focus', () => {
        inputTel.classList.remove('error');
    });
}
;
const openVideoPopupBtns = document.querySelectorAll('.js_open_video');

if (openVideoPopupBtns.length > 0) {
    const videoPopup = document.querySelector('.video_popup');
    const videoPopupClose = videoPopup.querySelectorAll('.video_popup__close');
    const videoPopupVideos = videoPopup.querySelectorAll('.video_popup__video');

    openVideoPopupBtns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            videoPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
            videoPopupVideos.forEach((content) => {
                let iFrame = content.querySelector('iframe');
                if (content.dataset.video === this.dataset.video) {
                    content.classList.add('active');
                    iFrame.src = iFrame.dataset.src;
                } else {
                    content.classList.remove('active');
                    iFrame.src = '';
                }
            });
        })
    })
    videoPopupClose.forEach((close) => {
        close.addEventListener('click', () => {
            videoPopup.classList.remove('show');
            document.body.style.overflow = 'visible';
            videoPopupVideos.forEach((content) => {
                let iFrame = content.querySelector('iframe');
                iFrame.src = '';
            });
        });
    });
    videoPopup.addEventListener('click', (e) => {
        if (!e.target.closest('.callback__body')) {
            videoPopup.classList.remove('show');
            document.body.style.overflow = 'visible';
            videoPopupVideos.forEach((content) => {
                let iFrame = content.querySelector('iframe');
                iFrame.src = '';
            });
        }
    });
};