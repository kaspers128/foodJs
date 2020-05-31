function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider

    let slideIndex = 1,
        offset = 0;
    const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        sliderWrapper = document.querySelector(wrapper),
        sliderField = document.querySelector(field),
        slider = document.querySelector(container),
        width = window.getComputedStyle(sliderWrapper).width;

    sliderField.style.width = 100 * slides.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '0.5s';

    sliderWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    if (slideIndex < 10) {
        current.textContent =  `0${slideIndex}`;
    } else {
        current.textContent =  slideIndex;
    }

    function getIndex(index){
        return (index < 10) ? `0${index}` : index;
    }

    next.addEventListener('click', () => {
        if (offset == getNumber(width) * (slides.length - 1) ){
            offset = 0;
            slideIndex = 1;
        } else {
            offset += getNumber(width);
            slideIndex++;
        }

        current.textContent =  getIndex(slideIndex);
        
        sliderField.style.transform = `translateX(-${offset}px)`;
        findActiveDot(slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0){
            offset = getNumber(width) * (slides.length - 1);
            slideIndex = slides.length; 
        } else {
            offset -= getNumber(width);
            slideIndex--;
        }

        current.textContent =  getIndex(slideIndex);
        findActiveDot(slideIndex);
        sliderField.style.transform = `translateX(-${offset}px)`;
    });

    //dots for slider 
    slider.style.position = 'relative';
    const dotsWrapper = document.createElement('div');
    dotsWrapper.classList.add('carousel-indicators');

    slides.forEach((slide, i) => {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-indexdot', i + 1);
        dotsWrapper.append(dot);
    });

    slider.append(dotsWrapper);
    const dots = document.querySelectorAll('.dot');
    document.querySelector('.dot').classList.add('active');
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            slideIndex = e.target.getAttribute('data-indexdot');
            findActiveDot(slideIndex);
            offset = getNumber(width) * (slideIndex - 1);
            current.textContent =  getIndex(slideIndex);
            sliderField.style.transform = `translateX(-${offset}px)`;
        });
    });

    function getNumber(str) {
        return +str.replace(/\D/g, '');
    }
    

    function findActiveDot(i) {
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[i - 1].classList.add('active');
    }

    
    
    /*
    First Old Slaider
    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.classList.add('hide'));

        slides[slideIndex - 1].classList.add('show');
        slides[slideIndex - 1].classList.remove('hide');
        
        if (slideIndex < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    }

    function plusSlides (n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    next.addEventListener('click', function(){
        plusSlides(1);
    });
    */
}

export default slider;