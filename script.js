// 예제 데이터 (실제로는 API에서 가져올 수 있음)
const products = [
    { name: "Sunglass Model 1", price: "₩250,000", imageUrl: "image1.jpg" },
    { name: "Sunglass Model 2", price: "₩300,000", imageUrl: "image2.jpg" },
    { name: "Sunglass Model 3", price: "₩275,000", imageUrl: "image3.jpg" },
    // 추가 제품들
];

// 제품 카드를 생성하여 페이지에 추가하는 함수
function displayProducts(products) {
    const productGrid = document.getElementById("productGrid");

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">${product.price}</p>
        `;

        productGrid.appendChild(productCard);
    });
}

// 페이지 로드 시 제품 표시
document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products);
});
