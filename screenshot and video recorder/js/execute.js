async function delayStartRecord(e = 3) {
  function t(e) {
    return new Promise((t) => setTimeout(t, e));
  }
  createModalDelayCount(),
    $("#sm_previewDivId").width(document.documentElement.clientWidth + "px"),
    $("#sm_previewDivId").height(document.documentElement.clientHeight + "px"),
    $("#sm_previewDivId").fadeIn("slow");
  for (let n = e; n > 0; n--)
    (d = n),
      (document.getElementById("sm_record_start_label").innerHTML =
        "Start record in"),
      (document.getElementById("sm_record_start_numbers").innerHTML = d),
      await t(1e3);
  var d;
  $("#sm_previewDivId").fadeOut("slow"),
    $("#sm_previewDivId").remove(),
    chrome.runtime.sendMessage({ type: "recordMe" });
}
function createModalDelayCount() {
  let e = document.createElement("div");
  e.id = "sm_previewDivId";
  let t = document.createElement("p");
  t.id = "sm_record_start_label";
  let d = document.createElement("span");
  (d.id = "sm_record_start_numbers"),
    e.appendChild(t),
    e.appendChild(d),
    (e.style.top = 0),
    (e.style.left = 0),
    document.documentElement.appendChild(e);
}
delayStartRecord();
