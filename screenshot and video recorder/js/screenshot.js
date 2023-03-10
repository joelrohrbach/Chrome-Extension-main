var screenshot = {
  runCallback: !1,
  keepIt: !1,
  scroll: !1,
  cropData: null,
  retries: 0,
  showScrollBar: !1,
  disableHeaderAndFooter: !1,
  processFixedElements: !1,
  screenShotParams: null,
  screens: [],
  thisTab: null,
  thisTabId: null,
  thisTabTitle: "",
  url: "",
  title: "",
  canvas: null,
  canvasToDataURL: "",
  captureVisible: function () {
    $.extend(screenshot, {
      callback: null,
      runCallback: !1,
      keepIt: !1,
      scroll: !1,
      cropData: null,
      retries: 0,
      showScrollBar: !0,
      disableHeaderAndFooter: !1,
      processFixedElements: !1,
    }),
      screenshot.load(screenshot.addScreen);
  },
  captureAll: function (e) {
    $.extend(
      screenshot,
      {
        callback: null,
        runCallback: !1,
        keepIt: !1,
        scroll: !0,
        cropData: null,
        retries: 0,
        showScrollBar: !1,
        disableHeaderAndFooter: !1,
        processFixedElements: !0,
      },
      e
    ),
      screenshot.load(screenshot.addScreen);
  },
  tryGetUrl: function (e) {
    (screenshot.description = ""),
      chrome.tabs.query({ active: !0, currentWindow: !0 }, function (t) {
        const s = t[0];
        (screenshot.thisTab = s),
          (screenshot.thisTabId = s.id),
          (screenshot.thisTabTitle = s.title),
          (screenshot.url = s.url),
          (screenshot.title = s.title),
          (screenshot.thisWindowId = s.windowId),
          e(screenshot.url);
      });
  },
  load: function (e) {
    screenshot.tryGetUrl(function () {
      var t = e;
      (screenshot.screens = []),
        (screenshot.description = ""),
        api.callPopup({ type: "working" }),
        (e = function () {
          window.setTimeout(t, 1e3 * (parseInt(localStorage.delay, 10) || 0));
        }),
        localStorage.captureCount || (localStorage.captureCount = 0),
        e();
    });
  },
  addScreen: function (e) {
    api.stop ||
      (screenshot.retries++,
      chrome.tabs.sendMessage(
        screenshot.thisTabId,
        $.extend(
          {
            cropData: screenshot.cropData,
            type: "takeCapture",
            start: !0,
            scroll: screenshot.scroll,
            showScrollBar: screenshot.showScrollBar,
            processFixedElements: screenshot.processFixedElements,
          },
          e
        ),
        screenshot.ans
      ));
  },
  ans: function (e) {
    if (!api.stop) {
      if (!e && chrome.runtime.lastError) {
        if (
          screenshot.retries > 1 &&
          screenshot.scroll &&
          !screenshot.isContentSupportedChrome
        )
          return void api.callPopup({
            type: "message",
            message:
              "Cannot scroll on this page (extensions do not work on internal Chrome pages nor in the Chrome extensions gallery)",
          });
        if (
          screenshot.retries > 1 &&
          screenshot.scroll &&
          screenshot.isContentSupportedChrome
        )
          return void api.callPopup({
            type: "message",
            message:
              "Something is wrong, we cannot take a screenshot of this page. Please reload the page!",
          });
        if (!(screenshot.retries > 1)) return void screenshot.addScreen();
        e = { left: 0, top: 0, finish: !0 };
      }
      e ||
        (e = { top: 0, left: 0, _devicePixelRatio: window.devicePixelRatio }),
        null === e.top && ((e.top = 0), (e.left = 0));
      var t = function (t) {
          api.stop ||
            ((e.top || 0 === parseInt(e.top + "")) &&
              screenshot.screens.push({
                left: parseInt(e.left + ""),
                top: parseInt(e.top + ""),
                data: t,
              }),
            e.finish
              ? ((screenshot.screenShotParams = e),
                screenshot.createScreenShot(() => {
                  chrome.tabs.create({
                    url: chrome.extension.getURL("editor.html"),
                  }),
                    (editor = null);
                }))
              : screenshot.addScreen({ start: !1 }));
        },
        s = localStorage.speed;
      setTimeout(function () {
        chrome.windows.update(
          screenshot.thisWindowId,
          { focused: !0 },
          function () {
            chrome.tabs.update(
              screenshot.thisTabId,
              { active: !0 },
              function () {
                chrome.runtime.lastError,
                  chrome.tabs.captureVisibleTab(
                    null,
                    { format: "jpeg", quality: 100 },
                    (s) => {
                      if (
                        (void 0 === e._devicePixelRatio &&
                          (e._devicePixelRatio = window.devicePixelRatio),
                        1 === e._devicePixelRatio)
                      )
                        t(s);
                      else {
                        const o = document.createElement("canvas"),
                          n = new Image();
                        (n.src = s),
                          (n.onload = () => {
                            const s = o.getContext("2d"),
                              r = n.width / e._devicePixelRatio,
                              a = Math.floor((n.height / n.width) * r);
                            (o.width = r),
                              (o.height = a),
                              s.drawImage(n, 0, 0, r, a);
                            const c = o.toDataURL("image/png");
                            t(c);
                          });
                      }
                    }
                  );
              }
            );
          }
        );
      }, s);
    }
  },
  createScreenShot: function (e = () => {}) {
    const t = screenshot.screenShotParams;
    chrome.tabs.sendMessage(screenshot.thisTabId, { type: "finish" });
    const s = [];
    screenshot.canvas = document.createElement("canvas");
    var o = !0;
    const n = function (r) {
      if (api.stop) return;
      const a = screenshot.canvas.getContext("2d");
      (s[r] = $("<img tag=" + r + "/>")),
        s[r].load(function () {
          var r;
          (r = parseInt($(this).attr("tag"))),
            o &&
              ((screenshot.canvas.width = t.width || s[r][0].width),
              (screenshot.canvas.height = t.height || s[r][0].height),
              (o = !1));
          const c = screenshot.screens[r].top + 0;
          a.drawImage(s[r][0], screenshot.screens[r].left, c),
            (s[r][0].src = ""),
            s[r].off("load"),
            (s[r][0] = null),
            s[r].remove(),
            (s[r] = null),
            r !== screenshot.screens.length - 1
              ? api.stop || n(++r)
              : screenshot.runCallback
              ? screenshot.keepIt ||
                ((screenshot.canvas.width = screenshot.canvas.height = 1),
                screenshot.canvas.remove(),
                (screenshot.canvas = null),
                delete screenshot.canvas)
              : e();
        });
      try {
        s[r].attr("src", screenshot.screens[r].data);
      } catch (e) {}
    };
    api.stop || n(0);
  },
};
