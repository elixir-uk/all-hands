// Hides the Register button once the deadline (UK time) passes, without waiting for a rebuild.
(function () {
  var blocks = document.querySelectorAll('.reg[data-deadline]');
  if (!blocks.length) return;

  function ukNow() {
    var p = {};
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return p.year + '-' + p.month + '-' + p.day + 'T' + p.hour + ':' + p.minute;
  }

  function check() {
    var now = new URLSearchParams(location.search).get('now') || ukNow();
    blocks.forEach(function (el) {
      var d = el.dataset.deadline;
      if (!d || now < d) return;
      var open = el.querySelector('.reg__open');
      if (open) open.remove();
      var closed = el.querySelector('.reg__closed');
      if (closed) closed.hidden = false;
    });
  }

  check();
  setInterval(check, 60000);
})();
