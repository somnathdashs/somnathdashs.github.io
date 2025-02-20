; (function ($) {
    "use strict";

    /* ==========================================================================
       Preloader
    ========================================================================== */
    $(window).on('load', function () {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({ 'overflow': 'visible' });
        var url_string = location.href;
        var url = new URL(url_string);
        const share = url.searchParams.get("share");
        // while (!Navigator.canShare()) {

        // }
        // if (share) {
        //     $("#sharess").click()
        // }


    })


    /* ==========================================================================
       Skroller js
   ========================================================================== */
    skrollr.init({
        smoothScrolling: true
    });


    /* ==========================================================================
       Magnfic Video
   ========================================================================== */

    var $vdoPop = $('.video');
    if ($vdoPop.length > 0) {
        $vdoPop.magnificPopup({
            type: 'iframe',
            iframe: {
                markup: '<style>.mfp-iframe-holder .mfp-content {max-width: 900px;height:500px}</style>' +
                    '<div class="mfp-iframe-scaler" >' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div></div>'
            }
        });
    }
    /* ==========================================================================
      Counter Up
   ========================================================================== */
    var $counter = $('.counter');
    if ($counter.length > 0) {
        $counter.counterUp({
            delay: 20,
            time: 3000
        });
    }

    /* ==========================================================================
       swiper
    ========================================================================== */
    var $swiper = $('.swiper-container');
    if ($swiper.length > 0) {
        var swiper = new Swiper($swiper, {
            effect: 'coverflow',
            loop: true,
            centeredSlides: true,
            autoplay: 2000,
            speed: 2000,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 0,
                stretch: 80,
                depth: 200,
                modifier: 1,
                slideShadows: false,
            }
        });
    }


    /* ==========================================================================
        Parallax
    ========================================================================== */
    var $parallax = $('.parallaxie');
    if ($parallax.length > 0) {
        $parallax.parallaxie({
            speed: .975
        });
    }

    /* ==========================================================================
    Testimonial Carousel
    ========================================================================== */
    var quoteCarousel = $('.quote-wrapper')
    if (quoteCarousel.length > 0) {
        quoteCarousel.owlCarousel({
            loop: true,
            autoplayTimeout: 3500,
            nav: false,
            margin: 20,
            responsive: {
                320: {
                    items: 1
                },
                681: {
                    items: 2
                },
                991: {
                    items: 3
                },
                1200: {
                    items: 4
                },
                1920: {
                    items: 5
                }
            }
        })
    }

    /* ==========================================================================
    Tools Carousel
    ========================================================================== */
    var toolsCarousel = $('.tools-carousel')
    if (toolsCarousel.length > 0) {
        toolsCarousel.owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 1000,
            autoWidth: true,
            nav: false,
            responsive: {
                320: {
                    items: 2
                },
                681: {
                    items: 4
                },
                991: {
                    items: 6
                },
                1200: {
                    items: 8
                }
            }
        })
    }

    /* ==========================================================================
       Wow
   ========================================================================== */
    new WOW().init();


    /* ==========================================================================
      Mailchimp ajax
    ========================================================================== */
    if ($('.mailchimp').length > 0) {
        /*  MAILCHIMP  */
        $('.mailchimp').ajaxChimp({
            language: 'es',
            callback: mailchimpCallback,
            url: "" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
        });
    }

    function mailchimpCallback(resp) {
        if (resp.result === 'success') {
            $('.subscription-success').html(resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);

        } else if (resp.result === 'error') {
            $('.subscription-error').html(resp.msg).fadeIn(1000);
        }
    }
    $.ajaxChimp.translations.es = {
        'submit': 'Submitting...',
        0: 'We have sent you a confirmation email',
        1: 'Please enter a value',
        2: 'An email address must contain a single @',
        3: 'The domain portion of the email address is invalid (the portion after the @: )',
        4: 'The username portion of the email address is invalid (the portion before the @: )',
        5: 'This email address looks fake or invalid. Please enter a real email address'
    };


    /* ==========================================================================
        Menu click scroll
    ========================================================================== */

    var $navItem = $('.right-nav a, .demo a');
    if ($navItem.length > 0) {
        $navItem.on('click', function (e) {
            $(document).off("scroll");
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                || location.hostname == this.hostname) {

                var target = $(this.hash),
                    headerHeight = $(".navbar").height() - 2; // Get fixed header height

                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - headerHeight
                    }, 1000);
                    return false;
                }
            }
        });
    }
    /* ==========================================================================
       Accordion
   ========================================================================== */

    function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".more-less")
            .toggleClass('glyphicon-plus glyphicon-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);


    /* ==========================================================================
        pricing
    ========================================================================== */
    var e = document.getElementById("filt-monthly"),
        d = document.getElementById("filt-hourly"),
        t = document.getElementById("switcher"),
        m = document.getElementById("monthly"),
        y = document.getElementById("hourly");
    e.addEventListener("click", function () {
        t.checked = false;
        e.classList.add("toggler--is-active");
        d.classList.remove("toggler--is-active");
        m.classList.remove("none");
        y.classList.add("none");
    });

    d.addEventListener("click", function () {
        t.checked = true;
        d.classList.add("toggler--is-active");
        e.classList.remove("toggler--is-active");
        m.classList.add("none");
        y.classList.remove("none");
    });

    t.addEventListener("click", function () {
        d.classList.toggle("toggler--is-active");
        e.classList.toggle("toggler--is-active");
        m.classList.toggle("none");
        y.classList.toggle("none");
    })

})(jQuery);
function getOS() {
    const userAgent = window.navigator.userAgent,
        platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
        macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (/Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}


function downloadForPlatform() {
    const platform = getOS();

    // Define file URLs for different platforms
    const windowsFile = "https://github.com/somnathdashs/Mock-24x7/releases/download/v2.0.0/Mock.24x7_Winx64_v2.0.0.zip";
    // const macFile = "https://example.com/your-mac-file.dmg";
    // const linuxFile = "https://example.com/your-linux-file.deb";
    const androidFile = "https://github.com/somnathdashs/Mock-24x7/releases/download/v2.1.0/Mock.24x7.v2.1.1.android.apk";
    // const iosFile = "https://example.com/your-ios-file.ipa";

    // Check platform
    if (platform.includes("Windows")) {
        window.location.href = windowsFile;
    } else if (platform.includes("Mac OS")) {
        alert("Platform not supported for download.");
        // window.location.href = macFile;
    } else if (platform.includes("Linux")) {
        alert("Platform not supported for download.");
        // window.location.href = linuxFile;
    } else if (platform.includes("Android")) { // For Android devices
        window.location.href = androidFile;

    } else if (platform.includes("iOS")) { // For iOS devices
        // window.location.href = iosFile;
        alert("Platform not supported for download.");

    } else {
        alert("Platform not supported for download.");
    }
}