const sliderContainer = document.querySelector(".slider");

// Netlify Functions의 프록시된 API 호출
async function fetchImages(query) {
    const response = await fetch(`/.netlify/functions/fetchImages?q=${query}`);
    if (!response.ok) throw new Error("Failed to fetch images");
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
}).catch(error => {
    console.error("이미지를 가져오는 중 오류 발생:", error);
});
