const sliderContainer = document.querySelector(".slider");

// Netlify Functions의 프록시된 API 호출
async function fetchImages(query) {
    const response = await fetch(`/.netlify/functions/fetchImages?q=${query}&per_page=10`); // 이미지 10개 요청
    if (!response.ok) throw new Error("Failed to fetch images");
    const data = await response.json();
    console.log('가져온 이미지 개수:', data.hits.length);
    return data.hits;
}

// 슬라이더에 이미지 추가 함수
function displayImages(images) {
    let loadedImages = 0;
    images.forEach((image, index) => {
        console.log(`이미지 ${index + 1} URL:`, image.webformatURL);
        const img = new Image();
        img.src = image.webformatURL;
        img.onload = () => {
            const slide = document.createElement("div");
            slide.classList.add("slide");
            if (index === 0) slide.classList.add("active");
            slide.style.backgroundImage = `url(${image.webformatURL})`;
            sliderContainer.appendChild(slide);

            loadedImages++;
            if (loadedImages === images.length) {
                activateSlider();
            }
        };
        img.onerror = () => {
            console.error(`이미지 로드 실패: ${image.webformatURL}`);
        };
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
fetchImages("glasses").then(images => {
    if (images.length === 0) {
        console.error("검색된 이미지가 없습니다.");
        return;
    }
    displayImages(images);
}).catch(error => {
    console.error("이미지를 가져오는 중 오류 발생:", error);
});
