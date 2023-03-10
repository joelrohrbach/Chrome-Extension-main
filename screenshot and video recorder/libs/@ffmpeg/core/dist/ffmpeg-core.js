var createFFmpegCore = (function () {
  var e =
    "undefined" != typeof document && document.currentScript
      ? document.currentScript.src
      : void 0;
  return (
    "undefined" != typeof __filename && (e = e || __filename),
    function (t) {
      var n, r, i;
      (t = t || {}),
        n || (n = void 0 !== t ? t : {}),
        (n.ready = new Promise(function (e, t) {
          (r = e), (i = t);
        }));
      var a,
        f = {};
      for (a in n) n.hasOwnProperty(a) && (f[a] = n[a]);
      var o = [],
        u = "./this.program";
      function c(e, t) {
        throw t;
      }
      var s = !1,
        l = !1,
        d = !1,
        h = !1;
      (s = "object" == typeof window),
        (l = "function" == typeof importScripts),
        (d =
          "object" == typeof process &&
          "object" == typeof process.versions &&
          "string" == typeof process.versions.node),
        (h = !s && !d && !l);
      var p = n.ENVIRONMENT_IS_PTHREAD || !1;
      p && (W = n.buffer);
      var m,
        g,
        w,
        y,
        v = "";
      function b(e) {
        return n.locateFile ? n.locateFile(e, v) : v + e;
      }
      if (d) {
        var _;
        (v = l ? require("path").dirname(v) + "/" : __dirname + "/"),
          (m = function (e, t) {
            return (
              w || (w = require("fs")),
              y || (y = require("path")),
              (e = y.normalize(e)),
              w.readFileSync(e, t ? null : "utf8")
            );
          }),
          (g = function (e) {
            return (
              (e = m(e, !0)).buffer || (e = new Uint8Array(e)), O(e.buffer), e
            );
          }),
          1 < process.argv.length && (u = process.argv[1].replace(/\\/g, "/")),
          (o = process.argv.slice(2)),
          process.on("uncaughtException", function (e) {
            if (!(e instanceof Vr)) throw e;
          }),
          process.on("unhandledRejection", de),
          (c = function (e) {
            process.exit(e);
          }),
          (n.inspect = function () {
            return "[Emscripten Module object]";
          });
        try {
          _ = require("worker_threads");
        } catch (e) {
          throw e;
        }
        global.Worker = _.Worker;
      } else
        h
          ? ("undefined" != typeof read &&
              (m = function (e) {
                return read(e);
              }),
            (g = function (e) {
              return "function" == typeof readbuffer
                ? new Uint8Array(readbuffer(e))
                : (O("object" == typeof (e = read(e, "binary"))), e);
            }),
            "undefined" != typeof scriptArgs
              ? (o = scriptArgs)
              : void 0 !== arguments && (o = arguments),
            "function" == typeof quit &&
              (c = function (e) {
                quit(e);
              }),
            "undefined" != typeof print &&
              ("undefined" == typeof console && (console = {}),
              (console.log = print),
              (console.warn = console.error =
                "undefined" != typeof printErr ? printErr : print)))
          : (s || l) &&
            (l
              ? (v = self.location.href)
              : "undefined" != typeof document &&
                document.currentScript &&
                (v = document.currentScript.src),
            e && (v = e),
            (v =
              0 !== v.indexOf("blob:")
                ? v.substr(0, v.lastIndexOf("/") + 1)
                : ""),
            d
              ? ((m = function (e, t) {
                  return (
                    w || (w = require("fs")),
                    y || (y = require("path")),
                    (e = y.normalize(e)),
                    w.readFileSync(e, t ? null : "utf8")
                  );
                }),
                (g = function (e) {
                  return (
                    (e = m(e, !0)).buffer || (e = new Uint8Array(e)),
                    O(e.buffer),
                    e
                  );
                }))
              : ((m = function (e) {
                  var t = new XMLHttpRequest();
                  return t.open("GET", e, !1), t.send(null), t.responseText;
                }),
                l &&
                  (g = function (e) {
                    var t = new XMLHttpRequest();
                    return (
                      t.open("GET", e, !1),
                      (t.responseType = "arraybuffer"),
                      t.send(null),
                      new Uint8Array(t.response)
                    );
                  })));
      d &&
        "undefined" == typeof performance &&
        (global.performance = require("perf_hooks").performance);
      var k = n.print || void 0,
        A = n.printErr || void 0;
      for (a in f) f.hasOwnProperty(a) && (n[a] = f[a]);
      (f = null),
        n.arguments && (o = n.arguments),
        n.thisProgram && (u = n.thisProgram),
        n.quit && (c = n.quit);
      var x,
        E,
        j,
        S = 0;
      n.wasmBinary && (E = n.wasmBinary),
        n.noExitRuntime && (j = n.noExitRuntime),
        "object" != typeof WebAssembly && de("no native wasm support detected");
      var M,
        T,
        D = 0,
        C = 0,
        F = !1;
      function O(e, t) {
        e || de("Assertion failed: " + t);
      }
      function I(e) {
        var t = n["_" + e];
        return (
          O(
            t,
            "Cannot call unknown function " + e + ", make sure it is exported"
          ),
          t
        );
      }
      function P(e, t, n, r) {
        var i = {
            string: function (e) {
              var t = 0;
              if (null != e && 0 !== e) {
                var n = 1 + (e.length << 2);
                (t = wr(n)), N(e, H, t, n);
              }
              return t;
            },
            array: function (e) {
              var t = wr(e.length);
              return q.set(e, t), t;
            },
          },
          a = I(e),
          f = [];
        if (((e = 0), r))
          for (var o = 0; o < r.length; o++) {
            var u = i[n[o]];
            u ? (0 === e && (e = mr()), (f[o] = u(r[o]))) : (f[o] = r[o]);
          }
        return (
          (n = a.apply(null, f)),
          (n = "string" === t ? R(n) : "boolean" === t ? !!n : n),
          0 !== e && gr(e),
          n
        );
      }
      function L(e, t, n) {
        n = t + n;
        for (var r = ""; !(t >= n); ) {
          var i = e[t++];
          if (!i) break;
          if (128 & i) {
            var a = 63 & e[t++];
            if (192 == (224 & i)) r += String.fromCharCode(((31 & i) << 6) | a);
            else {
              var f = 63 & e[t++];
              65536 >
              (i =
                224 == (240 & i)
                  ? ((15 & i) << 12) | (a << 6) | f
                  : ((7 & i) << 18) | (a << 12) | (f << 6) | (63 & e[t++]))
                ? (r += String.fromCharCode(i))
                : ((i -= 65536),
                  (r += String.fromCharCode(
                    55296 | (i >> 10),
                    56320 | (1023 & i)
                  )));
            }
          } else r += String.fromCharCode(i);
        }
        return r;
      }
      function R(e, t) {
        return e ? L(H, e, t) : "";
      }
      function N(e, t, n, r) {
        if (!(0 < r)) return 0;
        var i = n;
        r = n + r - 1;
        for (var a = 0; a < e.length; ++a) {
          var f = e.charCodeAt(a);
          if (55296 <= f && 57343 >= f)
            f = (65536 + ((1023 & f) << 10)) | (1023 & e.charCodeAt(++a));
          if (127 >= f) {
            if (n >= r) break;
            t[n++] = f;
          } else {
            if (2047 >= f) {
              if (n + 1 >= r) break;
              t[n++] = 192 | (f >> 6);
            } else {
              if (65535 >= f) {
                if (n + 2 >= r) break;
                t[n++] = 224 | (f >> 12);
              } else {
                if (n + 3 >= r) break;
                (t[n++] = 240 | (f >> 18)), (t[n++] = 128 | ((f >> 12) & 63));
              }
              t[n++] = 128 | ((f >> 6) & 63);
            }
            t[n++] = 128 | (63 & f);
          }
        }
        return (t[n] = 0), n - i;
      }
      function B(e) {
        for (var t = 0, n = 0; n < e.length; ++n) {
          var r = e.charCodeAt(n);
          55296 <= r &&
            57343 >= r &&
            (r = (65536 + ((1023 & r) << 10)) | (1023 & e.charCodeAt(++n))),
            127 >= r
              ? ++t
              : (t = 2047 >= r ? t + 2 : 65535 >= r ? t + 3 : t + 4);
        }
        return t;
      }
      function U(e) {
        var t = B(e) + 1,
          n = rr(t);
        return n && N(e, q, n, t), n;
      }
      function z(e) {
        var t = B(e) + 1,
          n = wr(t);
        return N(e, q, n, t), n;
      }
      function G(e, t, n) {
        for (var r = 0; r < e.length; ++r) q[t++ >> 0] = e.charCodeAt(r);
        n || (q[t >> 0] = 0);
      }
      var W,
        q,
        H,
        Y,
        X,
        V,
        Q,
        J,
        $,
        Z = n.INITIAL_MEMORY || 2146435072;
      if (p) (M = n.wasmMemory), (W = n.buffer);
      else if (n.wasmMemory) M = n.wasmMemory;
      else if (
        !(
          (M = new WebAssembly.Memory({
            initial: Z / 65536,
            maximum: Z / 65536,
            shared: !0,
          })).buffer instanceof SharedArrayBuffer
        )
      )
        throw (
          (A(
            "requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"
          ),
          Error("bad memory"))
        );
      M && (W = M.buffer), (Z = W.byteLength);
      var K = W;
      (W = K),
        (n.HEAP8 = q = new Int8Array(K)),
        (n.HEAP16 = Y = new Int16Array(K)),
        (n.HEAP32 = V = new Int32Array(K)),
        (n.HEAPU8 = H = new Uint8Array(K)),
        (n.HEAPU16 = X = new Uint16Array(K)),
        (n.HEAPU32 = Q = new Uint32Array(K)),
        (n.HEAPF32 = J = new Float32Array(K)),
        (n.HEAPF64 = $ = new Float64Array(K));
      var ee,
        te = [],
        ne = [],
        re = [],
        ie = [],
        ae = [];
      function fe() {
        var e = n.preRun.shift();
        te.unshift(e);
      }
      var oe = 0,
        ue = null,
        ce = null;
      function se() {
        O(!p, "addRunDependency cannot be used in a pthread worker"),
          oe++,
          n.monitorRunDependencies && n.monitorRunDependencies(oe);
      }
      function le() {
        if (
          (oe--,
          n.monitorRunDependencies && n.monitorRunDependencies(oe),
          0 == oe && (null !== ue && (clearInterval(ue), (ue = null)), ce))
        ) {
          var e = ce;
          (ce = null), e();
        }
      }
      function de(e) {
        throw (
          (n.onAbort && n.onAbort(e),
          A(e),
          (F = !0),
          (e = new WebAssembly.RuntimeError(
            "abort(" + e + "). Build with -s ASSERTIONS=1 for more info."
          )),
          i(e),
          e)
        );
      }
      function he(e) {
        var t = me;
        return String.prototype.startsWith
          ? t.startsWith(e)
          : 0 === t.indexOf(e);
      }
      function pe() {
        return he("data:application/octet-stream;base64,");
      }
      (n.preloadedImages = {}), (n.preloadedAudios = {});
      var me = "ffmpeg-core.wasm";
      function ge() {
        try {
          if (E) return new Uint8Array(E);
          if (g) return g(me);
          throw "both async and sync fetching of the wasm failed";
        } catch (e) {
          de(e);
        }
      }
      function we() {
        return E || (!s && !l) || "function" != typeof fetch || he("file://")
          ? Promise.resolve().then(ge)
          : fetch(me, { credentials: "same-origin" })
              .then(function (e) {
                if (!e.ok)
                  throw "failed to load wasm binary file at '" + me + "'";
                return e.arrayBuffer();
              })
              .catch(function () {
                return ge();
              });
      }
      pe() || (me = b(me));
      var ye,
        ve,
        be = {
          5454720: function () {
            throw "Canceled!";
          },
          5454940: function (e, t) {
            setTimeout(function () {
              kr(e, t);
            }, 0);
          },
          5455042: function () {
            return 5242880;
          },
        };
      function _e(e) {
        for (; 0 < e.length; ) {
          var t = e.shift();
          if ("function" == typeof t) t(n);
          else {
            var r = t.vh;
            "number" == typeof r
              ? void 0 === t.Tf
                ? ee.get(r)()
                : ee.get(r)(t.Tf)
              : r(void 0 === t.Tf ? null : t.Tf);
          }
        }
      }
      function ke(e) {
        return e.replace(/\b_Z[\w\d_]+/g, function (e) {
          return e == e ? e : e + " [" + e + "]";
        });
      }
      n.dynCall = function (e, t, r) {
        return -1 != e.indexOf("j")
          ? r && r.length
            ? n["dynCall_" + e].apply(null, [t].concat(r))
            : n["dynCall_" + e].call(null, t)
          : ee.get(t).apply(null, r);
      };
      var Ae = 0,
        xe = 0,
        Ee = 0;
      function je(e, t, n) {
        (Ae = 0 | e), (Ee = 0 | t), (xe = 0 | n);
      }
      function Se(e, t) {
        if (0 >= e || e > q.length || 1 & e || 0 > t) return -28;
        if (0 == t) return 0;
        2147483647 <= t && (t = 1 / 0);
        var n = Atomics.load(V, Ce.Vf >> 2),
          r = 0;
        if (
          n == e &&
          Atomics.compareExchange(V, Ce.Vf >> 2, n, 0) == n &&
          ((r = 1), 0 >= --t)
        )
          return 1;
        if (0 <= (e = Atomics.notify(V, e >> 2, t))) return e + r;
        throw "Atomics.notify returned an unexpected value " + e;
      }
      function Me(e) {
        if (p)
          throw "Internal Error! cancelThread() can only ever be called from main application thread!";
        if (!e) throw "Internal Error! Null pthread_ptr in cancelThread!";
        Ce.Ef[e].worker.postMessage({ cmd: "cancel" });
      }
      function Te(e) {
        if (p)
          throw "Internal Error! cleanupThread() can only ever be called from main application thread!";
        if (!e) throw "Internal Error! Null pthread_ptr in cleanupThread!";
        (V[(e + 12) >> 2] = 0), (e = Ce.Ef[e]) && Ce.Ag(e.worker);
      }
      (n.registerPthreadPtr = je), (n._emscripten_futex_wake = Se);
      var De,
        Ce = {
          Ph: 1,
          nj: { Ih: 0, Jh: 0 },
          Gf: [],
          Kf: [],
          lj: function () {},
          pi: function () {
            Ce.xf = rr(232);
            for (var e = 0; 58 > e; ++e) Q[Ce.xf / 4 + e] = 0;
            (V[(Ce.xf + 12) >> 2] = Ce.xf), (e = Ce.xf + 156), (V[e >> 2] = e);
            var t = rr(512);
            for (e = 0; 128 > e; ++e) Q[t / 4 + e] = 0;
            Atomics.store(Q, (Ce.xf + 104) >> 2, t),
              Atomics.store(Q, (Ce.xf + 40) >> 2, Ce.xf),
              Atomics.store(Q, (Ce.xf + 44) >> 2, 42),
              Ce.Ch(),
              je(Ce.xf, !l, 1),
              _r(Ce.xf);
          },
          ri: function () {
            Ce.Ch(),
              r(n),
              (Ce.receiveObjectTransfer = Ce.Ii),
              (Ce.setThreadStatus = Ce.Li),
              (Ce.threadCancel = Ce.Pi),
              (Ce.threadExit = Ce.Qi);
          },
          Ch: function () {
            Ce.Vf = Dr;
          },
          Ef: {},
          Dg: [],
          Li: function () {},
          eh: function () {
            for (; 0 < Ce.Dg.length; ) Ce.Dg.pop()();
            p && D && vr();
          },
          Qi: function (e) {
            var t = 0 | Ae;
            t &&
              (Atomics.store(Q, (t + 4) >> 2, e),
              Atomics.store(Q, (t + 0) >> 2, 1),
              Atomics.store(Q, (t + 60) >> 2, 1),
              Atomics.store(Q, (t + 64) >> 2, 0),
              Ce.eh(),
              Se(t + 0, 2147483647),
              je(0, 0, 0),
              (D = 0),
              p && postMessage({ cmd: "exit" }));
          },
          Pi: function () {
            Ce.eh(),
              Atomics.store(Q, (D + 4) >> 2, -1),
              Atomics.store(Q, (D + 0) >> 2, 1),
              Se(D + 0, 2147483647),
              (D = C = 0),
              je(0, 0, 0),
              postMessage({ cmd: "cancelDone" });
          },
          Oi: function () {
            for (var e in Ce.Ef) {
              var t = Ce.Ef[e];
              t && t.worker && Ce.Ag(t.worker);
            }
            for (Ce.Ef = {}, e = 0; e < Ce.Gf.length; ++e) {
              var n = Ce.Gf[e];
              n.terminate();
            }
            for (Ce.Gf = [], e = 0; e < Ce.Kf.length; ++e)
              (t = (n = Ce.Kf[e]).yf), Ce.Pg(t), n.terminate();
            Ce.Kf = [];
          },
          Pg: function (e) {
            if (e) {
              if (e.threadInfoStruct) {
                var t = V[(e.threadInfoStruct + 104) >> 2];
                (V[(e.threadInfoStruct + 104) >> 2] = 0),
                  nr(t),
                  nr(e.threadInfoStruct);
              }
              (e.threadInfoStruct = 0),
                e.Kg && e.Rf && nr(e.Rf),
                (e.Rf = 0),
                e.worker && (e.worker.yf = null);
            }
          },
          Ag: function (e) {
            delete Ce.Ef[e.yf.Lh],
              Ce.Gf.push(e),
              Ce.Kf.splice(Ce.Kf.indexOf(e), 1),
              Ce.Pg(e.yf),
              (e.yf = void 0);
          },
          Ii: function () {},
          vi: function (t, r) {
            (t.onmessage = function (e) {
              var n = e.data,
                i = n.cmd;
              if (
                (t.yf && (Ce.Mg = t.yf.threadInfoStruct),
                n.targetThread && n.targetThread != (0 | Ae))
              ) {
                var a = Ce.Ef[n.xj];
                a && a.worker.postMessage(e.data, n.transferList);
              } else if ("processQueuedMainThreadWork" === i) br();
              else if ("spawnThread" === i) Rn(e.data);
              else if ("cleanupThread" === i) Te(n.thread);
              else if ("killThread" === i) {
                if (((e = n.thread), p))
                  throw "Internal Error! killThread() can only ever be called from main application thread!";
                if (!e) throw "Internal Error! Null pthread_ptr in killThread!";
                (V[(e + 12) >> 2] = 0),
                  (e = Ce.Ef[e]).worker.terminate(),
                  Ce.Pg(e),
                  Ce.Kf.splice(Ce.Kf.indexOf(e.worker), 1),
                  (e.worker.yf = void 0);
              } else if ("cancelThread" === i) Me(n.thread);
              else if ("loaded" === i)
                (t.loaded = !0), r && r(t), t.og && (t.og(), delete t.og);
              else if ("print" === i) k("Thread " + n.threadId + ": " + n.text);
              else if ("printErr" === i)
                A("Thread " + n.threadId + ": " + n.text);
              else if ("alert" === i)
                alert("Thread " + n.threadId + ": " + n.text);
              else if ("exit" === i)
                t.yf && Atomics.load(Q, (t.yf.Lh + 68) >> 2) && Ce.Ag(t);
              else if ("exitProcess" === i) {
                j = !1;
                try {
                  Jr(n.returnCode);
                } catch (e) {
                  if (e instanceof Vr) return;
                  throw e;
                }
              } else
                "cancelDone" === i
                  ? Ce.Ag(t)
                  : "objectTransfer" !== i &&
                    ("setimmediate" === e.data.target
                      ? t.postMessage(e.data)
                      : A("worker sent an unknown command " + i));
              Ce.Mg = void 0;
            }),
              (t.onerror = function (e) {
                A(
                  "pthread sent an error! " +
                    e.filename +
                    ":" +
                    e.lineno +
                    ": " +
                    e.message
                );
              }),
              d &&
                (t.on("message", function (e) {
                  t.onmessage({ data: e });
                }),
                t.on("error", function (e) {
                  t.onerror(e);
                }),
                t.on("exit", function () {})),
              t.postMessage({
                cmd: "load",
                urlOrBlob: n.mainScriptUrlOrBlob || e,
                wasmMemory: M,
                wasmModule: T,
              });
          },
          Vh: function () {
            var e = b("ffmpeg-core.worker.js");
            Ce.Gf.push(new Worker(e));
          },
          li: function () {
            return (
              0 == Ce.Gf.length && (Ce.Vh(), Ce.vi(Ce.Gf[0])),
              0 < Ce.Gf.length ? Ce.Gf.pop() : null
            );
          },
          Zi: function (e) {
            for (e = performance.now() + e; performance.now() < e; );
          },
        };
      function Fe(e) {
        return (V[ir() >> 2] = e);
      }
      function Oe(e, t) {
        if (0 === e) e = Date.now();
        else {
          if (1 !== e && 4 !== e) return Fe(28), -1;
          e = De();
        }
        return (
          (V[t >> 2] = (e / 1e3) | 0),
          (V[(t + 4) >> 2] = ((e % 1e3) * 1e6) | 0),
          0
        );
      }
      function Ie(e, t) {
        if (p) return yn(1, 1, e, t);
        ie.unshift({ vh: e, Tf: t });
      }
      function Pe(e, t) {
        return (
          (e = new Date(1e3 * V[e >> 2])),
          (V[t >> 2] = e.getUTCSeconds()),
          (V[(t + 4) >> 2] = e.getUTCMinutes()),
          (V[(t + 8) >> 2] = e.getUTCHours()),
          (V[(t + 12) >> 2] = e.getUTCDate()),
          (V[(t + 16) >> 2] = e.getUTCMonth()),
          (V[(t + 20) >> 2] = e.getUTCFullYear() - 1900),
          (V[(t + 24) >> 2] = e.getUTCDay()),
          (V[(t + 36) >> 2] = 0),
          (V[(t + 32) >> 2] = 0),
          (V[(t + 28) >> 2] =
            ((e.getTime() - Date.UTC(e.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) /
              864e5) |
            0),
          Pe.ih || (Pe.ih = U("GMT")),
          (V[(t + 40) >> 2] = Pe.ih),
          t
        );
      }
      function Le() {
        function e(e) {
          return (e = e.toTimeString().match(/\(([A-Za-z ]+)\)$/))
            ? e[1]
            : "GMT";
        }
        if (p) return yn(2, 1);
        if (!Le.Yh) {
          Le.Yh = !0;
          var t = new Date().getFullYear(),
            n = new Date(t, 0, 1),
            r = new Date(t, 6, 1);
          t = n.getTimezoneOffset();
          var i = r.getTimezoneOffset(),
            a = Math.max(t, i);
          (V[pr() >> 2] = 60 * a),
            (V[hr() >> 2] = Number(t != i)),
            (n = e(n)),
            (r = e(r)),
            (n = U(n)),
            (r = U(r)),
            i < t
              ? ((V[dr() >> 2] = n), (V[(dr() + 4) >> 2] = r))
              : ((V[dr() >> 2] = r), (V[(dr() + 4) >> 2] = n));
        }
      }
      function Re(e, t) {
        Le(),
          (e = new Date(1e3 * V[e >> 2])),
          (V[t >> 2] = e.getSeconds()),
          (V[(t + 4) >> 2] = e.getMinutes()),
          (V[(t + 8) >> 2] = e.getHours()),
          (V[(t + 12) >> 2] = e.getDate()),
          (V[(t + 16) >> 2] = e.getMonth()),
          (V[(t + 20) >> 2] = e.getFullYear() - 1900),
          (V[(t + 24) >> 2] = e.getDay());
        var n = new Date(e.getFullYear(), 0, 1);
        (V[(t + 28) >> 2] = ((e.getTime() - n.getTime()) / 864e5) | 0),
          (V[(t + 36) >> 2] = -60 * e.getTimezoneOffset());
        var r = new Date(e.getFullYear(), 6, 1).getTimezoneOffset();
        return (
          (e =
            0 |
            (r != (n = n.getTimezoneOffset()) &&
              e.getTimezoneOffset() == Math.min(n, r))),
          (V[(t + 32) >> 2] = e),
          (e = V[(dr() + (e ? 4 : 0)) >> 2]),
          (V[(t + 40) >> 2] = e),
          t
        );
      }
      function Ne(e, t) {
        for (var n = 0, r = e.length - 1; 0 <= r; r--) {
          var i = e[r];
          "." === i
            ? e.splice(r, 1)
            : ".." === i
            ? (e.splice(r, 1), n++)
            : n && (e.splice(r, 1), n--);
        }
        if (t) for (; n; n--) e.unshift("..");
        return e;
      }
      function Be(e) {
        var t = "/" === e.charAt(0),
          n = "/" === e.substr(-1);
        return (
          (e = Ne(
            e.split("/").filter(function (e) {
              return !!e;
            }),
            !t
          ).join("/")) ||
            t ||
            (e = "."),
          e && n && (e += "/"),
          (t ? "/" : "") + e
        );
      }
      function Ue(e) {
        var t = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
          .exec(e)
          .slice(1);
        return (
          (e = t[0]),
          (t = t[1]),
          e || t ? (t && (t = t.substr(0, t.length - 1)), e + t) : "."
        );
      }
      function ze(e) {
        if ("/" === e) return "/";
        var t = (e = (e = Be(e)).replace(/\/$/, "")).lastIndexOf("/");
        return -1 === t ? e : e.substr(t + 1);
      }
      function Ge(e, t) {
        return Be(e + "/" + t);
      }
      function We() {
        if (
          "object" == typeof crypto &&
          "function" == typeof crypto.getRandomValues
        ) {
          var e = new Uint8Array(1);
          return function () {
            return crypto.getRandomValues(e), e[0];
          };
        }
        if (d)
          try {
            var t = require("crypto");
            return function () {
              return t.randomBytes(1)[0];
            };
          } catch (e) {}
        return function () {
          de("randomDevice");
        };
      }
      function qe() {
        for (var e = "", t = !1, n = arguments.length - 1; -1 <= n && !t; n--) {
          if ("string" != typeof (t = 0 <= n ? arguments[n] : Ze.cwd()))
            throw new TypeError("Arguments to path.resolve must be strings");
          if (!t) return "";
          (e = t + "/" + e), (t = "/" === t.charAt(0));
        }
        return (
          (t ? "/" : "") +
            (e = Ne(
              e.split("/").filter(function (e) {
                return !!e;
              }),
              !t
            ).join("/")) || "."
        );
      }
      function He(e, t) {
        function n(e) {
          for (var t = 0; t < e.length && "" === e[t]; t++);
          for (var n = e.length - 1; 0 <= n && "" === e[n]; n--);
          return t > n ? [] : e.slice(t, n - t + 1);
        }
        (e = qe(e).substr(1)),
          (t = qe(t).substr(1)),
          (e = n(e.split("/"))),
          (t = n(t.split("/")));
        for (var r = Math.min(e.length, t.length), i = r, a = 0; a < r; a++)
          if (e[a] !== t[a]) {
            i = a;
            break;
          }
        for (r = [], a = i; a < e.length; a++) r.push("..");
        return (r = r.concat(t.slice(i))).join("/");
      }
      (n.establishStackSpace = function (e) {
        gr(e);
      }),
        (n.getNoExitRuntime = function () {
          return j;
        }),
        (De = d
          ? function () {
              var e = process.hrtime();
              return 1e3 * e[0] + e[1] / 1e6;
            }
          : p
          ? function () {
              return performance.now() - n.__performance_now_clock_drift;
            }
          : "undefined" != typeof dateNow
          ? dateNow
          : function () {
              return performance.now();
            });
      var Ye = [];
      function Xe(e, t) {
        (Ye[e] = { input: [], output: [], Yf: t }), Ze.dh(e, Ve);
      }
      var Ve = {
          open: function (e) {
            var t = Ye[e.node.rdev];
            if (!t) throw new Ze.af(43);
            (e.tty = t), (e.seekable = !1);
          },
          close: function (e) {
            e.tty.Yf.flush(e.tty);
          },
          flush: function (e) {
            e.tty.Yf.flush(e.tty);
          },
          read: function (e, t, n, r) {
            if (!e.tty || !e.tty.Yf.xh) throw new Ze.af(60);
            for (var i = 0, a = 0; a < r; a++) {
              try {
                var f = e.tty.Yf.xh(e.tty);
              } catch (e) {
                throw new Ze.af(29);
              }
              if (void 0 === f && 0 === i) throw new Ze.af(6);
              if (null == f) break;
              i++, (t[n + a] = f);
            }
            return i && (e.node.timestamp = Date.now()), i;
          },
          write: function (e, t, n, r) {
            if (!e.tty || !e.tty.Yf.Zg) throw new Ze.af(60);
            try {
              for (var i = 0; i < r; i++) e.tty.Yf.Zg(e.tty, t[n + i]);
            } catch (e) {
              throw new Ze.af(29);
            }
            return r && (e.node.timestamp = Date.now()), i;
          },
        },
        Qe = {
          xh: function (e) {
            if (!e.input.length) {
              var t = null;
              if (d) {
                var n = Buffer.Sf ? Buffer.Sf(256) : new Buffer(256),
                  r = 0;
                try {
                  r = w.readSync(process.stdin.fd, n, 0, 256, null);
                } catch (e) {
                  if (-1 == e.toString().indexOf("EOF")) throw e;
                  r = 0;
                }
                t = 0 < r ? n.slice(0, r).toString("utf-8") : null;
              } else
                "undefined" != typeof window &&
                "function" == typeof window.prompt
                  ? null !== (t = window.prompt("Input: ")) && (t += "\n")
                  : "function" == typeof readline &&
                    null !== (t = readline()) &&
                    (t += "\n");
              if (!t) return null;
              e.input = Kn(t, !0);
            }
            return e.input.shift();
          },
          Zg: function (e, t) {
            null === t || 10 === t
              ? (k(L(e.output, 0)), (e.output = []))
              : 0 != t && e.output.push(t);
          },
          flush: function (e) {
            e.output &&
              0 < e.output.length &&
              (k(L(e.output, 0)), (e.output = []));
          },
        },
        Je = {
          Zg: function (e, t) {
            null === t || 10 === t
              ? (A(L(e.output, 0)), (e.output = []))
              : 0 != t && e.output.push(t);
          },
          flush: function (e) {
            e.output &&
              0 < e.output.length &&
              (A(L(e.output, 0)), (e.output = []));
          },
        },
        $e = {
          Df: null,
          jf: function () {
            return $e.createNode(null, "/", 16895, 0);
          },
          createNode: function (e, t, n, r) {
            if (Ze.si(n) || Ze.isFIFO(n)) throw new Ze.af(63);
            return (
              $e.Df ||
                ($e.Df = {
                  dir: {
                    node: {
                      Af: $e.cf.Af,
                      nf: $e.cf.nf,
                      lookup: $e.cf.lookup,
                      Ff: $e.cf.Ff,
                      rename: $e.cf.rename,
                      unlink: $e.cf.unlink,
                      rmdir: $e.cf.rmdir,
                      readdir: $e.cf.readdir,
                      symlink: $e.cf.symlink,
                    },
                    stream: { tf: $e.df.tf },
                  },
                  file: {
                    node: { Af: $e.cf.Af, nf: $e.cf.nf },
                    stream: {
                      tf: $e.df.tf,
                      read: $e.df.read,
                      write: $e.df.write,
                      fg: $e.df.fg,
                      Wf: $e.df.Wf,
                      Xf: $e.df.Xf,
                    },
                  },
                  link: {
                    node: {
                      Af: $e.cf.Af,
                      nf: $e.cf.nf,
                      readlink: $e.cf.readlink,
                    },
                    stream: {},
                  },
                  lh: { node: { Af: $e.cf.Af, nf: $e.cf.nf }, stream: Ze.$h },
                }),
              (n = Ze.createNode(e, t, n, r)),
              Ze.kf(n.mode)
                ? ((n.cf = $e.Df.dir.node),
                  (n.df = $e.Df.dir.stream),
                  (n.bf = {}))
                : Ze.isFile(n.mode)
                ? ((n.cf = $e.Df.file.node),
                  (n.df = $e.Df.file.stream),
                  (n.gf = 0),
                  (n.bf = null))
                : Ze.Mf(n.mode)
                ? ((n.cf = $e.Df.link.node), (n.df = $e.Df.link.stream))
                : Ze.hg(n.mode) &&
                  ((n.cf = $e.Df.lh.node), (n.df = $e.Df.lh.stream)),
              (n.timestamp = Date.now()),
              e && (e.bf[t] = n),
              n
            );
          },
          gj: function (e) {
            if (e.bf && e.bf.subarray) {
              for (var t = [], n = 0; n < e.gf; ++n) t.push(e.bf[n]);
              return t;
            }
            return e.bf;
          },
          hj: function (e) {
            return e.bf
              ? e.bf.subarray
                ? e.bf.subarray(0, e.gf)
                : new Uint8Array(e.bf)
              : new Uint8Array(0);
          },
          sh: function (e, t) {
            var n = e.bf ? e.bf.length : 0;
            n >= t ||
              ((t = Math.max(t, (n * (1048576 > n ? 2 : 1.125)) >>> 0)),
              0 != n && (t = Math.max(t, 256)),
              (n = e.bf),
              (e.bf = new Uint8Array(t)),
              0 < e.gf && e.bf.set(n.subarray(0, e.gf), 0));
          },
          Ji: function (e, t) {
            if (e.gf != t)
              if (0 == t) (e.bf = null), (e.gf = 0);
              else {
                if (!e.bf || e.bf.subarray) {
                  var n = e.bf;
                  (e.bf = new Uint8Array(t)),
                    n && e.bf.set(n.subarray(0, Math.min(t, e.gf)));
                } else if ((e.bf || (e.bf = []), e.bf.length > t))
                  e.bf.length = t;
                else for (; e.bf.length < t; ) e.bf.push(0);
                e.gf = t;
              }
          },
          cf: {
            Af: function (e) {
              var t = {};
              return (
                (t.dev = Ze.hg(e.mode) ? e.id : 1),
                (t.ino = e.id),
                (t.mode = e.mode),
                (t.nlink = 1),
                (t.uid = 0),
                (t.gid = 0),
                (t.rdev = e.rdev),
                Ze.kf(e.mode)
                  ? (t.size = 4096)
                  : Ze.isFile(e.mode)
                  ? (t.size = e.gf)
                  : Ze.Mf(e.mode)
                  ? (t.size = e.link.length)
                  : (t.size = 0),
                (t.atime = new Date(e.timestamp)),
                (t.mtime = new Date(e.timestamp)),
                (t.ctime = new Date(e.timestamp)),
                (t.Xh = 4096),
                (t.blocks = Math.ceil(t.size / t.Xh)),
                t
              );
            },
            nf: function (e, t) {
              void 0 !== t.mode && (e.mode = t.mode),
                void 0 !== t.timestamp && (e.timestamp = t.timestamp),
                void 0 !== t.size && $e.Ji(e, t.size);
            },
            lookup: function () {
              throw Ze.Qg[44];
            },
            Ff: function (e, t, n, r) {
              return $e.createNode(e, t, n, r);
            },
            rename: function (e, t, n) {
              if (Ze.kf(e.mode)) {
                try {
                  var r = Ze.Bf(t, n);
                } catch (e) {}
                if (r) for (var i in r.bf) throw new Ze.af(55);
              }
              delete e.parent.bf[e.name],
                (e.name = n),
                (t.bf[n] = e),
                (e.parent = t);
            },
            unlink: function (e, t) {
              delete e.bf[t];
            },
            rmdir: function (e, t) {
              var n,
                r = Ze.Bf(e, t);
              for (n in r.bf) throw new Ze.af(55);
              delete e.bf[t];
            },
            readdir: function (e) {
              var t,
                n = [".", ".."];
              for (t in e.bf) e.bf.hasOwnProperty(t) && n.push(t);
              return n;
            },
            symlink: function (e, t, n) {
              return ((e = $e.createNode(e, t, 41471, 0)).link = n), e;
            },
            readlink: function (e) {
              if (!Ze.Mf(e.mode)) throw new Ze.af(28);
              return e.link;
            },
          },
          df: {
            read: function (e, t, n, r, i) {
              var a = e.node.bf;
              if (i >= e.node.gf) return 0;
              if (8 < (e = Math.min(e.node.gf - i, r)) && a.subarray)
                t.set(a.subarray(i, i + e), n);
              else for (r = 0; r < e; r++) t[n + r] = a[i + r];
              return e;
            },
            write: function (e, t, n, r, i, a) {
              if (!r) return 0;
              if (
                (((e = e.node).timestamp = Date.now()),
                t.subarray && (!e.bf || e.bf.subarray))
              ) {
                if (a) return (e.bf = t.subarray(n, n + r)), (e.gf = r);
                if (0 === e.gf && 0 === i)
                  return (e.bf = t.slice(n, n + r)), (e.gf = r);
                if (i + r <= e.gf) return e.bf.set(t.subarray(n, n + r), i), r;
              }
              if (($e.sh(e, i + r), e.bf.subarray && t.subarray))
                e.bf.set(t.subarray(n, n + r), i);
              else for (a = 0; a < r; a++) e.bf[i + a] = t[n + a];
              return (e.gf = Math.max(e.gf, i + r)), r;
            },
            tf: function (e, t, n) {
              if (
                (1 === n
                  ? (t += e.position)
                  : 2 === n && Ze.isFile(e.node.mode) && (t += e.node.gf),
                0 > t)
              )
                throw new Ze.af(28);
              return t;
            },
            fg: function (e, t, n) {
              $e.sh(e.node, t + n), (e.node.gf = Math.max(e.node.gf, t + n));
            },
            Wf: function (e, t, n, r, i, a) {
              if ((O(0 === t), !Ze.isFile(e.node.mode))) throw new Ze.af(43);
              if (((e = e.node.bf), 2 & a || e.buffer !== W)) {
                for (
                  (0 < r || r + n < e.length) &&
                    (e = e.subarray
                      ? e.subarray(r, r + n)
                      : Array.prototype.slice.call(e, r, r + n)),
                    r = !0,
                    a = 16384 * Math.ceil(n / 16384),
                    t = rr(a);
                  n < a;

                )
                  q[t + n++] = 0;
                if (!(n = t)) throw new Ze.af(48);
                q.set(e, n);
              } else (r = !1), (n = e.byteOffset);
              return { Hi: n, Jg: r };
            },
            Xf: function (e, t, n, r, i) {
              if (!Ze.isFile(e.node.mode)) throw new Ze.af(43);
              return 2 & i || $e.df.write(e, t, 0, r, n, !1), 0;
            },
          },
        },
        Ze = {
          root: null,
          mg: [],
          ph: {},
          streams: [],
          Ai: 1,
          Cf: null,
          oh: "/",
          Tg: !1,
          Bh: !0,
          mf: {},
          Mh: { Gh: { Rh: 1, Sh: 2 } },
          af: null,
          Qg: {},
          ii: null,
          Cg: 0,
          kj: function (e) {
            if (!(e instanceof Ze.af)) {
              e: {
                var t = Error();
                if (!t.stack) {
                  try {
                    throw Error();
                  } catch (e) {
                    t = e;
                  }
                  if (!t.stack) {
                    t = "(no stack trace available)";
                    break e;
                  }
                }
                t = t.stack.toString();
              }
              throw (
                (n.extraStackTrace && (t += "\n" + n.extraStackTrace()),
                e + " : " + (t = ke(t)))
              );
            }
            return Fe(e.ef);
          },
          ff: function (e, t) {
            if (((t = t || {}), !(e = qe(Ze.cwd(), e))))
              return { path: "", node: null };
            var n,
              r = { Og: !0, ah: 0 };
            for (n in r) void 0 === t[n] && (t[n] = r[n]);
            if (8 < t.ah) throw new Ze.af(32);
            e = Ne(
              e.split("/").filter(function (e) {
                return !!e;
              }),
              !1
            );
            var i = Ze.root;
            for (r = "/", n = 0; n < e.length; n++) {
              var a = n === e.length - 1;
              if (a && t.parent) break;
              if (
                ((i = Ze.Bf(i, e[n])),
                (r = Ge(r, e[n])),
                Ze.Nf(i) && (!a || (a && t.Og)) && (i = i.lg.root),
                !a || t.wf)
              )
                for (a = 0; Ze.Mf(i.mode); )
                  if (
                    ((i = Ze.readlink(r)),
                    (r = qe(Ue(r), i)),
                    (i = Ze.ff(r, { ah: t.ah }).node),
                    40 < a++)
                  )
                    throw new Ze.af(32);
            }
            return { path: r, node: i };
          },
          If: function (e) {
            for (var t; ; ) {
              if (Ze.wg(e))
                return (
                  (e = e.jf.Eh),
                  t ? ("/" !== e[e.length - 1] ? e + "/" + t : e + t) : e
                );
              (t = t ? e.name + "/" + t : e.name), (e = e.parent);
            }
          },
          Sg: function (e, t) {
            for (var n = 0, r = 0; r < t.length; r++)
              n = ((n << 5) - n + t.charCodeAt(r)) | 0;
            return ((e + n) >>> 0) % Ze.Cf.length;
          },
          zh: function (e) {
            var t = Ze.Sg(e.parent.id, e.name);
            (e.Pf = Ze.Cf[t]), (Ze.Cf[t] = e);
          },
          Ah: function (e) {
            var t = Ze.Sg(e.parent.id, e.name);
            if (Ze.Cf[t] === e) Ze.Cf[t] = e.Pf;
            else
              for (t = Ze.Cf[t]; t; ) {
                if (t.Pf === e) {
                  t.Pf = e.Pf;
                  break;
                }
                t = t.Pf;
              }
          },
          Bf: function (e, t) {
            var n = Ze.yi(e);
            if (n) throw new Ze.af(n, e);
            for (n = Ze.Cf[Ze.Sg(e.id, t)]; n; n = n.Pf) {
              var r = n.name;
              if (n.parent.id === e.id && r === t) return n;
            }
            return Ze.lookup(e, t);
          },
          createNode: function (e, t, n, r) {
            return (e = new Ze.Oh(e, t, n, r)), Ze.zh(e), e;
          },
          Ng: function (e) {
            Ze.Ah(e);
          },
          wg: function (e) {
            return e === e.parent;
          },
          Nf: function (e) {
            return !!e.lg;
          },
          isFile: function (e) {
            return 32768 == (61440 & e);
          },
          kf: function (e) {
            return 16384 == (61440 & e);
          },
          Mf: function (e) {
            return 40960 == (61440 & e);
          },
          hg: function (e) {
            return 8192 == (61440 & e);
          },
          si: function (e) {
            return 24576 == (61440 & e);
          },
          isFIFO: function (e) {
            return 4096 == (61440 & e);
          },
          isSocket: function (e) {
            return 49152 == (49152 & e);
          },
          ji: {
            r: 0,
            rs: 1052672,
            "r+": 2,
            w: 577,
            wx: 705,
            xw: 705,
            "w+": 578,
            "wx+": 706,
            "xw+": 706,
            a: 1089,
            ax: 1217,
            xa: 1217,
            "a+": 1090,
            "ax+": 1218,
            "xa+": 1218,
          },
          Dh: function (e) {
            var t = Ze.ji[e];
            if (void 0 === t) throw Error("Unknown file open mode: " + e);
            return t;
          },
          th: function (e) {
            var t = ["r", "w", "rw"][3 & e];
            return 512 & e && (t += "w"), t;
          },
          Jf: function (e, t) {
            return Ze.Bh ||
              ((-1 === t.indexOf("r") || 292 & e.mode) &&
                (-1 === t.indexOf("w") || 146 & e.mode) &&
                (-1 === t.indexOf("x") || 73 & e.mode))
              ? 0
              : 2;
          },
          yi: function (e) {
            var t = Ze.Jf(e, "x");
            return t || (e.cf.lookup ? 0 : 2);
          },
          Yg: function (e, t) {
            try {
              return Ze.Bf(e, t), 20;
            } catch (e) {}
            return Ze.Jf(e, "wx");
          },
          xg: function (e, t, n) {
            try {
              var r = Ze.Bf(e, t);
            } catch (e) {
              return e.ef;
            }
            if ((e = Ze.Jf(e, "wx"))) return e;
            if (n) {
              if (!Ze.kf(r.mode)) return 54;
              if (Ze.wg(r) || Ze.If(r) === Ze.cwd()) return 10;
            } else if (Ze.kf(r.mode)) return 31;
            return 0;
          },
          zi: function (e, t) {
            return e
              ? Ze.Mf(e.mode)
                ? 32
                : Ze.kf(e.mode) && ("r" !== Ze.th(t) || 512 & t)
                ? 31
                : Ze.Jf(e, Ze.th(t))
              : 44;
          },
          Qh: 4096,
          Bi: function (e, t) {
            for (t = t || Ze.Qh, e = e || 0; e <= t; e++)
              if (!Ze.streams[e]) return e;
            throw new Ze.af(33);
          },
          zf: function (e) {
            return Ze.streams[e];
          },
          nh: function (e, t, n) {
            Ze.Hg ||
              ((Ze.Hg = function () {}),
              (Ze.Hg.prototype = {
                object: {
                  get: function () {
                    return this.node;
                  },
                  set: function (e) {
                    this.node = e;
                  },
                },
              }));
            var r,
              i = new Ze.Hg();
            for (r in e) i[r] = e[r];
            return (e = i), (t = Ze.Bi(t, n)), (e.fd = t), (Ze.streams[t] = e);
          },
          ai: function (e) {
            Ze.streams[e] = null;
          },
          $h: {
            open: function (e) {
              (e.df = Ze.ki(e.node.rdev).df), e.df.open && e.df.open(e);
            },
            tf: function () {
              throw new Ze.af(70);
            },
          },
          Wg: function (e) {
            return e >> 8;
          },
          oj: function (e) {
            return 255 & e;
          },
          Of: function (e, t) {
            return (e << 8) | t;
          },
          dh: function (e, t) {
            Ze.ph[e] = { df: t };
          },
          ki: function (e) {
            return Ze.ph[e];
          },
          wh: function (e) {
            var t = [];
            for (e = [e]; e.length; ) {
              var n = e.pop();
              t.push(n), e.push.apply(e, n.mg);
            }
            return t;
          },
          Kh: function (e, t) {
            function n(e) {
              return Ze.Cg--, t(e);
            }
            function r(e) {
              if (e) {
                if (!r.gi) return (r.gi = !0), n(e);
              } else ++a >= i.length && n(null);
            }
            "function" == typeof e && ((t = e), (e = !1)),
              Ze.Cg++,
              1 < Ze.Cg &&
                A(
                  "warning: " +
                    Ze.Cg +
                    " FS.syncfs operations in flight at once, probably just doing extra work"
                );
            var i = Ze.wh(Ze.root.jf),
              a = 0;
            i.forEach(function (t) {
              if (!t.type.Kh) return r(null);
              t.type.Kh(t, e, r);
            });
          },
          jf: function (e, t, n) {
            var r = "/" === n,
              i = !n;
            if (r && Ze.root) throw new Ze.af(10);
            if (!r && !i) {
              var a = Ze.ff(n, { Og: !1 });
              if (((n = a.path), (a = a.node), Ze.Nf(a))) throw new Ze.af(10);
              if (!Ze.kf(a.mode)) throw new Ze.af(54);
            }
            return (
              (t = { type: e, tj: t, Eh: n, mg: [] }),
              ((e = e.jf(t)).jf = t),
              (t.root = e),
              r ? (Ze.root = e) : a && ((a.lg = t), a.jf && a.jf.mg.push(t)),
              e
            );
          },
          zj: function (e) {
            if (((e = Ze.ff(e, { Og: !1 })), !Ze.Nf(e.node)))
              throw new Ze.af(28);
            var t = (e = e.node).lg,
              n = Ze.wh(t);
            Object.keys(Ze.Cf).forEach(function (e) {
              for (e = Ze.Cf[e]; e; ) {
                var t = e.Pf;
                -1 !== n.indexOf(e.jf) && Ze.Ng(e), (e = t);
              }
            }),
              (e.lg = null),
              e.jf.mg.splice(e.jf.mg.indexOf(t), 1);
          },
          lookup: function (e, t) {
            return e.cf.lookup(e, t);
          },
          Ff: function (e, t, n) {
            var r = Ze.ff(e, { parent: !0 }).node;
            if (!(e = ze(e)) || "." === e || ".." === e) throw new Ze.af(28);
            var i = Ze.Yg(r, e);
            if (i) throw new Ze.af(i);
            if (!r.cf.Ff) throw new Ze.af(63);
            return r.cf.Ff(r, e, t, n);
          },
          create: function (e, t) {
            return Ze.Ff(e, (4095 & (void 0 !== t ? t : 438)) | 32768, 0);
          },
          mkdir: function (e, t) {
            return Ze.Ff(e, (1023 & (void 0 !== t ? t : 511)) | 16384, 0);
          },
          qj: function (e, t) {
            e = e.split("/");
            for (var n = "", r = 0; r < e.length; ++r)
              if (e[r]) {
                n += "/" + e[r];
                try {
                  Ze.mkdir(n, t);
                } catch (e) {
                  if (20 != e.ef) throw e;
                }
              }
          },
          yg: function (e, t, n) {
            return void 0 === n && ((n = t), (t = 438)), Ze.Ff(e, 8192 | t, n);
          },
          symlink: function (e, t) {
            if (!qe(e)) throw new Ze.af(44);
            var n = Ze.ff(t, { parent: !0 }).node;
            if (!n) throw new Ze.af(44);
            t = ze(t);
            var r = Ze.Yg(n, t);
            if (r) throw new Ze.af(r);
            if (!n.cf.symlink) throw new Ze.af(63);
            return n.cf.symlink(n, t, e);
          },
          rename: function (e, t) {
            var n = Ue(e),
              r = Ue(t),
              i = ze(e),
              a = ze(t),
              f = Ze.ff(e, { parent: !0 }),
              o = f.node;
            if (((f = (f = Ze.ff(t, { parent: !0 })).node), !o || !f))
              throw new Ze.af(44);
            if (o.jf !== f.jf) throw new Ze.af(75);
            var u = Ze.Bf(o, i);
            if ("." !== (r = He(e, r)).charAt(0)) throw new Ze.af(28);
            if ("." !== (r = He(t, n)).charAt(0)) throw new Ze.af(55);
            try {
              var c = Ze.Bf(f, a);
            } catch (e) {}
            if (u !== c) {
              if (((n = Ze.kf(u.mode)), (i = Ze.xg(o, i, n))))
                throw new Ze.af(i);
              if ((i = c ? Ze.xg(f, a, n) : Ze.Yg(f, a))) throw new Ze.af(i);
              if (!o.cf.rename) throw new Ze.af(63);
              if (Ze.Nf(u) || (c && Ze.Nf(c))) throw new Ze.af(10);
              if (f !== o && (i = Ze.Jf(o, "w"))) throw new Ze.af(i);
              try {
                Ze.mf.willMovePath && Ze.mf.willMovePath(e, t);
              } catch (n) {
                A(
                  "FS.trackingDelegate['willMovePath']('" +
                    e +
                    "', '" +
                    t +
                    "') threw an exception: " +
                    n.message
                );
              }
              Ze.Ah(u);
              try {
                o.cf.rename(u, f, a);
              } catch (e) {
                throw e;
              } finally {
                Ze.zh(u);
              }
              try {
                Ze.mf.onMovePath && Ze.mf.onMovePath(e, t);
              } catch (n) {
                A(
                  "FS.trackingDelegate['onMovePath']('" +
                    e +
                    "', '" +
                    t +
                    "') threw an exception: " +
                    n.message
                );
              }
            }
          },
          rmdir: function (e) {
            var t = Ze.ff(e, { parent: !0 }).node,
              n = ze(e),
              r = Ze.Bf(t, n),
              i = Ze.xg(t, n, !0);
            if (i) throw new Ze.af(i);
            if (!t.cf.rmdir) throw new Ze.af(63);
            if (Ze.Nf(r)) throw new Ze.af(10);
            try {
              Ze.mf.willDeletePath && Ze.mf.willDeletePath(e);
            } catch (t) {
              A(
                "FS.trackingDelegate['willDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  t.message
              );
            }
            t.cf.rmdir(t, n), Ze.Ng(r);
            try {
              Ze.mf.onDeletePath && Ze.mf.onDeletePath(e);
            } catch (t) {
              A(
                "FS.trackingDelegate['onDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  t.message
              );
            }
          },
          readdir: function (e) {
            if (!(e = Ze.ff(e, { wf: !0 }).node).cf.readdir)
              throw new Ze.af(54);
            return e.cf.readdir(e);
          },
          unlink: function (e) {
            var t = Ze.ff(e, { parent: !0 }).node,
              n = ze(e),
              r = Ze.Bf(t, n),
              i = Ze.xg(t, n, !1);
            if (i) throw new Ze.af(i);
            if (!t.cf.unlink) throw new Ze.af(63);
            if (Ze.Nf(r)) throw new Ze.af(10);
            try {
              Ze.mf.willDeletePath && Ze.mf.willDeletePath(e);
            } catch (t) {
              A(
                "FS.trackingDelegate['willDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  t.message
              );
            }
            t.cf.unlink(t, n), Ze.Ng(r);
            try {
              Ze.mf.onDeletePath && Ze.mf.onDeletePath(e);
            } catch (t) {
              A(
                "FS.trackingDelegate['onDeletePath']('" +
                  e +
                  "') threw an exception: " +
                  t.message
              );
            }
          },
          readlink: function (e) {
            if (!(e = Ze.ff(e).node)) throw new Ze.af(44);
            if (!e.cf.readlink) throw new Ze.af(28);
            return qe(Ze.If(e.parent), e.cf.readlink(e));
          },
          stat: function (e, t) {
            if (!(e = Ze.ff(e, { wf: !t }).node)) throw new Ze.af(44);
            if (!e.cf.Af) throw new Ze.af(63);
            return e.cf.Af(e);
          },
          lstat: function (e) {
            return Ze.stat(e, !0);
          },
          chmod: function (e, t, n) {
            var r;
            if (
              !(r = "string" == typeof e ? Ze.ff(e, { wf: !n }).node : e).cf.nf
            )
              throw new Ze.af(63);
            r.cf.nf(r, {
              mode: (4095 & t) | (-4096 & r.mode),
              timestamp: Date.now(),
            });
          },
          lchmod: function (e, t) {
            Ze.chmod(e, t, !0);
          },
          fchmod: function (e, t) {
            if (!(e = Ze.zf(e))) throw new Ze.af(8);
            Ze.chmod(e.node, t);
          },
          chown: function (e, t, n, r) {
            var i;
            if (
              !(i = "string" == typeof e ? Ze.ff(e, { wf: !r }).node : e).cf.nf
            )
              throw new Ze.af(63);
            i.cf.nf(i, { timestamp: Date.now() });
          },
          lchown: function (e, t, n) {
            Ze.chown(e, t, n, !0);
          },
          fchown: function (e, t, n) {
            if (!(e = Ze.zf(e))) throw new Ze.af(8);
            Ze.chown(e.node, t, n);
          },
          truncate: function (e, t) {
            if (0 > t) throw new Ze.af(28);
            var n;
            if (
              !(n = "string" == typeof e ? Ze.ff(e, { wf: !0 }).node : e).cf.nf
            )
              throw new Ze.af(63);
            if (Ze.kf(n.mode)) throw new Ze.af(31);
            if (!Ze.isFile(n.mode)) throw new Ze.af(28);
            if ((e = Ze.Jf(n, "w"))) throw new Ze.af(e);
            n.cf.nf(n, { size: t, timestamp: Date.now() });
          },
          fj: function (e, t) {
            if (!(e = Ze.zf(e))) throw new Ze.af(8);
            if (0 == (2097155 & e.flags)) throw new Ze.af(28);
            Ze.truncate(e.node, t);
          },
          Aj: function (e, t, n) {
            (e = Ze.ff(e, { wf: !0 }).node).cf.nf(e, {
              timestamp: Math.max(t, n),
            });
          },
          open: function (e, t, r, i, a) {
            if ("" === e) throw new Ze.af(44);
            if (
              ((r =
                64 & (t = "string" == typeof t ? Ze.Dh(t) : t)
                  ? (4095 & (void 0 === r ? 438 : r)) | 32768
                  : 0),
              "object" == typeof e)
            )
              var f = e;
            else {
              e = Be(e);
              try {
                f = Ze.ff(e, { wf: !(131072 & t) }).node;
              } catch (e) {}
            }
            var o = !1;
            if (64 & t)
              if (f) {
                if (128 & t) throw new Ze.af(20);
              } else (f = Ze.Ff(e, r, 0)), (o = !0);
            if (!f) throw new Ze.af(44);
            if ((Ze.hg(f.mode) && (t &= -513), 65536 & t && !Ze.kf(f.mode)))
              throw new Ze.af(54);
            if (!o && (r = Ze.zi(f, t))) throw new Ze.af(r);
            512 & t && Ze.truncate(f, 0),
              (t &= -131713),
              (i = Ze.nh(
                {
                  node: f,
                  path: Ze.If(f),
                  flags: t,
                  seekable: !0,
                  position: 0,
                  df: f.df,
                  Wi: [],
                  error: !1,
                },
                i,
                a
              )).df.open && i.df.open(i),
              !n.logReadFiles ||
                1 & t ||
                (Ze.$g || (Ze.$g = {}),
                e in Ze.$g ||
                  ((Ze.$g[e] = 1),
                  A("FS.trackingDelegate error on read file: " + e)));
            try {
              Ze.mf.onOpenFile &&
                ((a = 0),
                1 != (2097155 & t) && (a |= Ze.Mh.Gh.Rh),
                0 != (2097155 & t) && (a |= Ze.Mh.Gh.Sh),
                Ze.mf.onOpenFile(e, a));
            } catch (t) {
              A(
                "FS.trackingDelegate['onOpenFile']('" +
                  e +
                  "', flags) threw an exception: " +
                  t.message
              );
            }
            return i;
          },
          close: function (e) {
            if (Ze.ig(e)) throw new Ze.af(8);
            e.Lf && (e.Lf = null);
            try {
              e.df.close && e.df.close(e);
            } catch (e) {
              throw e;
            } finally {
              Ze.ai(e.fd);
            }
            e.fd = null;
          },
          ig: function (e) {
            return null === e.fd;
          },
          tf: function (e, t, n) {
            if (Ze.ig(e)) throw new Ze.af(8);
            if (!e.seekable || !e.df.tf) throw new Ze.af(70);
            if (0 != n && 1 != n && 2 != n) throw new Ze.af(28);
            return (e.position = e.df.tf(e, t, n)), (e.Wi = []), e.position;
          },
          read: function (e, t, n, r, i) {
            if (0 > r || 0 > i) throw new Ze.af(28);
            if (Ze.ig(e)) throw new Ze.af(8);
            if (1 == (2097155 & e.flags)) throw new Ze.af(8);
            if (Ze.kf(e.node.mode)) throw new Ze.af(31);
            if (!e.df.read) throw new Ze.af(28);
            var a = void 0 !== i;
            if (a) {
              if (!e.seekable) throw new Ze.af(70);
            } else i = e.position;
            return (t = e.df.read(e, t, n, r, i)), a || (e.position += t), t;
          },
          write: function (e, t, n, r, i, a) {
            if (0 > r || 0 > i) throw new Ze.af(28);
            if (Ze.ig(e)) throw new Ze.af(8);
            if (0 == (2097155 & e.flags)) throw new Ze.af(8);
            if (Ze.kf(e.node.mode)) throw new Ze.af(31);
            if (!e.df.write) throw new Ze.af(28);
            e.seekable && 1024 & e.flags && Ze.tf(e, 0, 2);
            var f = void 0 !== i;
            if (f) {
              if (!e.seekable) throw new Ze.af(70);
            } else i = e.position;
            (t = e.df.write(e, t, n, r, i, a)), f || (e.position += t);
            try {
              e.path && Ze.mf.onWriteToFile && Ze.mf.onWriteToFile(e.path);
            } catch (t) {
              A(
                "FS.trackingDelegate['onWriteToFile']('" +
                  e.path +
                  "') threw an exception: " +
                  t.message
              );
            }
            return t;
          },
          fg: function (e, t, n) {
            if (Ze.ig(e)) throw new Ze.af(8);
            if (0 > t || 0 >= n) throw new Ze.af(28);
            if (0 == (2097155 & e.flags)) throw new Ze.af(8);
            if (!Ze.isFile(e.node.mode) && !Ze.kf(e.node.mode))
              throw new Ze.af(43);
            if (!e.df.fg) throw new Ze.af(138);
            e.df.fg(e, t, n);
          },
          Wf: function (e, t, n, r, i, a) {
            if (0 != (2 & i) && 0 == (2 & a) && 2 != (2097155 & e.flags))
              throw new Ze.af(2);
            if (1 == (2097155 & e.flags)) throw new Ze.af(2);
            if (!e.df.Wf) throw new Ze.af(43);
            return e.df.Wf(e, t, n, r, i, a);
          },
          Xf: function (e, t, n, r, i) {
            return e && e.df.Xf ? e.df.Xf(e, t, n, r, i) : 0;
          },
          sj: function () {
            return 0;
          },
          Uf: function (e, t, n) {
            if (!e.df.Uf) throw new Ze.af(59);
            return e.df.Uf(e, t, n);
          },
          readFile: function (e, t) {
            if (
              (((t = t || {}).flags = t.flags || "r"),
              (t.encoding = t.encoding || "binary"),
              "utf8" !== t.encoding && "binary" !== t.encoding)
            )
              throw Error('Invalid encoding type "' + t.encoding + '"');
            var n,
              r = Ze.open(e, t.flags);
            e = Ze.stat(e).size;
            var i = new Uint8Array(e);
            return (
              Ze.read(r, i, 0, e, 0),
              "utf8" === t.encoding
                ? (n = L(i, 0))
                : "binary" === t.encoding && (n = i),
              Ze.close(r),
              n
            );
          },
          writeFile: function (e, t, n) {
            if (
              (((n = n || {}).flags = n.flags || "w"),
              (e = Ze.open(e, n.flags, n.mode)),
              "string" == typeof t)
            ) {
              var r = new Uint8Array(B(t) + 1);
              (t = N(t, r, 0, r.length)), Ze.write(e, r, 0, t, void 0, n.Zh);
            } else {
              if (!ArrayBuffer.isView(t)) throw Error("Unsupported data type");
              Ze.write(e, t, 0, t.byteLength, void 0, n.Zh);
            }
            Ze.close(e);
          },
          cwd: function () {
            return Ze.oh;
          },
          chdir: function (e) {
            if (null === (e = Ze.ff(e, { wf: !0 })).node) throw new Ze.af(44);
            if (!Ze.kf(e.node.mode)) throw new Ze.af(54);
            var t = Ze.Jf(e.node, "x");
            if (t) throw new Ze.af(t);
            Ze.oh = e.path;
          },
          ci: function () {
            Ze.mkdir("/tmp"), Ze.mkdir("/home"), Ze.mkdir("/home/web_user");
          },
          bi: function () {
            Ze.mkdir("/dev"),
              Ze.dh(Ze.Of(1, 3), {
                read: function () {
                  return 0;
                },
                write: function (e, t, n, r) {
                  return r;
                },
              }),
              Ze.yg("/dev/null", Ze.Of(1, 3)),
              Xe(Ze.Of(5, 0), Qe),
              Xe(Ze.Of(6, 0), Je),
              Ze.yg("/dev/tty", Ze.Of(5, 0)),
              Ze.yg("/dev/tty1", Ze.Of(6, 0));
            var e = We();
            Ze.Hf("/dev", "random", e),
              Ze.Hf("/dev", "urandom", e),
              Ze.mkdir("/dev/shm"),
              Ze.mkdir("/dev/shm/tmp");
          },
          ei: function () {
            Ze.mkdir("/proc"),
              Ze.mkdir("/proc/self"),
              Ze.mkdir("/proc/self/fd"),
              Ze.jf(
                {
                  jf: function () {
                    var e = Ze.createNode("/proc/self", "fd", 16895, 73);
                    return (
                      (e.cf = {
                        lookup: function (e, t) {
                          var n = Ze.zf(+t);
                          if (!n) throw new Ze.af(8);
                          return ((e = {
                            parent: null,
                            jf: { Eh: "fake" },
                            cf: {
                              readlink: function () {
                                return n.path;
                              },
                            },
                          }).parent = e);
                        },
                      }),
                      e
                    );
                  },
                },
                {},
                "/proc/self/fd"
              );
          },
          fi: function () {
            n.stdin
              ? Ze.Hf("/dev", "stdin", n.stdin)
              : Ze.symlink("/dev/tty", "/dev/stdin"),
              n.stdout
                ? Ze.Hf("/dev", "stdout", null, n.stdout)
                : Ze.symlink("/dev/tty", "/dev/stdout"),
              n.stderr
                ? Ze.Hf("/dev", "stderr", null, n.stderr)
                : Ze.symlink("/dev/tty1", "/dev/stderr"),
              Ze.open("/dev/stdin", "r"),
              Ze.open("/dev/stdout", "w"),
              Ze.open("/dev/stderr", "w");
          },
          rh: function () {
            Ze.af ||
              ((Ze.af = function (e, t) {
                (this.node = t),
                  (this.Ki = function (e) {
                    this.ef = e;
                  }),
                  this.Ki(e),
                  (this.message = "FS error");
              }),
              (Ze.af.prototype = Error()),
              (Ze.af.prototype.constructor = Ze.af),
              [44].forEach(function (e) {
                (Ze.Qg[e] = new Ze.af(e)),
                  (Ze.Qg[e].stack = "<generic error, no stack>");
              }));
          },
          Ni: function () {
            Ze.rh(),
              (Ze.Cf = Array(4096)),
              Ze.jf($e, {}, "/"),
              Ze.ci(),
              Ze.bi(),
              Ze.ei(),
              (Ze.ii = { MEMFS: $e });
          },
          gg: function (e, t, r) {
            (Ze.gg.Tg = !0),
              Ze.rh(),
              (n.stdin = e || n.stdin),
              (n.stdout = t || n.stdout),
              (n.stderr = r || n.stderr),
              Ze.fi();
          },
          quit: function () {
            Ze.gg.Tg = !1;
            var e = n._fflush;
            for (e && e(0), e = 0; e < Ze.streams.length; e++) {
              var t = Ze.streams[e];
              t && Ze.close(t);
            }
          },
          Rg: function (e, t) {
            var n = 0;
            return e && (n |= 365), t && (n |= 146), n;
          },
          ej: function (e, t) {
            return (e = Ze.Lg(e, t)).exists ? e.object : (Fe(e.error), null);
          },
          Lg: function (e, t) {
            try {
              var n = Ze.ff(e, { wf: !t });
              e = n.path;
            } catch (e) {}
            var r = {
              wg: !1,
              exists: !1,
              error: 0,
              name: null,
              path: null,
              object: null,
              Ci: !1,
              Ei: null,
              Di: null,
            };
            try {
              (n = Ze.ff(e, { parent: !0 })),
                (r.Ci = !0),
                (r.Ei = n.path),
                (r.Di = n.node),
                (r.name = ze(e)),
                (n = Ze.ff(e, { wf: !t })),
                (r.exists = !0),
                (r.path = n.path),
                (r.object = n.node),
                (r.name = n.node.name),
                (r.wg = "/" === n.path);
            } catch (e) {
              r.error = e.ef;
            }
            return r;
          },
          cj: function (e, t) {
            for (
              e = "string" == typeof e ? e : Ze.If(e),
                t = t.split("/").reverse();
              t.length;

            ) {
              var n = t.pop();
              if (n) {
                var r = Ge(e, n);
                try {
                  Ze.mkdir(r);
                } catch (e) {}
                e = r;
              }
            }
            return r;
          },
          di: function (e, t, n, r, i) {
            return (
              (e = Ge("string" == typeof e ? e : Ze.If(e), t)),
              Ze.create(e, Ze.Rg(r, i))
            );
          },
          mh: function (e, t, n, r, i, a) {
            if (
              ((e = t ? Ge("string" == typeof e ? e : Ze.If(e), t) : e),
              (r = Ze.Rg(r, i)),
              (i = Ze.create(e, r)),
              n)
            ) {
              if ("string" == typeof n) {
                (e = Array(n.length)), (t = 0);
                for (var f = n.length; t < f; ++t) e[t] = n.charCodeAt(t);
                n = e;
              }
              Ze.chmod(i, 146 | r),
                (e = Ze.open(i, "w")),
                Ze.write(e, n, 0, n.length, 0, a),
                Ze.close(e),
                Ze.chmod(i, r);
            }
            return i;
          },
          Hf: function (e, t, n, r) {
            (e = Ge("string" == typeof e ? e : Ze.If(e), t)),
              (t = Ze.Rg(!!n, !!r)),
              Ze.Hf.Wg || (Ze.Hf.Wg = 64);
            var i = Ze.Of(Ze.Hf.Wg++, 0);
            return (
              Ze.dh(i, {
                open: function (e) {
                  e.seekable = !1;
                },
                close: function () {
                  r && r.buffer && r.buffer.length && r(10);
                },
                read: function (e, t, r, i) {
                  for (var a = 0, f = 0; f < i; f++) {
                    try {
                      var o = n();
                    } catch (e) {
                      throw new Ze.af(29);
                    }
                    if (void 0 === o && 0 === a) throw new Ze.af(6);
                    if (null == o) break;
                    a++, (t[r + f] = o);
                  }
                  return a && (e.node.timestamp = Date.now()), a;
                },
                write: function (e, t, n, i) {
                  for (var a = 0; a < i; a++)
                    try {
                      r(t[n + a]);
                    } catch (e) {
                      throw new Ze.af(29);
                    }
                  return i && (e.node.timestamp = Date.now()), a;
                },
              }),
              Ze.yg(e, t, i)
            );
          },
          uh: function (e) {
            if (e.Ug || e.ti || e.link || e.bf) return !0;
            var t = !0;
            if ("undefined" != typeof XMLHttpRequest)
              throw Error(
                "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
              );
            if (!m)
              throw Error("Cannot load without read() or XMLHttpRequest.");
            try {
              (e.bf = Kn(m(e.url), !0)), (e.gf = e.bf.length);
            } catch (e) {
              t = !1;
            }
            return t || Fe(29), t;
          },
          bj: function (e, t, n, r, i) {
            function a() {
              (this.Vg = !1), (this.Sf = []);
            }
            if (
              ((a.prototype.get = function (e) {
                if (!(e > this.length - 1 || 0 > e)) {
                  var t = e % this.chunkSize;
                  return this.yh((e / this.chunkSize) | 0)[t];
                }
              }),
              (a.prototype.Wh = function (e) {
                this.yh = e;
              }),
              (a.prototype.kh = function () {
                var e = new XMLHttpRequest();
                if (
                  (e.open("HEAD", n, !1),
                  e.send(null),
                  !((200 <= e.status && 300 > e.status) || 304 === e.status))
                )
                  throw Error("Couldn't load " + n + ". Status: " + e.status);
                var t,
                  r = Number(e.getResponseHeader("Content-length")),
                  i =
                    (t = e.getResponseHeader("Accept-Ranges")) && "bytes" === t;
                e =
                  (t = e.getResponseHeader("Content-Encoding")) && "gzip" === t;
                var a = 1048576;
                i || (a = r);
                var f = this;
                f.Wh(function (e) {
                  var t = e * a,
                    i = (e + 1) * a - 1;
                  if (((i = Math.min(i, r - 1)), void 0 === f.Sf[e])) {
                    var o = f.Sf;
                    if (t > i)
                      throw Error(
                        "invalid range (" +
                          t +
                          ", " +
                          i +
                          ") or no bytes requested!"
                      );
                    if (i > r - 1)
                      throw Error(
                        "only " + r + " bytes available! programmer error!"
                      );
                    var u = new XMLHttpRequest();
                    if (
                      (u.open("GET", n, !1),
                      r !== a &&
                        u.setRequestHeader("Range", "bytes=" + t + "-" + i),
                      "undefined" != typeof Uint8Array &&
                        (u.responseType = "arraybuffer"),
                      u.overrideMimeType &&
                        u.overrideMimeType(
                          "text/plain; charset=x-user-defined"
                        ),
                      u.send(null),
                      !(
                        (200 <= u.status && 300 > u.status) ||
                        304 === u.status
                      ))
                    )
                      throw Error(
                        "Couldn't load " + n + ". Status: " + u.status
                      );
                    (t =
                      void 0 !== u.response
                        ? new Uint8Array(u.response || [])
                        : Kn(u.responseText || "", !0)),
                      (o[e] = t);
                  }
                  if (void 0 === f.Sf[e]) throw Error("doXHR failed!");
                  return f.Sf[e];
                }),
                  (!e && r) ||
                    ((a = r = 1),
                    (a = r = this.yh(0).length),
                    k(
                      "LazyFiles on gzip forces download of the whole file when length is accessed"
                    )),
                  (this.Uh = r),
                  (this.Th = a),
                  (this.Vg = !0);
              }),
              "undefined" != typeof XMLHttpRequest)
            ) {
              if (!l)
                throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
              var f = new a();
              Object.defineProperties(f, {
                length: {
                  get: function () {
                    return this.Vg || this.kh(), this.Uh;
                  },
                },
                chunkSize: {
                  get: function () {
                    return this.Vg || this.kh(), this.Th;
                  },
                },
              }),
                (f = { Ug: !1, bf: f });
            } else f = { Ug: !1, url: n };
            var o = Ze.di(e, t, f, r, i);
            f.bf ? (o.bf = f.bf) : f.url && ((o.bf = null), (o.url = f.url)),
              Object.defineProperties(o, {
                gf: {
                  get: function () {
                    return this.bf.length;
                  },
                },
              });
            var u = {};
            return (
              Object.keys(o.df).forEach(function (e) {
                var t = o.df[e];
                u[e] = function () {
                  if (!Ze.uh(o)) throw new Ze.af(29);
                  return t.apply(null, arguments);
                };
              }),
              (u.read = function (e, t, n, r, i) {
                if (!Ze.uh(o)) throw new Ze.af(29);
                if (i >= (e = e.node.bf).length) return 0;
                if (((r = Math.min(e.length - i, r)), e.slice))
                  for (var a = 0; a < r; a++) t[n + a] = e[i + a];
                else for (a = 0; a < r; a++) t[n + a] = e.get(i + a);
                return r;
              }),
              (o.df = u),
              o
            );
          },
          dj: function (e, t, r, i, a, f, o, u, c, s) {
            function l(r) {
              function l(n) {
                s && s(), u || Ze.mh(e, t, n, i, a, c), f && f(), le();
              }
              var h = !1;
              n.preloadPlugins.forEach(function (e) {
                !h &&
                  e.canHandle(d) &&
                  (e.handle(r, d, l, function () {
                    o && o(), le();
                  }),
                  (h = !0));
              }),
                h || l(r);
            }
            Xn.gg();
            var d = t ? qe(Ge(e, t)) : e;
            se(),
              "string" == typeof r
                ? Xn.Xi(
                    r,
                    function (e) {
                      l(e);
                    },
                    o
                  )
                : l(r);
          },
          indexedDB: function () {
            return (
              window.indexedDB ||
              window.mozIndexedDB ||
              window.webkitIndexedDB ||
              window.msIndexedDB
            );
          },
          gh: function () {
            return "EM_FS_" + window.location.pathname;
          },
          hh: 20,
          eg: "FILE_DATA",
          wj: function (e, t, n) {
            (t = t || function () {}), (n = n || function () {});
            var r = Ze.indexedDB();
            try {
              var i = r.open(Ze.gh(), Ze.hh);
            } catch (e) {
              return n(e);
            }
            (i.onupgradeneeded = function () {
              k("creating db"), i.result.createObjectStore(Ze.eg);
            }),
              (i.onsuccess = function () {
                var r = i.result.transaction([Ze.eg], "readwrite"),
                  a = r.objectStore(Ze.eg),
                  f = 0,
                  o = 0,
                  u = e.length;
                e.forEach(function (e) {
                  ((e = a.put(Ze.Lg(e).object.bf, e)).onsuccess = function () {
                    ++f + o == u && (0 == o ? t() : n());
                  }),
                    (e.onerror = function () {
                      o++, f + o == u && (0 == o ? t() : n());
                    });
                }),
                  (r.onerror = n);
              }),
              (i.onerror = n);
          },
          mj: function (e, t, n) {
            (t = t || function () {}), (n = n || function () {});
            var r = Ze.indexedDB();
            try {
              var i = r.open(Ze.gh(), Ze.hh);
            } catch (e) {
              return n(e);
            }
            (i.onupgradeneeded = n),
              (i.onsuccess = function () {
                var r = i.result;
                try {
                  var a = r.transaction([Ze.eg], "readonly");
                } catch (e) {
                  return void n(e);
                }
                var f = a.objectStore(Ze.eg),
                  o = 0,
                  u = 0,
                  c = e.length;
                e.forEach(function (e) {
                  var r = f.get(e);
                  (r.onsuccess = function () {
                    Ze.Lg(e).exists && Ze.unlink(e),
                      Ze.mh(Ue(e), ze(e), r.result, !0, !0, !0),
                      ++o + u == c && (0 == u ? t() : n());
                  }),
                    (r.onerror = function () {
                      u++, o + u == c && (0 == u ? t() : n());
                    });
                }),
                  (a.onerror = n);
              }),
              (i.onerror = n);
          },
        },
        Ke = {};
      function et(e, t, n) {
        try {
          var r = e(t);
        } catch (e) {
          if (e && e.node && Be(t) !== Be(Ze.If(e.node))) return -54;
          throw e;
        }
        return (
          (V[n >> 2] = r.dev),
          (V[(n + 4) >> 2] = 0),
          (V[(n + 8) >> 2] = r.ino),
          (V[(n + 12) >> 2] = r.mode),
          (V[(n + 16) >> 2] = r.nlink),
          (V[(n + 20) >> 2] = r.uid),
          (V[(n + 24) >> 2] = r.gid),
          (V[(n + 28) >> 2] = r.rdev),
          (V[(n + 32) >> 2] = 0),
          (ve = [
            r.size >>> 0,
            ((ye = r.size),
            1 <= +Math.abs(ye)
              ? 0 < ye
                ? (0 | Math.min(+Math.floor(ye / 4294967296), 4294967295)) >>> 0
                : ~~+Math.ceil((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
              : 0),
          ]),
          (V[(n + 40) >> 2] = ve[0]),
          (V[(n + 44) >> 2] = ve[1]),
          (V[(n + 48) >> 2] = 4096),
          (V[(n + 52) >> 2] = r.blocks),
          (V[(n + 56) >> 2] = (r.atime.getTime() / 1e3) | 0),
          (V[(n + 60) >> 2] = 0),
          (V[(n + 64) >> 2] = (r.mtime.getTime() / 1e3) | 0),
          (V[(n + 68) >> 2] = 0),
          (V[(n + 72) >> 2] = (r.ctime.getTime() / 1e3) | 0),
          (V[(n + 76) >> 2] = 0),
          (ve = [
            r.ino >>> 0,
            ((ye = r.ino),
            1 <= +Math.abs(ye)
              ? 0 < ye
                ? (0 | Math.min(+Math.floor(ye / 4294967296), 4294967295)) >>> 0
                : ~~+Math.ceil((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
              : 0),
          ]),
          (V[(n + 80) >> 2] = ve[0]),
          (V[(n + 84) >> 2] = ve[1]),
          0
        );
      }
      var tt = void 0;
      function nt() {
        return V[((tt += 4) - 4) >> 2];
      }
      function rt(e) {
        if (!(e = Ze.zf(e))) throw new Ze.af(8);
        return e;
      }
      function it(e, t, n, r, i) {
        if (p) return yn(3, 1, e, t, n, r, i);
        try {
          i = 0;
          for (
            var a = t ? V[t >> 2] : 0,
              f = t ? V[(t + 4) >> 2] : 0,
              o = n ? V[n >> 2] : 0,
              u = n ? V[(n + 4) >> 2] : 0,
              c = r ? V[r >> 2] : 0,
              s = r ? V[(r + 4) >> 2] : 0,
              l = 0,
              d = 0,
              h = 0,
              m = 0,
              g = 0,
              w = 0,
              y =
                (t ? V[t >> 2] : 0) | (n ? V[n >> 2] : 0) | (r ? V[r >> 2] : 0),
              v =
                (t ? V[(t + 4) >> 2] : 0) |
                (n ? V[(n + 4) >> 2] : 0) |
                (r ? V[(r + 4) >> 2] : 0),
              b = 0;
            b < e;
            b++
          ) {
            var _ = 1 << b % 32;
            if (32 > b ? y & _ : v & _) {
              var k = Ze.zf(b);
              if (!k) throw new Ze.af(8);
              var A = 5;
              k.df.Zf && (A = k.df.Zf(k)),
                1 & A &&
                  (32 > b ? a & _ : f & _) &&
                  (32 > b ? (l |= _) : (d |= _), i++),
                4 & A &&
                  (32 > b ? o & _ : u & _) &&
                  (32 > b ? (h |= _) : (m |= _), i++),
                2 & A &&
                  (32 > b ? c & _ : s & _) &&
                  (32 > b ? (g |= _) : (w |= _), i++);
            }
          }
          return (
            t && ((V[t >> 2] = l), (V[(t + 4) >> 2] = d)),
            n && ((V[n >> 2] = h), (V[(n + 4) >> 2] = m)),
            r && ((V[r >> 2] = g), (V[(r + 4) >> 2] = w)),
            i
          );
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function at(e, t) {
        if (p) return yn(4, 1, e, t);
        try {
          var n;
          if (((e = R(e)), -8 & t)) var r = -28;
          else
            (n = Ze.ff(e, { wf: !0 }).node)
              ? ((e = ""),
                4 & t && (e += "r"),
                2 & t && (e += "w"),
                1 & t && (e += "x"),
                (r = e && Ze.Jf(n, e) ? -2 : 0))
              : (r = -44);
          return r;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function ft(e, t, n) {
        if (p) return yn(5, 1, e, t, n);
        tt = n;
        try {
          var r = rt(e);
          switch (t) {
            case 0:
              var i = nt();
              return 0 > i ? -28 : Ze.open(r.path, r.flags, 0, i).fd;
            case 1:
            case 2:
              return 0;
            case 3:
              return r.flags;
            case 4:
              return (i = nt()), (r.flags |= i), 0;
            case 12:
              return (i = nt()), (Y[(i + 0) >> 1] = 2), 0;
            case 13:
            case 14:
              return 0;
            case 16:
            case 8:
              return -28;
            case 9:
              return Fe(28), -1;
            default:
              return -28;
          }
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function ot(e, t) {
        if (p) return yn(6, 1, e, t);
        try {
          var n = rt(e);
          return et(Ze.stat, n.path, t);
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function ut(e, t, n) {
        if (p) return yn(7, 1, e, t, n);
        try {
          var r = rt(e);
          r.Lf || (r.Lf = Ze.readdir(r.path)), (e = 0);
          for (
            var i = Ze.tf(r, 0, 1), a = Math.floor(i / 280);
            a < r.Lf.length && e + 280 <= n;

          ) {
            var f = r.Lf[a];
            if ("." === f[0])
              var o = 1,
                u = 4;
            else {
              var c = Ze.Bf(r.node, f);
              (o = c.id),
                (u = Ze.hg(c.mode)
                  ? 2
                  : Ze.kf(c.mode)
                  ? 4
                  : Ze.Mf(c.mode)
                  ? 10
                  : 8);
            }
            (ve = [
              o >>> 0,
              ((ye = o),
              1 <= +Math.abs(ye)
                ? 0 < ye
                  ? (0 | Math.min(+Math.floor(ye / 4294967296), 4294967295)) >>>
                    0
                  : ~~+Math.ceil((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
                : 0),
            ]),
              (V[(t + e) >> 2] = ve[0]),
              (V[(t + e + 4) >> 2] = ve[1]),
              (ve = [
                (280 * (a + 1)) >>> 0,
                ((ye = 280 * (a + 1)),
                1 <= +Math.abs(ye)
                  ? 0 < ye
                    ? (0 |
                        Math.min(+Math.floor(ye / 4294967296), 4294967295)) >>>
                      0
                    : ~~+Math.ceil((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
                  : 0),
              ]),
              (V[(t + e + 8) >> 2] = ve[0]),
              (V[(t + e + 12) >> 2] = ve[1]),
              (Y[(t + e + 16) >> 1] = 280),
              (q[(t + e + 18) >> 0] = u),
              N(f, H, t + e + 19, 256),
              (e += 280),
              (a += 1);
          }
          return Ze.tf(r, 280 * a, 0), e;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function ct(e, t) {
        if (p) return yn(8, 1, e, t);
        try {
          return (
            ar(t, 0, 136),
            (V[t >> 2] = 1),
            (V[(t + 4) >> 2] = 2),
            (V[(t + 8) >> 2] = 3),
            (V[(t + 12) >> 2] = 4),
            0
          );
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function st(e, t, n) {
        if (p) return yn(9, 1, e, t, n);
        tt = n;
        try {
          var r = rt(e);
          switch (t) {
            case 21509:
            case 21505:
              return r.tty ? 0 : -59;
            case 21510:
            case 21511:
            case 21512:
            case 21506:
            case 21507:
            case 21508:
              return r.tty ? 0 : -59;
            case 21519:
              if (!r.tty) return -59;
              var i = nt();
              return (V[i >> 2] = 0);
            case 21520:
              return r.tty ? -28 : -59;
            case 21531:
              return (i = nt()), Ze.Uf(r, t, i);
            case 21523:
            case 21524:
              return r.tty ? 0 : -59;
            default:
              de("bad ioctl syscall " + t);
          }
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function lt(e, t) {
        if (p) return yn(10, 1, e, t);
        try {
          return (e = R(e)), et(Ze.lstat, e, t);
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function dt(e, t) {
        if (p) return yn(11, 1, e, t);
        try {
          return (
            "/" === (e = Be((e = R(e))))[e.length - 1] &&
              (e = e.substr(0, e.length - 1)),
            Ze.mkdir(e, t, 0),
            0
          );
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function ht(e, t, n, r, i, a) {
        if (p) return yn(12, 1, e, t, n, r, i, a);
        try {
          e: {
            a <<= 12;
            var f = !1;
            if (0 != (16 & r) && 0 != e % 16384) var o = -28;
            else {
              if (0 != (32 & r)) {
                var u = fr(16384, t);
                if (!u) {
                  o = -48;
                  break e;
                }
                ar(u, 0, t), (f = !0);
              } else {
                var c = Ze.zf(i);
                if (!c) {
                  o = -8;
                  break e;
                }
                var s = Ze.Wf(c, e, t, a, n, r);
                (u = s.Hi), (f = s.Jg);
              }
              (Ke[u] = {
                xi: u,
                ui: t,
                Jg: f,
                fd: i,
                Gi: n,
                flags: r,
                offset: a,
              }),
                (o = u);
            }
          }
          return o;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function pt(e, t) {
        if (p) return yn(13, 1, e, t);
        try {
          if (-1 == (0 | e) || 0 === t) var n = -28;
          else {
            var r = Ke[e];
            if (r && t === r.ui) {
              var i = Ze.zf(r.fd);
              if (2 & r.Gi) {
                var a = r.flags,
                  f = r.offset,
                  o = H.slice(e, e + t);
                Ze.Xf(i, o, f, t, a);
              }
              (Ke[e] = null), r.Jg && nr(r.xi);
            }
            n = 0;
          }
          return n;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function mt(e, t, n) {
        if (p) return yn(14, 1, e, t, n);
        tt = n;
        try {
          var r = R(e),
            i = nt();
          return Ze.open(r, t, i).fd;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function gt(e, t, n) {
        if (p) return yn(15, 1, e, t, n);
        try {
          for (var r = (n = 0); r < t; r++) {
            var i = e + 8 * r,
              a = Y[(i + 4) >> 1],
              f = 32,
              o = Ze.zf(V[i >> 2]);
            o && ((f = 5), o.df.Zf && (f = o.df.Zf(o))),
              (f &= 24 | a) && n++,
              (Y[(i + 6) >> 1] = f);
          }
          return n;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function wt(e, t, n, r) {
        if (p) return yn(16, 1, e, t, n, r);
        try {
          return (
            r &&
              ((V[r >> 2] = -1),
              (V[(r + 4) >> 2] = -1),
              (V[(r + 8) >> 2] = -1),
              (V[(r + 12) >> 2] = -1)),
            0
          );
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function yt(e, t, n) {
        if (p) return yn(17, 1, e, t, n);
        try {
          var r = rt(e);
          return Ze.read(r, q, t, n);
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function vt(e, t) {
        if (p) return yn(18, 1, e, t);
        try {
          return (e = R(e)), (t = R(t)), Ze.rename(e, t), 0;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function bt(e) {
        if (p) return yn(19, 1, e);
        try {
          return (e = R(e)), Ze.rmdir(e), 0;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      var _t = {
        jf: function () {
          return (
            (n.websocket =
              n.websocket && "object" == typeof n.websocket ? n.websocket : {}),
            (n.websocket.Ig = {}),
            (n.websocket.on = function (e, t) {
              return "function" == typeof t && (this.Ig[e] = t), this;
            }),
            (n.websocket.emit = function (e, t) {
              "function" == typeof this.Ig[e] && this.Ig[e].call(this, t);
            }),
            Ze.createNode(null, "/", 16895, 0)
          );
        },
        createSocket: function (e, t, n) {
          return (
            (t &= -526337),
            n && O((1 == t) == (6 == n)),
            (e = {
              family: e,
              type: t,
              protocol: n,
              lf: null,
              error: null,
              ng: {},
              pending: [],
              ag: [],
              pf: _t.qf,
            }),
            (t = _t.zg()),
            ((n = Ze.createNode(_t.root, t, 49152, 0)).bg = e),
            (t = Ze.nh({
              path: t,
              node: n,
              flags: Ze.Dh("r+"),
              seekable: !1,
              df: _t.df,
            })),
            (e.stream = t),
            e
          );
        },
        mi: function (e) {
          return (e = Ze.zf(e)) && Ze.isSocket(e.node.mode) ? e.node.bg : null;
        },
        df: {
          Zf: function (e) {
            return (e = e.node.bg).pf.Zf(e);
          },
          Uf: function (e, t, n) {
            return (e = e.node.bg).pf.Uf(e, t, n);
          },
          read: function (e, t, n, r) {
            return (r = (e = e.node.bg).pf.bh(e, r))
              ? (t.set(r.buffer, n), r.buffer.length)
              : 0;
          },
          write: function (e, t, n, r) {
            return (e = e.node.bg).pf.fh(e, t, n, r);
          },
          close: function (e) {
            (e = e.node.bg).pf.close(e);
          },
        },
        zg: function () {
          return (
            _t.zg.current || (_t.zg.current = 0),
            "socket[" + _t.zg.current++ + "]"
          );
        },
        qf: {
          tg: function (e, t, r) {
            if ("object" == typeof t) {
              var i = t;
              r = t = null;
            }
            if (i)
              if (i._socket)
                (t = i._socket.remoteAddress), (r = i._socket.remotePort);
              else {
                if (!(r = /ws[s]?:\/\/([^:]+):(\d+)/.exec(i.url)))
                  throw Error(
                    "WebSocket URL must be in the format ws(s)://address:port"
                  );
                (t = r[1]), (r = parseInt(r[2], 10));
              }
            else
              try {
                var a = n.websocket && "object" == typeof n.websocket,
                  f = "ws:#".replace("#", "//");
                if (
                  (a &&
                    "string" == typeof n.websocket.url &&
                    (f = n.websocket.url),
                  "ws://" === f || "wss://" === f)
                ) {
                  var o = t.split("/");
                  f = f + o[0] + ":" + r + "/" + o.slice(1).join("/");
                }
                (o = "binary"),
                  a &&
                    "string" == typeof n.websocket.subprotocol &&
                    (o = n.websocket.subprotocol);
                var u = void 0;
                "null" !== o &&
                  ((o = o.replace(/^ +| +$/g, "").split(/ *, */)),
                  (u = d ? { protocol: o.toString() } : o)),
                  a && null === n.websocket.subprotocol && (u = void 0),
                  ((i = new (d ? require("ws") : WebSocket)(f, u)).binaryType =
                    "arraybuffer");
              } catch (e) {
                throw new Ze.af(23);
              }
            return (
              (t = { hf: t, port: r, socket: i, ug: [] }),
              _t.qf.jh(e, t),
              _t.qf.ni(e, t),
              2 === e.type &&
                void 0 !== e.Qf &&
                t.ug.push(
                  new Uint8Array([
                    255,
                    255,
                    255,
                    255,
                    112,
                    111,
                    114,
                    116,
                    (65280 & e.Qf) >> 8,
                    255 & e.Qf,
                  ])
                ),
              t
            );
          },
          vg: function (e, t, n) {
            return e.ng[t + ":" + n];
          },
          jh: function (e, t) {
            e.ng[t.hf + ":" + t.port] = t;
          },
          Hh: function (e, t) {
            delete e.ng[t.hf + ":" + t.port];
          },
          ni: function (e, t) {
            function r() {
              n.websocket.emit("open", e.stream.fd);
              try {
                for (var r = t.ug.shift(); r; )
                  t.socket.send(r), (r = t.ug.shift());
              } catch (e) {
                t.socket.close();
              }
            }
            function i(r) {
              if ("string" == typeof r) r = new TextEncoder().encode(r);
              else {
                if ((O(void 0 !== r.byteLength), 0 == r.byteLength)) return;
                r = new Uint8Array(r);
              }
              var i = a;
              (a = !1),
                i &&
                10 === r.length &&
                255 === r[0] &&
                255 === r[1] &&
                255 === r[2] &&
                255 === r[3] &&
                112 === r[4] &&
                111 === r[5] &&
                114 === r[6] &&
                116 === r[7]
                  ? ((r = (r[8] << 8) | r[9]),
                    _t.qf.Hh(e, t),
                    (t.port = r),
                    _t.qf.jh(e, t))
                  : (e.ag.push({ hf: t.hf, port: t.port, data: r }),
                    n.websocket.emit("message", e.stream.fd));
            }
            var a = !0;
            d
              ? (t.socket.on("open", r),
                t.socket.on("message", function (e, t) {
                  t.Yi && i(new Uint8Array(e).buffer);
                }),
                t.socket.on("close", function () {
                  n.websocket.emit("close", e.stream.fd);
                }),
                t.socket.on("error", function () {
                  (e.error = 14),
                    n.websocket.emit("error", [
                      e.stream.fd,
                      e.error,
                      "ECONNREFUSED: Connection refused",
                    ]);
                }))
              : ((t.socket.onopen = r),
                (t.socket.onclose = function () {
                  n.websocket.emit("close", e.stream.fd);
                }),
                (t.socket.onmessage = function (e) {
                  i(e.data);
                }),
                (t.socket.onerror = function () {
                  (e.error = 14),
                    n.websocket.emit("error", [
                      e.stream.fd,
                      e.error,
                      "ECONNREFUSED: Connection refused",
                    ]);
                }));
          },
          Zf: function (e) {
            if (1 === e.type && e.lf) return e.pending.length ? 65 : 0;
            var t = 0,
              n = 1 === e.type ? _t.qf.vg(e, e.sf, e.vf) : null;
            return (
              (e.ag.length ||
                !n ||
                (n && n.socket.readyState === n.socket.CLOSING) ||
                (n && n.socket.readyState === n.socket.CLOSED)) &&
                (t |= 65),
              (!n || (n && n.socket.readyState === n.socket.OPEN)) && (t |= 4),
              ((n && n.socket.readyState === n.socket.CLOSING) ||
                (n && n.socket.readyState === n.socket.CLOSED)) &&
                (t |= 16),
              t
            );
          },
          Uf: function (e, t, n) {
            switch (t) {
              case 21531:
                return (
                  (t = 0),
                  e.ag.length && (t = e.ag[0].data.length),
                  (V[n >> 2] = t),
                  0
                );
              default:
                return 28;
            }
          },
          close: function (e) {
            if (e.lf) {
              try {
                e.lf.close();
              } catch (e) {}
              e.lf = null;
            }
            for (var t = Object.keys(e.ng), n = 0; n < t.length; n++) {
              var r = e.ng[t[n]];
              try {
                r.socket.close();
              } catch (e) {}
              _t.qf.Hh(e, r);
            }
            return 0;
          },
          bind: function (e, t, n) {
            if (void 0 !== e.Bg || void 0 !== e.Qf) throw new Ze.af(28);
            if (((e.Bg = t), (e.Qf = n), 2 === e.type)) {
              e.lf && (e.lf.close(), (e.lf = null));
              try {
                e.pf.listen(e, 0);
              } catch (e) {
                if (!(e instanceof Ze.af)) throw e;
                if (138 !== e.ef) throw e;
              }
            }
          },
          connect: function (e, t, n) {
            if (e.lf) throw new Ze.af(138);
            if (void 0 !== e.sf && void 0 !== e.vf) {
              var r = _t.qf.vg(e, e.sf, e.vf);
              if (r) {
                if (r.socket.readyState === r.socket.CONNECTING)
                  throw new Ze.af(7);
                throw new Ze.af(30);
              }
            }
            throw (
              ((t = _t.qf.tg(e, t, n)),
              (e.sf = t.hf),
              (e.vf = t.port),
              new Ze.af(26))
            );
          },
          listen: function (e) {
            if (!d) throw new Ze.af(138);
            if (e.lf) throw new Ze.af(28);
            var t = require("ws").Server;
            (e.lf = new t({ host: e.Bg, port: e.Qf })),
              n.websocket.emit("listen", e.stream.fd),
              e.lf.on("connection", function (t) {
                if (1 === e.type) {
                  var r = _t.createSocket(e.family, e.type, e.protocol);
                  (t = _t.qf.tg(r, t)),
                    (r.sf = t.hf),
                    (r.vf = t.port),
                    e.pending.push(r),
                    n.websocket.emit("connection", r.stream.fd);
                } else _t.qf.tg(e, t), n.websocket.emit("connection", e.stream.fd);
              }),
              e.lf.on("closed", function () {
                n.websocket.emit("close", e.stream.fd), (e.lf = null);
              }),
              e.lf.on("error", function () {
                (e.error = 23),
                  n.websocket.emit("error", [
                    e.stream.fd,
                    e.error,
                    "EHOSTUNREACH: Host is unreachable",
                  ]);
              });
          },
          accept: function (e) {
            if (!e.lf) throw new Ze.af(28);
            var t = e.pending.shift();
            return (t.stream.flags = e.stream.flags), t;
          },
          ij: function (e, t) {
            if (t) {
              if (void 0 === e.sf || void 0 === e.vf) throw new Ze.af(53);
              (t = e.sf), (e = e.vf);
            } else (t = e.Bg || 0), (e = e.Qf || 0);
            return { hf: t, port: e };
          },
          fh: function (e, t, n, r, i, a) {
            if (2 === e.type) {
              if (
                ((void 0 !== i && void 0 !== a) || ((i = e.sf), (a = e.vf)),
                void 0 === i || void 0 === a)
              )
                throw new Ze.af(17);
            } else (i = e.sf), (a = e.vf);
            var f,
              o = _t.qf.vg(e, i, a);
            if (1 === e.type) {
              if (
                !o ||
                o.socket.readyState === o.socket.CLOSING ||
                o.socket.readyState === o.socket.CLOSED
              )
                throw new Ze.af(53);
              if (o.socket.readyState === o.socket.CONNECTING)
                throw new Ze.af(6);
            }
            if (
              (ArrayBuffer.isView(t) && ((n += t.byteOffset), (t = t.buffer)),
              (f =
                t instanceof SharedArrayBuffer
                  ? new Uint8Array(new Uint8Array(t.slice(n, n + r))).buffer
                  : t.slice(n, n + r)),
              2 === e.type && (!o || o.socket.readyState !== o.socket.OPEN))
            )
              return (
                (o &&
                  o.socket.readyState !== o.socket.CLOSING &&
                  o.socket.readyState !== o.socket.CLOSED) ||
                  (o = _t.qf.tg(e, i, a)),
                o.ug.push(f),
                r
              );
            try {
              return o.socket.send(f), r;
            } catch (e) {
              throw new Ze.af(28);
            }
          },
          bh: function (e, t) {
            if (1 === e.type && e.lf) throw new Ze.af(53);
            var n = e.ag.shift();
            if (!n) {
              if (1 === e.type) {
                if ((e = _t.qf.vg(e, e.sf, e.vf))) {
                  if (
                    e.socket.readyState === e.socket.CLOSING ||
                    e.socket.readyState === e.socket.CLOSED
                  )
                    return null;
                  throw new Ze.af(6);
                }
                throw new Ze.af(53);
              }
              throw new Ze.af(6);
            }
            var r = n.data.byteLength || n.data.length,
              i = n.data.byteOffset || 0,
              a = n.data.buffer || n.data;
            t = Math.min(t, r);
            var f = { buffer: new Uint8Array(a, i, t), hf: n.hf, port: n.port };
            return (
              1 === e.type &&
                t < r &&
                ((n.data = new Uint8Array(a, i + t, r - t)), e.ag.unshift(n)),
              f
            );
          },
        },
      };
      function kt(e) {
        e = e.split(".");
        for (var t = 0; 4 > t; t++) {
          var n = Number(e[t]);
          if (isNaN(n)) return null;
          e[t] = n;
        }
        return (e[0] | (e[1] << 8) | (e[2] << 16) | (e[3] << 24)) >>> 0;
      }
      function At(e) {
        var t,
          n,
          r = [];
        if (
          !/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(
            e
          )
        )
          return null;
        if ("::" === e) return [0, 0, 0, 0, 0, 0, 0, 0];
        for (
          0 <
          (e =
            0 === e.indexOf("::")
              ? e.replace("::", "Z:")
              : e.replace("::", ":Z:")).indexOf(".")
            ? (((e = (e = e.replace(/[.]/g, ":")).split(":"))[e.length - 4] =
                parseInt(e[e.length - 4]) + 256 * parseInt(e[e.length - 3])),
              (e[e.length - 3] =
                parseInt(e[e.length - 2]) + 256 * parseInt(e[e.length - 1])),
              (e = e.slice(0, e.length - 2)))
            : (e = e.split(":")),
            t = n = 0;
          t < e.length;
          t++
        )
          if ("string" == typeof e[t])
            if ("Z" === e[t]) {
              for (n = 0; n < 8 - e.length + 1; n++) r[t + n] = 0;
              --n;
            } else r[t + n] = ur(parseInt(e[t], 16));
          else r[t + n] = e[t];
        return [
          (r[1] << 16) | r[0],
          (r[3] << 16) | r[2],
          (r[5] << 16) | r[4],
          (r[7] << 16) | r[6],
        ];
      }
      var xt = 1,
        Et = {},
        jt = {};
      function St(e) {
        var t = kt(e);
        return null !== t || null !== (t = At(e))
          ? e
          : (Et[e]
              ? (t = Et[e])
              : (O(
                  65535 > (t = xt++),
                  "exceeded max address mappings of 65535"
                ),
                (jt[(t = "172.29." + (255 & t) + "." + (65280 & t))] = e),
                (Et[e] = t)),
            t);
      }
      function Mt(e) {
        return jt[e] ? jt[e] : null;
      }
      function Tt(e) {
        return (
          (255 & e) +
          "." +
          ((e >> 8) & 255) +
          "." +
          ((e >> 16) & 255) +
          "." +
          ((e >> 24) & 255)
        );
      }
      function Dt(e) {
        var t,
          n = "",
          r = 0,
          i = 0,
          a = 0,
          f = 0;
        e = [
          65535 & e[0],
          e[0] >> 16,
          65535 & e[1],
          e[1] >> 16,
          65535 & e[2],
          e[2] >> 16,
          65535 & e[3],
          e[3] >> 16,
        ];
        var o = !0;
        for (t = 0; 5 > t; t++)
          if (0 !== e[t]) {
            o = !1;
            break;
          }
        if (o) {
          if (((t = Tt(e[6] | (e[7] << 16))), -1 === e[5]))
            return "::ffff:" + t;
          if (0 === e[5])
            return (
              "0.0.0.0" === t && (t = ""),
              "0.0.0.1" === t && (t = "1"),
              "::" + t
            );
        }
        for (t = 0; 8 > t; t++)
          0 === e[t] && (1 < t - i && (f = 0), (i = t), f++),
            f > r && (a = t - (r = f) + 1);
        for (t = 0; 8 > t; t++)
          1 < r && 0 === e[t] && t >= a && t < a + r
            ? t === a && ((n += ":"), 0 === a && (n += ":"))
            : ((n += Number(or(65535 & e[t])).toString(16)),
              (n += 7 > t ? ":" : ""));
        return n;
      }
      function Ct(e, t) {
        var n = Y[e >> 1],
          r = or(X[(e + 2) >> 1]);
        switch (n) {
          case 2:
            if (16 !== t) return { ef: 28 };
            e = Tt((e = V[(e + 4) >> 2]));
            break;
          case 10:
            if (28 !== t) return { ef: 28 };
            e = Dt(
              (e = [
                V[(e + 8) >> 2],
                V[(e + 12) >> 2],
                V[(e + 16) >> 2],
                V[(e + 20) >> 2],
              ])
            );
            break;
          default:
            return { ef: 5 };
        }
        return { family: n, hf: e, port: r };
      }
      function Ft(e, t, n, r) {
        switch (t) {
          case 2:
            (n = kt(n)),
              (Y[e >> 1] = t),
              (V[(e + 4) >> 2] = n),
              (Y[(e + 2) >> 1] = ur(r));
            break;
          case 10:
            (n = At(n)),
              (V[e >> 2] = t),
              (V[(e + 8) >> 2] = n[0]),
              (V[(e + 12) >> 2] = n[1]),
              (V[(e + 16) >> 2] = n[2]),
              (V[(e + 20) >> 2] = n[3]),
              (Y[(e + 2) >> 1] = ur(r)),
              (V[(e + 4) >> 2] = 0),
              (V[(e + 24) >> 2] = 0);
            break;
          default:
            return { ef: 5 };
        }
        return {};
      }
      function Ot(e, t) {
        if (p) return yn(20, 1, e, t);
        try {
          (tt = t),
            (t = function () {
              var e = _t.mi(nt());
              if (!e) throw new Ze.af(8);
              return e;
            });
          var n = function (e) {
            var t = nt(),
              n = nt();
            if (e && 0 === t) return null;
            if ((e = Ct(t, n)).ef) throw new Ze.af(e.ef);
            return (e.hf = Mt(e.hf) || e.hf), e;
          };
          switch (e) {
            case 1:
              var r = nt(),
                i = nt(),
                a = nt(),
                f = _t.createSocket(r, i, a);
              return f.stream.fd;
            case 2:
              f = t();
              var o = n();
              return f.pf.bind(f, o.hf, o.port), 0;
            case 3:
              return (f = t()), (o = n()), f.pf.connect(f, o.hf, o.port), 0;
            case 4:
              f = t();
              var u = nt();
              return f.pf.listen(f, u), 0;
            case 5:
              f = t();
              var c = nt();
              nt();
              var s = f.pf.accept(f);
              return c && Ft(c, s.family, St(s.sf), s.vf), s.stream.fd;
            case 6:
              return (
                (f = t()),
                (c = nt()),
                nt(),
                Ft(c, f.family, St(f.Bg || "0.0.0.0"), f.Qf),
                0
              );
            case 7:
              return (
                (f = t()),
                (c = nt()),
                nt(),
                f.sf ? (Ft(c, f.family, St(f.sf), f.vf), 0) : -53
              );
            case 11:
              f = t();
              var l = nt(),
                d = nt();
              nt();
              var h = n(!0);
              return h
                ? f.pf.fh(f, q, l, d, h.hf, h.port)
                : Ze.write(f.stream, q, l, d);
            case 12:
              f = t();
              var m = nt(),
                g = nt();
              nt(), (c = nt()), nt();
              var w = f.pf.bh(f, g);
              return w
                ? (c && Ft(c, f.family, St(w.hf), w.port),
                  H.set(w.buffer, m),
                  w.buffer.byteLength)
                : 0;
            case 14:
              return -50;
            case 15:
              f = t();
              var y = nt(),
                v = nt(),
                b = nt(),
                _ = nt();
              return 1 === y && 4 === v
                ? ((V[b >> 2] = f.error), (V[_ >> 2] = 4), (f.error = null), 0)
                : -50;
            case 16:
              (f = t()), (l = nt()), nt();
              var k = V[(l + 8) >> 2],
                A = V[(l + 12) >> 2],
                x = V[l >> 2],
                E = V[(l + 4) >> 2];
              if (x) {
                if ((o = Ct(x, E)).ef) return -o.ef;
                var j = o.port;
                c = Mt(o.hf) || o.hf;
              }
              for (var S = 0, M = 0; M < A; M++) S += V[(k + (8 * M + 4)) >> 2];
              var T = new Uint8Array(S);
              for (M = d = 0; M < A; M++) {
                var D = V[(k + 8 * M) >> 2],
                  C = V[(k + (8 * M + 4)) >> 2];
                for (m = 0; m < C; m++) T[d++] = q[(D + m) >> 0];
              }
              return f.pf.fh(f, T, 0, S, c, j);
            case 17:
              for (
                f = t(),
                  l = nt(),
                  nt(),
                  k = V[(l + 8) >> 2],
                  A = V[(l + 12) >> 2],
                  M = S = 0;
                M < A;
                M++
              )
                S += V[(k + (8 * M + 4)) >> 2];
              if (!(w = f.pf.bh(f, S))) return 0;
              (x = V[l >> 2]) && Ft(x, f.family, St(w.hf), w.port), (f = 0);
              var F = w.buffer.byteLength;
              for (M = 0; 0 < F && M < A; M++)
                (D = V[(k + 8 * M) >> 2]),
                  (C = V[(k + (8 * M + 4)) >> 2]) &&
                    ((d = Math.min(C, F)),
                    (m = w.buffer.subarray(f, f + d)),
                    H.set(m, D + f),
                    (f += d),
                    (F -= d));
              return f;
            default:
              return -52;
          }
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function It(e, t) {
        if (p) return yn(21, 1, e, t);
        try {
          return (e = R(e)), et(Ze.stat, e, t);
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function Pt(e) {
        if (p) return yn(22, 1, e);
        try {
          return (e = R(e)), Ze.unlink(e), 0;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
        }
      }
      function Lt() {
        return (
          void 0 === Lt.start && (Lt.start = Date.now()),
          (1e3 * (Date.now() - Lt.start)) | 0
        );
      }
      function Rt() {
        d ||
          l ||
          (x || (x = {}),
          x[
            "Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"
          ] ||
            ((x[
              "Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"
            ] = 1),
            A(
              "Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"
            )));
      }
      function Nt(e, t, n) {
        if (0 >= e || e > q.length || 1 & e) return -28;
        if (s) {
          if (Atomics.load(V, e >> 2) != t) return -6;
          var r = performance.now();
          for (n = r + n, Atomics.exchange(V, Ce.Vf >> 2, e); ; ) {
            if ((r = performance.now()) > n)
              return Atomics.exchange(V, Ce.Vf >> 2, 0), -73;
            if (0 == (r = Atomics.exchange(V, Ce.Vf >> 2, 0))) break;
            if ((br(), Atomics.load(V, e >> 2) != t)) return -6;
            Atomics.exchange(V, Ce.Vf >> 2, e);
          }
          return 0;
        }
        if ("timed-out" === (e = Atomics.wait(V, e >> 2, t, n))) return -73;
        if ("not-equal" === e) return -6;
        if ("ok" === e) return 0;
        throw "Atomics.wait returned an unexpected value " + e;
      }
      function Bt(e) {
        var t = e.getExtension("ANGLE_instanced_arrays");
        t &&
          ((e.vertexAttribDivisor = function (e, n) {
            t.vertexAttribDivisorANGLE(e, n);
          }),
          (e.drawArraysInstanced = function (e, n, r, i) {
            t.drawArraysInstancedANGLE(e, n, r, i);
          }),
          (e.drawElementsInstanced = function (e, n, r, i, a) {
            t.drawElementsInstancedANGLE(e, n, r, i, a);
          }));
      }
      function Ut(e) {
        var t = e.getExtension("OES_vertex_array_object");
        t &&
          ((e.createVertexArray = function () {
            return t.createVertexArrayOES();
          }),
          (e.deleteVertexArray = function (e) {
            t.deleteVertexArrayOES(e);
          }),
          (e.bindVertexArray = function (e) {
            t.bindVertexArrayOES(e);
          }),
          (e.isVertexArray = function (e) {
            return t.isVertexArrayOES(e);
          }));
      }
      function zt(e) {
        var t = e.getExtension("WEBGL_draw_buffers");
        t &&
          (e.drawBuffers = function (e, n) {
            t.drawBuffersWEBGL(e, n);
          });
      }
      var Gt = 1,
        Wt = [],
        qt = [],
        Ht = [],
        Yt = [],
        Xt = [],
        Vt = [],
        Qt = [],
        Jt = [],
        $t = [],
        Zt = {},
        Kt = {},
        en = 4;
      function tn(e) {
        an || (an = e);
      }
      function nn(e) {
        for (var t = Gt++, n = e.length; n < t; n++) e[n] = null;
        return t;
      }
      function rn(e) {
        if ((e || (e = fn), !e.oi)) {
          e.oi = !0;
          var t = e.qg;
          Bt(t),
            Ut(t),
            zt(t),
            (t.uf = t.getExtension("EXT_disjoint_timer_query")),
            (t.rj = t.getExtension("WEBGL_multi_draw"));
          var n =
            "OES_texture_float OES_texture_half_float OES_standard_derivatives OES_vertex_array_object WEBGL_compressed_texture_s3tc WEBGL_depth_texture OES_element_index_uint EXT_texture_filter_anisotropic EXT_frag_depth WEBGL_draw_buffers ANGLE_instanced_arrays OES_texture_float_linear OES_texture_half_float_linear EXT_blend_minmax EXT_shader_texture_lod EXT_texture_norm16 WEBGL_compressed_texture_pvrtc EXT_color_buffer_half_float WEBGL_color_buffer_float EXT_sRGB WEBGL_compressed_texture_etc1 EXT_disjoint_timer_query WEBGL_compressed_texture_etc WEBGL_compressed_texture_astc EXT_color_buffer_float WEBGL_compressed_texture_s3tc_srgb EXT_disjoint_timer_query_webgl2 WEBKIT_WEBGL_compressed_texture_pvrtc".split(
              " "
            );
          (t.getSupportedExtensions() || []).forEach(function (e) {
            -1 != n.indexOf(e) && t.getExtension(e);
          });
        }
      }
      var an,
        fn,
        on = [];
      function un(e, t, n, r) {
        for (var i = 0; i < e; i++) {
          var a = Vn[n](),
            f = a && nn(r);
          a ? ((a.name = f), (r[f] = a)) : tn(1282), (V[(t + 4 * i) >> 2] = f);
        }
      }
      function cn(e, t, n, r, i, a, f, o) {
        (t = qt[t]),
          (e = Vn[e](t, n)) &&
            ((r = o && N(e.name, H, o, r)),
            i && (V[i >> 2] = r),
            a && (V[a >> 2] = e.size),
            f && (V[f >> 2] = e.type));
      }
      function sn(e, t) {
        (Q[e >> 2] = t), (Q[(e + 4) >> 2] = (t - Q[e >> 2]) / 4294967296);
      }
      function ln(e, t, n) {
        if (t) {
          var r = void 0;
          switch (e) {
            case 36346:
              r = 1;
              break;
            case 36344:
              return void (0 != n && 1 != n && tn(1280));
            case 36345:
              r = 0;
              break;
            case 34466:
              var i = Vn.getParameter(34467);
              r = i ? i.length : 0;
          }
          if (void 0 === r)
            switch (((i = Vn.getParameter(e)), typeof i)) {
              case "number":
                r = i;
                break;
              case "boolean":
                r = i ? 1 : 0;
                break;
              case "string":
                return void tn(1280);
              case "object":
                if (null === i)
                  switch (e) {
                    case 34964:
                    case 35725:
                    case 34965:
                    case 36006:
                    case 36007:
                    case 32873:
                    case 34229:
                    case 34068:
                      r = 0;
                      break;
                    default:
                      return void tn(1280);
                  }
                else {
                  if (
                    i instanceof Float32Array ||
                    i instanceof Uint32Array ||
                    i instanceof Int32Array ||
                    i instanceof Array
                  ) {
                    for (e = 0; e < i.length; ++e)
                      switch (n) {
                        case 0:
                          V[(t + 4 * e) >> 2] = i[e];
                          break;
                        case 2:
                          J[(t + 4 * e) >> 2] = i[e];
                          break;
                        case 4:
                          q[(t + e) >> 0] = i[e] ? 1 : 0;
                      }
                    return;
                  }
                  try {
                    r = 0 | i.name;
                  } catch (t) {
                    return (
                      tn(1280),
                      void A(
                        "GL_INVALID_ENUM in glGet" +
                          n +
                          "v: Unknown object returned from WebGL getParameter(" +
                          e +
                          ")! (error: " +
                          t +
                          ")"
                      )
                    );
                  }
                }
                break;
              default:
                return (
                  tn(1280),
                  void A(
                    "GL_INVALID_ENUM in glGet" +
                      n +
                      "v: Native code calling glGet" +
                      n +
                      "v(" +
                      e +
                      ") and it returns " +
                      i +
                      " of type " +
                      typeof i +
                      "!"
                  )
                );
            }
          switch (n) {
            case 1:
              sn(t, r);
              break;
            case 0:
              V[t >> 2] = r;
              break;
            case 2:
              J[t >> 2] = r;
              break;
            case 4:
              q[t >> 0] = r ? 1 : 0;
          }
        } else tn(1281);
      }
      function dn(e) {
        var t = B(e) + 1,
          n = rr(t);
        return N(e, H, n, t), n;
      }
      function hn(e, t, n, r) {
        if (n)
          if (
            "number" == typeof (e = Vn.getUniform(qt[e], Vt[t])) ||
            "boolean" == typeof e
          )
            switch (r) {
              case 0:
                V[n >> 2] = e;
                break;
              case 2:
                J[n >> 2] = e;
            }
          else
            for (t = 0; t < e.length; t++)
              switch (r) {
                case 0:
                  V[(n + 4 * t) >> 2] = e[t];
                  break;
                case 2:
                  J[(n + 4 * t) >> 2] = e[t];
              }
        else tn(1281);
      }
      function pn(e, t, n, r) {
        if (n)
          if (((e = Vn.getVertexAttrib(e, t)), 34975 == t))
            V[n >> 2] = e && e.name;
          else if ("number" == typeof e || "boolean" == typeof e)
            switch (r) {
              case 0:
                V[n >> 2] = e;
                break;
              case 2:
                J[n >> 2] = e;
                break;
              case 5:
                V[n >> 2] = Math.fround(e);
            }
          else
            for (t = 0; t < e.length; t++)
              switch (r) {
                case 0:
                  V[(n + 4 * t) >> 2] = e[t];
                  break;
                case 2:
                  J[(n + 4 * t) >> 2] = e[t];
                  break;
                case 5:
                  V[(n + 4 * t) >> 2] = Math.fround(e[t]);
              }
        else tn(1281);
      }
      function mn(e, t, n, r, i) {
        e =
          1 == (e -= 5120)
            ? H
            : 4 == e
            ? V
            : 6 == e
            ? J
            : 5 == e || 28922 == e
            ? Q
            : X;
        var a = 31 - Math.clz32(e.BYTES_PER_ELEMENT),
          f = en;
        return e.subarray(
          i >> a,
          (i +
            r *
              ((n *
                ({ 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4 }[t - 6402] || 1) *
                (1 << a) +
                f -
                1) &
                -f)) >>
            a
        );
      }
      var gn = [],
        wn = [];
      function yn(e, t) {
        for (
          var n = arguments.length - 2,
            r = mr(),
            i = wr(8 * n),
            a = i >> 3,
            f = 0;
          f < n;
          f++
        )
          $[a + f] = arguments[2 + f];
        return (n = xr(e, n, i, t)), gr(r), n;
      }
      var vn = [],
        bn = [],
        _n = [
          0,
          "undefined" != typeof document ? document : 0,
          "undefined" != typeof window ? window : 0,
        ];
      function kn(e) {
        return (
          (e = 2 < e ? R(e) : e),
          _n[e] ||
            ("undefined" != typeof document
              ? document.querySelector(e)
              : void 0)
        );
      }
      function An(e, t, n) {
        var r = kn(e);
        if (!r) return -4;
        if (
          (r.sg && ((V[r.sg >> 2] = t), (V[(r.sg + 4) >> 2] = n)),
          !r.Fh && r.aj)
        ) {
          if (r.sg) {
            (e = e ? R(e) : ""), (r = V[(r.sg + 8) >> 2]);
            var i = mr(),
              a = wr(12),
              f = 0;
            return (
              e && (f = dn(e)),
              (V[a >> 2] = f),
              (V[(a + 4) >> 2] = t),
              (V[(a + 8) >> 2] = n),
              Er(0, r, 657457152, 0, f, a),
              gr(i),
              1
            );
          }
          return -4;
        }
        return (
          r.Fh && (r = r.Fh),
          (e = !1),
          r.rg &&
            r.rg.qg &&
            (e =
              0 === (e = r.rg.qg.getParameter(2978))[0] &&
              0 === e[1] &&
              e[2] === r.width &&
              e[3] === r.height),
          (r.width = t),
          (r.height = n),
          e && r.rg.qg.viewport(0, 0, t, n),
          0
        );
      }
      function xn(e, t, n) {
        return p ? yn(23, 1, e, t, n) : An(e, t, n);
      }
      var En,
        jn = ["default", "low-power", "high-performance"],
        Sn = {};
      function Mn() {
        if (!En) {
          var e,
            t = {
              USER: "web_user",
              LOGNAME: "web_user",
              PATH: "/",
              PWD: "/",
              HOME: "/home/web_user",
              LANG:
                (
                  ("object" == typeof navigator &&
                    navigator.languages &&
                    navigator.languages[0]) ||
                  "C"
                ).replace("-", "_") + ".UTF-8",
              _: u || "./this.program",
            };
          for (e in Sn) t[e] = Sn[e];
          var n = [];
          for (e in t) n.push(e + "=" + t[e]);
          En = n;
        }
        return En;
      }
      function Tn(e) {
        if (p) return yn(24, 1, e);
        try {
          var t = rt(e);
          return Ze.close(t), 0;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), e.ef;
        }
      }
      function Dn(e, t) {
        if (p) return yn(25, 1, e, t);
        try {
          var n = rt(e);
          return (
            (q[t >> 0] = n.tty ? 2 : Ze.kf(n.mode) ? 3 : Ze.Mf(n.mode) ? 7 : 4),
            0
          );
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), e.ef;
        }
      }
      function Cn(e, t, n, r) {
        if (p) return yn(26, 1, e, t, n, r);
        try {
          e: {
            for (var i = rt(e), a = (e = 0); a < n; a++) {
              var f = V[(t + (8 * a + 4)) >> 2],
                o = Ze.read(i, q, V[(t + 8 * a) >> 2], f, void 0);
              if (0 > o) {
                var u = -1;
                break e;
              }
              if (((e += o), o < f)) break;
            }
            u = e;
          }
          return (V[r >> 2] = u), 0;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), e.ef;
        }
      }
      function Fn(e, t, n, r, i) {
        if (p) return yn(27, 1, e, t, n, r, i);
        try {
          var a = rt(e);
          return -9007199254740992 >= (e = 4294967296 * n + (t >>> 0)) ||
            9007199254740992 <= e
            ? -61
            : (Ze.tf(a, e, r),
              (ve = [
                a.position >>> 0,
                ((ye = a.position),
                1 <= +Math.abs(ye)
                  ? 0 < ye
                    ? (0 |
                        Math.min(+Math.floor(ye / 4294967296), 4294967295)) >>>
                      0
                    : ~~+Math.ceil((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
                  : 0),
              ]),
              (V[i >> 2] = ve[0]),
              (V[(i + 4) >> 2] = ve[1]),
              a.Lf && 0 === e && 0 === r && (a.Lf = null),
              0);
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), e.ef;
        }
      }
      function On(e, t, n, r) {
        if (p) return yn(28, 1, e, t, n, r);
        try {
          e: {
            for (var i = rt(e), a = (e = 0); a < n; a++) {
              var f = Ze.write(
                i,
                q,
                V[(t + 8 * a) >> 2],
                V[(t + (8 * a + 4)) >> 2],
                void 0
              );
              if (0 > f) {
                var o = -1;
                break e;
              }
              e += f;
            }
            o = e;
          }
          return (V[r >> 2] = o), 0;
        } catch (e) {
          return (void 0 !== Ze && e instanceof Ze.af) || de(e), e.ef;
        }
      }
      var In = {};
      function Pn(e) {
        Pn.buffer ||
          ((Pn.buffer = rr(256)),
          (In[0] = "Success"),
          (In[-1] = "Invalid value for 'ai_flags' field"),
          (In[-2] = "NAME or SERVICE is unknown"),
          (In[-3] = "Temporary failure in name resolution"),
          (In[-4] = "Non-recoverable failure in name res"),
          (In[-6] = "'ai_family' not supported"),
          (In[-7] = "'ai_socktype' not supported"),
          (In[-8] = "SERVICE not supported for 'ai_socktype'"),
          (In[-10] = "Memory allocation failure"),
          (In[-11] = "System error returned in 'errno'"),
          (In[-12] = "Argument buffer overflow"));
        var t = "Unknown error";
        return (
          e in In && (t = 255 < In[e].length ? "Message too long" : In[e]),
          G(t, Pn.buffer),
          Pn.buffer
        );
      }
      function Ln(e, t, n, r) {
        function i(e, t, n, r, i, a) {
          var f = 10 === e ? 28 : 16;
          return (
            (i = 10 === e ? Dt(i) : Tt(i)),
            O(!(i = Ft((f = rr(f)), e, i, a)).ef),
            (i = rr(32)),
            (V[(i + 4) >> 2] = e),
            (V[(i + 8) >> 2] = t),
            (V[(i + 12) >> 2] = n),
            (V[(i + 24) >> 2] = r),
            (V[(i + 20) >> 2] = f),
            (V[(i + 16) >> 2] = 10 === e ? 28 : 16),
            (V[(i + 28) >> 2] = 0),
            i
          );
        }
        if (p) return yn(29, 1, e, t, n, r);
        var a = 0,
          f = 0,
          o = 0,
          u = 0,
          c = 0,
          s = 0;
        if (
          (n &&
            ((o = V[n >> 2]),
            (u = V[(n + 4) >> 2]),
            (c = V[(n + 8) >> 2]),
            (s = V[(n + 12) >> 2])),
          c && !s && (s = 2 === c ? 17 : 6),
          !c && s && (c = 17 === s ? 2 : 1),
          0 === s && (s = 6),
          0 === c && (c = 1),
          !e && !t)
        )
          return -2;
        if (-1088 & o || (0 !== n && 2 & V[n >> 2] && !e)) return -1;
        if (32 & o) return -2;
        if (0 !== c && 1 !== c && 2 !== c) return -7;
        if (0 !== u && 2 !== u && 10 !== u) return -6;
        if (t && ((t = R(t)), (f = parseInt(t, 10)), isNaN(f)))
          return 1024 & o ? -2 : -8;
        if (!e)
          return (
            0 === u && (u = 2),
            0 == (1 & o) && (a = 2 === u ? lr(2130706433) : [0, 0, 0, 1]),
            (e = i(u, c, s, null, a, f)),
            (V[r >> 2] = e),
            0
          );
        if (null !== (a = kt((e = R(e)))))
          if (0 === u || 2 === u) u = 2;
          else {
            if (!(10 === u && 8 & o)) return -2;
            (a = [0, 0, lr(65535), a]), (u = 10);
          }
        else if (null !== (a = At(e))) {
          if (0 !== u && 10 !== u) return -2;
          u = 10;
        }
        return null != a
          ? ((e = i(u, c, s, e, a, f)), (V[r >> 2] = e), 0)
          : 4 & o
          ? -2
          : ((a = kt((e = St(e)))),
            0 === u ? (u = 2) : 10 === u && (a = [0, 0, lr(65535), a]),
            (e = i(u, c, s, null, a, f)),
            (V[r >> 2] = e),
            0);
      }
      function Rn(e) {
        if (p)
          throw "Internal Error! spawnThread() can only ever be called from main application thread!";
        var t = Ce.li();
        if (void 0 !== t.yf) throw "Internal error!";
        if (!e.$f) throw "Internal error, no pthread ptr!";
        Ce.Kf.push(t);
        for (var n = rr(512), r = 0; 128 > r; ++r) V[(n + 4 * r) >> 2] = 0;
        var i = e.Rf + e.cg,
          a =
            (r = Ce.Ef[e.$f] =
              {
                worker: t,
                Rf: e.Rf,
                cg: e.cg,
                Kg: e.Kg,
                Lh: e.$f,
                threadInfoStruct: e.$f,
              }).threadInfoStruct >> 2;
        Atomics.store(Q, a, 0),
          Atomics.store(Q, a + 1, 0),
          Atomics.store(Q, a + 2, 0),
          Atomics.store(Q, a + 17, e.detached),
          Atomics.store(Q, a + 26, n),
          Atomics.store(Q, a + 12, 0),
          Atomics.store(Q, a + 10, r.threadInfoStruct),
          Atomics.store(Q, a + 11, 42),
          Atomics.store(Q, a + 27, e.cg),
          Atomics.store(Q, a + 21, e.cg),
          Atomics.store(Q, a + 20, i),
          Atomics.store(Q, a + 29, i),
          Atomics.store(Q, a + 30, e.detached),
          Atomics.store(Q, a + 32, e.Ih),
          Atomics.store(Q, a + 33, e.Jh),
          (n = sr() + 40),
          Atomics.store(Q, a + 44, n),
          (t.yf = r);
        var f = {
          cmd: "run",
          start_routine: e.Mi,
          arg: e.Tf,
          threadInfoStruct: e.$f,
          selfThreadId: e.$f,
          parentThreadId: e.Fi,
          stackBase: e.Rf,
          stackSize: e.cg,
        };
        (t.og = function () {
          (f.time = performance.now()), t.postMessage(f, e.Vi);
        }),
          t.loaded && (t.og(), delete t.og);
      }
      function Nn() {
        return 0 | Ae;
      }
      function Bn(e, t) {
        if (!e)
          return A("pthread_join attempted on a null thread pointer!"), 71;
        if (p && C == e)
          return A("PThread " + e + " is attempting to join to itself!"), 16;
        if (!p && Ce.xf == e)
          return (
            A("Main thread " + e + " is attempting to join to itself!"), 16
          );
        if (V[(e + 12) >> 2] !== e)
          return (
            A(
              "pthread_join attempted on thread " +
                e +
                ", which does not point to a valid thread, or does not exist anymore!"
            ),
            71
          );
        if (Atomics.load(Q, (e + 68) >> 2))
          return (
            A(
              "Attempted to join thread " + e + ", which was already detached!"
            ),
            28
          );
        for (Rt(); ; ) {
          var n = Atomics.load(Q, e >> 2);
          if (1 == n)
            return (
              (n = Atomics.load(Q, (e + 4) >> 2)),
              t && (V[t >> 2] = n),
              Atomics.store(Q, (e + 68) >> 2, 1),
              p ? postMessage({ cmd: "cleanupThread", thread: e }) : Te(e),
              0
            );
          if (
            p &&
            D &&
            !Atomics.load(Q, (D + 60) >> 2) &&
            2 == Atomics.load(Q, (D + 0) >> 2)
          )
            throw "Canceled!";
          p || br(), Nt(e, n, p ? 100 : 1);
        }
      }
      function Un(e) {
        return 0 == e % 4 && (0 != e % 100 || 0 == e % 400);
      }
      function zn(e, t) {
        for (var n = 0, r = 0; r <= t; n += e[r++]);
        return n;
      }
      n._pthread_self = Nn;
      var Gn = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        Wn = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function qn(e, t) {
        for (e = new Date(e.getTime()); 0 < t; ) {
          var n = e.getMonth(),
            r = (Un(e.getFullYear()) ? Gn : Wn)[n];
          if (!(t > r - e.getDate())) {
            e.setDate(e.getDate() + t);
            break;
          }
          (t -= r - e.getDate() + 1),
            e.setDate(1),
            11 > n
              ? e.setMonth(n + 1)
              : (e.setMonth(0), e.setFullYear(e.getFullYear() + 1));
        }
        return e;
      }
      function Hn(e) {
        if (p) return yn(30, 1, e);
        switch (e) {
          case 30:
            return 16384;
          case 85:
            return H.length / 16384;
          case 132:
          case 133:
          case 12:
          case 137:
          case 138:
          case 15:
          case 235:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 149:
          case 13:
          case 10:
          case 236:
          case 153:
          case 9:
          case 21:
          case 22:
          case 159:
          case 154:
          case 14:
          case 77:
          case 78:
          case 139:
          case 80:
          case 81:
          case 82:
          case 68:
          case 67:
          case 164:
          case 11:
          case 29:
          case 47:
          case 48:
          case 95:
          case 52:
          case 51:
          case 46:
          case 79:
            return 200809;
          case 27:
          case 246:
          case 127:
          case 128:
          case 23:
          case 24:
          case 160:
          case 161:
          case 181:
          case 182:
          case 242:
          case 183:
          case 184:
          case 243:
          case 244:
          case 245:
          case 165:
          case 178:
          case 179:
          case 49:
          case 50:
          case 168:
          case 169:
          case 175:
          case 170:
          case 171:
          case 172:
          case 97:
          case 76:
          case 32:
          case 173:
          case 35:
            return -1;
          case 176:
          case 177:
          case 7:
          case 155:
          case 8:
          case 157:
          case 125:
          case 126:
          case 92:
          case 93:
          case 129:
          case 130:
          case 131:
          case 94:
          case 91:
            return 1;
          case 74:
          case 60:
          case 69:
          case 70:
          case 4:
            return 1024;
          case 31:
          case 42:
          case 72:
            return 32;
          case 87:
          case 26:
          case 33:
            return 2147483647;
          case 34:
          case 1:
            return 47839;
          case 38:
          case 36:
            return 99;
          case 43:
          case 37:
            return 2048;
          case 0:
            return 2097152;
          case 3:
            return 65536;
          case 28:
            return 32768;
          case 44:
            return 32767;
          case 75:
            return 16384;
          case 39:
            return 1e3;
          case 89:
            return 700;
          case 71:
            return 256;
          case 40:
            return 255;
          case 2:
            return 100;
          case 180:
            return 64;
          case 25:
            return 20;
          case 5:
            return 16;
          case 6:
            return 6;
          case 73:
            return 4;
          case 84:
            return (
              ("object" == typeof navigator && navigator.hardwareConcurrency) ||
              1
            );
        }
        return Fe(28), -1;
      }
      function Yn(e, t, n, r) {
        e || (e = this),
          (this.parent = e),
          (this.jf = e.jf),
          (this.lg = null),
          (this.id = Ze.Ai++),
          (this.name = t),
          (this.mode = n),
          (this.cf = {}),
          (this.df = {}),
          (this.rdev = r);
      }
      Object.defineProperties(Yn.prototype, {
        read: {
          get: function () {
            return 365 == (365 & this.mode);
          },
          set: function (e) {
            e ? (this.mode |= 365) : (this.mode &= -366);
          },
        },
        write: {
          get: function () {
            return 146 == (146 & this.mode);
          },
          set: function (e) {
            e ? (this.mode |= 146) : (this.mode &= -147);
          },
        },
        ti: {
          get: function () {
            return Ze.kf(this.mode);
          },
        },
        Ug: {
          get: function () {
            return Ze.hg(this.mode);
          },
        },
      }),
        (Ze.Oh = Yn),
        Ze.Ni();
      for (var Xn, Vn, Qn = 0; 32 > Qn; ++Qn) on.push(Array(Qn));
      var Jn = new Float32Array(288);
      for (Qn = 0; 288 > Qn; ++Qn) gn[Qn] = Jn.subarray(0, Qn + 1);
      var $n = new Int32Array(288);
      for (Qn = 0; 288 > Qn; ++Qn) wn[Qn] = $n.subarray(0, Qn + 1);
      var Zn = [
        null,
        Ie,
        Le,
        it,
        at,
        ft,
        ot,
        ut,
        ct,
        st,
        lt,
        dt,
        ht,
        pt,
        mt,
        gt,
        wt,
        yt,
        vt,
        bt,
        Ot,
        It,
        Pt,
        xn,
        Tn,
        Dn,
        Cn,
        Fn,
        On,
        Ln,
        Hn,
      ];
      function Kn(e, t) {
        var n = Array(B(e) + 1);
        return (e = N(e, n, 0, n.length)), t && (n.length = e), n;
      }
      p ||
        ne.push({
          vh: function () {
            tr();
          },
        });
      var er = {
        c: function (e, t, n, r) {
          de(
            "Assertion failed: " +
              R(e) +
              ", at: " +
              [t ? R(t) : "unknown filename", n, r ? R(r) : "unknown function"]
          );
        },
        K: function (e, t) {
          if (((e = cr(e, t)), !j))
            return postMessage({ cmd: "exitProcess", returnCode: e }), e;
        },
        W: function (e, t) {
          return Oe(e, t);
        },
        aa: function (e, t) {
          return Ie(e, t);
        },
        va: function (e, t) {
          return Pe(e, t);
        },
        ua: function (e, t) {
          return Re(e, t);
        },
        Ma: it,
        Ea: at,
        u: ft,
        Na: ot,
        Ka: ut,
        Ha: ct,
        V: st,
        Oa: lt,
        Pa: dt,
        ya: ht,
        Aa: function () {
          return 0;
        },
        za: pt,
        Da: function () {
          return -63;
        },
        Y: mt,
        La: gt,
        Ja: wt,
        Ca: yt,
        wa: vt,
        Ga: bt,
        Ia: function () {
          return 0;
        },
        t: Ot,
        X: It,
        Fa: function (e) {
          try {
            if (!e) return -21;
            var t = {
              __size__: 390,
              sysname: 0,
              nodename: 65,
              release: 130,
              version: 195,
              machine: 260,
              domainname: 325,
            };
            return (
              G("Emscripten", e + t.sysname),
              G("emscripten", e + t.nodename),
              G("1.0", e + t.release),
              G("#1", e + t.version),
              G("x86-JS", e + t.machine),
              0
            );
          } catch (e) {
            return (void 0 !== Ze && e instanceof Ze.af) || de(e), -e.ef;
          }
        },
        Ba: Pt,
        pa: function (e, t) {
          if (e == t) postMessage({ cmd: "processQueuedMainThreadWork" });
          else if (p)
            postMessage({ targetThread: e, cmd: "processThreadQueue" });
          else {
            if (!(e = (e = Ce.Ef[e]) && e.worker)) return;
            e.postMessage({ cmd: "processThreadQueue" });
          }
          return 1;
        },
        b: function () {
          de();
        },
        Qa: Lt,
        Ta: Oe,
        $: function () {
          de(
            "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
          );
        },
        Ua: function () {
          de(
            "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
          );
        },
        F: function (e, t, n) {
          var r;
          for (bn.length = 0, n >>= 2; (r = H[t++]); )
            (r = 105 > r) && 1 & n && n++, bn.push(r ? $[n++ >> 1] : V[n]), ++n;
          return be[e].apply(null, bn);
        },
        qa: Rt,
        I: function () {},
        A: Nt,
        p: Se,
        z: De,
        Ed: function (e) {
          Vn.activeTexture(e);
        },
        Dd: function (e, t) {
          Vn.attachShader(qt[e], Qt[t]);
        },
        ea: function (e, t) {
          Vn.uf.beginQueryEXT(e, $t[t]);
        },
        Cd: function (e, t, n) {
          Vn.bindAttribLocation(qt[e], t, R(n));
        },
        Bd: function (e, t) {
          Vn.bindBuffer(e, Wt[t]);
        },
        Ad: function (e, t) {
          Vn.bindFramebuffer(e, Ht[t]);
        },
        zd: function (e, t) {
          Vn.bindRenderbuffer(e, Yt[t]);
        },
        yd: function (e, t) {
          Vn.bindTexture(e, Xt[t]);
        },
        Md: function (e) {
          Vn.bindVertexArray(Jt[e]);
        },
        xd: function (e, t, n, r) {
          Vn.blendColor(e, t, n, r);
        },
        wd: function (e) {
          Vn.blendEquation(e);
        },
        vd: function (e, t) {
          Vn.blendEquationSeparate(e, t);
        },
        ud: function (e, t) {
          Vn.blendFunc(e, t);
        },
        td: function (e, t, n, r) {
          Vn.blendFuncSeparate(e, t, n, r);
        },
        sd: function (e, t, n, r) {
          Vn.bufferData(e, n ? H.subarray(n, n + t) : t, r);
        },
        rd: function (e, t, n, r) {
          Vn.bufferSubData(e, t, H.subarray(r, r + n));
        },
        qd: function (e) {
          return Vn.checkFramebufferStatus(e);
        },
        pd: function (e) {
          Vn.clear(e);
        },
        od: function (e, t, n, r) {
          Vn.clearColor(e, t, n, r);
        },
        nd: function (e) {
          Vn.clearDepth(e);
        },
        md: function (e) {
          Vn.clearStencil(e);
        },
        ld: function (e, t, n, r) {
          Vn.colorMask(!!e, !!t, !!n, !!r);
        },
        kd: function (e) {
          Vn.compileShader(Qt[e]);
        },
        jd: function (e, t, n, r, i, a, f, o) {
          Vn.compressedTexImage2D(
            e,
            t,
            n,
            r,
            i,
            a,
            o ? H.subarray(o, o + f) : null
          );
        },
        id: function (e, t, n, r, i, a, f, o, u) {
          Vn.compressedTexSubImage2D(
            e,
            t,
            n,
            r,
            i,
            a,
            f,
            u ? H.subarray(u, u + o) : null
          );
        },
        hd: function (e, t, n, r, i, a, f, o) {
          Vn.copyTexImage2D(e, t, n, r, i, a, f, o);
        },
        gd: function (e, t, n, r, i, a, f, o) {
          Vn.copyTexSubImage2D(e, t, n, r, i, a, f, o);
        },
        fd: function () {
          var e = nn(qt),
            t = Vn.createProgram();
          return (t.name = e), (qt[e] = t), e;
        },
        ed: function (e) {
          var t = nn(Qt);
          return (Qt[t] = Vn.createShader(e)), t;
        },
        dd: function (e) {
          Vn.cullFace(e);
        },
        cd: function (e, t) {
          for (var n = 0; n < e; n++) {
            var r = V[(t + 4 * n) >> 2],
              i = Wt[r];
            i && (Vn.deleteBuffer(i), (i.name = 0), (Wt[r] = null));
          }
        },
        bd: function (e, t) {
          for (var n = 0; n < e; ++n) {
            var r = V[(t + 4 * n) >> 2],
              i = Ht[r];
            i && (Vn.deleteFramebuffer(i), (i.name = 0), (Ht[r] = null));
          }
        },
        ad: function (e) {
          if (e) {
            var t = qt[e];
            t
              ? (Vn.deleteProgram(t),
                (t.name = 0),
                (qt[e] = null),
                (Zt[e] = null))
              : tn(1281);
          }
        },
        ga: function (e, t) {
          for (var n = 0; n < e; n++) {
            var r = V[(t + 4 * n) >> 2],
              i = $t[r];
            i && (Vn.uf.deleteQueryEXT(i), ($t[r] = null));
          }
        },
        $c: function (e, t) {
          for (var n = 0; n < e; n++) {
            var r = V[(t + 4 * n) >> 2],
              i = Yt[r];
            i && (Vn.deleteRenderbuffer(i), (i.name = 0), (Yt[r] = null));
          }
        },
        _c: function (e) {
          if (e) {
            var t = Qt[e];
            t ? (Vn.deleteShader(t), (Qt[e] = null)) : tn(1281);
          }
        },
        Zc: function (e, t) {
          for (var n = 0; n < e; n++) {
            var r = V[(t + 4 * n) >> 2],
              i = Xt[r];
            i && (Vn.deleteTexture(i), (i.name = 0), (Xt[r] = null));
          }
        },
        Ld: function (e, t) {
          for (var n = 0; n < e; n++) {
            var r = V[(t + 4 * n) >> 2];
            Vn.deleteVertexArray(Jt[r]), (Jt[r] = null);
          }
        },
        Yc: function (e) {
          Vn.depthFunc(e);
        },
        Xc: function (e) {
          Vn.depthMask(!!e);
        },
        Wc: function (e, t) {
          Vn.depthRange(e, t);
        },
        Vc: function (e, t) {
          Vn.detachShader(qt[e], Qt[t]);
        },
        Uc: function (e) {
          Vn.disable(e);
        },
        Tc: function (e) {
          Vn.disableVertexAttribArray(e);
        },
        Sc: function (e, t, n) {
          Vn.drawArrays(e, t, n);
        },
        Hd: function (e, t, n, r) {
          Vn.drawArraysInstanced(e, t, n, r);
        },
        Id: function (e, t) {
          for (var n = on[e], r = 0; r < e; r++) n[r] = V[(t + 4 * r) >> 2];
          Vn.drawBuffers(n);
        },
        Rc: function (e, t, n, r) {
          Vn.drawElements(e, t, n, r);
        },
        Gd: function (e, t, n, r, i) {
          Vn.drawElementsInstanced(e, t, n, r, i);
        },
        Qc: function (e) {
          Vn.enable(e);
        },
        Pc: function (e) {
          Vn.enableVertexAttribArray(e);
        },
        da: function (e) {
          Vn.uf.endQueryEXT(e);
        },
        Oc: function () {
          Vn.finish();
        },
        Nc: function () {
          Vn.flush();
        },
        Mc: function (e, t, n, r) {
          Vn.framebufferRenderbuffer(e, t, n, Yt[r]);
        },
        Lc: function (e, t, n, r, i) {
          Vn.framebufferTexture2D(e, t, n, Xt[r], i);
        },
        Kc: function (e) {
          Vn.frontFace(e);
        },
        Jc: function (e, t) {
          un(e, t, "createBuffer", Wt);
        },
        Hc: function (e, t) {
          un(e, t, "createFramebuffer", Ht);
        },
        ha: function (e, t) {
          for (var n = 0; n < e; n++) {
            var r = Vn.uf.createQueryEXT();
            if (!r) {
              for (tn(1282); n < e; ) V[(t + 4 * n++) >> 2] = 0;
              break;
            }
            var i = nn($t);
            (r.name = i), ($t[i] = r), (V[(t + 4 * n) >> 2] = i);
          }
        },
        Gc: function (e, t) {
          un(e, t, "createRenderbuffer", Yt);
        },
        Fc: function (e, t) {
          un(e, t, "createTexture", Xt);
        },
        Kd: function (e, t) {
          un(e, t, "createVertexArray", Jt);
        },
        Ic: function (e) {
          Vn.generateMipmap(e);
        },
        Ec: function (e, t, n, r, i, a, f) {
          cn("getActiveAttrib", e, t, n, r, i, a, f);
        },
        Dc: function (e, t, n, r, i, a, f) {
          cn("getActiveUniform", e, t, n, r, i, a, f);
        },
        Cc: function (e, t, n, r) {
          var i = (e = Vn.getAttachedShaders(qt[e])).length;
          for (i > t && (i = t), V[n >> 2] = i, t = 0; t < i; ++t)
            V[(r + 4 * t) >> 2] = Qt.indexOf(e[t]);
        },
        Bc: function (e, t) {
          return Vn.getAttribLocation(qt[e], R(t));
        },
        Ac: function (e, t) {
          ln(e, t, 4);
        },
        zc: function (e, t, n) {
          n ? (V[n >> 2] = Vn.getBufferParameter(e, t)) : tn(1281);
        },
        yc: function () {
          var e = Vn.getError() || an;
          return (an = 0), e;
        },
        xc: function (e, t) {
          ln(e, t, 2);
        },
        wc: function (e, t, n, r) {
          ((e = Vn.getFramebufferAttachmentParameter(e, t, n)) instanceof
            WebGLRenderbuffer ||
            e instanceof WebGLTexture) &&
            (e = 0 | e.name),
            (V[r >> 2] = e);
        },
        vc: function (e, t) {
          ln(e, t, 0);
        },
        tc: function (e, t, n, r) {
          null === (e = Vn.getProgramInfoLog(qt[e])) && (e = "(unknown error)"),
            (t = 0 < t && r ? N(e, H, r, t) : 0),
            n && (V[n >> 2] = t);
        },
        uc: function (e, t, n) {
          if (n)
            if (e >= Gt) tn(1281);
            else {
              var r = Zt[e];
              if (r)
                if (35716 == t)
                  null === (e = Vn.getProgramInfoLog(qt[e])) &&
                    (e = "(unknown error)"),
                    (V[n >> 2] = e.length + 1);
                else if (35719 == t) V[n >> 2] = r.Xg;
                else if (35722 == t) {
                  if (-1 == r.jg) {
                    e = qt[e];
                    var i = Vn.getProgramParameter(e, 35721);
                    for (t = r.jg = 0; t < i; ++t)
                      r.jg = Math.max(
                        r.jg,
                        Vn.getActiveAttrib(e, t).name.length + 1
                      );
                  }
                  V[n >> 2] = r.jg;
                } else if (35381 == t) {
                  if (-1 == r.kg)
                    for (
                      e = qt[e],
                        i = Vn.getProgramParameter(e, 35382),
                        t = r.kg = 0;
                      t < i;
                      ++t
                    )
                      r.kg = Math.max(
                        r.kg,
                        Vn.getActiveUniformBlockName(e, t).length + 1
                      );
                  V[n >> 2] = r.kg;
                } else V[n >> 2] = Vn.getProgramParameter(qt[e], t);
              else tn(1282);
            }
          else tn(1281);
        },
        Od: function (e, t, n) {
          n
            ? sn(
                n,
                "boolean" == typeof (e = Vn.uf.getQueryObjectEXT($t[e], t))
                  ? e
                    ? 1
                    : 0
                  : e
              )
            : tn(1281);
        },
        Qd: function (e, t, n) {
          var r;
          n
            ? ((r =
                "boolean" == typeof (e = Vn.uf.getQueryObjectEXT($t[e], t))
                  ? e
                    ? 1
                    : 0
                  : e),
              (V[n >> 2] = r))
            : tn(1281);
        },
        Nd: function (e, t, n) {
          n
            ? sn(
                n,
                "boolean" == typeof (e = Vn.uf.getQueryObjectEXT($t[e], t))
                  ? e
                    ? 1
                    : 0
                  : e
              )
            : tn(1281);
        },
        Pd: function (e, t, n) {
          var r;
          n
            ? ((r =
                "boolean" == typeof (e = Vn.uf.getQueryObjectEXT($t[e], t))
                  ? e
                    ? 1
                    : 0
                  : e),
              (V[n >> 2] = r))
            : tn(1281);
        },
        Rd: function (e, t, n) {
          n ? (V[n >> 2] = Vn.uf.getQueryEXT(e, t)) : tn(1281);
        },
        sc: function (e, t, n) {
          n ? (V[n >> 2] = Vn.getRenderbufferParameter(e, t)) : tn(1281);
        },
        qc: function (e, t, n, r) {
          null === (e = Vn.getShaderInfoLog(Qt[e])) && (e = "(unknown error)"),
            (t = 0 < t && r ? N(e, H, r, t) : 0),
            n && (V[n >> 2] = t);
        },
        pc: function (e, t, n, r) {
          (e = Vn.getShaderPrecisionFormat(e, t)),
            (V[n >> 2] = e.rangeMin),
            (V[(n + 4) >> 2] = e.rangeMax),
            (V[r >> 2] = e.precision);
        },
        oc: function (e, t, n, r) {
          (e = Vn.getShaderSource(Qt[e])) &&
            ((t = 0 < t && r ? N(e, H, r, t) : 0), n && (V[n >> 2] = t));
        },
        rc: function (e, t, n) {
          n
            ? 35716 == t
              ? (null === (e = Vn.getShaderInfoLog(Qt[e])) &&
                  (e = "(unknown error)"),
                (V[n >> 2] = e ? e.length + 1 : 0))
              : 35720 == t
              ? ((e = Vn.getShaderSource(Qt[e])),
                (V[n >> 2] = e ? e.length + 1 : 0))
              : (V[n >> 2] = Vn.getShaderParameter(Qt[e], t))
            : tn(1281);
        },
        nc: function (e) {
          if (Kt[e]) return Kt[e];
          switch (e) {
            case 7939:
              var t = Vn.getSupportedExtensions() || [];
              t = dn(
                (t = t.concat(
                  t.map(function (e) {
                    return "GL_" + e;
                  })
                )).join(" ")
              );
              break;
            case 7936:
            case 7937:
            case 37445:
            case 37446:
              (t = Vn.getParameter(e)) || tn(1280), (t = dn(t));
              break;
            case 7938:
              t = dn("OpenGL ES 2.0 (" + Vn.getParameter(7938) + ")");
              break;
            case 35724:
              var n = (t = Vn.getParameter(35724)).match(
                /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/
              );
              null !== n &&
                (3 == n[1].length && (n[1] += "0"),
                (t = "OpenGL ES GLSL ES " + n[1] + " (" + t + ")")),
                (t = dn(t));
              break;
            default:
              return tn(1280), 0;
          }
          return (Kt[e] = t);
        },
        mc: function (e, t, n) {
          n ? (J[n >> 2] = Vn.getTexParameter(e, t)) : tn(1281);
        },
        lc: function (e, t, n) {
          n ? (V[n >> 2] = Vn.getTexParameter(e, t)) : tn(1281);
        },
        ic: function (e, t) {
          var n = 0;
          if ("]" == (t = R(t))[t.length - 1]) {
            var r = t.lastIndexOf("[");
            (n = "]" != t[r + 1] ? parseInt(t.slice(r + 1)) : 0),
              (t = t.slice(0, r));
          }
          return (e = Zt[e] && Zt[e].Nh[t]) && 0 <= n && n < e[0]
            ? e[1] + n
            : -1;
        },
        kc: function (e, t, n) {
          hn(e, t, n, 2);
        },
        jc: function (e, t, n) {
          hn(e, t, n, 0);
        },
        fc: function (e, t, n) {
          n ? (V[n >> 2] = Vn.getVertexAttribOffset(e, t)) : tn(1281);
        },
        hc: function (e, t, n) {
          pn(e, t, n, 2);
        },
        gc: function (e, t, n) {
          pn(e, t, n, 5);
        },
        ec: function (e, t) {
          Vn.hint(e, t);
        },
        dc: function (e) {
          return (e = Wt[e]) ? Vn.isBuffer(e) : 0;
        },
        cc: function (e) {
          return Vn.isEnabled(e);
        },
        bc: function (e) {
          return (e = Ht[e]) ? Vn.isFramebuffer(e) : 0;
        },
        ac: function (e) {
          return (e = qt[e]) ? Vn.isProgram(e) : 0;
        },
        fa: function (e) {
          return (e = $t[e]) ? Vn.uf.isQueryEXT(e) : 0;
        },
        $b: function (e) {
          return (e = Yt[e]) ? Vn.isRenderbuffer(e) : 0;
        },
        _b: function (e) {
          return (e = Qt[e]) ? Vn.isShader(e) : 0;
        },
        Zb: function (e) {
          return (e = Xt[e]) ? Vn.isTexture(e) : 0;
        },
        Jd: function (e) {
          return (e = Jt[e]) ? Vn.isVertexArray(e) : 0;
        },
        Yb: function (e) {
          Vn.lineWidth(e);
        },
        Xb: function (e) {
          Vn.linkProgram(qt[e]);
          for (
            var t = qt[e],
              n = (e = Zt[e] = { Nh: {}, Xg: 0, jg: -1, kg: -1 }).Nh,
              r = Vn.getProgramParameter(t, 35718),
              i = 0;
            i < r;
            ++i
          ) {
            var a = Vn.getActiveUniform(t, i),
              f = a.name;
            (e.Xg = Math.max(e.Xg, f.length + 1)),
              "]" == f.slice(-1) && (f = f.slice(0, f.lastIndexOf("[")));
            var o = Vn.getUniformLocation(t, f);
            if (o) {
              var u = nn(Vt);
              (n[f] = [a.size, u]), (Vt[u] = o);
              for (var c = 1; c < a.size; ++c)
                (o = Vn.getUniformLocation(t, f + "[" + c + "]")),
                  (u = nn(Vt)),
                  (Vt[u] = o);
            }
          }
        },
        Wb: function (e, t) {
          3317 == e && (en = t), Vn.pixelStorei(e, t);
        },
        Vb: function (e, t) {
          Vn.polygonOffset(e, t);
        },
        ca: function (e, t) {
          Vn.uf.queryCounterEXT($t[e], t);
        },
        Ub: function (e, t, n, r, i, a, f) {
          (f = mn(a, i, n, r, f))
            ? Vn.readPixels(e, t, n, r, i, a, f)
            : tn(1280);
        },
        Tb: function () {},
        Sb: function (e, t, n, r) {
          Vn.renderbufferStorage(e, t, n, r);
        },
        Rb: function (e, t) {
          Vn.sampleCoverage(e, !!t);
        },
        Qb: function (e, t, n, r) {
          Vn.scissor(e, t, n, r);
        },
        Pb: function () {
          tn(1280);
        },
        Ob: function (e, t, n, r) {
          for (var i = "", a = 0; a < t; ++a) {
            var f = r ? V[(r + 4 * a) >> 2] : -1;
            i += R(V[(n + 4 * a) >> 2], 0 > f ? void 0 : f);
          }
          Vn.shaderSource(Qt[e], i);
        },
        Nb: function (e, t, n) {
          Vn.stencilFunc(e, t, n);
        },
        Mb: function (e, t, n, r) {
          Vn.stencilFuncSeparate(e, t, n, r);
        },
        Lb: function (e) {
          Vn.stencilMask(e);
        },
        Kb: function (e, t) {
          Vn.stencilMaskSeparate(e, t);
        },
        Jb: function (e, t, n) {
          Vn.stencilOp(e, t, n);
        },
        Ib: function (e, t, n, r) {
          Vn.stencilOpSeparate(e, t, n, r);
        },
        Hb: function (e, t, n, r, i, a, f, o, u) {
          Vn.texImage2D(e, t, n, r, i, a, f, o, u ? mn(o, f, r, i, u) : null);
        },
        Gb: function (e, t, n) {
          Vn.texParameterf(e, t, n);
        },
        Fb: function (e, t, n) {
          Vn.texParameterf(e, t, J[n >> 2]);
        },
        Eb: function (e, t, n) {
          Vn.texParameteri(e, t, n);
        },
        Db: function (e, t, n) {
          Vn.texParameteri(e, t, V[n >> 2]);
        },
        Cb: function (e, t, n, r, i, a, f, o, u) {
          var c = null;
          u && (c = mn(o, f, i, a, u)),
            Vn.texSubImage2D(e, t, n, r, i, a, f, o, c);
        },
        Bb: function (e, t) {
          Vn.uniform1f(Vt[e], t);
        },
        Ab: function (e, t, n) {
          if (288 >= t)
            for (var r = gn[t - 1], i = 0; i < t; ++i)
              r[i] = J[(n + 4 * i) >> 2];
          else r = J.subarray(n >> 2, (n + 4 * t) >> 2);
          Vn.uniform1fv(Vt[e], r);
        },
        zb: function (e, t) {
          Vn.uniform1i(Vt[e], t);
        },
        yb: function (e, t, n) {
          if (288 >= t)
            for (var r = wn[t - 1], i = 0; i < t; ++i)
              r[i] = V[(n + 4 * i) >> 2];
          else r = V.subarray(n >> 2, (n + 4 * t) >> 2);
          Vn.uniform1iv(Vt[e], r);
        },
        xb: function (e, t, n) {
          Vn.uniform2f(Vt[e], t, n);
        },
        wb: function (e, t, n) {
          if (144 >= t)
            for (var r = gn[2 * t - 1], i = 0; i < 2 * t; i += 2)
              (r[i] = J[(n + 4 * i) >> 2]),
                (r[i + 1] = J[(n + (4 * i + 4)) >> 2]);
          else r = J.subarray(n >> 2, (n + 8 * t) >> 2);
          Vn.uniform2fv(Vt[e], r);
        },
        vb: function (e, t, n) {
          Vn.uniform2i(Vt[e], t, n);
        },
        ub: function (e, t, n) {
          if (144 >= t)
            for (var r = wn[2 * t - 1], i = 0; i < 2 * t; i += 2)
              (r[i] = V[(n + 4 * i) >> 2]),
                (r[i + 1] = V[(n + (4 * i + 4)) >> 2]);
          else r = V.subarray(n >> 2, (n + 8 * t) >> 2);
          Vn.uniform2iv(Vt[e], r);
        },
        tb: function (e, t, n, r) {
          Vn.uniform3f(Vt[e], t, n, r);
        },
        sb: function (e, t, n) {
          if (96 >= t)
            for (var r = gn[3 * t - 1], i = 0; i < 3 * t; i += 3)
              (r[i] = J[(n + 4 * i) >> 2]),
                (r[i + 1] = J[(n + (4 * i + 4)) >> 2]),
                (r[i + 2] = J[(n + (4 * i + 8)) >> 2]);
          else r = J.subarray(n >> 2, (n + 12 * t) >> 2);
          Vn.uniform3fv(Vt[e], r);
        },
        rb: function (e, t, n, r) {
          Vn.uniform3i(Vt[e], t, n, r);
        },
        qb: function (e, t, n) {
          if (96 >= t)
            for (var r = wn[3 * t - 1], i = 0; i < 3 * t; i += 3)
              (r[i] = V[(n + 4 * i) >> 2]),
                (r[i + 1] = V[(n + (4 * i + 4)) >> 2]),
                (r[i + 2] = V[(n + (4 * i + 8)) >> 2]);
          else r = V.subarray(n >> 2, (n + 12 * t) >> 2);
          Vn.uniform3iv(Vt[e], r);
        },
        pb: function (e, t, n, r, i) {
          Vn.uniform4f(Vt[e], t, n, r, i);
        },
        ob: function (e, t, n) {
          if (72 >= t) {
            var r = gn[4 * t - 1];
            n >>= 2;
            for (var i = 0; i < 4 * t; i += 4) {
              var a = n + i;
              (r[i] = J[a]),
                (r[i + 1] = J[a + 1]),
                (r[i + 2] = J[a + 2]),
                (r[i + 3] = J[a + 3]);
            }
          } else r = J.subarray(n >> 2, (n + 16 * t) >> 2);
          Vn.uniform4fv(Vt[e], r);
        },
        nb: function (e, t, n, r, i) {
          Vn.uniform4i(Vt[e], t, n, r, i);
        },
        mb: function (e, t, n) {
          if (72 >= t)
            for (var r = wn[4 * t - 1], i = 0; i < 4 * t; i += 4)
              (r[i] = V[(n + 4 * i) >> 2]),
                (r[i + 1] = V[(n + (4 * i + 4)) >> 2]),
                (r[i + 2] = V[(n + (4 * i + 8)) >> 2]),
                (r[i + 3] = V[(n + (4 * i + 12)) >> 2]);
          else r = V.subarray(n >> 2, (n + 16 * t) >> 2);
          Vn.uniform4iv(Vt[e], r);
        },
        lb: function (e, t, n, r) {
          if (72 >= t)
            for (var i = gn[4 * t - 1], a = 0; a < 4 * t; a += 4)
              (i[a] = J[(r + 4 * a) >> 2]),
                (i[a + 1] = J[(r + (4 * a + 4)) >> 2]),
                (i[a + 2] = J[(r + (4 * a + 8)) >> 2]),
                (i[a + 3] = J[(r + (4 * a + 12)) >> 2]);
          else i = J.subarray(r >> 2, (r + 16 * t) >> 2);
          Vn.uniformMatrix2fv(Vt[e], !!n, i);
        },
        kb: function (e, t, n, r) {
          if (32 >= t)
            for (var i = gn[9 * t - 1], a = 0; a < 9 * t; a += 9)
              (i[a] = J[(r + 4 * a) >> 2]),
                (i[a + 1] = J[(r + (4 * a + 4)) >> 2]),
                (i[a + 2] = J[(r + (4 * a + 8)) >> 2]),
                (i[a + 3] = J[(r + (4 * a + 12)) >> 2]),
                (i[a + 4] = J[(r + (4 * a + 16)) >> 2]),
                (i[a + 5] = J[(r + (4 * a + 20)) >> 2]),
                (i[a + 6] = J[(r + (4 * a + 24)) >> 2]),
                (i[a + 7] = J[(r + (4 * a + 28)) >> 2]),
                (i[a + 8] = J[(r + (4 * a + 32)) >> 2]);
          else i = J.subarray(r >> 2, (r + 36 * t) >> 2);
          Vn.uniformMatrix3fv(Vt[e], !!n, i);
        },
        jb: function (e, t, n, r) {
          if (18 >= t) {
            var i = gn[16 * t - 1];
            r >>= 2;
            for (var a = 0; a < 16 * t; a += 16) {
              var f = r + a;
              (i[a] = J[f]),
                (i[a + 1] = J[f + 1]),
                (i[a + 2] = J[f + 2]),
                (i[a + 3] = J[f + 3]),
                (i[a + 4] = J[f + 4]),
                (i[a + 5] = J[f + 5]),
                (i[a + 6] = J[f + 6]),
                (i[a + 7] = J[f + 7]),
                (i[a + 8] = J[f + 8]),
                (i[a + 9] = J[f + 9]),
                (i[a + 10] = J[f + 10]),
                (i[a + 11] = J[f + 11]),
                (i[a + 12] = J[f + 12]),
                (i[a + 13] = J[f + 13]),
                (i[a + 14] = J[f + 14]),
                (i[a + 15] = J[f + 15]);
            }
          } else i = J.subarray(r >> 2, (r + 64 * t) >> 2);
          Vn.uniformMatrix4fv(Vt[e], !!n, i);
        },
        ib: function (e) {
          Vn.useProgram(qt[e]);
        },
        hb: function (e) {
          Vn.validateProgram(qt[e]);
        },
        gb: function (e, t) {
          Vn.vertexAttrib1f(e, t);
        },
        fb: function (e, t) {
          Vn.vertexAttrib1f(e, J[t >> 2]);
        },
        eb: function (e, t, n) {
          Vn.vertexAttrib2f(e, t, n);
        },
        db: function (e, t) {
          Vn.vertexAttrib2f(e, J[t >> 2], J[(t + 4) >> 2]);
        },
        cb: function (e, t, n, r) {
          Vn.vertexAttrib3f(e, t, n, r);
        },
        bb: function (e, t) {
          Vn.vertexAttrib3f(e, J[t >> 2], J[(t + 4) >> 2], J[(t + 8) >> 2]);
        },
        ab: function (e, t, n, r, i) {
          Vn.vertexAttrib4f(e, t, n, r, i);
        },
        $a: function (e, t) {
          Vn.vertexAttrib4f(
            e,
            J[t >> 2],
            J[(t + 4) >> 2],
            J[(t + 8) >> 2],
            J[(t + 12) >> 2]
          );
        },
        Fd: function (e, t) {
          Vn.vertexAttribDivisor(e, t);
        },
        _a: function (e, t, n, r, i, a) {
          Vn.vertexAttribPointer(e, t, n, !!r, i, a);
        },
        Za: function (e, t, n, r) {
          Vn.viewport(e, t, n, r);
        },
        ka: function () {
          return "undefined" != typeof SharedArrayBuffer;
        },
        G: function () {
          return 0 | Ee;
        },
        R: function () {
          return 0 | xe;
        },
        f: function (e, t) {
          throw (yr(e, t || 1), "longjmp");
        },
        ja: function (e, t, n) {
          H.copyWithin(e, t, t + n);
        },
        ma: function (e, t, n) {
          (vn.length = t), (n >>= 3);
          for (var r = 0; r < t; r++) vn[r] = $[n + r];
          return (0 > e ? be[-e - 1] : Zn[e]).apply(null, vn);
        },
        ra: function () {
          de("OOM");
        },
        na: function (e, t, n) {
          return kn(e) ? An(e, t, n) : xn(e, t, n);
        },
        Q: function () {},
        la: function () {},
        oa: function (e, t) {
          var n = {};
          if (
            ((t >>= 2),
            (n.alpha = !!V[t]),
            (n.depth = !!V[t + 1]),
            (n.stencil = !!V[t + 2]),
            (n.antialias = !!V[t + 3]),
            (n.premultipliedAlpha = !!V[t + 4]),
            (n.preserveDrawingBuffer = !!V[t + 5]),
            (n.powerPreference = jn[V[t + 6]]),
            (n.failIfMajorPerformanceCaveat = !!V[t + 7]),
            (n.wi = V[t + 8]),
            (n.pj = V[t + 9]),
            (n.qh = V[t + 10]),
            (n.hi = V[t + 11]),
            (n.uj = V[t + 12]),
            (n.vj = V[t + 13]),
            !(e = kn(e)) || n.hi)
          )
            n = 0;
          else if ((e = e.getContext("webgl", n))) {
            (t = rr(8)), (V[(t + 4) >> 2] = 0 | Ae);
            var r = { jj: t, attributes: n, version: n.wi, qg: e };
            e.canvas && (e.canvas.rg = r),
              (void 0 === n.qh || n.qh) && rn(r),
              (n = t);
          } else n = 0;
          return n;
        },
        sa: function (e, t) {
          var n = 0;
          return (
            Mn().forEach(function (r, i) {
              var a = t + n;
              (V[(e + 4 * i) >> 2] = a), G(r, a), (n += r.length + 1);
            }),
            0
          );
        },
        ta: function (e, t) {
          var n = Mn();
          V[e >> 2] = n.length;
          var r = 0;
          return (
            n.forEach(function (e) {
              r += e.length + 1;
            }),
            (V[t >> 2] = r),
            0
          );
        },
        D: function (e) {
          Jr(e);
        },
        H: Tn,
        U: Dn,
        xa: Cn,
        Va: Fn,
        M: On,
        B: Pn,
        d: function () {
          return 0 | S;
        },
        y: Ln,
        v: function (e, t, n, r, i, a, f) {
          if ((t = Ct(e, t)).ef) return -6;
          e = t.port;
          var o = t.hf;
          if (((t = !1), n && r)) {
            var u;
            if (1 & f || !(u = Mt(o))) {
              if (8 & f) return -2;
            } else o = u;
            (n = N(o, H, n, r)) + 1 >= r && (t = !0);
          }
          return (
            i && a && (n = N("" + e, H, i, a)) + 1 >= a && (t = !0), t ? -12 : 0
          );
        },
        l: function (e) {
          var t = Date.now();
          return (
            (V[e >> 2] = (t / 1e3) | 0),
            (V[(e + 4) >> 2] = ((t % 1e3) * 1e3) | 0),
            0
          );
        },
        r: Pe,
        ia: function () {
          Ce.pi();
        },
        ba: Br,
        j: Pr,
        h: Cr,
        C: zr,
        P: Lr,
        _: Gr,
        O: Rr,
        Xa: Yr,
        Wa: Xr,
        k: Fr,
        w: Ir,
        J: Nr,
        g: Or,
        N: Ur,
        Sa: qr,
        Z: Wr,
        Ya: Hr,
        q: Re,
        a: M || n.wasmMemory,
        T: function (e) {
          Le();
          var t = new Date(
              V[(e + 20) >> 2] + 1900,
              V[(e + 16) >> 2],
              V[(e + 12) >> 2],
              V[(e + 8) >> 2],
              V[(e + 4) >> 2],
              V[e >> 2],
              0
            ),
            n = V[(e + 32) >> 2],
            r = t.getTimezoneOffset(),
            i = new Date(t.getFullYear(), 0, 1),
            a = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(),
            f = i.getTimezoneOffset(),
            o = Math.min(f, a);
          return (
            0 > n
              ? (V[(e + 32) >> 2] = Number(a != f && o == r))
              : 0 < n != (o == r) &&
                ((a = Math.max(f, a)),
                t.setTime(t.getTime() + 6e4 * ((0 < n ? o : a) - r))),
            (V[(e + 24) >> 2] = t.getDay()),
            (V[(e + 28) >> 2] = ((t.getTime() - i.getTime()) / 864e5) | 0),
            (t.getTime() / 1e3) | 0
          );
        },
        Ra: function (e) {
          return e === Ce.Ph
            ? (A("Main thread (id=" + e + ") cannot be canceled!"), 71)
            : e
            ? V[(e + 12) >> 2] !== e
              ? (A(
                  "pthread_cancel attempted on thread " +
                    e +
                    ", which does not point to a valid thread, or does not exist anymore!"
                ),
                71)
              : (Atomics.compareExchange(Q, e >> 2, 0, 2),
                p ? postMessage({ cmd: "cancelThread", thread: e }) : Me(e),
                0)
            : (A("pthread_cancel attempted on a null thread pointer!"), 71);
        },
        S: function (e) {
          var t = Ce.Dg.pop();
          e && t();
        },
        L: function (e, t) {
          Ce.Dg.push(function () {
            ee.get(e)(t);
          });
        },
        n: function (e, t, n, r) {
          if ("undefined" == typeof SharedArrayBuffer)
            return (
              A(
                "Current environment does not support SharedArrayBuffer, pthreads are not available!"
              ),
              6
            );
          if (!e)
            return A("pthread_create called with a null thread pointer!"), 28;
          var i = [];
          if (p && 0 === i.length) return Ar(687865856, e, t, n, r);
          var a = 0,
            f = 0,
            o = 0,
            u = 0;
          if (t) {
            var c = V[t >> 2];
            if (
              ((c += 81920),
              (a = V[(t + 8) >> 2]),
              (f = 0 !== V[(t + 12) >> 2]),
              0 === V[(t + 16) >> 2])
            ) {
              var s = V[(t + 20) >> 2],
                l = V[(t + 24) >> 2];
              (o = t + 20), (u = t + 24);
              var d = Ce.Mg ? Ce.Mg : 0 | Ae;
              if (o || u)
                if (d)
                  if (V[(d + 12) >> 2] !== d)
                    A(
                      "pthread_getschedparam attempted on thread " +
                        d +
                        ", which does not point to a valid thread, or does not exist anymore!"
                    );
                  else {
                    var h = Atomics.load(Q, (d + 128) >> 2);
                    (d = Atomics.load(Q, (d + 132) >> 2)),
                      o && (V[o >> 2] = h),
                      u && (V[u >> 2] = d);
                  }
                else
                  A("pthread_getschedparam called with a null thread pointer!");
              (o = V[(t + 20) >> 2]),
                (u = V[(t + 24) >> 2]),
                (V[(t + 20) >> 2] = s),
                (V[(t + 24) >> 2] = l);
            } else (o = V[(t + 20) >> 2]), (u = V[(t + 24) >> 2]);
          } else c = 2097152;
          for (
            (t = 0 == a) ? (a = fr(16, c)) : O(0 < (a -= c)),
              s = rr(232),
              l = 0;
            58 > l;
            ++l
          )
            Q[(s >> 2) + l] = 0;
          return (
            (V[e >> 2] = s),
            (V[(s + 12) >> 2] = s),
            (V[(e = s + 156) >> 2] = e),
            (n = {
              Rf: a,
              cg: c,
              Kg: t,
              Ih: o,
              Jh: u,
              detached: f,
              Mi: n,
              $f: s,
              Fi: 0 | Ae,
              Tf: r,
              Vi: i,
            }),
            p ? ((n.$i = "spawnThread"), postMessage(n, i)) : Rn(n),
            0
          );
        },
        o: function (e, t) {
          return Bn(e, t);
        },
        i: Nn,
        e: function (e) {
          S = 0 | e;
        },
        E: function () {
          return 0;
        },
        m: function (e, t, n, r) {
          function i(e, t, n) {
            for (
              e = "number" == typeof e ? e.toString() : e || "";
              e.length < t;

            )
              e = n[0] + e;
            return e;
          }
          function a(e, t) {
            return i(e, t, "0");
          }
          function f(e, t) {
            function n(e) {
              return 0 > e ? -1 : 0 < e ? 1 : 0;
            }
            var r;
            return (
              0 === (r = n(e.getFullYear() - t.getFullYear())) &&
                0 === (r = n(e.getMonth() - t.getMonth())) &&
                (r = n(e.getDate() - t.getDate())),
              r
            );
          }
          function o(e) {
            switch (e.getDay()) {
              case 0:
                return new Date(e.getFullYear() - 1, 11, 29);
              case 1:
                return e;
              case 2:
                return new Date(e.getFullYear(), 0, 3);
              case 3:
                return new Date(e.getFullYear(), 0, 2);
              case 4:
                return new Date(e.getFullYear(), 0, 1);
              case 5:
                return new Date(e.getFullYear() - 1, 11, 31);
              case 6:
                return new Date(e.getFullYear() - 1, 11, 30);
            }
          }
          function u(e) {
            e = qn(new Date(e.rf + 1900, 0, 1), e.Gg);
            var t = new Date(e.getFullYear() + 1, 0, 4),
              n = o(new Date(e.getFullYear(), 0, 4));
            return (
              (t = o(t)),
              0 >= f(n, e)
                ? 0 >= f(t, e)
                  ? e.getFullYear() + 1
                  : e.getFullYear()
                : e.getFullYear() - 1
            );
          }
          var c = V[(r + 40) >> 2];
          for (var s in ((r = {
            Ti: V[r >> 2],
            Si: V[(r + 4) >> 2],
            Eg: V[(r + 8) >> 2],
            pg: V[(r + 12) >> 2],
            dg: V[(r + 16) >> 2],
            rf: V[(r + 20) >> 2],
            Fg: V[(r + 24) >> 2],
            Gg: V[(r + 28) >> 2],
            yj: V[(r + 32) >> 2],
            Ri: V[(r + 36) >> 2],
            Ui: c ? R(c) : "",
          }),
          (n = R(n)),
          (c = {
            "%c": "%a %b %d %H:%M:%S %Y",
            "%D": "%m/%d/%y",
            "%F": "%Y-%m-%d",
            "%h": "%b",
            "%r": "%I:%M:%S %p",
            "%R": "%H:%M",
            "%T": "%H:%M:%S",
            "%x": "%m/%d/%y",
            "%X": "%H:%M:%S",
            "%Ec": "%c",
            "%EC": "%C",
            "%Ex": "%m/%d/%y",
            "%EX": "%H:%M:%S",
            "%Ey": "%y",
            "%EY": "%Y",
            "%Od": "%d",
            "%Oe": "%e",
            "%OH": "%H",
            "%OI": "%I",
            "%Om": "%m",
            "%OM": "%M",
            "%OS": "%S",
            "%Ou": "%u",
            "%OU": "%U",
            "%OV": "%V",
            "%Ow": "%w",
            "%OW": "%W",
            "%Oy": "%y",
          })))
            n = n.replace(new RegExp(s, "g"), c[s]);
          var l =
              "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                " "
              ),
            d =
              "January February March April May June July August September October November December".split(
                " "
              );
          for (s in (c = {
            "%a": function (e) {
              return l[e.Fg].substring(0, 3);
            },
            "%A": function (e) {
              return l[e.Fg];
            },
            "%b": function (e) {
              return d[e.dg].substring(0, 3);
            },
            "%B": function (e) {
              return d[e.dg];
            },
            "%C": function (e) {
              return a(((e.rf + 1900) / 100) | 0, 2);
            },
            "%d": function (e) {
              return a(e.pg, 2);
            },
            "%e": function (e) {
              return i(e.pg, 2, " ");
            },
            "%g": function (e) {
              return u(e).toString().substring(2);
            },
            "%G": function (e) {
              return u(e);
            },
            "%H": function (e) {
              return a(e.Eg, 2);
            },
            "%I": function (e) {
              return 0 == (e = e.Eg) ? (e = 12) : 12 < e && (e -= 12), a(e, 2);
            },
            "%j": function (e) {
              return a(e.pg + zn(Un(e.rf + 1900) ? Gn : Wn, e.dg - 1), 3);
            },
            "%m": function (e) {
              return a(e.dg + 1, 2);
            },
            "%M": function (e) {
              return a(e.Si, 2);
            },
            "%n": function () {
              return "\n";
            },
            "%p": function (e) {
              return 0 <= e.Eg && 12 > e.Eg ? "AM" : "PM";
            },
            "%S": function (e) {
              return a(e.Ti, 2);
            },
            "%t": function () {
              return "\t";
            },
            "%u": function (e) {
              return e.Fg || 7;
            },
            "%U": function (e) {
              var t = new Date(e.rf + 1900, 0, 1),
                n = 0 === t.getDay() ? t : qn(t, 7 - t.getDay());
              return 0 > f(n, (e = new Date(e.rf + 1900, e.dg, e.pg)))
                ? a(
                    Math.ceil(
                      (31 -
                        n.getDate() +
                        (zn(Un(e.getFullYear()) ? Gn : Wn, e.getMonth() - 1) -
                          31) +
                        e.getDate()) /
                        7
                    ),
                    2
                  )
                : 0 === f(n, t)
                ? "01"
                : "00";
            },
            "%V": function (e) {
              var t = new Date(e.rf + 1901, 0, 4),
                n = o(new Date(e.rf + 1900, 0, 4));
              t = o(t);
              var r = qn(new Date(e.rf + 1900, 0, 1), e.Gg);
              return 0 > f(r, n)
                ? "53"
                : 0 >= f(t, r)
                ? "01"
                : a(
                    Math.ceil(
                      (n.getFullYear() < e.rf + 1900
                        ? e.Gg + 32 - n.getDate()
                        : e.Gg + 1 - n.getDate()) / 7
                    ),
                    2
                  );
            },
            "%w": function (e) {
              return e.Fg;
            },
            "%W": function (e) {
              var t = new Date(e.rf, 0, 1),
                n =
                  1 === t.getDay()
                    ? t
                    : qn(t, 0 === t.getDay() ? 1 : 7 - t.getDay() + 1);
              return 0 > f(n, (e = new Date(e.rf + 1900, e.dg, e.pg)))
                ? a(
                    Math.ceil(
                      (31 -
                        n.getDate() +
                        (zn(Un(e.getFullYear()) ? Gn : Wn, e.getMonth() - 1) -
                          31) +
                        e.getDate()) /
                        7
                    ),
                    2
                  )
                : 0 === f(n, t)
                ? "01"
                : "00";
            },
            "%y": function (e) {
              return (e.rf + 1900).toString().substring(2);
            },
            "%Y": function (e) {
              return e.rf + 1900;
            },
            "%z": function (e) {
              var t = 0 <= (e = e.Ri);
              return (
                (e = Math.abs(e) / 60),
                (t ? "+" : "-") +
                  String("0000" + ((e / 60) * 100 + (e % 60))).slice(-4)
              );
            },
            "%Z": function (e) {
              return e.Ui;
            },
            "%%": function () {
              return "%";
            },
          }))
            0 <= n.indexOf(s) && (n = n.replace(new RegExp(s, "g"), c[s](r)));
          return (s = Kn(n, !1)).length > t ? 0 : (q.set(s, e), s.length - 1);
        },
        x: Hn,
        s: function (e) {
          var t = (Date.now() / 1e3) | 0;
          return e && (V[e >> 2] = t), t;
        },
      };
      !(function () {
        function e(e, t) {
          (n.asm = e.exports), (ee = n.asm.Sd), (T = t), p || le();
        }
        function t(t) {
          e(t.instance, t.module);
        }
        function r(e) {
          return we()
            .then(function (e) {
              return WebAssembly.instantiate(e, a);
            })
            .then(e, function (e) {
              A("failed to asynchronously prepare wasm: " + e), de(e);
            });
        }
        var a = { a: er };
        if ((p || se(), n.instantiateWasm))
          try {
            return n.instantiateWasm(a, e);
          } catch (e) {
            return (
              A("Module.instantiateWasm callback failed with error: " + e), !1
            );
          }
        (E ||
        "function" != typeof WebAssembly.instantiateStreaming ||
        pe() ||
        he("file://") ||
        "function" != typeof fetch
          ? r(t)
          : fetch(me, { credentials: "same-origin" }).then(function (e) {
              return WebAssembly.instantiateStreaming(e, a).then(
                t,
                function (e) {
                  return (
                    A("wasm streaming compile failed: " + e),
                    A("falling back to ArrayBuffer instantiation"),
                    r(t)
                  );
                }
              );
            })
        ).catch(i);
      })();
      var tr = (n.___wasm_call_ctors = function () {
          return (tr = n.___wasm_call_ctors = n.asm.Td).apply(null, arguments);
        }),
        nr = (n._free = function () {
          return (nr = n._free = n.asm.Ud).apply(null, arguments);
        }),
        rr = (n._malloc = function () {
          return (rr = n._malloc = n.asm.Vd).apply(null, arguments);
        }),
        ir = (n.___errno_location = function () {
          return (ir = n.___errno_location = n.asm.Wd).apply(null, arguments);
        }),
        ar = (n._memset = function () {
          return (ar = n._memset = n.asm.Xd).apply(null, arguments);
        });
      n._fflush = function () {
        return (n._fflush = n.asm.Yd).apply(null, arguments);
      };
      var fr = (n._memalign = function () {
          return (fr = n._memalign = n.asm.Zd).apply(null, arguments);
        }),
        or = (n._ntohs = function () {
          return (or = n._ntohs = n.asm._d).apply(null, arguments);
        }),
        ur = (n._htons = function () {
          return (ur = n._htons = n.asm.$d).apply(null, arguments);
        }),
        cr = (n._main = function () {
          return (cr = n._main = n.asm.ae).apply(null, arguments);
        }),
        sr = (n._emscripten_get_global_libc = function () {
          return (sr = n._emscripten_get_global_libc = n.asm.be).apply(
            null,
            arguments
          );
        });
      n.___em_js__initPthreadsJS = function () {
        return (n.___em_js__initPthreadsJS = n.asm.ce).apply(null, arguments);
      };
      var lr = (n._htonl = function () {
          return (lr = n._htonl = n.asm.de).apply(null, arguments);
        }),
        dr = (n.__get_tzname = function () {
          return (dr = n.__get_tzname = n.asm.ee).apply(null, arguments);
        }),
        hr = (n.__get_daylight = function () {
          return (hr = n.__get_daylight = n.asm.fe).apply(null, arguments);
        }),
        pr = (n.__get_timezone = function () {
          return (pr = n.__get_timezone = n.asm.ge).apply(null, arguments);
        }),
        mr = (n.stackSave = function () {
          return (mr = n.stackSave = n.asm.he).apply(null, arguments);
        }),
        gr = (n.stackRestore = function () {
          return (gr = n.stackRestore = n.asm.ie).apply(null, arguments);
        }),
        wr = (n.stackAlloc = function () {
          return (wr = n.stackAlloc = n.asm.je).apply(null, arguments);
        }),
        yr = (n._setThrew = function () {
          return (yr = n._setThrew = n.asm.ke).apply(null, arguments);
        });
      n._emscripten_main_browser_thread_id = function () {
        return (n._emscripten_main_browser_thread_id = n.asm.le).apply(
          null,
          arguments
        );
      };
      var vr = (n.___pthread_tsd_run_dtors = function () {
          return (vr = n.___pthread_tsd_run_dtors = n.asm.me).apply(
            null,
            arguments
          );
        }),
        br = (n._emscripten_main_thread_process_queued_calls = function () {
          return (br = n._emscripten_main_thread_process_queued_calls =
            n.asm.ne).apply(null, arguments);
        });
      n._emscripten_current_thread_process_queued_calls = function () {
        return (n._emscripten_current_thread_process_queued_calls =
          n.asm.oe).apply(null, arguments);
      };
      var _r = (n._emscripten_register_main_browser_thread_id = function () {
          return (_r = n._emscripten_register_main_browser_thread_id =
            n.asm.pe).apply(null, arguments);
        }),
        kr = (n._do_emscripten_dispatch_to_thread = function () {
          return (kr = n._do_emscripten_dispatch_to_thread = n.asm.qe).apply(
            null,
            arguments
          );
        });
      (n._emscripten_async_run_in_main_thread = function () {
        return (n._emscripten_async_run_in_main_thread = n.asm.re).apply(
          null,
          arguments
        );
      }),
        (n._emscripten_sync_run_in_main_thread = function () {
          return (n._emscripten_sync_run_in_main_thread = n.asm.se).apply(
            null,
            arguments
          );
        }),
        (n._emscripten_sync_run_in_main_thread_0 = function () {
          return (n._emscripten_sync_run_in_main_thread_0 = n.asm.te).apply(
            null,
            arguments
          );
        }),
        (n._emscripten_sync_run_in_main_thread_1 = function () {
          return (n._emscripten_sync_run_in_main_thread_1 = n.asm.ue).apply(
            null,
            arguments
          );
        }),
        (n._emscripten_sync_run_in_main_thread_2 = function () {
          return (n._emscripten_sync_run_in_main_thread_2 = n.asm.ve).apply(
            null,
            arguments
          );
        }),
        (n._emscripten_sync_run_in_main_thread_xprintf_varargs = function () {
          return (n._emscripten_sync_run_in_main_thread_xprintf_varargs =
            n.asm.we).apply(null, arguments);
        }),
        (n._emscripten_sync_run_in_main_thread_3 = function () {
          return (n._emscripten_sync_run_in_main_thread_3 = n.asm.xe).apply(
            null,
            arguments
          );
        });
      var Ar = (n._emscripten_sync_run_in_main_thread_4 = function () {
        return (Ar = n._emscripten_sync_run_in_main_thread_4 = n.asm.ye).apply(
          null,
          arguments
        );
      });
      (n._emscripten_sync_run_in_main_thread_5 = function () {
        return (n._emscripten_sync_run_in_main_thread_5 = n.asm.ze).apply(
          null,
          arguments
        );
      }),
        (n._emscripten_sync_run_in_main_thread_6 = function () {
          return (n._emscripten_sync_run_in_main_thread_6 = n.asm.Ae).apply(
            null,
            arguments
          );
        }),
        (n._emscripten_sync_run_in_main_thread_7 = function () {
          return (n._emscripten_sync_run_in_main_thread_7 = n.asm.Be).apply(
            null,
            arguments
          );
        });
      var xr = (n._emscripten_run_in_main_runtime_thread_js = function () {
          return (xr = n._emscripten_run_in_main_runtime_thread_js =
            n.asm.Ce).apply(null, arguments);
        }),
        Er = (n.__emscripten_call_on_thread = function () {
          return (Er = n.__emscripten_call_on_thread = n.asm.De).apply(
            null,
            arguments
          );
        });
      (n._proxy_main = function () {
        return (n._proxy_main = n.asm.Ee).apply(null, arguments);
      }),
        (n._emscripten_tls_init = function () {
          return (n._emscripten_tls_init = n.asm.Fe).apply(null, arguments);
        }),
        (n.dynCall_ijiii = function () {
          return (n.dynCall_ijiii = n.asm.Ge).apply(null, arguments);
        });
      var jr = (n.dynCall_vijjjid = function () {
          return (jr = n.dynCall_vijjjid = n.asm.He).apply(null, arguments);
        }),
        Sr = (n.dynCall_iiiijj = function () {
          return (Sr = n.dynCall_iiiijj = n.asm.Ie).apply(null, arguments);
        });
      (n.dynCall_iiijiii = function () {
        return (n.dynCall_iiijiii = n.asm.Je).apply(null, arguments);
      }),
        (n.dynCall_jiiii = function () {
          return (n.dynCall_jiiii = n.asm.Ke).apply(null, arguments);
        }),
        (n.dynCall_jii = function () {
          return (n.dynCall_jii = n.asm.Le).apply(null, arguments);
        });
      var Mr = (n.dynCall_iij = function () {
        return (Mr = n.dynCall_iij = n.asm.Me).apply(null, arguments);
      });
      (n.dynCall_viiijj = function () {
        return (n.dynCall_viiijj = n.asm.Ne).apply(null, arguments);
      }),
        (n.dynCall_jij = function () {
          return (n.dynCall_jij = n.asm.Oe).apply(null, arguments);
        }),
        (n.dynCall_jiji = function () {
          return (n.dynCall_jiji = n.asm.Pe).apply(null, arguments);
        }),
        (n.dynCall_iiiji = function () {
          return (n.dynCall_iiiji = n.asm.Qe).apply(null, arguments);
        }),
        (n.dynCall_iiiiij = function () {
          return (n.dynCall_iiiiij = n.asm.Re).apply(null, arguments);
        }),
        (n.dynCall_jiiij = function () {
          return (n.dynCall_jiiij = n.asm.Se).apply(null, arguments);
        }),
        (n.dynCall_iiijjji = function () {
          return (n.dynCall_iiijjji = n.asm.Te).apply(null, arguments);
        }),
        (n.dynCall_iiiiiij = function () {
          return (n.dynCall_iiiiiij = n.asm.Ue).apply(null, arguments);
        }),
        (n.dynCall_jiiji = function () {
          return (n.dynCall_jiiji = n.asm.Ve).apply(null, arguments);
        }),
        (n.dynCall_viiiiijji = function () {
          return (n.dynCall_viiiiijji = n.asm.We).apply(null, arguments);
        }),
        (n.dynCall_viiiji = function () {
          return (n.dynCall_viiiji = n.asm.Xe).apply(null, arguments);
        }),
        (n.dynCall_viiiiji = function () {
          return (n.dynCall_viiiiji = n.asm.Ye).apply(null, arguments);
        }),
        (n.dynCall_jiiiii = function () {
          return (n.dynCall_jiiiii = n.asm.Ze).apply(null, arguments);
        }),
        (n.dynCall_jiii = function () {
          return (n.dynCall_jiii = n.asm._e).apply(null, arguments);
        }),
        (n.dynCall_jiiiiii = function () {
          return (n.dynCall_jiiiiii = n.asm.$e).apply(null, arguments);
        }),
        (n._ff_h264_cabac_tables = 2115974);
      var Tr,
        Dr = (n._main_thread_futex = 17195328);
      function Cr(e, t, n) {
        var r = mr();
        try {
          return ee.get(e)(t, n);
        } catch (e) {
          if ((gr(r), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Fr(e, t) {
        var n = mr();
        try {
          ee.get(e)(t);
        } catch (e) {
          if ((gr(n), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Or(e, t, n, r, i) {
        var a = mr();
        try {
          ee.get(e)(t, n, r, i);
        } catch (e) {
          if ((gr(a), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Ir(e, t, n) {
        var r = mr();
        try {
          ee.get(e)(t, n);
        } catch (e) {
          if ((gr(r), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Pr(e, t) {
        var n = mr();
        try {
          return ee.get(e)(t);
        } catch (e) {
          if ((gr(n), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Lr(e, t, n, r, i) {
        var a = mr();
        try {
          return ee.get(e)(t, n, r, i);
        } catch (e) {
          if ((gr(a), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Rr(e, t, n, r, i, a, f, o, u) {
        var c = mr();
        try {
          return ee.get(e)(t, n, r, i, a, f, o, u);
        } catch (e) {
          if ((gr(c), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Nr(e, t, n, r) {
        var i = mr();
        try {
          ee.get(e)(t, n, r);
        } catch (e) {
          if ((gr(i), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Br(e) {
        var t = mr();
        try {
          return ee.get(e)();
        } catch (e) {
          if ((gr(t), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Ur(e, t, n, r, i, a) {
        var f = mr();
        try {
          ee.get(e)(t, n, r, i, a);
        } catch (e) {
          if ((gr(f), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function zr(e, t, n, r) {
        var i = mr();
        try {
          return ee.get(e)(t, n, r);
        } catch (e) {
          if ((gr(i), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Gr(e, t, n, r, i, a) {
        var f = mr();
        try {
          return ee.get(e)(t, n, r, i, a);
        } catch (e) {
          if ((gr(f), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Wr(e, t, n, r, i, a, f, o, u) {
        var c = mr();
        try {
          ee.get(e)(t, n, r, i, a, f, o, u);
        } catch (e) {
          if ((gr(c), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function qr(e, t, n, r, i, a, f) {
        var o = mr();
        try {
          ee.get(e)(t, n, r, i, a, f);
        } catch (e) {
          if ((gr(o), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Hr(e, t, n, r, i, a, f, o, u, c) {
        var s = mr();
        try {
          jr(e, t, n, r, i, a, f, o, u, c);
        } catch (e) {
          if ((gr(s), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Yr(e, t, n, r, i, a, f, o) {
        var u = mr();
        try {
          return Sr(e, t, n, r, i, a, f, o);
        } catch (e) {
          if ((gr(u), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Xr(e, t, n, r) {
        var i = mr();
        try {
          return Mr(e, t, n, r);
        } catch (e) {
          if ((gr(i), e !== e + 0 && "longjmp" !== e)) throw e;
          yr(1, 0);
        }
      }
      function Vr(e) {
        (this.name = "ExitStatus"),
          (this.message = "Program terminated with exit(" + e + ")"),
          (this.status = e);
      }
      function Qr(e) {
        function t() {
          if (!Tr && ((Tr = !0), (n.calledRun = !0), !F)) {
            if (
              (n.noFSInit || Ze.gg.Tg || Ze.gg(),
              (_t.root = Ze.jf(_t, {}, null)),
              _e(ne),
              p || ((Ze.Bh = !1), _e(re)),
              r(n),
              n.onRuntimeInitialized && n.onRuntimeInitialized(),
              $r)
            ) {
              var t = e,
                i = (t = t || []).length + 1,
                a = wr(4 * (i + 1));
              V[a >> 2] = z(u);
              for (var f = 1; f < i; f++) V[(a >> 2) + f] = z(t[f - 1]);
              (V[(a >> 2) + i] = 0), n._proxy_main(i, a);
            }
            if (!p) {
              if (n.postRun)
                for (
                  "function" == typeof n.postRun && (n.postRun = [n.postRun]);
                  n.postRun.length;

                )
                  (t = n.postRun.shift()), ae.unshift(t);
              _e(ae);
            }
          }
        }
        if (((e = e || o), !(0 < oe))) {
          if (!p) {
            if (n.preRun)
              for (
                "function" == typeof n.preRun && (n.preRun = [n.preRun]);
                n.preRun.length;

              )
                fe();
            _e(te);
          }
          0 < oe ||
            (n.setStatus
              ? (n.setStatus("Running..."),
                setTimeout(function () {
                  setTimeout(function () {
                    n.setStatus("");
                  }, 1),
                    t();
                }, 1))
              : t());
        }
      }
      function Jr(e, t) {
        (t && j && 0 === e) ||
          (j ||
            (Ce.Oi(),
            p || (_e(ie), Ze.quit(), Ce.eh()),
            n.onExit && n.onExit(e),
            (F = !0)),
          c(e, new Vr(e)));
      }
      if (
        ((n.ccall = P),
        (n.cwrap = function (e, t, n, r) {
          var i = (n = n || []).every(function (e) {
            return "number" === e;
          });
          return "string" !== t && i && !r
            ? I(e)
            : function () {
                return P(e, t, n, arguments);
              };
        }),
        (n.setValue = function (e, t, n) {
          switch (
            ("*" === (n = n || "i8").charAt(n.length - 1) && (n = "i32"), n)
          ) {
            case "i1":
            case "i8":
              q[e >> 0] = t;
              break;
            case "i16":
              Y[e >> 1] = t;
              break;
            case "i32":
              V[e >> 2] = t;
              break;
            case "i64":
              (ve = [
                t >>> 0,
                ((ye = t),
                1 <= +Math.abs(ye)
                  ? 0 < ye
                    ? (0 |
                        Math.min(+Math.floor(ye / 4294967296), 4294967295)) >>>
                      0
                    : ~~+Math.ceil((ye - +(~~ye >>> 0)) / 4294967296) >>> 0
                  : 0),
              ]),
                (V[e >> 2] = ve[0]),
                (V[(e + 4) >> 2] = ve[1]);
              break;
            case "float":
              J[e >> 2] = t;
              break;
            case "double":
              $[e >> 3] = t;
              break;
            default:
              de("invalid type for setValue: " + n);
          }
        }),
        (n.writeAsciiToMemory = G),
        (n.FS = Ze),
        (n.PThread = Ce),
        (n.PThread = Ce),
        (n._pthread_self = Nn),
        (n.wasmMemory = M),
        (n.ExitStatus = Vr),
        (ce = function e() {
          Tr || Qr(), Tr || (ce = e);
        }),
        (n.run = Qr),
        n.preInit)
      )
        for (
          "function" == typeof n.preInit && (n.preInit = [n.preInit]);
          0 < n.preInit.length;

        )
          n.preInit.pop()();
      var $r = !1;
      return (
        n.noInitialRun && ($r = !1), p ? Ce.ri() : Qr(), (n.exit = Jr), t.ready
      );
    }
  );
})();
"object" == typeof exports && "object" == typeof module
  ? (module.exports = createFFmpegCore)
  : "function" == typeof define && define.amd
  ? define([], function () {
      return createFFmpegCore;
    })
  : "object" == typeof exports && (exports.createFFmpegCore = createFFmpegCore);
