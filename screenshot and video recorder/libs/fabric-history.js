(fabric.Canvas.prototype.initialize = (function (t) {
  return function (...i) {
    return t.call(this, ...i), this._historyInit(), this;
  };
})(fabric.Canvas.prototype.initialize)),
  (fabric.Canvas.prototype.dispose = (function (t) {
    return function (...i) {
      return t.call(this, ...i), this._historyDispose(), this;
    };
  })(fabric.Canvas.prototype.dispose)),
  (fabric.Canvas.prototype._historyNext = function () {
    return JSON.stringify(this.toDatalessJSON(this.extraProps));
  }),
  (fabric.Canvas.prototype._historyEvents = function () {
    return {
      "object:added": this._historySaveAction,
      "object:removed": this._historySaveAction,
      "object:modified": this._historySaveAction,
      "object:skewing": this._historySaveAction,
    };
  }),
  (fabric.Canvas.prototype._historyInit = function () {
    (this.historyUndo = []),
      (this.historyRedo = []),
      (this.extraProps = ["selectable"]),
      (this.historyNextState = this._historyNext()),
      this.on(this._historyEvents());
  }),
  (fabric.Canvas.prototype._historyDispose = function () {
    this.off(this._historyEvents());
  }),
  (fabric.Canvas.prototype._historySaveAction = function () {
    if (this.historyProcessing) return;
    const t = this.historyNextState;
    this.historyUndo.push(t),
      (this.historyNextState = this._historyNext()),
      this.fire("history:append", { json: t });
  }),
  (fabric.Canvas.prototype.undo = function (t) {
    this.historyProcessing = !0;
    const i = this.historyUndo.pop();
    i
      ? (this.historyRedo.push(this._historyNext()),
        (this.historyNextState = i),
        this._loadHistory(i, "history:undo", t))
      : (this.historyProcessing = !1);
  }),
  (fabric.Canvas.prototype.reset = function (t) {
    (this.historyProcessing = !0),
      this._loadHistory("{}", "history:reset", () => {
        this.clearHistory(), t();
      });
  }),
  (fabric.Canvas.prototype.redo = function (t) {
    this.historyProcessing = !0;
    const i = this.historyRedo.pop();
    i
      ? (this.historyUndo.push(this._historyNext()),
        (this.historyNextState = i),
        this._loadHistory(i, "history:redo", t))
      : (this.historyProcessing = !1);
  }),
  (fabric.Canvas.prototype._loadHistory = function (t, i, s) {
    var o = this;
    this.loadFromJSON(t, function () {
      o.renderAll(),
        o.fire(i),
        (o.historyProcessing = !1),
        s && "function" == typeof s && s();
    });
  }),
  (fabric.Canvas.prototype.clearHistory = function () {
    (this.historyUndo = []),
      (this.historyRedo = []),
      this.fire("history:clear");
  }),
  (fabric.Canvas.prototype.offHistory = function () {
    this.historyProcessing = !0;
  }),
  (fabric.Canvas.prototype.onHistory = function () {
    (this.historyProcessing = !1), this._historySaveAction();
  });
