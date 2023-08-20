document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.nav-btn')
    const navList = document.querySelector('.nav-list-mobile')
    const navSection = document.querySelector('.section-nav')
    const changerList = document.querySelectorAll('.changer-list li');
    const observer = new ResizeObserver((elements, observer) => {
        for (let el of elements) {
            if(el.contentRect.width >= 700){
                navList.classList.remove('active-menu')
            }
        }
    });
    const el = document.querySelector("body");
    const el1 = document.querySelector(".header");
    observer.observe(el);


    let observerOptions = {
        // root: document.querySelector('window'),
        // rootMargin: '0px',
        threshold: 0.5
    }
    
    let observer1 = new IntersectionObserver(elements => {
        for (let el of elements) {
            if (el.isIntersecting) {
                el.target.classList.add('loaded');
            } else {
                el.target.classList.remove('loaded');
            }
        }
    }, observerOptions);
    
    const divs = document.querySelectorAll(".header");
    for (const div of divs) {
        observer1.observe(div);
    }

    function checkAndToggle() {
        const pos = el.getBoundingClientRect(); //pobieram pozycję i rozmiar elementu
        if(pos.top < 0){
            navSection.classList.add('active')
            navList.classList.add('active-list')
        } else {
            navSection.classList.remove('active')
            navList.classList.remove('active-list')
        }
    }
    let imgsArray = [];
    let listData = '';
    changerList.forEach((el) => {
        el.addEventListener('click', () => {
            for(let i = 0; i< imgsArray.length; i++){
                console.log(imgsArray[i]);
                console.log(listData);
                console.log(i+1);
                imgsArray[i].classList.remove(`${listData}-${i+1}`)
                console.log(imgsArray[i]);
            }
            imgsArray=[];
            listData = el.getAttribute('data-cat');
            let x = 1;
            const changerList = document.querySelectorAll('.changer-list li');
            listImgs = document.querySelectorAll('.box-wrap');
            listImgs.forEach((el) => el.classList.remove('img-change'));
            changerList.forEach((el) => el.classList.remove('active'));
            el.classList.add('active')
            listImgs.forEach((ell) => {
                if(ell.getAttribute('data-cat').includes(listData)){
                    imgsArray.push(ell);
                    ell.classList.add('img-change');
                    ell.classList.add(`${listData}-${x}`)
                    x++;
                }
            })
        })
    })
    window.addEventListener("scroll", checkAndToggle);
    menuBtn.addEventListener('click', () => {
        navList.classList.toggle('active-menu')
    })
})