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
      video = $('.video').find('iframe')[0],
      player = $f(video),
      videoButton = $('.js-screencast');

  if (hero.length > 0) {
    // hero.height( hero.outerHeight() );

    var toggleVideo = function() {
      if ( !hero.hasClass('has-video') || hero.hasClass('no-video') ) {
        hero.addClass('has-video')
            .removeClass('no-video');
      } else {
        hero.removeClass('has-video')
            .addClass('no-video');
        player.api('pause');
      }
    };

    videoButton.on('click', function(e) {
      e.preventDefault();
      toggleVideo();
    });
  }

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