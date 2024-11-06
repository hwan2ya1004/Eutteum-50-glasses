const sliderContainer = document.querySelector(".slider");

// Netlify Functions의 프록시된 API 호출 및 캐싱
async function fetchImages(query) {
    const cachedData = localStorage.getItem('cachedImages');
    const cacheTimestamp = localStorage.getItem('cacheTimestamp');
    const now = Date.now();

    // 하루(24시간 * 60분 * 60초 * 1000밀리초)
    const oneDay = 24 * 60 * 60 * 1000;

    if (cachedData && cacheTimestamp && (now - cacheTimestamp < oneDay)) {
        // 캐시된 데이터가 있고, 하루가 지나지 않았다면 캐시 사용
        console.log('캐시된 이미지를 사용합니다.');
        return JSON.parse(cachedData);
    } else {
        // 새로운 데이터를 가져와서 캐시에 저장
        const response = await fetch(`/.netlify/functions/fetchImages?q=안경&per_page=5`);
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        const images = data.hits;

        // 캐시에 데이터와 현재 시간을 저장
        localStorage.setItem('cachedImages', JSON.stringify(images));
        localStorage.setItem('cacheTimestamp', now.toString());

        console.log('새로운 이미지를 가져와 캐시에 저장했습니다.');
        return images;
    }
}

// 슬라이더에 이미지 추가 함수
function displayImages(images) {
    images.forEach((image, index) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        if (index === 0) {
            slide.classList.add("active");
        } else {
            slide.classList.add("next");
        }
        slide.style.backgroundImage = `url(${image.webformatURL})`;
        sliderContainer.appendChild(slide);
    });
}

// 슬라이더 기능 구현
function activateSlider() {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlide(nextIndex) {
        slides[currentIndex].classList.remove("active");
        slides[currentIndex].classList.add("prev");

        slides[nextIndex].classList.remove("next");
        slides[nextIndex].classList.add("active");

        // 이전 슬라이드의 클래스를 정리하기 위해 약간의 딜레이를 줍니다.
        setTimeout(() => {
            slides[currentIndex].classList.remove("prev");
            slides[currentIndex].classList.add("next");
            currentIndex = nextIndex;
        }, 1000); // 전환 시간과 동일하게 설정
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
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
    activateSlider();
}).catch(error => {
    console.error("이미지를 가져오는 중 오류 발생:", error);
});
