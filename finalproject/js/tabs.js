var bookwidth = $(window).width()*0.6;
var bookheight = bookwidth * (600/922);

function loadApp() {

    // Create the flipbook
    $('.flipbook').css('cursor', 'pointer');
    

	$('.flipbook').turn({
			// Width
			width: bookwidth,
			
			// Height
			height: bookheight,

			// Elevation
			elevation: 50,
			
			// Enable gradients
			gradients: true,
			
			// Auto center this flipbook
			autoCenter: true

    });
    
    $('.flipbook').on('turning', function(event, page, obj){
        if (page == 3 || page == 5 || page == 7) {
            $(`.nav-tabs a[href="#tab${page-1}"]`).tab('show')
        } else {
            $(`.nav-tabs a[href="#tab${page}"]`).tab('show')
        }
    });

    $('.flipbook-viewport').zoom({
        flipbook: $('.flipbook'),
    
        max: function() { 
            
            return largeMagazineWidth()/$('.flipbook').width();
    
        }, 
    
        when: {
    
            swipeLeft: function() {
                $(this).zoom('flipbook').turn('next');
            },
    
            swipeRight: function() {
                $(this).zoom('flipbook').turn('previous')
            },
        }
    });

}

// Resize
$(window).resize(function() {
    bookwidth = $(window).width()*0.6;
    bookheight = bookwidth * (600/922);

    if ($('.flipbook-viewport').zoom('value')!=1) {
        zoomTo();
        window.setTimeout(function(){$('.flipbook').turn("size", bookwidth, bookheight);}, 550);
    } else {
        $('.flipbook').turn("size", bookwidth, bookheight);
    }
});

// Zoom event

function largeMagazineWidth() {
	return 2214;
}

function zoomTo(event) {

    setTimeout(function() {
        if ($('.flipbook-viewport').data().regionClicked) {
            $('.flipbook-viewport').data().regionClicked = false;
        } else {
            if ($('.flipbook-viewport').zoom('value')==1) {
                $('.flipbook-viewport').zoom('zoomIn', event);
                $('.flipbook').css('cursor', 'grab');
                $('.flipbook').on('mousewheel', zoomTo);
            } else {
                $('.flipbook-viewport').zoom('zoomOut');
                $('.flipbook').css('cursor', 'pointer');
                $('.flipbook').off('mousewheel');
            }
        }
    }, 1);

}

if ($.isTouch)
    $('.flipbook-viewport').on('zoom.doubleTap', zoomTo);
else
    $('.flipbook-viewport').on('zoom.tap', zoomTo);

$(".nav-link").click(function (ev) {
    // console.log(ev.target.id);
    $('.flipbook').turn('page', ev.target.id);
});

// Scroll To Top

$('.changepage').click(function(ev){
    console.log($(this).data("tabselect"));
    $(`.nav-tabs a[href="#tab${$(this).data("tabselect")}"]`).tab('show');
    $('.flipbook').turn('page', $(this).data("tabselect"));
});

yepnope({
	test : Modernizr.csstransforms,
	yep: ['js/pageflip/turn.js'],
	nope: ['js/pageflip/turn.html4.min.js'],
	both: ['js/pageflip/zoom.min.js', 'css/pages.css'],
	complete: loadApp
});

