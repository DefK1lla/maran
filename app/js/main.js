$(function() {

    if ($('html').attr('lang') == 'en') {
        var easyCalendar = $('.date').easyCalendar({ 'month_name': ['January', 'February ', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], 'submit_text': 'Go to date' });

    } else {
        var easyCalendar = $('.date').easyCalendar();
    }

    // Language select
    const langHead = $('.lang__head'),
        langOptions = $('.lang__option'),
        body = $('body');

    langHead.on('click', function() {
        $(this).parents('.lang__select').toggleClass('lang__select--active');
        body.toggleClass('scroll-lock');
    });

    langOptions.on('click', function() {
        langOptions.removeClass('lang__option--active');

        $(this).addClass('lang__option--active');
        $(this).parents('.lang__select').removeClass('lang__select--active');

        body.removeClass('scroll-lock');

    });

    // Mobile menu
    const menuBtn = $('.menu-btn'),
        menu = $('.menu');

    menuBtn.on('click', function() {
        menu.toggleClass('active');
        body.toggleClass('scroll-lock');
    });

    $(document).on('click', function(e) {
        if (!e.target.closest('.header__menu')) {
            menu.removeClass('active');
        }

        if (!e.target.closest('.lang')) {
            langHead.closest('.lang__select').removeClass('lang__select--active');
        }

        if (!e.target.closest('.filter')) {
            $('.tags').removeClass('active');
        }

        if (!e.target.closest('.header__menu') && !e.target.closest('.lang') && !e.target.closest('.filter')) {
            body.removeClass('scroll-lock');
        }

    });

    $('.slider__items').slick({
        dots: true,
    });


    $.each($('.ibg'), function(index, val) {
        if ($(this).find('img').length > 0) {
            $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
        }
    });


    let $slider = $('.scroll');
    let isDown = false;
    let startX;
    let scrollLeft;

    $slider.mousedown(function(e) {
        $(this).css({
            cursor: 'grabbing'
        });

        $('.scroll-item').css({
            cursor: 'inherit'
        });

        isDown = true;
        // $slider.addClass('active');
        startX = e.pageX - $(this).get(0).offsetLeft;
        scrollLeft = $(this).get(0).scrollLeft;
    });
    $slider.mouseleave(function() {
        isDown = false;
        // $slider.removeClass('active');
        $(this).css({
            cursor: 'grab'
        });
    });
    $slider.mouseup(function() {
        $(this).css({
            cursor: 'grab'
        });

        $('.sports__item').css({
            cursor: 'pointer'
        });

        isDown = false;
        // $slider.removeClass('active');
    });
    $slider.mousemove(function(e) {
        if (!isDown) return;
        e.preventDefault();
        var x = e.pageX - $slider.get(0).offsetLeft;
        var walk = (x - startX) * 3; //scroll-fast
        $(this).get(0).scrollLeft = scrollLeft - walk;
    });

    $('.sports__item').on('click', function(e) {
        e.preventDefault();

        $(this).siblings('.sports__item').removeClass('active');
        $(this).addClass('active');
    });

    // Tabs
    const tabBtns = $('.tabs-btn'),
        tabs = $('.tabs-body');

    tabBtns.on('click', function(e) {
        e.preventDefault();

        $(this).siblings('.tabs-btn').removeClass('active');
        $(this).addClass('active');

        let currentTab = $(this.dataset.tab);

        currentTab.siblings('.tabs-body').removeClass('active');
        currentTab.addClass('active');
    });


    // Accardeon
    $('.accardeon-btn').on('click', function() {
        $(this).toggleClass('active');
        $(this).next('.accardeon-body').toggleClass('active');
    });



    $('.edit').on('click', function() {
        $(this).siblings('.placeholder').removeClass('active');
        $(this).removeClass('active');
        $(this).siblings('.input').addClass('active');
        $(this).siblings('.save').addClass('active');
        $(this).siblings('.input').focus();

    });


    $('.save').on('click', function() {
        $(this).siblings('.placeholder').addClass('active');
        $(this).siblings('.edit').addClass('active');
        $(this).siblings('.input').removeClass('active');
        $(this).removeClass('active');

        $(this).siblings('.placeholder').text($(this).siblings('.input').val());
    });

    $('.copy').on('click', function() {
        let $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(this).siblings('.copy-text').text()).select();
        document.execCommand("copy");
        $temp.remove();
    });

    $('.generate-key').on('click', function() {
        $(this).removeClass('active');
        $(this).siblings('.mnemokey').addClass('active');
    });


    // Steps
    $('.next-step').on('click', function(e) {
        e.preventDefault();

        let currentStep = $(this).closest('.steps').find('.steps__item.active').last(),
            currentProgress = $(this).closest('.steps').find('.steps__progress-item.active').last();

        currentStep.next().addClass('active');
        currentStep.removeClass('active');

        currentProgress.next().addClass('active');

        $('.swap__label-amount').text($('.swap__control-amount').val() + $('.swap__token-body.active').siblings('.swap__token-name').text());
    });

    $('.steps__input#sum').on('change', function() {
        $('.steps__input#sumConfirm').val($(this).val());
        $('[for=sumConfirm]').text($(this).val());
    });




    let selectHeader = $('.select__header');
    let selectItem = $('.select__item');

    selectHeader.on('click', selectToggle);
    selectItem.on('click', selectChoose);

    function selectToggle() {
        $(this).parent().toggleClass('is-active');
    }

    function selectChoose() {
        let text = $(this).text(),
            select = $(this).closest('.select'),
            currentText = select.find('.select__current');
        currentText.text(text);
        select.removeClass('is-active');

    }

    let tags = $('.tag');

    tags.on('click', function() {
        tags.removeClass('active');
        $(this).addClass('active');

        $('.history__tags').removeClass('active');
        $('body').removeClass('scroll-lock');
    });

    $('.filter__open').on('click', function() {
        $('.tags').toggleClass('active');
        $('body').addClass('scroll-lock');
    });



    // Popup
    const lockPaddingValue = window.innerWidth - $('.wrapper').offsetWidth + 'px'; // Получаем размер скроллбара
    let lockPaddings = $('.lock-padding'); // Элементы с position: fixed

    let popups = $('.popup'),
        popupLinks = $('.popup-link'),
        curentPopup;

    popupLinks.on('click', function(e) {
        e.preventDefault();

        if (curentPopup) {
            curentPopup.removeClass('open');
        }

        curentPopup = $(this.dataset.popup);
        curentPopup.addClass('open');
        body.addClass('scroll-lock'); // Отключаем скролл

        // Убираем дёргание при открытии попапа
        body.css({
            paddingRight: lockPaddingValue
        });
        lockPaddings.css({
            paddingRight: lockPaddingValue
        });
    });


    let popupClose = $('.popup-close');


    popupClose.on('click', function(e) {
        if (!e.target.closest('.popup__content') && !e.target.closest('.popup__search') || e.target.closest('.popup__close')) {
            popups.removeClass('open');

            setTimeout(() => {
                body.removeClass('scroll-lock');

                // Убираем дёргание при закрытии попапа
                body.css({
                    paddingRight: '0px'
                });
                lockPaddings.css({
                    paddingRight: '0px'
                });
            }, 400);
        }
    });

    $('.coefficient').on('click', function() {
        $('.bet-window').addClass('active');

        $(this).toggleClass('active');
    });

    $('.bet-window__close').on('click', function() {
        $('.bet-window').removeClass('active');
        $('.bet-window').find('.bet-window__control').val('');

        $('.coefficient').css({
            background: 'transparent'
        });
    });

    $('.bet-window__bid-btn').on('click', function() {
        $(this).parents('.bet-window__bid').find('.bet-window__control').val(+$(this).text());
    });

    $('.token-choice').on('click', function() {
        $(this).toggleClass('active');
    });

});