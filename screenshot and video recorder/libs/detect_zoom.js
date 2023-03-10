function detect_zoom() {
  (window["detectZoom"] = (function () {
    var e = function () {
        return window.devicePixelRatio || 1;
      },
      t = function () {
        return { zoom: 1, devicePxPerCssPx: 1 };
      },
      n = function () {
        var t =
          Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
        return { zoom: t, devicePxPerCssPx: t * e() };
      },
      o = function () {
        var t =
          Math.round(
            (document.documentElement.offsetHeight / window.innerHeight) * 100
          ) / 100;
        return { zoom: t, devicePxPerCssPx: t * e() };
      },
      i = function () {
        var t =
          (90 === Math.abs(window.orientation) ? screen.height : screen.width) /
          window.innerWidth;
        return { zoom: t, devicePxPerCssPx: t * e() };
      },
      d = function () {
        var e = u("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4);
        return { zoom: (e = Math.round(100 * e) / 100), devicePxPerCssPx: e };
      },
      r = function () {
        return { zoom: d().zoom, devicePxPerCssPx: e() };
      },
      c = function () {
        var t = window.top.outerWidth / window.top.innerWidth;
        return {
          zoom: (t = Math.round(100 * t) / 100),
          devicePxPerCssPx: t * e(),
        };
      },
      u = function (e, t, n, o, i, d) {
        function r(n, o, i) {
          var u = (n + o) / 2;
          return 0 >= i || d > o - n
            ? u
            : c("(" + e + ":" + u + t + ")").matches
            ? r(u, o, i - 1)
            : r(n, u, i - 1);
        }
        var c, u, m, a;
        window.matchMedia
          ? (c = window.matchMedia)
          : ((u = document.getElementsByTagName("head")[0]),
            (m = document.createElement("style")),
            u.appendChild(m),
            ((a = document.createElement("div")).className =
              "mediaQueryBinarySearch"),
            (a.style.display = "none"),
            document.body.appendChild(a),
            (c = function (e) {
              m.sheet.insertRule(
                "@media " +
                  e +
                  "{.mediaQueryBinarySearch {text-decoration: underline} }",
                0
              );
              var t = "underline" === getComputedStyle(a, null).textDecoration;
              return m.sheet.deleteRule(0), { matches: t };
            }));
        var s = r(n, o, i);
        return a && (u.removeChild(m), document.body.removeChild(a)), s;
      },
      m = (function () {
        var e = t;
        return (
          isNaN(screen.logicalXDPI) || isNaN(screen.systemXDPI)
            ? window.navigator.msMaxTouchPoints
              ? (e = o)
              : "orientation" in window &&
                "string" == typeof document.body.style.webkitMarquee
              ? (e = i)
              : "string" == typeof document.body.style.webkitMarquee
              ? (e = s)
              : navigator.userAgent.indexOf("Opera") >= 0
              ? (e = c)
              : window.devicePixelRatio
              ? (e = r)
              : d().zoom > 0.001 && (e = d)
            : (e = n),
          e
        );
      })();
    return {
      zoom: function () {
        return m().zoom;
      },
    };
  })()),
    (document.width = Math.max(
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.clientWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth
    )),
    (document.height = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    ));
}
