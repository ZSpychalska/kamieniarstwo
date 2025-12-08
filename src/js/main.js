const burgerBtnOpen = document.querySelector('.burger-btn');
const burgerBtnClose = document.querySelector('.burger-btn-close');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavBox = document.querySelector('.mobile-nav__box');
const mobileNavItems = document.querySelectorAll('.mobile-nav__element');
const dateElements = document.querySelectorAll('.date');

const desktopNav = document.querySelector('.desktop-nav');
const logoAll = document.querySelectorAll('.logo');

const boxCountElement = document.querySelector('.about-us__info');
const countElement = document.querySelector('.about-us__infoText-number');

const boxAboutUs = document.querySelectorAll('.about-us__box');
const boxesAboutUs = document.querySelector('.about-us__boxes');

const allSections = document.querySelectorAll('.section');
const allNavMobileElements = document.querySelectorAll('.mobile-nav__element');
const allNavDesktopElements = document.querySelectorAll('.desktop-nav__element');

const mainHeader = document.querySelector('.main-header');

const galleryAllImg = document.querySelectorAll('.gallery__img');
const galleryAreaSelected = document.querySelector('.gallery-selected');
const galleryBtnClose = document.querySelector('.gallery-selected-btn');
const galleryBtnLeft = document.querySelector('.gallery-selected__slideBtn__left');
const galleryBtnRight = document.querySelector('.gallery-selected__slideBtn__right');
const galleryHTML = document.querySelector('.galleryHTML');

let imgSrc;
let imgAlt;

const optionsCounter = {
    rootMargin: '-100px'
}

const optionsAboutUs = {
    rootMargin: '-50px'
}


const NavColorAdd = () => {
    if(window.scrollY >= 100){
        desktopNav.classList.add('nav-color');
        mobileNavBox.classList.add('nav-color');
    }else{
        desktopNav.classList.remove('nav-color');
        mobileNavBox.classList.remove('nav-color');
    }
}

const logoClick = () => {
    window.location.replace("index.html");
}

const handleMobileNav = () => {
    mobileNav.classList.toggle('mobile-nav--active');
}


const clickOutsideNav = (e) => {
    if(
        e.target.classList.contains('burger-btn__box') ||
        e.target.classList.contains('burger-btn') ||
        e.target.classList.contains('mobile-nav__element') ||
        e.target.classList.contains('mobile-nav') ||
        e.target.classList.contains('burger-btn-close')
    ){
        return;
    }else{
        if(mobileNav.classList.contains('mobile-nav--active')){
            mobileNav.classList.remove('mobile-nav--active');
        }else{
            return;
        }
        
    }

}

mobileNavItems.forEach(item => {
    item.addEventListener('click', function() {
        setTimeout(() => {
            handleMobileNav();
        }, 275);
    });
});


const handleCurrentYear = () => {
    const date = (new Date()).getFullYear();

    dateElements.forEach(e => {
        e.textContent = date;
    });

}

const startCounter = (entry) => {
    // console.log(entry[0].isIntersecting);

    if(entry[0].isIntersecting){
        const updateCounter = () => {
            const finalNumber = countElement.getAttribute('data-number');
            const value = parseInt(countElement.textContent);

            const speed = finalNumber / 30;

            if(value < finalNumber){
                countElement.textContent = `${Math.floor(value + speed)}`;
                setTimeout(updateCounter, 40);
            }else{
                countElement.textContent = finalNumber;
            }
        }

        updateCounter();
    }
}

const startAnimationBox = (entry) => {

    if(entry[0].isIntersecting){

        boxAboutUs.forEach(box => {
            box.classList.add('about-us__box--show');
        });
    }
}

const removeClassNav = () => {
    allNavMobileElements.forEach(e => {
        e.classList.remove('mobile-nav__element--active');
    });

    allNavDesktopElements.forEach(e => {
        e.classList.remove('desktop-nav__element--active');
    });
}

