import {hostels} from "./data.js";
import {cart,deleteHostel} from "./cart.js";
let hstlHTML="";
cart.forEach((item)=>{
    const hostelid = item.id;
    let matchedItem ;
    hostels.forEach((hstl)=>{
        if(hostelid === hstl.id){
          matchedItem=hstl;
        }
    });
    
        hstlHTML+=`
        <div class="sunset js-hostel-container-${matchedItem.id}">
                <div class="hstlimage">
                  <img src="../images/${matchedItem.image}" alt="hostel img" />
                </div>
                <div class="hstldesc">
                  <div class="hotel-name">${matchedItem.name}</div>
                  <img class="product-rating-stars"
              src="../images/ratings/rating-${matchedItem.stars*10}.png">
                  <div class="location">
                    ${matchedItem.location}
                  </div>
                  <div class="offers">
                    <span>${matchedItem.offer1}</span>
                    <span>${matchedItem.offer2}</span>
                    <span>${matchedItem.offer3}</span>
                    <span>${matchedItem.offer4}</span>
                    <span>${matchedItem.offer5}</span>
                    <span>${matchedItem.offer6}</span>
                  </div>
                  <button class="delete js-delete" 
                  data-hostel-id = ${matchedItem.id}>
                        Delete</button>
                </div>
                <div class="hstlreview">
                  <div class="review-score">${matchedItem.review_score} Review score</div>
                  <div>${matchedItem.review} reviews</div>
                  <div class="price-section">
                    <span class="old-price">${matchedItem.oldprice}</span>
                    <div class="discount">${matchedItem.discount}%</div>
                    <span class="price">Rs. ${matchedItem.price}</span>
                  </div>
                  <div style="color: green">+ FREE CANCELLATION</div>
                </div>
              </div>
    `;
});
document.querySelector(".js-hstldetail")
    .innerHTML = hstlHTML;
document.querySelectorAll(".js-delete")
    .forEach((link)=>{
        link.addEventListener("click",()=>{
            const find = link.dataset.hostelId;
            deleteHostel(find);
            const deleteitem = document.querySelector(`.js-hostel-container-${find}`);
            console.log(deleteitem);
            deleteitem.remove();
        });
    });