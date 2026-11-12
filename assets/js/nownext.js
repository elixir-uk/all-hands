// "Now and next" bar for the day-of page.
// Compares UK wall-clock time with each slot's data-start / data-end ("YYYY-MM-DDTHH:MM"),
// so it works in GMT and BST without timezone maths.
// Preview any moment with ?now=2026-11-25T10:30
(function () {
  var slots = Array.prototype.slice.call(document.querySelectorAll('.slot'));
  if (!slots.length) return;

  function ukNow() {
    var forced = new URLSearchParams(location.search).get('now');
    if (forced) return forced;
    var p = {};
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return p.year + '-' + p.month + '-' + p.day + 'T' + p.hour + ':' + p.minute;
  }

  function label(el) {
    var t = el.querySelector('.slot__title').textContent.trim();
    return el.dataset.start.slice(11) + ' ' + t;
  }

  function update() {
    var now = ukNow(), current = null, next = null;
    slots.forEach(function (el) {
      el.classList.remove('is-now', 'is-past');
      if (el.dataset.end <= now) el.classList.add('is-past');
      if (el.dataset.start <= now && now < el.dataset.end) current = el;
      if (!next && el.dataset.start > now) next = el;
    });

    var bar = document.getElementById('nownext');
    var first = slots[0].dataset.start, last = slots[slots.length - 1].dataset.end;
    // Show the bar only on the event days themselves
    if (now.slice(0, 10) < first.slice(0, 10) || now > last) { bar.hidden = true; return; }
    bar.hidden = false;

    var nowLink = document.getElementById('now-link');
    var nextLink = document.getElementById('next-link');
    if (current) {
      current.classList.add('is-now');
      nowLink.textContent = label(current);
      nowLink.href = '#' + current.id;
    } else {
      nowLink.textContent = 'Nothing scheduled';
      nowLink.removeAttribute('href');
    }
    nextLink.parentElement.hidden = !next;
    if (next) { nextLink.textContent = label(next); nextLink.href = '#' + next.id; }
  }

  update();
  setInterval(update, 60000);
})();
