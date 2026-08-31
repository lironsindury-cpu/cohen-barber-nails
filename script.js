// מספרת כהן וציפורניים
// תפריט נייד + טופס קביעת תור

document.addEventListener('DOMContentLoaded', function () {

  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });

    var navLinks = mainNav.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        mainNav.classList.remove('open');
      });
    }
  }

  var bookingForm = document.getElementById('bookingForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var service = document.getElementById('service').value;
      var name = document.getElementById('name').value;

      if (!service || !name) {
        alert('נא למלא את כל השדות הנדרשים');
        return;
      }

      alert('התור נקבע! ניצור איתך קשר לאישור.');
      bookingForm.reset();
    });
  }

});
