const sliderContainer = document.querySelector(".slider");

// Netlify Functions의 프록시된 동영상 API 호출
async function fetchVideos(query) {
    const response = await fetch(`/.netlify/functions/fetchVideos?q=${query}`);
    if (!response.ok) throw new Error("Failed to fetch videos");
    const data = await response.json();
    return data.hits;
}

// 슬라이더에 동영상 추가 함수
function displayVideos(videos) {
    videos.forEach((video, index) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        if (index === 0) slide.classList.add("active");

        const videoElement = document.createElement("video");
        videoElement.src = video.videos.medium.url;
        videoElement.controls = true;
        slide.appendChild(videoElement);

        sliderContainer.appendChild(slide);
    });
}

// 슬라이더 기능 구현 (변경 없음)
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

// 동영상 가져오기 및 슬라이더 활성화
fetchVideos("fashion").then(videos => {
    displayVideos(videos);
    activateSlider();
}).catch(error => {
    console.error("동영상을 가져오는 중 오류 발생:", error);
});
