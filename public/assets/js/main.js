$(function() {
    
    "use strict";
    
    //===== Prealoder
    
    $(window).on('load', function(event) {
        $('.preloader').delay(500).fadeOut(500);
    });
    
    
    //===== Sticky

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".navbar-area").removeClass("sticky");
            // $(".navbar-area img").attr("src", "assets/images/logo.svg");
        } else {
            $(".navbar-area").addClass("sticky");
            // $(".navbar-area img").attr("src", "assets/images/logo-2.svg");
        }
    });

    
    //===== Section Menu Active

    // var scrollLink = $('.page-scroll');
    // Active link switching
    // $(window).scroll(function () {
    //     var scrollbarLocation = $(this).scrollTop();

    //     scrollLink.each(function () {

    //         var sectionOffset = $(this.hash).offset().top - 73;

    //         if (sectionOffset <= scrollbarLocation) {
    //             $(this).parent().addClass('active');
    //             $(this).parent().siblings().removeClass('active');
    //         }
    //     });
    // });
    
    
    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });
    
    
    //===== Sidebar

    $('[href="#side-menu-left"], .overlay-left').on('click', function (event) {
        $('.sidebar-left, .overlay-left').addClass('open');
    });

    $('[href="#close"], .overlay-left').on('click', function (event) {
        $('.sidebar-left, .overlay-left').removeClass('open');
    });
    
    
    
    //===== Back to top
    
    // Show or hide the sticky footer button
    $(window).on('scroll', function(event) {
        if($(this).scrollTop() > 600){
            $('.back-to-top').fadeIn(200)
        } else{
            $('.back-to-top').fadeOut(200)
        }
    });
    
    
    //Animate the scroll to yop
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    
    
    var firebaseConfig = {
        apiKey: "AIzaSyCMcC6qhZ8Rzhwqd7wrpeogqMAVboIQZzo",
        authDomain: "static-electric.firebaseapp.com",
        projectId: "static-electric",
      };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var db = firebase.firestore();
    
    // Handle Testimonial Form
    $('#contact-form').submit(function(event) {
        event.preventDefault();
        const message = $(this).find("textarea[name='testimonial']").val();
        const name = $(this).find("input[name='name']").val();
        const email = $(this).find("input[name='email']").val();
        const city = $(this).find("input[name='city']").val();
        db.collection("testimonials").add({
            message: message,
            name: name,
            email: email,
            city: city
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            $('.testimonial-success-alert').removeClass('d-none');
            setTimeout(function() {
                $('.testimonial-success-alert').addClass('d-none');
            }, 5000)
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        $(this).find("textarea[name='testimonial']").val("");
        $(this).find("input[name='name']").val("");
        $(this).find("input[name='city']").val("");
        $(this).find("input[name='email']").val("");
        fetchTestimonials(db);
    });
    
    
    fetchTestimonials(db);
    
});

function fetchTestimonials(db) {
    $('#testimonials .carousel-inner').html("");
    db.collection("testimonials").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        $('#testimonials .carousel-inner').prepend("<div class='carousel-item bg-transparent h-100'><div class='container'><div class='row justify-content-center'><div class='col-8'><p class='text text-muted py-3'>"+doc.data().message+"</p><hr><p class='text text-muted text-left pb-1'><b>"+doc.data().name+"</b></p></div></div></div></div>");
    });
    $('#testimonials .carousel-inner .carousel-item').first().addClass('active');
});
}
