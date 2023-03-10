var popup = {
  tabId: null,
  state: {
    activeTab: "home-tab",
    pillsActiveTab: "pills-home-tab",
    recording: "notStarted",
    microphone: !1,
    systemSound: !1,
  },
  ready: function () {
    return (
      $(".popup-box").fadeIn("slow"),
      Promise.all([popup.getGrantAccess(), popup.checkWebCamIsAvailable()])
        .then(() => popup.checkIfCOntentScriptRunning())
        .then((e) => {
          let s = !0;
          (popup.state = { ...popup.state, isContentSupported: !0 }),
            chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
              const t = e[0];
              popup.tabId = t.id;
              var o = t.url;
              (o.includes("chrome://") ||
                o.includes("chrome-extension:") ||
                o.includes("https://chrome.google.com")) &&
                (s = !1);
            }),
            $(".capture-visible").on("click", () =>
              popup.sendMessage({ data: "captureVisible" })
            ),
            $(".capture-all").on("click", () =>
              popup.sendMessage({
                data: "captureAll",
                isContentSupportedChrome: s,
              })
            ),
            $(".capture-region").on("click", () =>
              chrome.tabs.sendMessage(popup.tabId, { data: "captureRegion" })
            ),
            $("#checkboxMicrophoneAccess").on("click", function () {
              let e = popup.state.microphone;
              (popup.state = { ...popup.state, microphone: !e }),
                popup.saveState();
            }),
            $("#checkboxSystemSoundAccess").on("click", function () {
              let e = popup.state.systemSound;
              (popup.state = { ...popup.state, systemSound: !e }),
                popup.saveState();
            }),
            $(".btn-handler").on("click", function () {
              let e = $(this).data("recording"),
                s = $(this).data("message");
              (popup.state = { ...popup.state, recording: e }),
                "startRecordWeb" === s || "startRecordDesktopWeb" === s
                  ? Promise.all([
                      popup.getMicrophonePermission(),
                      popup.getCameraPermission(),
                    ]).then(([e, t]) => {
                      if ("granted" !== e.state && "granted" !== t.state)
                        chrome.runtime.getBackgroundPage(function (e) {
                          e.api.sendMicrophoneRequest();
                        });
                      else {
                        let e = "";
                        popup.state.systemSound && "startRecordDesktopWeb" === s
                          ? ((e = "startRecordDesktopTabWeb"),
                            popup.sendMessage({
                              data: e,
                              microphone: popup.state.microphone,
                              state: popup.state,
                            }))
                          : popup.sendMessage({
                              data: s,
                              microphone: popup.state.microphone,
                              state: popup.state,
                            }),
                          window.close();
                      }
                    })
                  : (popup.sendMessage({
                      data: s,
                      microphone: popup.state.microphone,
                      state: popup.state,
                    }),
                    window.close());
            }),
            $(".btn-handler-mic").on("click", function () {
              chrome.runtime.getBackgroundPage(function (e) {
                e.api.sendMicrophoneRequest();
              }),
                popup.getGrantAccess();
            }),
            $(".edit-content").on("click", () => {
              chrome.tabs.sendMessage(popup.tabId, { data: "editContent" }),
                window.close();
            }),
            $(".show-history").on("click", () => popup.showHistory()),
            $("#working, #message").on("click", function () {
              $(this).fadeOut();
            }),
            $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
              (popup.state = {
                ...popup.state,
                activeTab: $(e.target).prop("id"),
              }),
                popup.saveState();
            }),
            $(`a#${popup.state.activeTab}`).tab("show"),
            "notStarted" === popup.state.recording
              ? $("#startRecording_container").show()
              : $("#recordingControls_container").show(),
            $(`a#${popup.state.activeTab}`).tab("show"),
            popup.translate(),
            e ||
              ((popup.state = { ...popup.state, isContentSupported: !1 }),
              chrome.tabs.query(
                { active: !0, currentWindow: !0 },
                function (e) {
                  const s = e[0];
                  popup.tabId = s.id;
                  var t = s.url;
                  if (
                    ((this.data = {
                      type: "message",
                      message:
                        "Something is wrong, we cannot take a screenshot of this page. Please reload the page!",
                    }),
                    t.includes("chrome://") ||
                      t.includes("chrome-extension:") ||
                      t.includes("https://chrome.google.com"))
                  ) {
                    let e = {
                      type: "message",
                      message:
                        "Cannot scroll on this page (extensions do not work on internal Chrome pages nor in the Chrome extensions gallery)",
                    };
                    this.data = e;
                  }
                  $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
                    (popup.state = {
                      ...popup.state,
                      activeTab: $(e.target).prop("id"),
                    }),
                      popup.saveState();
                  }),
                    $(`a#${popup.state.activeTab}`).tab("show"),
                    $("a.withContentScript").tab("show"),
                    $('li.withoutContentScript a[data-toggle="pill"]')
                      .removeClass("active")
                      .addClass("disabledTabs"),
                    $("li.withoutContentScript")
                      .removeClass("first-child")
                      .addClass("disabledTabs"),
                    $('a.withoutContentScript[data-toggle="pill"]')
                      .removeClass("active")
                      .addClass("disabledTabs"),
                    $('a.withoutContentScript[data-toggle="pill"]')
                      .removeClass("show")
                      .addClass("disabledTabs"),
                    $('a.withContentScript[data-toggle="pill"]').addClass(
                      "active"
                    ),
                    $("a.capture-region").on("click", () => {
                      popup.exec(this.data);
                    });
                }
              ),
              popup.state.systemSound &&
                ($("#sm_record_both").addClass("disabled"), popup.saveState()));
        })
    );
  },
  renderStateChanged() {
    const { state: e } = popup;
    $(".sm_image_mic_on").show(),
      $(".sm_image_mic_off").hide(),
      $(".sm_image_system_sound_on").show(),
      $(".sm_image_system_sound_off").hide(),
      popup.state.microphone ||
        ($(".checkedMicrophone").removeAttr("checked"),
        $(".sm_image_mic_on").hide(),
        $(".sm_image_mic_off").show()),
      popup.state.systemSound
        ? ($("#sm_record_desktop").css({ height: "calc(30% - 7px)" }),
          $("#sm_record_desktop img").css({ margin: "15px 0 10px 0" }),
          $("#sm_record_desktop img").attr("src", "./images/desktop.svg"),
          $("#sm_record_desktop h4").css("color", "#FFFFFF"),
          $("#record a.record-screen").css({ background: "#E6E6E6" }),
          $("#record a.record-screen").addClass("disabled"),
          $("#record a.record-screen-tab").removeClass("disabled"),
          $("#sm_record_desktop_tab").css({ height: "calc(70% - 7px)" }),
          $("#sm_record_desktop_tab img").css({ padding: "0" }),
          $("#sm_record_desktop_tab img").css({ margin: "31px 0 15px 0" }),
          $("#sm_record_desktop_tab img").css({ width: "100px" }),
          $("#sm_record_desktop_tab img").css({ height: "100px" }),
          $("#sm_record_desktop_tab h4").css({ color: "#FFFFFF" }),
          $("#sm_record_desktop_tab h5").text("(with system sound)"),
          $("#sm_record_desktop_tab img").attr(
            "src",
            "./images/cats_images/3-1.svg"
          ),
          $("#record a.record-screen-tab").css({ background: "#5EBF72" }))
        : ($(".checkedSystemSound").removeAttr("checked"),
          $(".sm_image_system_sound_on").hide(),
          $(".sm_image_system_sound_off").show(),
          $("#sm_record_desktop").css({ height: "calc(70% - 7px)" }),
          $("#sm_record_desktop img").attr(
            "src",
            "./images/cats_images/3-2.svg"
          ),
          $("#sm_record_desktop img").css({ margin: "20px 0 0 53px" }),
          $("#sm_record_desktop h4").css({ color: "#FFFFFF" }),
          $("#record a.record-screen").css({ background: "#5EBF72" }),
          $("#sm_record_desktop_tab").css({ height: "calc(30% - 7px)" }),
          $("#sm_record_desktop_tab").css({ background: "E6E6E6" }),
          $("#sm_record_desktop_tab img").attr("src", "./images/normal_gr.svg"),
          $("#sm_record_desktop_tab img").css({ width: "52px" }),
          $("#sm_record_desktop_tab img").css({ height: "50px" }),
          $("#sm_record_desktop_tab img").css({ padding: "18px 0px 0px" }),
          $("#sm_record_desktop_tab img").css({ margin: "0" }),
          $("#record a.record-screen-tab").css({ background: "#E6E6E6" }),
          $("#record a.record-screen-tab").addClass("disabled"),
          $("#record a.record-screen").removeClass("disabled"),
          $("#sm_record_desktop_tab h4").css({ color: "#FFFFFF" })),
      popup.state.systemSound || $("#sm_record_both").removeClass("disabled"),
      popup.state.systemSound &&
        !popup.state.isContentSupported &&
        $("#sm_record_both").addClass("disabled"),
      "notStarted" === popup.state.recording
        ? ($("#startRecording_container").show(),
          $(".popup-box").fadeIn("slow"))
        : ($("#recordingControls_container").show(),
          $(".popup-box").fadeIn("slow")),
      popup.state.recording &&
        "started" === popup.state.recording &&
        ($("#sm_tabs a#home-tab").addClass("disabled"),
        $("#sm_tabs a#history-tab").addClass("disabled"),
        $(".pause-recording-desktop").removeAttr("disabled"),
        $(".stop-recording-desktop").removeAttr("disabled"),
        $(".resume-recording-desktop").css({ cursor: "not-allowed" }),
        $(".resume-recording-desktop").attr("disabled", !0),
        $(".resume-recording-desktop").addClass("disabledTabs"),
        $(".pause-recording-web").removeAttr("disabled"),
        $(".stop-recording-web").removeAttr("disabled"),
        $(".resume-recording-web").css({ cursor: "not-allowed" }),
        $(".resume-recording-web").attr("disabled", !0),
        $(".resume-recording-web").addClass("disabledTabs"),
        $(".pause-recording-desktop-web").removeAttr("disabled"),
        $(".stop-recording-desktop-web").removeAttr("disabled"),
        $(".resume-recording-desktop-web").css({ cursor: "not-allowed" }),
        $(".resume-recording-desktop-web").attr("disabled", !0),
        $(".resume-recording-desktop-web").addClass("disabledTabs")),
      popup.state.recording &&
        "paused" === popup.state.recording &&
        ($("#sm_tabs a#home-tab").addClass("disabled"),
        $("#sm_tabs a#history-tab").addClass("disabled"),
        $(".pause-recording-desktop").attr("disabled", !0),
        $(".pause-recording-desktop").css({ cursor: "not-allowed" }),
        $(".pause-recording-desktop").addClass("disabledTabs"),
        $(".resume-recording-desktop").removeAttr("disabled"),
        $(".resume-recording-desktop").css({ cursor: "pointer" }),
        $(".stop-recording-desktop").attr("disabled", !1),
        $(".pause-recording-web").attr("disabled", !0),
        $(".pause-recording-web").css({ cursor: "not-allowed" }),
        $(".pause-recording-web").addClass("disabledTabs"),
        $(".resume-recording-web").removeAttr("disabled"),
        $(".resume-recording-web").css({ cursor: "pointer" }),
        $(".stop-recording-web").attr("disabled", !1),
        $(".pause-recording-desktop-web").attr("disabled", !0),
        $(".pause-recording-desktop-web").css({ cursor: "not-allowed" }),
        $(".pause-recording-desktop-web").addClass("disabledTabs"),
        $(".resume-recording-desktop-web").removeAttr("disabled"),
        $(".resume-recording-desktop-web").css({ cursor: "pointer" }),
        $(".stop-recording-desktop-web").attr("disabled", !1)),
      popup.state.recording &&
        "resumed" === popup.state.recording &&
        ($("#sm_tabs a#home-tab").addClass("disabled"),
        $("#sm_tabs a#history-tab").addClass("disabled"),
        $(".pause-recording-desktop").attr("disabled", !1),
        $(".resume-recording-desktop").attr("disabled", !0),
        $(".resume-recording-desktop").css({ cursor: "not-allowed" }),
        $(".resume-recording-desktop").addClass("disabledTabs"),
        $(".pause-recording-desktop").css({ cursor: "pointer" }),
        $(".stop-recording-desktop").attr("disabled", !1),
        $(".pause-recording-web").attr("disabled", !1),
        $(".resume-recording-web").attr("disabled", !0),
        $(".resume-recording-web").css({ cursor: "not-allowed" }),
        $(".resume-recording-web").addClass("disabledTabs"),
        $(".pause-recording-web").css({ cursor: "pointer" }),
        $(".stop-recording-web").attr("disabled", !1),
        $(".pause-recording-desktop-web").attr("disabled", !1),
        $(".resume-recording-desktop-web").attr("disabled", !0),
        $(".resume-recording-desktop-web").css({ cursor: "not-allowed" }),
        $(".resume-recording-desktop-web").addClass("disabledTabs"),
        $(".pause-recording-desktop-web").css({ cursor: "pointer" }),
        $(".stop-recording-desktop-web").attr("disabled", !1));
  },
  saveState: () =>
    new Promise((e) => {
      const { state: s } = popup;
      popup.renderStateChanged(), chrome.storage.local.set({ state: s }, e);
    }),
  getMicrophonePermission: (e) =>
    navigator.permissions.query({ name: "microphone" }),
  getCameraPermission: (e) => navigator.permissions.query({ name: "camera" }),
  showHistory() {
    const e = chrome.extension.getURL("history.html");
    chrome.tabs.query({ currentWindow: !0 }, (s) => {
      let t = !1,
        o = null;
      s.forEach((s) => {
        s.url === e && ((t = !0), (o = s.id));
      }),
        t
          ? chrome.tabs.update(o, { highlighted: !0 })
          : chrome.tabs.create({ url: e });
    });
  },
  translate() {
    $("[tr]").each(function () {
      var e = $(this).attr("tr"),
        s = chrome.i18n.getMessage(e);
      s && $(this).html(s);
    });
  },
  checkIfCOntentScriptRunning: function () {
    return new Promise((e) => {
      chrome.tabs.query({ active: !0, currentWindow: !0 }, function (s = []) {
        if (!s.length) return e(!1);
        const [t] = s;
        chrome.tabs.sendMessage(t.id, { type: "ping" }, (s) => e(!!s));
      });
    });
  },
  checkWebCamIsAvailable: function () {
    navigator.mediaDevices.enumerateDevices().then((e) => {
      0 === e.filter((e) => "videoinput" === e.kind).length &&
        ($('a.camIsNotAvailable[data-toggle="pill"]')
          .removeClass("active")
          .addClass("disabled"),
        $('a.camIsNotAvailable[data-toggle="pill"]').removeClass("show"));
    });
  },
  checkSupport: function () {
    chrome.tabs.query({ active: !0, currentWindow: !0 }, function (e) {
      const s = e[0];
      if (((popup.tabId = s.id), s.url.includes("file:"))) {
        var t = setTimeout(popup.disableScrollSupport, 500);
        chrome.tabs.sendMessage(s.id, { type: "checkExist" }, function () {
          chrome.runtime.lastError
            ? $("#noall").html(
                'Go to chrome://extensions, and check the box "Allow access to file URLs"'
              )
            : clearTimeout(t);
        });
      }
    });
  },
  disableScrollSupport: function () {
    $(
      "#myTabContent, .capture-all, .capture-visible, .capture-region, .edit-content"
    ).hide(),
      $("#noall").show();
  },
  exec: function (e) {
    switch (($("#working, #message").fadeOut(), e.type)) {
      case "working":
        $("#working").fadeIn();
        break;
      case "message":
        $("#message").fadeIn().find(".message-container").text(e.message);
    }
  },
  sendMessage: function (e) {
    chrome.runtime.sendMessage(e, function (e) {});
  },
  getGrantAccess: function () {
    Promise.all([
      popup.getMicrophonePermission(),
      popup.getCameraPermission(),
    ]).then(([e, s]) => {
      if ("granted" !== e.state || "granted" !== s.state)
        return (
          $(".grand-access").show(),
          $(".mic-access").hide(),
          $("button.warning").show(),
          $("button.start-recording-desktop").on("click", (e) => {
            e.stopPropaganation();
          }),
          (popup.state = { ...popup.state, microphone: !1 }),
          popup.saveState()
        );
      $(".grand-access").hide(),
        $(".mic-access").show(),
        $("#startRecording_container").css({ opacity: "1.0" }),
        $("button.warning").hide();
    });
  },
};
function getPopupState() {
  return new Promise((e, s) => {
    chrome.storage.local.get(["state"], function ({ state: s }) {
      s && (popup.state = s), popup.saveState(), e();
    });
  });
}
getPopupState().then(() => {
  $(popup.ready);
});
