import setSlider from './setSlider.js';
import setCountDown from './setCountDown.js';
import handleCarouselButtons from './handleCarouselButtons.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const downLoadQR = $('header .navbar_connects_download');
const downLoadPopover = $('header .connects_download_wrapper');

const notificationList = $('header .navbar_supports_notification');
const notificationPopover = $('header .supports_notification_popover');

const languageList = $$('header .popover_language');
const selectedLanguage = $('header .navbar_language_selected');
const languagesPopover = $('header .supports_languages_popver');
const languageSelector = $('header .navbar_supports_languages');

const searchForm = $('#search_container_input');
const searchInput = $('#search_container_input input');
const recentSearchesList = $('header .search_container_recentSearches');

const cartList = $('header .search_cart_wrapper');
const cartPopover = $('header .search_cart_popover');

const bannerSliderStardusts = $$(
    '.main_banner .slider_wrapper .slider_stardust'
);
const bannerSliderBackBtn = $(
    '.main_banner .slider_wrapper .slider_button_back'
);
const bannerSliderNextBtn = $(
    '.main_banner .slider_wrapper .slider_button_next'
);
const bannerSlider = $('.main_banner .slider_wrapper');
const bannerSliderImages = $('.main_banner .slider_wrapper ul');
const bannerSliderBtns = $$('.main_banner .slider_wrapper .slider_button');

const categoryNextBtn = $('.main_content_category .carousel_button_next');
const categoryBackBtn = $('.main_content_category .carousel_button_back');
const categoryWrapper = $('.main_content_category .content_category_body');
const categoryCarousel = $('.main_content_category .content_category_body ul');

const timeSliderHour = $('.main_content_flashsale .title_countdown_hours');
const timeSliderMinute = $('.main_content_flashsale .title_countdown_minutes');
const timeSliderSecond = $('.main_content_flashsale .title_countdown_seconds');

const flashsaleWrapper = $('.main_content_flashsale .category_wrapper');
const flashsaleNextBtn = $('.main_content_flashsale .carousel_button_next');
const flashsaleBackBtn = $('.main_content_flashsale .carousel_button_back');
const flashsaleCarousel = $('.main_content_flashsale .category_wrapper ul');

const shopmallSliderStardusts = $$(
    '.main_content .slider_wrapper .slider_stardust'
);
const shopmallSliderBackBtn = $(
    '.main_content .slider_wrapper .slider_button_back'
);
const shopmallSliderNextBtn = $(
    '.main_content .slider_wrapper .slider_button_next'
);
const shopmallSlider = $('.main_content .slider_wrapper');
const shopmallSliderImages = $('.main_content .slider_wrapper ul');
const shopmallSliderBtns = $$('.main_content .slider_wrapper .slider_button');

const shopmallCategoryNextBtn = $(
    '.main_content_shopmall .carousel_button_next'
);
const shopmallCategoryBackBtn = $(
    '.main_content_shopmall .carousel_button_back'
);
const shopmallCategoryWrapper = $(
    '.main_content_shopmall .shopmall_content_category'
);
const shopmallCategoryCarousel = $(
    '.main_content_shopmall .shopmall_content_category ul'
);

const topsearchWrapper = $('.main_content_topsearch .category_wrapper');
const topsearchNextBtn = $('.main_content_topsearch .carousel_button_next');
const topsearchBackBtn = $('.main_content_topsearch .carousel_button_back');
const topsearchCarousel = $('.main_content_topsearch .category_wrapper ul');

const recommendItems = $$(
    '.main_content_items .content_items_body .item_wrapper'
);
const adsBody = $('.main_content_items .items_body_ads');
const adsHeader = $('.main_content_items .items_header_ads');
const recommendBody = $('.main_content_items .items_body_recommed');
const recommendHeader = $('.main_content_items .items_header_recommend');
const headerHighLight = recommendHeader.querySelector('.highlight_line');

const popoverHandler = (target, popover) => {
    target.onmouseover = () => {
        popover.style.transform = 'scale(1)';
        popover.style.opacity = '1';
    };

    target.onmouseout = () => {
        popover.style = '';
    };
};

const handleSliderBtns = (
    sliderWrapper,
    buttons,
    nextBtn,
    backBtn,
    stardusts,
    sliderHandler
) => {
    sliderWrapper.onmouseover = () => {
        buttons.forEach((ele) => {
            ele.style = 'display: block';
        });
    };

    sliderWrapper.onmouseout = () => {
        buttons.forEach((ele) => {
            ele.style = 'display: none';
        });
    };

    nextBtn.onclick = () => {
        sliderHandler.next();
        nextBtn.disabled = true;
        setTimeout(() => (nextBtn.disabled = false), 500);
    };

    backBtn.onclick = () => {
        sliderHandler.back();
        backBtn.disabled = true;
        setTimeout(() => (backBtn.disabled = false), 500);
    };

    stardusts.forEach((stardust, index) => {
        stardust.onclick = () => {
            sliderHandler.moveto(index + 1);
        };
    });
};

