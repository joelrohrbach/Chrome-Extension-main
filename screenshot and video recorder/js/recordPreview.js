const helper = {
  ffmpeg: null,
  duration: null,
  fileSize: null,
  convertVideo: async function (e, t = () => {}) {
    try {
      const { createFFmpeg: o } = FFmpeg;
      (ffmpeg = o({ log: !0, progress: t })), await ffmpeg.load();
      const n = await e.arrayBuffer();
      ffmpeg.FS("writeFile", "i.webm", new Uint8Array(n, 0, n.byteLength)),
        delete n,
        await ffmpeg.run(
          "-i",
          "i.webm",
          "-c:v",
          "libx264",
          "-preset",
          "ultrafast",
          "-crf",
          "22",
          "-c:a",
          "aac",
          "-r",
          "25",
          "-strict",
          "2",
          "-speed",
          "10",
          "o.mp4"
        );
      const r = ffmpeg.FS("readFile", "o.mp4");
      return ffmpeg.FS("unlink", "o.mp4"), new Blob([r], { type: "video/mp4" });
    } catch (e) {
      return new Blob([], { type: "video/mp4" });
    }
  },
  showLoader: function () {
    $(".loader_inner").fadeIn(), $(".loader").delay(400).fadeIn("slow");
  },
  hideLoader: function () {
    $(".loader_inner").fadeOut(), $(".loader").delay(400).fadeOut("slow");
  },
  doPlayStopVideo: function (e, t, o) {
    (t.ontimeupdate = function () {
      let o = t.currentTime;
      $("#range").slider({ value: o });
      let n = Math.floor(o / 60),
        r = Math.floor(o - 60 * n);
      (n = n < 10 ? "0" + n : n),
        (r = r < 10 ? "0" + r : r),
        $("#time").text(n + ":" + r + " / " + e);
    }),
      t.addEventListener("loadeddata", function () {
        fetchDuration(o).then(function (e) {
          $("#range").slider({
            range: "min",
            max: e,
            value: 0,
            slide: function (e, o) {
              (t.currentTime = o.value), playVideo();
            },
          });
        });
      }),
      (t.onended = function () {
        pauseVideo();
      }),
      $(".play").click((e) => {
        t.paused ? playVideo() : pauseVideo();
      }),
      $(".stop").click((e) => {
        pauseVideo(), (t.currentTime = 0);
      });
  },
  fetchFileMetadata: function (e) {
    return new Promise((t) => {
      FSAPI.withFs(
        function (e) {
          showError(
            "Unable to access filesystem",
            "Something went wrong accessing the filesystem. Check your browser settings.",
            !0,
            !0
          );
        },
        FSAPI.lookupFiles,
        function (o) {
          (o = (o = o.filter(function (e) {
            return e.isFile;
          })).filter(function (t) {
            return t.name === e;
          })),
            FSAPI.loadMetadata(o, function (e) {
              let o = e[0].metadata
                  ? e[0].metadata.modificationTime
                      .toLocaleDateString("en-GB", {
                        hour: "numeric",
                        minute: "numeric",
                      })
                      .replace(/\//g, ".")
                      .replace(/,/g, "")
                  : "??",
                n = e[0].metadata ? formatBytes(e[0].metadata.size, 1) : "";
              (this.data = { size: n, date: o }), t(this.data);
            });
        },
        function (e) {
          showError(
            "Error reading files",
            "Something went wrong reading your screen shots. Check your browser settings.",
            !0,
            !0
          );
        }
      );
    });
  },
  fetchFileSrc: function (e) {
    return new Promise((t, o) => {
      FSAPI.loadFile(e, o, (e) => {
        e.file((e) => {
          (this.fileFromFileSystem = e), t(e);
        }, o);
      });
    });
  },
  saveFile: function (e, t) {
    const o = URL.createObjectURL(e);
    chrome.downloads.download({ url: o, filename: t, saveAs: !0 }, () => {
      URL.revokeObjectURL(o), helper.hideLoader();
    });
  },
  downloadFile: function (e, t, o) {
    let n;
    if (!o) return void helper.saveFile(e, t);
    if (
      ("KB" === fileSize.slice(-2)
        ? (n = Math.round(fileSize.slice(0, -3)))
        : "MB" === fileSize.slice(-2)
        ? (n = 1e3 * Math.round(fileSize.slice(0, -3)))
        : "GB" === fileSize.slice(-2) &&
          (n = 1024 * Math.round(fileSize.slice(0, -3)) * 1024),
      n > 256e3)
    )
      return void $(".sm_error").css({ display: "inline" });
    const r = Math.ceil(helper.convertDurationToSeconds(helper.duration));
    helper.showLoader(),
      helper
        .convertVideo(e, ({ time: e }) => {
          let t = (100 * e) / r;
          $(".convert_file").css({ display: "none" }),
            $(".progress_convert_to_mp4").css({ display: "block" }),
            $(".sm_convert_stop").css({ display: "flex" }),
            $("#progress-bar2").css({ width: Math.floor(t) + "%" }),
            (document.getElementsByClassName("sm_convert_stop")[0].onclick =
              () => {
                $(".progress_convert_to_mp4").css({ display: "none" }),
                  $(".sm_convert_stop").css({ display: "none" }),
                  $(".convert_file").css({ display: "flex" }),
                  $("#progress-bar2").css({ width: "0%" }),
                  helper.hideLoader(),
                  ffmpeg.exit();
              });
        })
        .then((e) => {
          $(".progress_convert_to_mp4").css({ display: "none" }),
            $(".sm_convert_stop").css({ display: "none" }),
            $(".convert_file").css({ display: "flex" }),
            helper.saveFile(e, t);
        });
  },
  uploadToGoogleDrive: function (e, t) {
    return uploadVideo
      .uploadToGoogleDrive(e, t, (e) => {
        $(".save-to-google-drive").css({ display: "none" }),
          $(".progress_google_drive").css({ display: "block" }),
          $("#progress-bar").css({ width: Math.floor(e) + "%" });
      })
      .then((e) => {
        $(".progress_google_drive").css({ display: "none" });
        const t = document.createElement("div");
        (t.className = "btnGetGoogleDriveLinkForRecord"),
          (t.innerHTML = `\n                <div class="input-group mb-3">\n                    <div class="input-group-prepend">\n                        <span class="input-group-text">\n                            <img src="../images/google_drive_new.svg"/>\n                        </span>\n                    </div>\n                    <input id="linkForGoogleDrive" type="text" class="form-control" aria-label="Amount (to the nearest dollar)" readonly value="${e.alternateLink}">\n                    <div class="input-group-append">\n                        <span class="input-group-text">\n                            <img src="../images/copy_to_clipboard_small.svg"/>\n                        </span>\n                    </div>\n                </div>\n            `),
          document.getElementById("sm_upload_gd_btn_id").appendChild(t);
        let o = document.getElementsByClassName(
          "btnGetGoogleDriveLinkForRecord"
        ).length;
        if (1 !== o)
          for (let e = 1; e < o; e++)
            document
              .getElementsByClassName("btnGetGoogleDriveLinkForRecord")
              [e].remove();
        $(".save-to-google-drive").hide(),
          (document.getElementsByClassName(
            "btnGetGoogleDriveLinkForRecord"
          )[0].onclick = () => {
            document.getElementById("linkForGoogleDrive").select(),
              document.execCommand("copy"),
              window.getSelection().empty(),
              alert("Copied");
          });
      });
  },
  uploadToYoutube: function (e, t) {
    return uploadVideo
      .uploadToYoutube(e, t, (e) => {
        $(".save-to-youtube").css({ display: "none" }),
          $(".progress_youtube").css({ display: "block" }),
          $("#progress-bar1").css({ width: Math.floor(e) + "%" });
      })
      .then((e) => {
        $(".progress_youtube").css({ display: "none" });
        const t = document.createElement("div");
        (t.id = "btnGetYoutubeLinkForRecord"),
          (t.innerHTML = `\n                <div class="input-group mb-3">\n                    <div class="input-group-prepend">\n                        <span class="input-group-text">\n                            <img src="../images/youtube_small.svg"/>\n                        </span>\n                    </div>\n                    <input id="linkForYoutube" type="text" class="form-control" aria-label="Amount (to the nearest dollar)" readonly value="https://www.youtube.com/watch?v=${e.id}">\n                    <div class="input-group-append">\n                        <span class="input-group-text">\n                            <img src="../images/copy_to_clipboard_small.svg"/>\n                        </span>\n                    </div>\n                </div>\n            `),
          document.getElementById("sm_upload_yt_btn_id").appendChild(t),
          $(".save-to-youtube").hide(),
          (document.getElementById("btnGetYoutubeLinkForRecord").onclick =
            () => {
              document.getElementById("linkForYoutube").select(),
                document.execCommand("copy"),
                alert("Copied");
            });
      });
  },
  convertDurationToSeconds: function (e) {
    let t = e.split(":");
    return 60 * +t[0] + +t[1];
  },
};
if (window.location.href.includes("src")) {
  let e = window.location.href.indexOf("="),
    t = window.location.href.slice(e + 1),
    o = t.indexOf("D"),
    n = t.slice(o + 1, -5).split("");
  (duration = n.join("").replace(/-/g, ":")),
    (helper.duration = duration),
    document.addEventListener("DOMContentLoaded", async () => {
      let e = document.getElementById("screenCapture");
      (e.style.width = (document.body.clientWidth / 100) * 75 + "px"),
        (e.style.height = document.body.clientHeight - 125 + "px");
      let o = FSAPI.imgPathBase + t;
      e.setAttribute("src", o);
      let { size: n, date: r } = await helper.fetchFileMetadata(t);
      fileSize = n;
      let i = r.slice(0, -5);
      (document.getElementsByClassName("sm_record_size")[0].innerText = n),
        (document.getElementsByClassName("sm_record_duration")[0].innerText =
          duration),
        (document.getElementsByClassName("sm_record_date")[0].innerText = r),
        (document.getElementsByClassName("sm_record_date")[1].innerText = i),
        $(".progress_google_drive").css({ display: "none" }),
        $(".progress_youtube").css({ display: "none" }),
        $(".progress_convert_to_mp4").css({ display: "none" }),
        $(".sm_convert_stop").css({ display: "none" }),
        initDownloadListeners("undefined", t, t),
        helper.doPlayStopVideo(duration, e, o);
    });
}
function initDownloadListeners(e, t, o) {
  (document.getElementById("sm_upload_gd_btn").onclick = () => {
    window.location.href.includes("src")
      ? helper.fetchFileSrc(o).then((e) => helper.uploadToGoogleDrive(e, t))
      : helper.uploadToGoogleDrive(e, t);
  }),
    (document.getElementById("sm_upload_yt_btn").onclick = () => {
      window.location.href.includes("src")
        ? helper.fetchFileSrc(o).then((e) => helper.uploadToYoutube(e, t))
        : helper.uploadToYoutube(e, t);
    }),
    (document.getElementById("sm_convert_to_mp4_btn").onclick = () => {
      window.location.href.includes("src")
        ? helper.fetchFileSrc(o).then((e) => helper.downloadFile(e, t, true))
        : helper.downloadFile(e, t, true);
    }),
    (document.getElementById("sm_download_btn").onclick = () => {
      helper.showLoader(),
        window.location.href.includes("src")
          ? helper.fetchFileSrc(o).then((e) => helper.downloadFile(e, t, false))
          : helper.downloadFile(e, t, false);
    });
}
function dataURLtoBlob(e) {
  if (e) {
    for (
      var t = e.split(","),
        o = t[0].match(/:(.*?);/)[1],
        n = atob(t[2] || t[1]),
        r = n.length,
        i = new Uint8Array(r);
      r--;

    )
      i[r] = n.charCodeAt(r);
    return new Blob([i], { type: o });
  }
}
function playVideo() {
  document.getElementById("screenCapture").play(),
    $(".play").attr("src", "/images/pause-record-preview.svg");
}
function pauseVideo() {
  document.getElementById("screenCapture").pause(),
    $(".play").attr("src", "/images/play-record-preview.svg");
}
async function fetchDuration(e) {
  const t = document.createElement("video"),
    o = new Promise((e) =>
      t.addEventListener("loadedmetadata", () => {
        t.duration === 1 / 0
          ? ((t.currentTime = 99999999),
            (t.ontimeupdate = () => {
              (t.ontimeupdate = null), e(t.duration), (t.currentTime = 0);
            }))
          : e(t.duration);
      })
    );
  return (
    (t.src =
      "string" == typeof e || e instanceof String
        ? e
        : window.URL.createObjectURL(e)),
    o
  );
}
function formatBytes(e, t) {
  if (0 === e) return "0";
  var o = t + 1 || 3,
    n = Math.floor(Math.log(e) / Math.log(1024));
  return (
    parseFloat((e / Math.pow(1024, n)).toFixed(o)) +
    " " +
    ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][n]
  );
}
chrome.runtime.onMessage.addListener(
  ({ size: e, duration: t, dateCreated: o, data: n, fileName: r }, i) => {
    "recordedVideoPreview" === n &&
      chrome.runtime.getBackgroundPage((n) => {
        let i = document.getElementById("screenCapture");
        (i.style.width = (document.body.clientWidth / 100) * 75 + "px"),
          (i.style.height = document.body.clientHeight - 125 + "px");
        const s = URL.createObjectURL(n.videoRecorder.blob),
          l = n.videoRecorder.blob;
        (this.size = e), (fileSize = e), (helper.duration = t);
        let a = o.slice(0, -5);
        (i.src = s),
          (document.getElementsByClassName("sm_record_size")[0].innerText =
            this.size),
          (document.getElementsByClassName("sm_record_duration")[0].innerText =
            t),
          (document.getElementsByClassName("sm_record_date")[0].innerText = o),
          (document.getElementsByClassName("sm_record_date")[1].innerText = a),
          $(".progress_google_drive").css({ display: "none" }),
          $(".progress_youtube").css({ display: "none" }),
          $(".progress_convert_to_mp4").css({ display: "none" }),
          $(".sm_convert_stop").css({ display: "none" }),
          initDownloadListeners(n.videoRecorder.blob, r, "null"),
          helper.doPlayStopVideo(t, i, l);
      });
  }
);
