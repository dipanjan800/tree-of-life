import http from "node:http";
import { spawn } from "node:child_process";

async function run() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const chromeProc = spawn(chromePath, [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--user-data-dir=C:\\Users\\HP\\AppData\\Local\\Temp\\chrome-debug-" + Date.now(),
    "http://localhost:3000/explorer",
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 20; i++) {
      await new Promise((r) => setTimeout(r, 500));
      try {
        targets = await new Promise((resolve, reject) => {
          const req = http.get("http://127.0.0.1:9222/json", (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => resolve(JSON.parse(data)));
          });
          req.on("error", reject);
        });
        if (targets && targets.length) break;
      } catch (e) {
        // waiting
      }
    }

    const page = targets?.find((t) => t.type === "page");
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    let id = 1;
    const pending = new Map();

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        pending.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg.result);
        pending.delete(msg.id);
      }
    };

    await new Promise((r) => { ws.onopen = r; });
    await send("Runtime.enable");
    await new Promise((r) => setTimeout(r, 3000));

    const allButtons = await send("Runtime.evaluate", {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        return btns.map((b, i) => {
          const r = b.getBoundingClientRect();
          return {
            index: i,
            text: b.textContent.trim(),
            tag: b.tagName,
            parent: b.parentElement ? b.parentElement.tagName + '.' + b.parentElement.className : null,
            rect: { top: r.top, left: r.left, width: r.width, height: r.height },
            outerHTML: b.outerHTML.slice(0, 150)
          };
        });
      })()`,
      returnByValue: true
    });
    console.log("All buttons on page:", JSON.stringify(allButtons.result.value, null, 2));

    ws.close();
  } finally {
    chromeProc.kill();
  }
}

run().catch(console.error);
