var cropperLoaded = !1,
  cropperLoadTime = Date.now(),
  cropperOpen = !1;
function removeClip() {
  window.crop &&
    window.crop.icons &&
    Date.now() - cropperLoadTime > 1e3 &&
    (removeClipInstant(),
    (cropperOpen = !1),
    $(document).off("click", "button.goToEditPage", openCropper));
}
function removeClipInstant() {
  window.crop.icons.detach(),
    $("#crop_helper").add(".crop_handle").remove(),
    $(document).off(".removeCrop");
}
function loadCropper() {
  cropperLoaded ||
    ((cropperLoaded = !0),
    (window.showCropOverFlow = function () {
      removeClipInstant();
      window.crop.y2 - window.crop.y1 < 60 &&
        (window.crop.y2 = window.crop.y1 + 60),
        window.crop.x2 - window.crop.x1 < 60 &&
          (window.crop.x2 = window.crop.x1 + 60),
        window.crop.x1 < 0 && (window.crop.x1 = 0),
        window.crop.y1 < 0 && (window.crop.y1 = 0),
        window.crop.y2 < 0 && (window.crop.y2 = 0),
        window.crop.x2 > $(document).width() - 5 &&
          (window.crop.x2 = $(document).width() - 5),
        window.crop.y2 > $(document).height() - 5 &&
          (window.crop.y2 = $(document).height() - 5),
        (x1 = window.crop.x1),
        (x2 = window.crop.x2),
        (y1 = window.crop.y1),
        (y2 = window.crop.y2),
        x1 < x2 ? ((rx1 = x1), (rx2 = x2)) : ((rx1 = x2), (rx2 = x1)),
        y1 < y2 ? ((ry1 = y1), (ry2 = y2)) : ((ry1 = y2), (ry2 = y1)),
        (x1 = rx1),
        (x2 = rx2),
        (y1 = ry1),
        (y2 = ry2),
        $(
          "<div id=crop_helper>\n                <div id=crop_center></div>\n                <div id=crop_helper_bottom></div>\n                <div id=crop_helper_left></div>\n                <div id=crop_helper_top></div>\n                <div id=crop_helper_right></div>\n             </div>"
        ).appendTo(document.body),
        window.crop.move &&
          $("#crop_helper").css("cursor", window.crop.move + "-resize"),
        $("#crop_helper").css({ position: "static" }),
        $("#crop_helper *").css({
          "background-color": "#00299e52",
          position: "absolute",
          "z-index": 1e4,
        }),
        $("#crop_helper_left").css({
          "background-color": "000",
          left: 0,
          top: 0,
          width: x1,
          height: $(document).height(),
        }),
        $("#crop_helper_top").css({
          "background-color": "000",
          left: x1,
          top: 0,
          width: x2 - x1,
          height: y1,
        }),
        $("#crop_helper_bottom").css({
          "background-color": "000",
          left: x1,
          top: y2,
          width: x2 - x1,
          height: $(document).height() - y2,
        }),
        $("#crop_helper_right").css({
          "background-color": "000",
          left: x2,
          top: 0,
          width: $(document).width() - x2,
          height: $(document).height(),
        }),
        $("#crop_center").css({
          "background-color": "",
          cursor: "move",
          left: x1,
          top: y1,
          width: x2 - x1,
          height: y2 - y1,
        }),
        $("#crop_center").data("cord", { x1: x1, x2: x2, y1: y1, y2: y2 }),
        (hw = 8),
        (e = $("<div class=crop_handle></div>").css({
          width: hw,
          height: hw,
          "background-color": "black",
          position: "absolute",
          "z-index": 10001,
        })),
        (obj = {
          ne: { x: x2 - hw, y: y1 },
          nw: { x: x1, y: y1 },
          se: { x: x2 - hw, y: y2 - hw },
          sw: { x: x1, y: y2 - hw },
          n: { x: x1 + (x2 - x1) / 2, y: y1 },
          s: { x: x1 + (x2 - x1) / 2, y: y2 - hw },
          w: { y: y1 + (y2 - y1) / 2, x: x1 },
          e: { y: y1 + (y2 - y1) / 2, x: x2 - hw },
        });
      var o = window.crop.icons;
      o
        .css({ "z-index": 10005, position: "absolute" })
        .appendTo("#crop_helper"),
        (position1 = {
          left: $("#crop_center").offset().left,
          top: $("#crop_center").offset().top + $("#crop_center").height() + 10,
          position: "static",
        }),
        (position2 = {
          left: $("#crop_center").offset().left,
          top: $("#crop_center").offset().top - o.height() - 10,
          position: "static",
        }),
        (position3 = {
          left: ($(window).width() - o.width()) / 2,
          top: 0,
          position: "fixed",
        }),
        (position = position3),
        o.css({
          left: position.left,
          top: position.top,
          position: position.position,
        });
      for (let o in obj)
        e.clone()
          .data("cord", o)
          .css({ left: obj[o].x, top: obj[o].y, cursor: o + "-resize" })
          .appendTo($("#crop_helper"));
    }),
    $(document).on("keyup", () => {
      removeClip();
    }),
    $(document).on("click", "div[id*=crop_helper_]", () => {
      removeClip();
    }),
    (window.scrollOnMove = function (o) {
      o.pageY > document.body.scrollTop + $(window).height() - 30 &&
        (document.body.scrollTop += 30),
        o.pageY < document.body.scrollTop + 30 &&
          (document.body.scrollTop -= 30);
    }),
    $(document).on("mousedown", "#crop_center", function (o) {
      $(document).on("mousemove.cropcenter", function (o) {
        return (
          window.crop.startX &&
            ((window.crop.x1 += o.pageX - window.crop.startX),
            (window.crop.x2 += o.pageX - window.crop.startX),
            (window.crop.y1 += o.pageY - window.crop.startY),
            (window.crop.y2 += o.pageY - window.crop.startY)),
          showCropOverFlow(),
          (window.crop.startX = o.pageX),
          (window.crop.startY = o.pageY),
          scrollOnMove(o),
          o.stopPropagation(),
          !1
        );
      }),
        $(document).on("mouseup.cropcenter", function (o) {
          return (
            (window.crop.startX = null),
            (window.crop.startY = null),
            $(document).off(".cropcenter"),
            o.stopPropagation(),
            !1
          );
        });
    }),
    $(document).on("mousedown", ".crop_handle", function (o) {
      return (
        scrollOnMove(o),
        $(document).on(
          "mousemove.handle",
          { cord: $(o.target).data("cord") },
          function (o) {
            o.screenX, o.screenY;
            const e = o.data.cord;
            return (
              "se" === e &&
                ((window.crop.x2 = o.pageX), (window.crop.y2 = o.pageY)),
              "sw" === e &&
                ((window.crop.x1 = o.pageX), (window.crop.y2 = o.pageY)),
              "nw" === e &&
                ((window.crop.x1 = o.pageX), (window.crop.y1 = o.pageY)),
              "ne" === e &&
                ((window.crop.x2 = o.pageX), (window.crop.y1 = o.pageY)),
              "w" === e && (window.crop.x1 = o.pageX),
              "e" === e && (window.crop.x2 = o.pageX),
              "n" === e && (window.crop.y1 = o.pageY),
              "s" === e && (window.crop.y2 = o.pageY),
              (window.crop.move = e),
              scrollOnMove(o),
              showCropOverFlow(),
              o.stopPropagation(),
              !1
            );
          }
        ),
        $(document).on("mouseup.handle", function (o) {
          return (
            (window.crop.move = null),
            showCropOverFlow(),
            $(document).off(".handle"),
            o.stopPropagation(),
            !1
          );
        }),
        o.stopPropagation(),
        !1
      );
    }));
}
function openCropper(o) {
  removeClip(),
    chrome.runtime.sendMessage({
      data: "captureAll",
      showScrollBar: !0,
      disableHeaderAndFooter: !0,
      processFixedElements: !1,
      cropData: {
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2,
        scrollTop: document.body.scrollTop,
        scrollLeft: document.body.scrollLeft,
      },
    }),
    setTimeout(() => location.reload(), 2e3);
}
function load_cropper_without_selection(o) {
  if ((loadCropper(), !cropperOpen)) {
    removeClip(),
      (cropperOpen = !0),
      (cropperLoadTime = Date.now()),
      (window.crop = o || {
        x1: document.body.scrollWidth / 2 - 200,
        x2: document.body.scrollWidth / 2 + 200,
        y1: window.pageYOffset + 300,
        y2: window.pageYOffset + 600,
      }),
      $("html").css("position", "inherit");
    var e = $(
        '<button class="open msg goToEditPage"\n            style="margin:1px;color:black;background-color:white;cursor:pointer;font-size:1em; border: 1px solid #999; border-radius: 4px;padding: 3px 9px;"\n            tag=open>DONE\n        </button>'
      ),
      r = $(".realToolbar", e);
    window.crop.icons = e;
    $(document).on("click", "button.goToEditPage", openCropper),
      new Toolbar({
        plugins: [],
        element: r,
        namespace: "imageToolbar",
        button_size: "20",
        lines: 2,
        page_title: document.title || "no title",
        page_description: "no description",
        page_url: location.href,
        icon_base: chrome.extension
          ? chrome.extension.getURL("/images/")
          : "../images/",
        whiteIcons: !0,
        position: "static",
        type: "image",
        zIndex: 11e3,
        request: function (o) {
          removeClip(),
            chrome.runtime.sendMessage(
              {
                data: "captureAll",
                runCallback: !0,
                keepIt: !0,
                showScrollBar: !0,
                disableHeaderAndFooter: !0,
                processFixedElements: !1,
                cropData: {
                  x1: x1,
                  x2: x2,
                  y1: y1,
                  y2: y2,
                  scrollTop: document.body.scrollTop,
                  scrollLeft: document.body.scrollLeft,
                },
              },
              function (e) {
                o(e);
              }
            );
        },
      }),
      showCropOverFlow();
  }
}
