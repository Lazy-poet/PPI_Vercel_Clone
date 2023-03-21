import { useEffect } from "react";

const loadHotJarScript = () => {
  const script = document.createElement("script");
  script.innerHTML = `
      (function (h, o, t, j, a, r) {
  h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
  h._hjSettings = { hjid: 3378364, hjsv: 6 };
  a = o.getElementsByTagName('head')[0];
  r = o.createElement('script'); r.async = 1;
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  a.appendChild(r);
})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');`;
  document.head.appendChild(script);
  console.log("hotjar script loaded");
};

const loadWidget = () => {
  const script = document.createElement("script");
  script.innerHTML = `
  var MessageBirdChatWidgetSettings = {
    widgetId: "36915f64-51f4-403f-8bc5-740878ce5a1f",
    initializeOnLoad: true,
  };
  !(function () {
    "use strict";
    if (Boolean(document.getElementById("live-chat-widget-script")))
      console.error("MessageBirdChatWidget: Snippet loaded twice on page");
    else {
      var e, t;
      (window.MessageBirdChatWidget = {}),
        (window.MessageBirdChatWidget.queue = []);
      for (
        var i = [
            "init",
            "setConfig",
            "toggleChat",
            "identify",
            "hide",
            "on",
            "shutdown",
          ],
          n = function () {
            var e = i[d];
            window.MessageBirdChatWidget[e] = function () {
              for (
                var t = arguments.length, i = new Array(t), n = 0;
                n < t;
                n++
              )
                i[n] = arguments[n];
              window.MessageBirdChatWidget.queue.push([[e, i]]);
            };
          },
          d = 0;
        d < i.length;
        d++
      )
        n();
      var a =
          (null === (e = window) ||
          void 0 === e ||
          null === (t = e.MessageBirdChatWidgetSettings) ||
          void 0 === t
            ? void 0
            : t.widgetId) || "",
        o = function () {
          var e,
            t = document.createElement("script");
          (t.type = "text/javascript"),
            (t.src =
              "https://livechat.messagebird.com/bootstrap.js?widgetId=".concat(
                a
              )),
            (t.async = !0),
            (t.id = "live-chat-widget-script");
          var i = document.getElementsByTagName("script")[0];
          null == i ||
            null === (e = i.parentNode) ||
            void 0 === e ||
            e.insertBefore(t, i);
        };
      "complete" === document.readyState
        ? o()
        : window.attachEvent
        ? window.attachEvent("onload", o)
        : window.addEventListener("load", o, !1);
    }
  })();
  `;
  document.head.appendChild(script);
  console.log("Widget Script Loaded");
};

const LoadScripts = () => {
  useEffect(() => {
    loadHotJarScript();
    loadWidget();
  }, []);
  return null;
};

export default LoadScripts;
