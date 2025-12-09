const search1 = () => {
  const searchbox = document.getElementById("search-item").value.toUpperCase();
  const storeitems = document.getElementById("search-list");
  const product = document.querySelectorAll(".listing"); // All product listings

  for (let i = 0; i < product.length; i++) {
    let match = product[i].querySelector("h2"); // Get the h2 inside each product

    if (match) {
      let textvalue = match.textContent || match.innerHTML;

      if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
        product[i].style.display = ""; // Show matching products
      } else {
        product[i].style.display = "none"; // Hide non-matching products
      }
    }
  }
};


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".listing").forEach(listing => {
    listing.addEventListener("click", function () {
      const link = this.getAttribute("data-href");
      if (link) {
        window.location.href = link;
      }
    });
  });
});
