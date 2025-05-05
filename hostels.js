import {cart,AddtoWatchlist} from"./cart.js";
import { hostels } from "./data.js";
let hostelsHTML="";
hostels.forEach((hostel)=>{
    hostelsHTML +=`
        <div class="sunset">
            <div class="hstlimage">
              <img src="../images/${hostel.image}" alt="${hostel.image}">
            </div>
            <div class="hstldesc">
              <div class="hotel-name">${hostel.name}</div>
              <img class="product-rating-stars"
              src="../images/ratings/rating-${hostel.stars*10}.png">
              <div class="location">
                ${hostel.location}
              </div>
              <div class="offers">
                <span>${hostel.offer1}</span>
                <span>${hostel.offer2}</span>
                <span>${hostel.offer3}</span>
                <span>${hostel.offer4}</span>
                <span>${hostel.offer5}</span>
                <span>${hostel.offer6}</span>
              </div>
              <button class="watchlist js-watchlist"
                        data-hostel-id="${hostel.id}">
                        Add to WatchList
                        </button>
            </div>
            <div class="hstlreview">
              <div class="review-score">${hostel.review_score} Review score</div>
              <div>${hostel.review} reviews</div>
              <div class="price-section">
                <span class="old-price">${hostel.oldprice}</span>
                <div class="discount">${hostel.discount}%</div>
                <span class="price">Rs. ${hostel.price}</span>
              </div>
              <div style="color: green">+ FREE CANCELLATION</div>
            </div>
          </div>
    `;
});
document.querySelector(".js-hstldetails").
    innerHTML=hostelsHTML;
document.querySelectorAll(".js-watchlist")
    .forEach((button) => {
        button.addEventListener("click", () => {
          const hostelid = button.dataset.hostelId;
         AddtoWatchlist(hostelid);
        });
    });
    function filterProduct(selectedButton) {
      let buttons = document.querySelectorAll(".button-value"); // Select all buttons
      buttons.forEach((button) => {
          button.classList.remove("active"); // Remove 'active' from all buttons
      });
      selectedButton.classList.add("active"); // Add 'active' to the clicked button
  }