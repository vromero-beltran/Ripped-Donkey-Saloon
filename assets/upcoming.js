const track = document.querySelector('.gallery-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.photo-gallery-btn--right');
const prevButton = document.querySelector('.photo-gallery-btn--left');
const dotsNav = document.querySelector('.gallery-nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another.
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classlist.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex == slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

// When I click left, move slides to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.nextElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide)


    moveToSlide(track, currentSlide, prevSlide)
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);

})

//When I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide)

    moveToSlide(track, currentSlide, nextSlide)
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

//when I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    // what indicator was clicked on?
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide)
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);

})


// CALENDAR JAVASCRIPT
const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// fuction to add days
function initCalendar() {
    // to get prev month days and current month all days and remaining next month days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay();

    // updates the top of the calender
    date.innerHTML = months[month] + " " + year; 

    // adding days on DOM
    let days = " ";

    // prev month days
// prev month days
for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
}


    // current month days
    for (let i = 1; i <= lastDate; i++){
        // if say is today add class today
        if (i === new Date().getDate() && year === new Date().getFullYear() && month  === new Date().getMonth()) {
            days += `<div class="day today">${i}</div>`
        }
        // add remaining as it is
        else {
            days += `<div class="day" >${i}</div>`;
        }
    }
    // next month days
    for (let n = 1; n <= nextDays; n++) {
            days += `<div class="day next-date">${n}</div>`;
        }
    daysContainer.innerHTML = days;

}

initCalendar();

// prev month
function prevMonth() {
    month--;
    if (month < 0){
        month = 11;
        year--;
    }
    initCalendar();
}
// next month
function nextMonth() {
    month++;
    if(month > 11){
        month = 0;
        year++ ;
    }
    initCalendar();
}

// add eventlistiner on prev and next
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// add goto date and goto today functionality
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("keyup", (e) => {
    // allows only numbers remove anything else
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if(dateInput.value.length === 2) {
        // add a slash if 2 numbers entered
        dateInput.value += "/";
    }
    if(dateInput.value.length > 7) {
        // don't allow more than 7 characters
        dateInput.value = dateInput.value.slice(0, 7);
    }
    // if we remove unit slash its not removing
    if(e.inputType === "deleteContentBackward") {
        if(dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener("click", gotoDate);
// function to go to entered date
function gotoDate() {
    const dateArr = dateInput.value.split("/");
    // some date validation
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    // if invalid date
    alert('Invalid date');
}
