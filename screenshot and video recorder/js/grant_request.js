const captureUserMedia = (e) => {
  navigator.mediaDevices
    .getUserMedia({ audio: !0, video: !0 })
    .then(
      (e) => (
        e.getTracks().forEach(function (e) {
          e.stop();
        }),
        e
      )
    )
    .catch((e) => {});
};
navigator.mediaDevices
  .getUserMedia({ audio: !0, video: !0 })
  .then(
    (e) => (
      e.getTracks().forEach(function (e) {
        e.stop();
      }),
      e
    )
  )
  .catch((e) => {});