const observSections = () => {

    sections = []

    allSections.forEach(section => {
        if(window.scrollY <= section.offsetTop + section.offsetHeight - 100){
            sections.push(section);
            let activeSection;

            if(sections[0].id == 'offersAdditional'){
                activeSection = document.querySelectorAll(`[href*="offers"]`);
            }else{
                activeSection = document.querySelectorAll(`[href*="${sections[0].id}"]`);
            }

            removeClassNav();

            activeSection[0].classList.add('mobile-nav__element--active');
            activeSection[1].classList.add('desktop-nav__element--active');

        }
    });

    if(window.scrollY  <= mainHeader.offsetTop + mainHeader.offsetHeight - 100){

        removeClassNav();

    }
}

const openGalleryArea = (e) => {
    // console.log(e.target);
    imgSrc = (e.target).getAttribute('src');
    imgAlt = (e.target).getAttribute('alt');

    const imgOpen = document.createElement('img');

    imgOpen.setAttribute('src', imgSrc);
    imgOpen.setAttribute('alt', imgAlt);
    imgOpen.classList.add('gallery-selected__img');

    galleryAreaSelected.appendChild(imgOpen);

    galleryAreaSelected.style.top = window.scrollY + 'px';
    galleryAreaSelected.style.display = 'flex';
    galleryHTML.style.overflowY = 'hidden';


    const nextPhotoGallery = () => {
               
        let i = 0;
    
        galleryAllImg.forEach(img => {
    
            if(img.getAttribute('src') === imgSrc){

                if(i >= galleryAllImg.length - 1){
                    imgSrc = galleryAllImg[0].getAttribute('src');
                    imgAlt = galleryAllImg[0].getAttribute('alt');
    
                    imgOpen.setAttribute('src', imgSrc);
                    imgOpen.setAttribute('alt', imgAlt);

                    return;
                }else{
                    imgSrc = galleryAllImg[i+1].getAttribute('src');
                    imgAlt = galleryAllImg[i+1].getAttribute('alt');
    
                    imgOpen.setAttribute('src', imgSrc);
                    imgOpen.setAttribute('alt', imgAlt);

                    return;
                }
            }
    
            i++;
        });
    }

    const previousPhotoGallery = () => {
               
        let i = 0;
    
        galleryAllImg.forEach(img => {
    
            if(img.getAttribute('src') === imgSrc){

                if(i == 0){

                    imgSrc = galleryAllImg[galleryAllImg.length-1].getAttribute('src');
                    imgAlt = galleryAllImg[galleryAllImg.length-1].getAttribute('alt');

                    imgOpen.setAttribute('src', imgSrc);
                    imgOpen.setAttribute('alt', imgAlt);

                    i = -1000;

                    return;

                }else if(i > 0){

                    imgSrc = galleryAllImg[i-1].getAttribute('src');
                    imgAlt = galleryAllImg[i-1].getAttribute('alt');
    
                    imgOpen.setAttribute('src', imgSrc);
                    imgOpen.setAttribute('alt', imgAlt);

                    return;
                    
                }
            }
    
            i++;
        });
    }


    galleryBtnRight.addEventListener('click', nextPhotoGallery);
    galleryBtnLeft.addEventListener('click', previousPhotoGallery);
    galleryBtnClose.addEventListener('click', closeGalleryArea);

    window.addEventListener('keyup', (key) =>{
        if(key.key == 'ArrowRight'){
            nextPhotoGallery();
        }else if(key.key == 'ArrowLeft'){
            previousPhotoGallery();
        }else if(key.key == 'Escape'){
            closeGalleryArea();
        }
    });
}

const closeGalleryArea = () => {
    galleryAreaSelected.style.display = 'none';
    galleryHTML.style.overflowY = 'scroll';
    galleryAreaSelected.removeChild(imgOpen);
}

handleCurrentYear();

galleryAllImg.forEach(img => {
    img.addEventListener('click', openGalleryArea);
});

logoAll.forEach(logo => {
    logo.addEventListener('click', logoClick);
})

burgerBtnOpen.addEventListener('click', handleMobileNav);
burgerBtnClose.addEventListener('click', handleMobileNav);

window.addEventListener('click', clickOutsideNav);
window.addEventListener('scroll', NavColorAdd);

if(document.body.classList.contains('main-page')){

    const observer = new IntersectionObserver(startCounter, optionsCounter); 
    observer.observe(boxCountElement);
    
    const observer2 = new IntersectionObserver(startAnimationBox, optionsAboutUs); 
    observer2.observe(boxesAboutUs);

    window.addEventListener('scroll', observSections);
}