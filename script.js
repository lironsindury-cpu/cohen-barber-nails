// מספרת כהן וציפורניים
// תפריט נייד + טופס קביעת תור

document.addEventListener('DOMContentLoaded', function () {

  // צל עדין להדר כשגוללים למטה
  var siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      siteHeader.classList.toggle('scrolled', window.scrollY > 12);
    });
  }

  // אלמנטים "עולים" בעדינות כשנכנסים לתצוגה בגלילה
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

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

  // עיצוב אוטומטי תוך כדי הקלדה: מקלידים ספרות בלבד, הקווים הנטויים/נקודתיים נכנסים לבד
  function attachDateMask(el) {
    if (!el) return;
    el.addEventListener('input', function () {
      var digits = el.value.replace(/\D/g, '').slice(0, 8);
      var formatted = digits;
      if (digits.length > 4) {
        formatted = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4);
      } else if (digits.length > 2) {
        formatted = digits.slice(0, 2) + '/' + digits.slice(2);
      }
      el.value = formatted;
    });
  }

  function attachTimeMask(el) {
    if (!el) return;
    el.addEventListener('input', function () {
      var digits = el.value.replace(/\D/g, '').slice(0, 4);
      var formatted = digits;
      if (digits.length > 2) {
        formatted = digits.slice(0, 2) + ':' + digits.slice(2);
      }
      el.value = formatted;
    });
  }

  attachDateMask(document.getElementById('date'));
  attachDateMask(document.getElementById('birthdate'));
  attachTimeMask(document.getElementById('time'));

  // גיל מתאריך לידה בפורמט DD/MM/YYYY
  function calculateAge(dateStr) {
    var parts = dateStr.split('/');
    var birth = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    var now = new Date();
    var age = now.getFullYear() - birth.getFullYear();
    var monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  var PROVIDERS_LIST = [
    {
      id: 1,
      name: 'יוסי כהן',
      spec: 'פייד ותער · גברים',
      phone: '0501234567',
      initials: 'יכ',
      avatarBg: 'linear-gradient(155deg, #B8935A, #8C6A3C)',
      services: ['haircut', 'haircut-beard', 'shave', 'kids'],
      areas: ['חיפה', 'קריית ים', 'קריית מוצקין', 'קריית ביאליק', 'קריית אתא', 'טירת כרמל', 'נשר']
    },
    {
      id: 2,
      name: 'מאיה לוי',
      spec: 'מניקור ופדיקור',
      phone: '0507654321',
      initials: 'מל',
      avatarBg: 'linear-gradient(155deg, #8A2C39, #6B1F2A)',
      services: ['manicure', 'pedicure', 'gel'],
      areas: ['תל אביב-יפו', 'רמת גן', 'גבעתיים', 'בני ברק', 'חולון', 'בת ים', 'ראשון לציון', 'אשדוד', 'רחובות', 'הרצליה']
    },
    {
      id: 3,
      name: 'רון אזולאי',
      spec: 'תספורת + עיצוב זקן',
      phone: '0521112233',
      initials: 'רא',
      avatarBg: 'linear-gradient(155deg, #3A2F25, #211B16)',
      services: ['haircut', 'haircut-beard', 'shave'],
      areas: ['ירושלים', 'מבשרת ציון', 'בית שמש', 'מעלה אדומים', 'אבו גוש']
    },
    {
      id: 4,
      name: 'נועה שרון',
      spec: "לק ג'ל ועיצוב ציפורניים",
      phone: '0534445566',
      initials: 'נש',
      avatarBg: 'linear-gradient(155deg, #B8935A, #6B1F2A)',
      services: ['manicure', 'pedicure', 'gel'],
      areas: ['חיפה', 'קריית אתא', 'טירת כרמל', 'עכו', 'נהריה']
    }
  ];

  var SERVICE_LABELS = {
    haircut: 'תספורת גברים',
    'haircut-beard': 'תספורת + עיצוב זקן',
    shave: 'גילוח קלאסי בתער',
    kids: 'תספורת ילדים',
    manicure: 'מניקור',
    pedicure: 'פדיקור',
    gel: "לק ג'ל"
  };

  var selectedProviderId = null;
  var providerList = document.getElementById('providerList');
  var providerHint = document.getElementById('providerHint');
  var areaInput = document.getElementById('area');
  var serviceSelect = document.getElementById('service');

  function getProviderById(id) {
    for (var i = 0; i < PROVIDERS_LIST.length; i++) {
      if (PROVIDERS_LIST[i].id === id) return PROVIDERS_LIST[i];
    }
    return null;
  }

  function renderProviders() {
    if (!providerList) return;
    var typedArea = areaInput ? areaInput.value.trim() : '';
    var selectedService = serviceSelect ? serviceSelect.value : '';

    if (!typedArea) {
      providerList.innerHTML = '<div class="provider-prompt">בחרו יישוב למעלה כדי לראות ספרים וקוסמטיקאיות זמינים אצלכם</div>';
      selectedProviderId = null;
      if (providerHint) providerHint.textContent = 'כרגע אלה ספרים לדוגמה. ספרים אמיתיים שיצטרפו לרשת יופיעו כאן, לפי האזור והשירות שבחרתם למעלה.';
      return;
    }

    if (!selectedService) {
      providerList.innerHTML = '<div class="provider-prompt">בחרו שירות למעלה כדי לראות מי מתאים/ה לבקשה שלכם</div>';
      selectedProviderId = null;
      return;
    }

    var matches = PROVIDERS_LIST.filter(function (p) {
      return p.areas.indexOf(typedArea) !== -1 && p.services.indexOf(selectedService) !== -1;
    });

    if (matches.length === 0) {
      var serviceLabel = SERVICE_LABELS[selectedService] || 'השירות שבחרתם';
      providerList.innerHTML = '<div class="provider-empty">עדיין אין לנו ספר/ית שנותנ/ת "' + serviceLabel + '" ב-' + typedArea + '. השאירו פרטים למטה ונחזור אליכם ברגע שמישהו מצטרף לרשת באזור שלכם.</div>';
      selectedProviderId = null;
      return;
    }

    providerList.innerHTML = matches.map(function (p) {
      return '<div class="provider-card" data-provider="' + p.id + '" onclick="selectProvider(' + p.id + ')">' +
        '<div class="provider-avatar" style="background:' + p.avatarBg + ';">' + p.initials + '</div>' +
        '<div class="provider-info">' +
        '<div class="provider-name">' + p.name + '</div>' +
        '<div class="provider-spec">' + p.spec + '</div>' +
        '<div class="provider-area">' + typedArea + '</div>' +
        '</div>' +
        '</div>';
    }).join('');

    // אם הספר/ית שהיו בחורים כבר לא ברשימה המסוננת - מבטלים את הבחירה
    if (selectedProviderId && matches.indexOf(getProviderById(selectedProviderId)) === -1) {
      selectedProviderId = null;
    }
  }

  window.selectProvider = function (id) {
    selectedProviderId = id;
    var cards = document.querySelectorAll('.provider-card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.toggle('selected', Number(cards[i].getAttribute('data-provider')) === id);
    }
  };

  if (areaInput) {
    areaInput.addEventListener('input', renderProviders);
  }
  if (serviceSelect) {
    serviceSelect.addEventListener('change', renderProviders);
  }
  renderProviders();

  var bookingForm = document.getElementById('bookingForm');
  var paymentPanel = document.getElementById('paymentPanel');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var service = document.getElementById('service').value;
      var area = document.getElementById('area').value;
      var name = document.getElementById('name').value;
      var date = document.getElementById('date').value.trim();
      var time = document.getElementById('time').value.trim();
      var birthdate = document.getElementById('birthdate').value.trim();

      if (!service || !area || !name) {
        alert('נא למלא את כל השדות הנדרשים');
        return;
      }

      if (!selectedProviderId) {
        alert('נא לבחור ספר/ית מהרשימה שמופיעה לפי האזור שבחרתם');
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

      if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthdate)) {
        alert('נא להזין תאריך לידה בפורמט הבא: 15/09/2013');
        return;
      }

      var age = calculateAge(birthdate);
      if (age < 12) {
        alert('ההזמנה מיועדת לגילאי 12 ומעלה. מתחת לגיל 12 נדרש ליווי הורה - אנא צרו קשר טלפוני ישירות להזמנה.');
        return;
      }

      var provider = getProviderById(selectedProviderId);

      document.getElementById('paymentProviderName').textContent = ' ' + provider.name;
      // קישורים לדוגמה בלבד - יוחלפו בקישור התשלום האישי האמיתי של כל ספר/ית מ-Bit / PayBox
      document.getElementById('bitPayLink').href = 'https://www.bitpay.co.il/app/me/' + provider.phone;
      document.getElementById('payboxPayLink').href = 'https://links.payboxapp.com/' + provider.phone;

      bookingForm.style.display = 'none';
      paymentPanel.classList.add('show');
      paymentPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  // טופס הצטרפות ספרים/קוסמטיקאיות לרשת
  var joinForm = document.getElementById('joinForm');
  if (joinForm) {
    joinForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = document.getElementById('joinName').value.trim();
      var phone = document.getElementById('joinPhone').value.trim();
      var profession = document.getElementById('joinProfession').value;
      var area = document.getElementById('joinArea').value.trim();

      if (!name || !phone || !profession || !area) {
        alert('נא למלא שם, טלפון, תחום עיסוק ואזור עבודה');
        return;
      }

      alert('תודה ' + name + '! קיבלנו את הפרטים שלך ונחזור אליך בקרוב כדי להצטרף לרשת.');
      joinForm.reset();
    });
  }

});
