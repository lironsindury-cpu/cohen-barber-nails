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
      var date = document.getElementById('date').value.trim();
      var time = document.getElementById('time').value.trim();

      if (!service || !name) {
        alert('נא למלא את כל השדות הנדרשים');
        return;
      }

      if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
        alert('נא להזין תאריך בפורמט הבא: 15/09/2026');
        return;
      }

      if (!/^\d{1,2}:\d{2}$/.test(time)) {
        alert('נא להזין שעה בפורמט הבא: 14:30');
        return;
      }

      alert('התור נקבע! ניצור איתך קשר לאישור.');
      bookingForm.reset();
    });
  }

});
