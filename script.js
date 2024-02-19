// Selecting seat elements
const seatElements = document.getElementsByClassName('seat');
const selectedSeats = [];
let remainingSeatsCount = 40;
let selectedSeatCount = 0;

// Ticket details
const ticketPrice = 550;
const ticketClass = 'Economy';
const totalPriceElement = document.getElementById('total-price');
totalPriceElement.innerText = '0';

// Coupon section
const couponButton = document.getElementById('coupon');
couponButton.disabled = true;

// Coupon codes
const couponCode1 = 'NEW15';
const couponCode2 = 'Couple 20';

// Input validation for phone number
const phoneNumberInput = document.getElementById('PhoneNumber');
phoneNumberInput.addEventListener('input', function () {
    const inputValue = parseInt(phoneNumberInput.value);
    const modalButton = document.getElementById('modal-btn');
    if (inputValue.length !== 0) {
        modalButton.removeAttribute('disabled');
    }
});

// Event listeners for seat selection
for (const seatElement of seatElements) {
    seatElement.addEventListener('click', function () {
        const seatId = seatElement.getAttribute('id');
        if (selectedSeats.includes(seatElement)) {
            alert('You have already selected this seat');
        } else if (selectedSeats.length >= 4) {
            alert('You can only select up to 4 seats');
        } else {
            // Update selected seats information
            selectedSeats.push(seatElement);
            setSeatBackgroundColor(seatId);
            updateRemainingSeats(--remainingSeatsCount);
            updateSelectedSeats(++selectedSeatCount);

            // Create table row for selected seat
            const tableRow = document.createElement('tr');
            const tableCell1 = document.createElement('td');
            const tableCell2 = document.createElement('td');
            const tableCell3 = document.createElement('td');

            // Set data for the selected seat
            tableCell1.innerText = seatElement.innerText;
            tableCell2.innerText = ticketClass;
            tableCell3.innerText = ticketPrice;

            tableRow.appendChild(tableCell1);
            tableRow.appendChild(tableCell2);
            tableRow.appendChild(tableCell3);

  
            const displaySeat = document.getElementById('display-seat');
            displaySeat.appendChild(tableRow);

            // Update total price
            let totalPrice = updateTotalPrice(ticketPrice);
            totalPrice = parseFloat(totalPrice.innerText);

            // Enable coupon button after selecting 4 seats
            if (selectedSeatCount === 4) {
                couponButton.disabled = false;

              
                couponButton.addEventListener('click', function () {
                    const couponField = document.getElementById('coupon-field').value;
                    applyCoupon(couponField);
                });
            }

            // Display grand total
            const grandTotalElement = document.getElementById('grand-total');
            grandTotalElement.innerText = totalPrice;

            // Prevent form submission
            const formElement = document.getElementById('myForm');
            formElement.addEventListener('submit', function (event) {
                event.preventDefault();
                console.log('Form submission prevented.');
            });
        }
    });
}

// Utility functions

function checkFormInputs() {
    const passengerName = document.getElementById('PassengerName').value.trim();
    const phoneNumber = document.getElementById('PhoneNumber').value.trim();
    const emailID = document.getElementById('EmailID').value.trim();

    if (passengerName !== '' && phoneNumber !== '' && emailID !== '') {
       
        my_modal_5.showModal();
    } else {

        alert('Please fill in all the fields.');
    }
}

function closeModal() {
    my_modal_5.close();
}


function scrollToSection(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
}

function setSeatBackgroundColor(seatId) {
    const element = document.getElementById(seatId);
    element.style.backgroundColor = '#1DD100';
    element.style.color = 'white';
}


function updateRemainingSeats(remainingSeats) {
    const remainingSeatsCounter = document.getElementById('seat-left');
    remainingSeatsCounter.innerText = remainingSeats;
}


function updateSelectedSeats(selectedSeatsCount) {
    const selectedSeatsElement = document.getElementById('selected-seat');
    selectedSeatsElement.innerText = selectedSeatsCount;
}

function updateTotalPrice(price) {
    let totalPrice = parseFloat(totalPriceElement.innerText);
    totalPrice += price;
    totalPriceElement.innerText = totalPrice;
    return totalPriceElement;
}


function applyCoupon(couponField) {
    const couponInput = couponField.slice(0, 3).toUpperCase() + couponField.slice(3);
    const couponInputCapitalized = capitalizeWords(couponField);

    if (couponCode1 === couponInput) {
        handleCouponApplied(0.15);
    } else if (couponCode2 === couponInputCapitalized) {
        handleCouponApplied(0.2);
    } else {
        alert("Your coupon code is not valid");
    }
}


function handleCouponApplied(discountPercentage) {
    document.getElementById('coupon-area').style.display = 'none';
    document.getElementById('coupon-applied').classList.remove('hidden');
    const discountElement = document.getElementById('discount');
    discountElement.innerText = totalPriceElement.innerText * discountPercentage;
    const grandTotalElement = document.getElementById('grand-total');
    grandTotalElement.innerText = totalPriceElement.innerText - parseFloat(discountElement.innerText);
}


function capitalizeWords(input) {
    input = input.toLowerCase();
    const input2 = input.slice(0, 6);
    const input3 = input.slice(-2);
    let finalInput = input2.charAt(0).toUpperCase() + input2.slice(1);
    input = finalInput + " " + input3;
    return input;
}
