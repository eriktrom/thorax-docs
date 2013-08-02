$(function() {

  // Toggle mobile menus

  var toggleMenu = function($btn, $menu) {
    $btn.toggleClass('active');
    $menu.toggleClass('expanded');
  }

  $('.js-toggle').on('click', function() {
    var $btn = $(this),
        $menu = $( $btn.data('menu') );

    toggleMenu($btn, $menu);
  });

  // Close mobile menus on select

  $('.js-menu').on('click', 'a', function() {
    var $menu = $(this).parents('.js-menu'),
        $btn = $( $menu.data('control') );

    toggleMenu($btn, $menu);
  });

  // Fix API sidebar position on scroll

  var sidebar = $('.sidebar');
  var threshold = 24;

  if (sidebar.length > 0) {
    var sidebarTop = sidebar.offset().top;

    var positionSidebar = function() {
      var docViewTop = $(window).scrollTop();

      if (sidebarTop <= docViewTop + 24) {
        sidebar.addClass('fixed');
      } else {
        sidebar.removeClass('fixed');
      }
    };

    $(window).scroll(function() {
      positionSidebar();
    });

    positionSidebar();
  }

  // Toggle tutorial video display

  var hero = $('.hero'),
      heroContent = hero.find('.hero-content'),
      video = $('.video'),
      iframe = video.find('iframe')[0],
      player = $f(iframe),
      videoButton = $('.js-screencast');

  var toggleVideo = function() {
    hero.height( hero.height() );

    window.setTimeout(animateHero, 1);
    window.setTimeout(checkHero, 2);
  };

  var animateHero = function() {
    hero.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
      if ( $(e.target).hasClass('hero') ) {
        resetHero();
      }
    })
    .addClass('animating');
  }

  var checkHero = function() {
    if (hero.hasClass('has-video')) {
      hero.height( heroContent.outerHeight() )
          .removeClass('has-video')
      player.api('pause');
    } else {
      hero.height( video.height() )
          .addClass('has-video')
    }
  }

  var resetHero = function() {
    hero.height('auto').removeClass('animating');
  }

  videoButton.on('click', function(e) {
    e.preventDefault();
    toggleVideo();
  });

  // features toggle
  $('.features-nav li').click(function(event) {
    event.preventDefault();
    var id = $(this).find('a').attr('href');
    hideFeatures();
    toggleFeature(id, true);
  });

  function hideFeatures() {
    $('.features-nav li').each(function() {
      toggleFeature($(this).find('a').attr('href'), false);
    });
  }
  hideFeatures();

  function toggleFeature(id, show) {
    var elements = $(id).add($(id).nextUntil('h2'));
    elements.toggle(show);
  }

  toggleFeature($('.features-nav li:first a').attr('href'), true);

});