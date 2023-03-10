!(function () {
  var n = (window.Util = window.Util || {});
  function e(n) {
    return Array.prototype.slice.call(n, 0);
  }
  function t(n) {
    return document.getElementById(n);
  }
  (n.b64 = function (n) {
    var e = !1;
    try {
      (n = btoa(n)), (e = !0);
    } catch (n) {}
    if (e)
      for (; "=" === n.charAt(n.length - 1); ) n = n.substring(0, n.length - 1);
    return encodeURIComponent(n);
  }),
    (n.asFilename = function (n) {
      var e = n.split("?")[0].split("#")[0];
      return (
        "screencapture" +
        (e = e
          ? "-" +
            (e = e
              .replace(/^https?:\/\/(www\.)?/, "")
              .replace(/^([^\/]+)\.com/, "$1")
              .replace(/[^A-z0-9]+/g, "-")
              .replace(/-+/g, "-")
              .replace(/^[_\-]+/, "")
              .replace(/[_\-]+$/, ""))
          : "") +
        "-" +
        Date.now() +
        ".png"
      );
    }),
    (n.asArray = e),
    (n.getQueryString = function () {
      var n = {};
      return (
        window.location.search
          .substring(1)
          .split("&")
          .forEach(function (e) {
            var t = e.split("=").map(decodeURIComponent);
            n[t.shift()] = t.join("=");
          }),
        n
      );
    }),
    (n.parseQueryString = function (n) {
      for (var e, t = [], r = 0, o = n.length; r < o; r++)
        (e = n[r]),
          t.push(
            encodeURIComponent(e.key) +
              (e.val ? "=" + encodeURIComponent(e.val) : "")
          );
      return t.join("&");
    }),
    (n.getVersion = function () {
      return chrome.runtime.getManifest().version || "0.0.0";
    }),
    (n.$ = t),
    (t.show = function (n) {
      t(n).style.display = "block";
    }),
    (t.hide = function (n) {
      t(n).style.display = "none";
    }),
    (t.findClass = function (n, t) {
      return e((t || document).getElementsByClassName(n));
    }),
    (t.on = function (n, e, t) {
      return n.addEventListener(e, t, !1), n;
    }),
    (t.hasClass = function (n, e) {
      return n.classList.contains(e);
    }),
    (t.addClass = function (n, e) {
      return n.classList.add(e);
    }),
    (t.removeClass = function (n, e) {
      return n.classList.remove(e);
    }),
    (t.offsets = function (n) {
      for (var e = 0, t = 0, r = n; r; )
        (e += r.offsetLeft), (t += r.offsetTop), (r = r.offsetParent);
      return { left: e, top: t };
    });
})();
