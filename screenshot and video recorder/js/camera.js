$(document).ready(function () {
  let e,
    t = {};
  function n(e) {
    const n = () => {
      (t.duration = new Date().getTime() - t.startedAt),
        (document.getElementById("sm_durationId").innerHTML = (function (e) {
          var t = Math.floor(e / 3600),
            n = Math.floor((e - 3600 * t) / 60),
            r = Math.floor(e - 3600 * t - 60 * n);
          n < 10 && (n = "0" + n);
          r < 10 && (r = "0" + r);
          t < 10 && (t = `0${t}`);
          return `${t}:${n}:${r}`;
        })(t.duration / 1e3));
    };
    return e.finished
      ? ((t.pausedAt = new Date().getTime()),
        (t.durationScreenRecord = n()),
        clearInterval(t.timer),
        t.durationScreenRecord)
      : e.paused
      ? ((t.pausedAt = new Date().getTime()), clearInterval(t.timer), void n())
      : e.resumed
      ? ((t.startedAt = t.startedAt + new Date().getTime() - t.pausedAt),
        void (t.timer = setInterval(n, 1e3)))
      : ((t.startedAt = new Date().getTime()),
        (t.duration = 0),
        (t.extra = 0),
        void (t.timer = setInterval(n, 1e3)));
  }
  chrome.runtime.sendMessage({ data: "startStopDuration", started: !0 }),
    (async function (e = 3) {
      function t(e) {
        return new Promise((t) => setTimeout(t, e));
      }
      (function () {
        let e = document.createElement("div");
        e.id = "sm_previewDivId";
        let t = document.createElement("p");
        t.id = "sm_record_start_label";
        let n = document.createElement("span");
        (n.id = "sm_record_start_numbers"),
          e.appendChild(t),
          e.appendChild(n),
          (e.style.top = 0),
          (e.style.left = 0),
          document.documentElement.appendChild(e);
      })(),
        $("#sm_previewDivId").width(
          document.documentElement.clientWidth + "px"
        ),
        $("#sm_previewDivId").height(
          document.documentElement.clientHeight + "px"
        ),
        $("#sm_previewDivId").fadeIn("slow");
      for (let r = e; r > 0; r--)
        (n = r),
          (document.getElementById("sm_record_start_label").innerHTML =
            "Start record in"),
          (document.getElementById("sm_record_start_numbers").innerHTML = n),
          await t(1e3);
      var n;
      $("#sm_previewDivId").fadeOut("slow"), $("#sm_previewDivId").remove();
    })(3).then(() => {
      chrome.runtime.getBackgroundPage(function (t) {
        let r = document.getElementById("sm_videoId");
        (r.srcObject = t.mediaStream),
          (r.muted = !0),
          (r.volume = 0),
          t.backgroundApi.startRecording(),
          chrome.storage.local.get((t) => {
            (e = t.state.microphone),
              e ? $("#sm_btn_micr").show() : $("#sm_btn_micr_muted").show();
          }),
          $("#sm_duration").show(),
          $("#sm_btn_stop").show(),
          $("#sm_btn_pause").show(),
          $("#sm_btn_resume").hide(),
          $("#sm_btnClose").show(),
          (t.videoRecorder.onStateChanged = function (e) {
            "recording" === e &&
              ($("#sm_btn_resume").hide(),
              $("#sm_btn_pause").show(),
              n({ resumed: !0 })),
              "paused" === e &&
                ($("#sm_btn_resume").show(),
                $("#sm_btn_pause").hide(),
                n({ paused: !0 })),
              "stopped" === e && window.close();
          });
      }),
        n({ started: !0 });
    }),
    $("#sm_btn_stop").on("click", () => {
      chrome.runtime.sendMessage({ data: "stopRecordWeb" }),
        n({ finished: !0 }),
        window.close();
    }),
    $("#sm_btnClose").on("click", () => {
      chrome.runtime.sendMessage({ data: "stopRecordWeb" }),
        n({ finished: !0 }),
        window.close();
    }),
    $("#sm_btn_pause").on("click", () => {
      chrome.runtime.sendMessage({ data: "pauseRecordWeb" });
    }),
    $("#sm_btn_resume").on("click", () => {
      chrome.runtime.sendMessage({ data: "resumeRecordWeb" });
    });
});