const handleActiveCarouselBtn = (carouselContainer, nextBtn, backBtn) => {
    carouselContainer.onmouseover = () => {
        nextBtn.classList.add('carousel_buttons--active');
        nextBtn.classList.remove('carousel_buttons--hint');
        backBtn.classList.add('carousel_buttons--active');
        backBtn.classList.remove('carousel_buttons--hint');
    };

    carouselContainer.onmouseout = () => {
        nextBtn.classList.remove('carousel_buttons--active');
        nextBtn.classList.add('carousel_buttons--hint');
        backBtn.classList.remove('carousel_buttons--active');
        backBtn.classList.add('carousel_buttons--hint');
    };
};

popoverHandler(cartList, cartPopover);
popoverHandler(languageSelector, languagesPopover);
popoverHandler(notificationList, notificationPopover);

const bannerSliderHandler = setSlider(
    bannerSliderImages,
    13,
    4000,
    bannerSliderStardusts
);
handleSliderBtns(
    bannerSlider,
    bannerSliderBtns,
    bannerSliderNextBtn,
    bannerSliderBackBtn,
    bannerSliderStardusts,
    bannerSliderHandler
);

handleActiveCarouselBtn(categoryWrapper, categoryNextBtn, categoryBackBtn);
handleCarouselButtons(
    categoryCarousel,
    categoryNextBtn,
    categoryBackBtn,
    14,
    10
);

setCountDown(timeSliderHour, timeSliderMinute, timeSliderSecond, 221);

handleActiveCarouselBtn(flashsaleWrapper, flashsaleNextBtn, flashsaleBackBtn);
handleCarouselButtons(
    flashsaleCarousel,
    flashsaleNextBtn,
    flashsaleBackBtn,
    16,
    6
);

const shopmallSliderHandler = setSlider(
    shopmallSliderImages,
    10,
    4000,
    shopmallSliderStardusts
);
handleSliderBtns(
    shopmallSlider,
    shopmallSliderBtns,
    shopmallSliderNextBtn,
    shopmallSliderBackBtn,
    shopmallSliderStardusts,
    shopmallSliderHandler
);

handleActiveCarouselBtn(
    shopmallCategoryWrapper,
    shopmallCategoryNextBtn,
    shopmallCategoryBackBtn
);
handleCarouselButtons(
    shopmallCategoryCarousel,
    shopmallCategoryNextBtn,
    shopmallCategoryBackBtn,
    8,
    4
);

handleActiveCarouselBtn(topsearchWrapper, topsearchNextBtn, topsearchBackBtn);
handleCarouselButtons(
    topsearchCarousel,
    topsearchNextBtn,
    topsearchBackBtn,
    20,
    6
);

downLoadQR.onmouseover = () => {
    downLoadPopover.style.display = 'flex';
};

downLoadQR.onmouseout = () => {
    downLoadPopover.style.display = 'none';
};

selectedLanguage.querySelector('span').innerText = languageList[0].innerText;

languageList.forEach((node) => {
    node.onclick = () => {
        selectedLanguage.querySelector('span').innerText = node.innerText;
        languagesPopover.style = '';
    };

    node.onmouseover = () => {
        node.style.color = '#fb5533';
    };

    node.onmouseout = () => {
        node.style.color = 'rgba(0, 0, 0, 0.9)';
    };
});

selectedLanguage.onmouseover = () => {
    languageList.forEach((node) => {
        if (
            node.innerText === selectedLanguage.querySelector('span').innerText
        ) {
            node.style.color = '#fb5533';
        }
    });
};

selectedLanguage.onmouseout = () => {
    languageList.forEach((node) => {
        node.style.color = 'rgba(0, 0, 0, 0.9)';
    });
};

searchInput.onfocus = () => {
    searchForm.classList.add('search_container_outline');

    recentSearchesList.style.display = 'flex';
};

document.body.onclick = (event) => {
    if (
        // !recentSearchesList.contains(event.target.parentNode) &&
        !searchForm.isEqualNode(event.target)
    ) {
        searchForm.classList.remove('search_container_outline');
        recentSearchesList.style.display = 'none';
    }
};

recentSearchesList.onclick = () => {
    recentSearchesList.style.display = 'none';
};

recommendItems.forEach((item) => {
    item.onmouseover = () => {
        item.querySelector('.recommend_item_similar').style.opacity = 1;
    };

    item.onmouseout = () => {
        item.querySelector('.recommend_item_similar').style.opacity = 0;
    };
});

adsHeader.onclick = () => {
    headerHighLight.style.left = `${recommendHeader.clientWidth}px`;
    headerHighLight.style.width = `${adsHeader.clientWidth}px`;
    recommendBody.style.display = 'none';
    recommendBody.style.opacity = 0;
    adsBody.style.display = 'block';
    adsBody.style.opacity = 1;
};

recommendHeader.onclick = () => {
    headerHighLight.style = '';
    recommendBody.style = '';
    adsBody.style = '';
};
