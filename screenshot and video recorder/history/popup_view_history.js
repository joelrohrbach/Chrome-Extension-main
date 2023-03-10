var PAGE_STATE = {},
  FIT_PADDING = 20;
function fitConstraints(t, e, n, i) {
  var o = n / t,
    r = i / e;
  return {
    width: (t = Math.min(t * o, t * r, t)),
    height: (e = Math.min(e * o, e * r, e)),
    left: parseInt((n - t) / 2),
    top: parseInt((i - e) / 2),
  };
}
function formatBytes(t, e) {
  if (0 === t) return "0";
  var n = e + 1 || 3,
    i = Math.floor(Math.log(t) / Math.log(1024));
  return (
    parseFloat((t / Math.pow(1024, i)).toFixed(n)) +
    " " +
    ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][i]
  );
}
function loadImage(t, e, n) {
  var i = new Image(),
    o = !1;
  (i.onerror = function (t) {
    o ||
      ((o = !0),
      n(
        "File no longer exists—perhaps it has been cleared from your browser 😐"
      ));
  }),
    (i.onload = function () {
      o || e(t, i.width, i.height);
    }),
    (i.src = t);
}
function loadVideo(t, e, n) {
  var i = document.createElement("video");
  i.setAttribute("src", t);
  e(t, i.width, i.height), (i.src = t);
}
function setVideo(t, e, n) {
  let i = document.createElement("video");
  (i.autoplay = !0), (i.controls = !0);
  var o = 2 * FIT_PADDING;
  (e = window.innerWidth - o),
    (n =
      window.innerHeight -
      document.getElementsByTagName("header")[0].offsetHeight -
      o);
  (i.width = e), (i.height = n), (i.src = t);
  var r = Util.$("image");
  (r.innerHTML = ""), r.appendChild(i);
  var s = Util.$("btn-download");
  (s.href = t),
    (s.download = t.split("/").pop()),
    (Util.$("btn-expand").href = t),
    (PAGE_STATE.imgSrc = t),
    (PAGE_STATE.fsPath = s.download),
    (function (t) {
      var o = !0 === t,
        r = "object" == typeof t,
        s = 2 * FIT_PADDING,
        a = document.getElementsByTagName("header")[0].offsetHeight,
        l = e > window.innerWidth || n + s >= window.innerHeight - a,
        d = i.width,
        h = i.height,
        c = r ? Util.$.offsets(i) : null,
        g = Util.$("image"),
        m = Util.$.hasClass(g, "can-zoom-out");
      !0 === o && (m = !m);
      var w = "";
      if (
        (l &&
          (m
            ? (!(function () {
                var t = 2 * FIT_PADDING,
                  o = window.innerWidth - t,
                  r =
                    window.innerHeight -
                    document.getElementsByTagName("header")[0].offsetHeight -
                    t,
                  s = fitConstraints(e, n, o, r);
                (i.style.height = s.height + "px"),
                  (i.style.width = s.width + "px"),
                  (i.parentNode.style.padding = s.top + t / 2 + "px 0");
              })(),
              (w = "can-zoom-in"))
            : ((i.style.height = "auto"),
              (i.style.width = "auto"),
              (i.parentNode.style.padding = 0),
              (w = "can-zoom-out"))),
        g.setAttribute("class", w),
        r && !m)
      ) {
        var f = t.clientX - c.left,
          u = ((t.clientY - c.top) / h) * n,
          p = (f / d) * e - window.innerWidth / 2,
          y = u - window.innerHeight / 2;
        window.scrollTo(p, y);
      }
    })(!0),
    showImgButtons();
}
function setImage(t, e, n) {
  var i = document.createElement("IMG");
  (i.src = t), (i.title = "Captured screenshot");
  var o = Util.$("image");
  (o.innerHTML = ""), o.appendChild(i);
  var r = Util.$("btn-download");
  (r.href = t),
    (r.download = t.split("/").pop()),
    (Util.$("btn-expand").href = t),
    (PAGE_STATE.imgSrc = t),
    (PAGE_STATE.fsPath = r.download),
    (function (t) {
      var o = !0 === t,
        r = "object" == typeof t,
        s = 2 * FIT_PADDING,
        a = document.getElementsByTagName("header")[0].offsetHeight,
        l = e > window.innerWidth || n + s > window.innerHeight - a,
        d = i.width,
        h = i.height,
        c = r ? Util.$.offsets(i) : null,
        g = Util.$("image"),
        m = Util.$.hasClass(g, "can-zoom-out");
      !0 === o && (m = !m);
      var w = "";
      if (
        (l &&
          (m
            ? (!(function () {
                var t = 2 * FIT_PADDING,
                  o = window.innerWidth - t,
                  r =
                    window.innerHeight -
                    document.getElementsByTagName("header")[0].offsetHeight -
                    t,
                  s = fitConstraints(e, n, o, r);
                (i.style.height = s.height + "px"),
                  (i.style.width = s.width + "px"),
                  (i.parentNode.style.padding = s.top + t / 2 + "px 0");
              })(),
              (w = "can-zoom-in"))
            : ((i.style.height = "auto"),
              (i.style.width = "auto"),
              (i.parentNode.style.padding = 0),
              (w = "can-zoom-out"))),
        g.setAttribute("class", w),
        r && !m)
      ) {
        var f = t.clientX - c.left,
          u = ((t.clientY - c.top) / h) * n,
          p = (f / d) * e - window.innerWidth / 2,
          y = u - window.innerHeight / 2;
        window.scrollTo(p, y);
      }
    })(!0),
    showImgButtons();
}
function showError(t, e, n, i) {
  (Util.$("error-title").innerText = t), (Util.$("error-body").innerText = e);
  var o = Util.$("error");
  n ? Util.$.removeClass(o, "warning") : Util.$.addClass(o, "warning"),
    Util.$.findClass("close", o).forEach(function (t) {
      t.style.display = i ? "" : "none";
    }),
    (Util.$("error-wrap").style.display = "block");
}
function showHistory(t) {
  var e = document.createElement("ul");
  (e.className = "dropdown-items"),
    t.sort(function (t, e) {
      var n = t.metadata ? t.metadata.modificationTime.getTime() : null,
        i = e.metadata ? e.metadata.modificationTime.getTime() : null;
      return n ? (i ? i - n : -1) : i ? 1 : 0;
    });
  for (let n = 0; n < 10; n++) e.appendChild(_createHistoryRow(t[n]));
  hideImgButtons();
}
function _createHistoryRow(t) {
  const { name: e } = t;
  return $(
    `\n      <li class="dropdown-item" style="padding: 0.20rem 1.5rem;">\n        <div class="container">\n          <a>${e}</a>\n        </div>\n      </li>\n    `
  ).get(0);
}
function hideHistory() {
  (Util.$("history").style.display = "none"),
    (Util.$("image").style.display = ""),
    showImgButtons();
}
function showDeletedImg() {
  hideImgButtons(), (Util.$("image").innerHTML = ""), showHistoryPage();
}
function showImgButtons() {
  PAGE_STATE.imgSrc
    ? Util.$.findClass("img-btn").forEach(function (t) {
        t.style.display = "block";
      })
    : hideImgButtons();
}
function hideImgButtons() {
  Util.$.findClass("img-btn").forEach(function (t) {
    t.style.display = "none";
  });
}
function showHistoryPage() {
  FSAPI.withFs(
    function (t) {
      showError(
        "Unable to access filesystem",
        "Something went wrong accessing the filesystem. Check your browser settings.",
        !0,
        !0
      );
    },
    FSAPI.lookupFiles,
    function (t) {
      (t = t.filter(function (t) {
        return t.isFile;
      })),
        FSAPI.loadMetadata(t, function (t) {
          showHistory(t);
        });
    },
    function (t) {
      showError(
        "Error reading files",
        "Something went wrong reading your screen shots. Check your browser settings.",
        !0,
        !0
      );
    }
  );
}
var qs = Util.getQueryString();
let src = qs.src;
qs && qs.src && "webm" === qs.src.slice(-4)
  ? loadVideo(FSAPI.imgPathBase + qs.src, setVideo, function (t) {
      showError("Unable to load image", t);
    })
  : qs && qs.src && "png" === qs.src.slice(-3)
  ? loadImage(FSAPI.imgPathBase + qs.src, setImage, function (t) {
      showError("Unable to load image", t);
    })
  : showHistoryPage();
