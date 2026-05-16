

document.addEventListener("DOMContentLoaded", function () {
  const homeButtons = document.querySelectorAll(".Home_Button");

homeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    window.location.href = "Fields Page.html";
  });
});

const searchBar = document.querySelector(".search-bar");

if (searchBar) {
  searchBar.addEventListener("input", function () {
    const query = searchBar.value.toLowerCase();
    const allFields = document.querySelectorAll(".Fieldss");

    allFields.forEach(function (card) {
      const name = card.querySelector("h3").textContent.toLowerCase();
      const type = card.querySelector(".down p").textContent.toLowerCase();

      if (name.includes(query) || type.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

const fieldData = [
  {
    name: "Central Stadium",
    type: "Soccer Field",
    location: "Downtown",
    players: "22 players",
    price: 80,
    image: "Field1.jpg",
  },
  {
    name: "RiverSide Courts",
    type: "Basketball Court",
    location: "East Side",
    players: "10 players",
    price: 45,
    image: "Field2.jpg",
  },
  {
    name: "Blue Valley Tennis",
    type: "Tennis Court",
    location: "North District",
    players: "4 players",
    price: 35,
    image: "Field3.jpg",
  },
  {
    name: "Green Field Arena",
    type: "Soccer Field",
    location: "West Park",
    players: "22 players",
    price: 75,
    image: "Field4.jpg",
  },
  {
    name: "Summit Sport Center",
    type: "Basketball Court",
    location: "Heights",
    players: "10 players",
    price: 50,
    image: "Field5.jpg",
  },
  {
    name: "Skyline Tennis Club",
    type: "Tennis Court",
    location: "Heights",
    players: "4 players",
    price: 40,
    image: "Field6.jpg",
  },
];

const bookButtons = document.querySelectorAll(".book-button");
const bookingFormSection = document.querySelector(".booking-form-section");

if (bookButtons.length > 0 && bookingFormSection) {
  bookButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      const field = fieldData[index];

      bookingFormSection.querySelector("h2").textContent = field.name;
      bookingFormSection.querySelector(".booking-field-type").textContent = field.type;
      bookingFormSection.querySelector(".booking-field-details p:first-child").textContent = "📍 " + field.location;
      bookingFormSection.querySelector(".booking-field-details p:last-child").textContent = "👥 " + field.players;
      bookingFormSection.querySelector(".booking-total p:last-child").textContent = "$" + field.price;
      bookingFormSection.querySelector("img").src = field.image;

      resetFormSelections();

      bookingFormSection.style.display = "flex";
      bookingFormSection.scrollIntoView({ behavior: "smooth" });
    });
  });
}

const dateBtns = document.querySelectorAll(".booking-date-btn");

dateBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    dateBtns.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
  });
});

const timeBtns = document.querySelectorAll(".booking-time-btn");

timeBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    timeBtns.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
  });
});

const closeBtn = document.querySelector(".close-booking-form-btn");

if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    bookingFormSection.style.display = "none";
  });
}

const confirmBtn = document.querySelector(".confirm-booking-btn");

if (confirmBtn) {
  confirmBtn.addEventListener("click", function () {
    const nameInput = bookingFormSection.querySelector("input[type='text']").value.trim();
    const phoneInput = bookingFormSection.querySelector("input[type='number']").value.trim();

    const selectedDate = document.querySelector(".booking-date-btn.active");
    const selectedTime = document.querySelector(".booking-time-btn.active");

    if (!nameInput) {
      alert("Please enter your name.");
      return;
    }
    if (!phoneInput) {
      alert("Please enter your phone number.");
      return;
    }
    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }

    const booking = {
      id: Date.now(),
      fieldName: bookingFormSection.querySelector("h2").textContent,
      fieldType: bookingFormSection.querySelector(".booking-field-type").textContent,
      location: bookingFormSection.querySelector(".booking-field-details p:first-child").textContent,
      players: bookingFormSection.querySelector(".booking-field-details p:last-child").textContent,
      price: bookingFormSection.querySelector(".booking-total p:last-child").textContent,
      image: bookingFormSection.querySelector("img").src,
      customerName: nameInput,
      phone: phoneInput,
      date: selectedDate ? selectedDate.textContent.replace("\n", " ") : "Selected Date",
      time: selectedTime.textContent,
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    existingBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    alert("Booking confirmed! Redirecting to My Bookings...");
    window.location.href = "My Booking Page.html";
  });
}

function resetFormSelections() {
  const dBtns = document.querySelectorAll(".booking-date-btn");
  dBtns.forEach(function (b, i) { b.classList.toggle("active", i === 0); });

  const tBtns = document.querySelectorAll(".booking-time-btn");
  tBtns.forEach(function (b) { b.classList.remove("active"); });

  const inputs = bookingFormSection.querySelectorAll("input");
  inputs.forEach(function (input) { input.value = ""; });
}

const myBookingSection = document.querySelector(".My-booking-section");

if (myBookingSection) {
  myBookingSection.innerHTML = "";

  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  if (bookings.length === 0) {
    myBookingSection.innerHTML = "<p style='text-align:center; padding:40px; color:#888;'>You have no bookings yet. <a href='Fields Page.html'>Browse Fields</a></p>";
  } else {
    bookings.forEach(function (booking) {
      const article = document.createElement("article");
      article.classList.add("booking-article");
      article.setAttribute("data-id", booking.id);

      article.innerHTML = `
        <img src="${booking.image}" alt="Field Image">
        <div class="booking-info">
          <h3>${booking.fieldName}</h3>
          <p>${booking.fieldType}</p>
          <div class="date-info">
            <p>📅 ${booking.date}</p>
            <p>⏰ ${booking.time}</p>
            <p>${booking.location}</p>
          </div>
          <div class="customer-info">
            <p>👤 ${booking.customerName}</p>
            <p>📞 ${booking.phone}</p>
          </div>
          <button class="cancel-btn">Cancel</button>
        </div>
        <div class="booking-price">
          <h3>${booking.price}</h3>
          <p>Total</p>
        </div>
      `;

      myBookingSection.appendChild(article);
    });
  }

  myBookingSection.addEventListener("click", function (event) {
    if (event.target.classList.contains("cancel-btn")) {
      const confirmed = confirm("Are you sure you want to cancel this booking?");
      if (!confirmed) return;

      const article = event.target.closest(".booking-article");
      const bookingId = Number(article.getAttribute("data-id"));

      let savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      savedBookings = savedBookings.filter(function (b) { return b.id !== bookingId; });
      localStorage.setItem("bookings", JSON.stringify(savedBookings));

      article.style.opacity = "0";
      article.style.transition = "opacity 0.3s";
      setTimeout(function () {
        article.remove();
        if (myBookingSection.querySelectorAll(".booking-article").length === 0) {
          myBookingSection.innerHTML = "<p style='text-align:center; padding:40px; color:#888;'>You have no bookings yet. <a href='Fields Page.html'>Browse Fields</a></p>";
        }
      }, 300);
    }
  });
}
});