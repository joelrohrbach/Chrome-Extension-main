function returnFocusToLastActiveWindow() {
  chrome.windows.getLastFocused(function (e) {
    chrome.windows.update(e.id, { focused: !0 }, function (e) {});
  });
}
chrome.commands.onCommand.addListener(function (e) {
  chrome.tabs.update({}, function (o) {
    $.readState().then((o) => {
      let { microphone: t } = o.state;
      "start_record" == e
        ? recorder.startRecordScreen({ microphone: t }).then(() => {
            returnFocusToLastActiveWindow();
          })
        : "stop_record" == e
        ? recorder.stopRecordScreen()
        : "all_page_capture" == e
        ? screenshot.captureAll()
        : "visible_area_capture" == e && screenshot.captureVisible();
    });
  });
});
