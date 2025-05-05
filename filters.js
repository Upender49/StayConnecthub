import { hostels } from "./data.js";

// Initialize filters object to track all active filters
let filters = {
  gender: null,
  categories: [],
  prices: [],
  stars: [],
  search: ""
};

// Function to render filtered hostels
function renderFilteredHostels() {
  // Get filtered hostels based on current filters
  const filteredHostels = getFilteredHostels();
  
  // Generate HTML for filtered hostels
  let hostelsHTML = "";
  filteredHostels.forEach((hostel) => {
    hostelsHTML += `
      <div class="sunset">
        <div class="hstlimage">
          <img src="../images/${hostel.image}" alt="hostel img" />
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
  
  // Update the DOM with filtered hostels
  document.querySelector(".js-hstldetails").innerHTML = hostelsHTML;
  
  // Re-attach event listeners to watch list buttons
  document.querySelectorAll(".js-watchlist").forEach((button) => {
    button.addEventListener("click", () => {
      const hostelid = button.dataset.hostelId;
      // Import AddtoWatchlist from cart.js
      import("./cart.js").then(module => {
        module.AddtoWatchlist(hostelid);
      });
    });
  });
}

// Function to apply filters and return filtered hostels
function getFilteredHostels() {
  return hostels.filter((hostel) => {
    // Apply gender filter if set
    if (filters.gender !== null) {
      // Assuming hostels have a gender property or we determine it from another way
      // For now, this is a placeholder - you'll need to add gender property to your data
      const hostelGender = hostel.gender || "male"; // Default to male if not specified
      if (filters.gender === "1" && hostelGender !== "Male") return false;
      if (filters.gender === "2" && hostelGender !== "Female") return false;
    }
    
    // Apply categories filter if any selected
    if (filters.categories.length > 0) {
      // Assuming hostels have a category property
      // This is a placeholder - you'll need to add category property to your data
      const hostelCategory = hostel.category || "Hostel"; // Default to Hostel if not specified
      if (!filters.categories.includes(hostelCategory)) return false;
    }
    
    // Apply price filter if any selected
    if (filters.prices.length > 0) {
      let priceMatch = false;
      
      for (const priceRange of filters.prices) {
        const [min, max] = getPriceRange(priceRange);
        if (hostel.price >= min && hostel.price <= max) {
          priceMatch = true;
          break;
        }
      }
      
      if (!priceMatch) return false;
    }
    
    // Apply star rating filter if any selected
    if (filters.stars.length > 0 && !filters.stars.includes(hostel.stars)) {
      return false;
    }
    
    // Apply search filter if text entered
    if (filters.search && !hostel.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // If passes all filters, include in results
    return true;
  });
}

// Helper function to convert price range string to min and max values
function getPriceRange(priceRange) {
  switch(priceRange) {
    case "9000-10000":
      return [9000, 10000];
    case "8000-9000":
      return [8000, 9000];
    case "7000-8000":
      return [7000, 8000];
    case "6000-7000":
      return [6000, 7000];
    case "5000-6000":
      return [5000, 6000];
    default:
      return [0, Infinity];
  }
}

// Setup event listeners for filters
function setupFilterListeners() {
  // Gender radio buttons
  document.querySelectorAll('input[name="gender"]').forEach((radio) => {
    radio.addEventListener("change", (event) => {
      filters.gender = event.target.value;
      renderFilteredHostels();
    });
  });
  
  // Categories checkboxes
  document.querySelectorAll('.categories input[type="checkbox"]').forEach((checkbox, index) => {
    checkbox.addEventListener("change", (event) => {
      const category = index === 0 ? "Hostel" : "Guest-ins";
      
      if (event.target.checked) {
        filters.categories.push(category);
      } else {
        filters.categories = filters.categories.filter(item => item !== category);
      }
      
      renderFilteredHostels();
    });
  });
  
  // Price range checkboxes
  document.querySelectorAll('.fee input[type="checkbox"]').forEach((checkbox, index) => {
    checkbox.addEventListener("change", (event) => {
      const priceRanges = ["9000-10000", "8000-9000", "7000-8000", "6000-7000", "5000-6000"];
      const priceRange = priceRanges[index];
      
      if (event.target.checked) {
        filters.prices.push(priceRange);
      } else {
        filters.prices = filters.prices.filter(item => item !== priceRange);
      }
      
      renderFilteredHostels();
    });
  });
  
  // Star rating checkboxes
  document.querySelectorAll('.star-rating input[type="checkbox"]').forEach((checkbox, index) => {
    checkbox.addEventListener("change", (event) => {
      const stars = 5 - index; // 5, 4, 3, 2, 1 stars
      
      if (event.target.checked) {
        filters.stars.push(stars);
      } else {
        filters.stars = filters.stars.filter(item => item !== stars);
      }
      
      renderFilteredHostels();
    });
  });
  
  // Search input
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", (event) => {
    filters.search = event.target.value.trim();
    renderFilteredHostels();
  });
}

// Sort functionality
export function sortHostels(sortBy) {
  let sortedHostels = [...hostels];
  
  switch(sortBy) {
    case "Best match":
      // Default order, no sorting needed
      break;
    case "Top reviewed":
      sortedHostels.sort((a, b) => b.review_score - a.review_score);
      break;
    case "Lowest price first":
      sortedHostels.sort((a, b) => a.price - b.price);
      break;
    case "Highest price first":
      sortedHostels.sort((a, b) => b.price - a.price);
      break;
    case "Hot Deals!":
      sortedHostels.sort((a, b) => Math.abs(b.discount) - Math.abs(a.discount));
      break;
  }
  
  return sortedHostels;
}

// Initialize filters and event listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupFilterListeners();
  
  // Setup sort button listeners
  document.querySelectorAll(".button-value").forEach((button) => {
    button.addEventListener("click", (event) => {
      const sortBy = event.target.textContent;
      hostels.splice(0, hostels.length, ...sortHostels(sortBy));
      renderFilteredHostels();
    });
  });
  
  // Initial render
  renderFilteredHostels();
});