import "server-only";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function display(value) {
  return value || "—";
}

function rowsFor(kind, data) {
  if (kind === "booking") {
    return [
      ["Service", data.service],
      ["Location", data.location === "home" ? "At home" : "In studio"],
      ["Preferred date", data.date],
      ["Preferred time", data.time],
      ["Address", data.address],
      ["Customer", data.name],
      ["Phone / WhatsApp", data.phone],
      ["Notes", data.message],
    ];
  }

  return [
    ["Customer", data.name],
    ["Phone / WhatsApp", data.phone],
    ["Question", data.message],
  ];
}

export function buildContactEmail({ kind, data, receivedAt, requestId }) {
  const title = kind === "booking" ? "New booking request" : "New customer inquiry";
  const rows = rowsFor(kind, data);
  const textRows = rows.map(([label, value]) => `${label}: ${display(value)}`);
  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <th scope="row" style="padding:10px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #e7e5e4;color:#57534e;font:600 13px/1.5 system-ui,sans-serif;white-space:nowrap">${escapeHtml(label)}</th>
          <td style="padding:10px 12px;vertical-align:top;border-bottom:1px solid #e7e5e4;color:#1c1917;font:14px/1.5 system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(display(value))}</td>
        </tr>`,
    )
    .join("");

  return {
    subject: `[Website] ${title}`,
    text: [
      title,
      "",
      ...textRows,
      "",
      `Received: ${receivedAt}`,
      `Request ID: ${requestId}`,
    ].join("\n"),
    html: `<!doctype html>
      <html lang="en">
        <body style="margin:0;padding:24px;background:#fafaf9">
          <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e7e5e4">
            <h1 style="margin:0;padding:22px 24px;background:#1c1917;color:#fff;font:600 22px/1.3 system-ui,sans-serif">${escapeHtml(title)}</h1>
            <table role="presentation" style="width:100%;border-collapse:collapse">${htmlRows}</table>
            <p style="margin:0;padding:18px 24px;color:#78716c;font:12px/1.5 system-ui,sans-serif">
              Received ${escapeHtml(receivedAt)} · Request ${escapeHtml(requestId)}
            </p>
          </div>
        </body>
      </html>`,
  };
}
