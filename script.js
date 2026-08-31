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
      var area = document.getElementById('area').value;
      var name = document.getElementById('name').value;
      var date = document.getElementById('date').value.trim();
      var time = document.getElementById('time').value.trim();

      if (!service || !area || !name) {
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

  // לוח שנה מותאם - תמיד מציג ספרות רגילות (לוח גרגוריאני),
  // בלי קשר להגדרות לוח השנה של המכשיר של המשתמש
  var dateInput = document.getElementById('date');
  var calendarPopup = document.getElementById('calendarPopup');
  var calDays = document.getElementById('calDays');
  var calMonthLabel = document.getElementById('calMonthLabel');
  var calPrev = document.getElementById('calPrev');
  var calNext = document.getElementById('calNext');

  var HEBREW_MONTHS = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var displayDate = new Date(today.getFullYear(), today.getMonth(), 1);
  var selectedDate = null;

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function renderCalendar() {
    var year = displayDate.getFullYear();
    var month = displayDate.getMonth();

    calMonthLabel.textContent = HEBREW_MONTHS[month] + ' ' + year;

    var firstWeekday = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    var html = '';

    for (var e = 0; e < firstWeekday; e++) {
      html += '<span class="cal-day cal-day-empty"></span>';
    }

    for (var d = 1; d <= daysInMonth; d++) {
      var cellDate = new Date(year, month, d);
      var classes = 'cal-day';

      if (cellDate < today) {
        classes += ' cal-day-past';
      }
      if (cellDate.getTime() === today.getTime()) {
        classes += ' cal-day-today';
      }
      if (selectedDate && cellDate.getTime() === selectedDate.getTime()) {
        classes += ' cal-day-selected';
      }

      html += '<span class="' + classes + '" data-day="' + d + '">' + d + '</span>';
    }

    calDays.innerHTML = html;
  }

  function openCalendar() {
    if (selectedDate) {
      displayDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    }
    renderCalendar();
    calendarPopup.classList.add('show');
  }

  function closeCalendar() {
    calendarPopup.classList.remove('show');
  }

  if (dateInput && calendarPopup) {
    dateInput.addEventListener('focus', openCalendar);
    dateInput.addEventListener('click', openCalendar);

    calPrev.addEventListener('click', function () {
      displayDate = new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1);
      renderCalendar();
    });

    calNext.addEventListener('click', function () {
      displayDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1);
      renderCalendar();
    });

    calDays.addEventListener('click', function (event) {
      var cell = event.target;
      if (!cell.classList.contains('cal-day') || cell.classList.contains('cal-day-empty') || cell.classList.contains('cal-day-past')) {
        return;
      }
      var day = parseInt(cell.getAttribute('data-day'), 10);
      selectedDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
      dateInput.value = pad(day) + '/' + pad(displayDate.getMonth() + 1) + '/' + displayDate.getFullYear();
      closeCalendar();
    });

    document.addEventListener('click', function (event) {
      var wrap = dateInput.closest('.date-field-wrap');
      if (wrap && !wrap.contains(event.target)) {
        closeCalendar();
      }
    });
  }

});
