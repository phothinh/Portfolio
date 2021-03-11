// ----------Sticky Nav----------

window.addEventListener("scroll", function(){
	var header = document.querySelector("header");
	header.classList.toggle("sticky", window.scrollY > 0);
})

//---------Slider----------

$('#right-arrow').click(function() {
	var currentSlide = $('.slide.active');
	var nextSlide = currentSlide.next();

	currentSlide.fadeOut(0).removeClass('active');
	nextSlide.fadeIn(0).addClass('active');

	if(nextSlide.length == 0) {
		$('.slide').first().fadeIn(0).addClass('active');
	}
});

$('#left-arrow').click(function() {
	var currentSlide = $('.slide.active');
	var prevSlide = currentSlide.prev();

	currentSlide.fadeOut( 0).removeClass('active');
	prevSlide.fadeIn(0).addClass('active');

	if(prevSlide.length == 0) {
		$('.slide').last().fadeIn(0).addClass('active');
	}
});

//---------Reveal----------

const faders = document.querySelectorAll('.reveal');

const appearOptions = {
	root: null,
	rootMargin:'0px',
	threshold: .1 
}

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
	entries.forEach(entry => {
		if (!entry.isIntersecting){
			return;
		} else{
			entry.target.classList.add("appear");
			appearOnScroll.unobserve(entry.target);
		}
	});
},
appearOptions);  

faders.forEach(fader => {appearOnScroll.observe(fader);
})

//---------Back to the top----------

const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
	if (window.pageYOffset > 300) { 
		if(!backToTopButton.classList.contains("btnEntrance")) {
			backToTopButton.classList.remove("btnExit");
			backToTopButton.classList.add("btnEntrance");
			backToTopButton.style.display = "block";
		}
	}
	else { 
		if(backToTopButton.classList.contains("btnEntrance")) {
			backToTopButton.classList.remove("btnEntrance");
			backToTopButton.classList.add("btnExit");
			setTimeout(function() {
				backToTopButton.style.display = "none";
			}, 250);
		}
	}
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

function smoothScrollBackToTop() {
	const targetPosition = 0;
	const startPosition = window.pageYOffset;
	const distance = targetPosition - startPosition;
	const duration = 750;
	let start = null;

	window.requestAnimationFrame(step);

	function step(timestamp) {
		if (!start) start = timestamp;
		const progress = timestamp - start;
		window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
		if (progress < duration) window.requestAnimationFrame(step);
	}
}

function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
};

//---------Loading Screen----------

let spinnerWrapper = document.querySelector('.spinner-wrapper');

window.addEventListener('load', function () {
        spinnerWrapper.parentElement.removeChild(spinnerWrapper);
    });

