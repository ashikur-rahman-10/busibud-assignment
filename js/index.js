document.addEventListener("DOMContentLoaded", () => {
    const reviewsContainer = document.getElementById("reviews");

    // Fetch data from reviews.json using fetch API
    fetch("../data/review.json")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayReviews(data)
        })
        .catch((error) => console.error("Error fetching data:", error));

    // Function to create a single review element
    const createReviewElement = (review) => {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");

        const reviewInfo = `
        <div class="d-flex justify-content-between">
          <div class="d-flex gap-3">
            <img class="user-img" src="${review.clientImage}" alt="">
            <div>
              <h3>${review.clientName}</h3>
              <p>${review.clientDesignation}</p>
            </div>
          </div>
          <div class="ratings">
            ${getRatingStars(review.ratings)}
          </div>
        </div>
        <p>${review.comment}</p>
      `;

        reviewElement.innerHTML = reviewInfo;
        return reviewElement;
    };

    // Function to get rating stars HTML based on rating value
    const getRatingStars = (rating) => {
        const maxRating = 5;
        const roundedRating = Math.round(rating);
        let starsHTML = "";

        for (let i = 1; i <= maxRating; i++) {
            if (i <= roundedRating) {
                starsHTML += '<img src="images/star.png" alt="">';
            } else {
                starsHTML += '<img src="" alt="">';
            }
        }

        return starsHTML;
    };

    // Function to display all reviews
    const displayReviews = (reviewsData) => {
        reviewsData.forEach((review, index) => {
            const reviewElement = createReviewElement(review);
            reviewsContainer.appendChild(reviewElement);
        });
    };
});
