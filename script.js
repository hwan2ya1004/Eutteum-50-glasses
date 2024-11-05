const sliderContainer = document.querySelector(".slider");

// 백엔드 프록시 서버로부터 이미지를 가져오는 함수
async function fetchImages(query) {
    const response = await fetch(`http://localhost:3000/api/images?q=${query}`);
    const data = await response.json();
    return data.hits;
}

// 슬라이더에 이미지 추가 함수
function displayImages(images) {
    images.forEach((image, index) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        if (index === 0) slide.classList.add("active");
        slide.style.backgroundImage = `url(${image.webformatURL})`;
        sliderContainer.appendChild(slide);
    });
}

// 슬라이더 기능 구현
function activateSlider() {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) slide.classList.add("active");
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 3000);
}

// 이미지 가져오기 및 슬라이더 활성화
fetchImages("fashion").then(images => {
    displayImages(images);
    activateSlider();
});
