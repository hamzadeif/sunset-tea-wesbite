import { PACKAGES } from "@/lib/config/packages";
import { getDrinkById, getToppingName } from "@/lib/config/menu";
import { SITE } from "@/lib/config/site";
import { calculatePrice, formatCurrency } from "./pricing";
import type { InquiryFormState } from "./types";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px;color:#6B6560;vertical-align:top;width:40%;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;color:#1A1A1A;font-weight:500;">${value}</td>
  </tr>`;
}

export function buildInquiryEmail(state: InquiryFormState): {
  subject: string;
  html: string;
  text: string;
} {
  const pkg = state.packageId ? PACKAGES[state.packageId] : null;
  const price = calculatePrice(state);
  const submittedAt = new Date().toISOString();

  const subject = `New Sunset Tea Catering Inquiry — ${state.name.trim()} — ${state.eventDate}`;

  let drinkDetails = "";
  if (state.packageId === "dropoff") {
    if (state.letSunsetChoose) {
      drinkDetails = "Sunset Tea will choose a crowd-friendly mix and confirm before the event.";
    } else {
      drinkDetails = state.drinkSelections
        .filter((s) => s.quantity > 0)
        .map(
          (s) =>
            `${s.quantity}× ${getDrinkById(s.drinkId)?.name ?? s.drinkId} — ${getToppingName(s.toppingId)}`,
        )
        .join("<br/>");
    }
  } else if (state.packageId === "booth") {
    if (state.letSunsetRecommendMenu) {
      drinkDetails = "Sunset Tea will recommend the menu.";
    } else {
      drinkDetails = state.boothDrinkIds
        .map((id) => getDrinkById(id)?.name ?? id)
        .join("<br/>");
    }
  }

  const includedRows =
    price?.included.map((line) => row(line.split("—")[0].trim(), "Included")).join("") ??
    "";

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#FBF7F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #F0E6DA;">
    <div style="padding:28px 28px 16px;background:linear-gradient(180deg,#FFF5EE,#ffffff);">
      <p style="margin:0;color:#E07A3D;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Sunset Tea</p>
      <h1 style="margin:8px 0 0;font-size:24px;color:#1A1A1A;">New Catering Inquiry</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;padding:0 16px;">
      ${row("Name", escapeHtml(state.name))}
      ${row("Phone", escapeHtml(state.phone))}
      ${row("Email", escapeHtml(state.email))}
      ${row("Event Date", escapeHtml(state.eventDate))}
      ${row("Package", escapeHtml(pkg?.name ?? "—"))}
      ${
        state.packageId === "dropoff"
          ? row("Drop-off Time", escapeHtml(state.dropOffTime)) +
            row("Number of Cups", String(state.cupCount)) +
            row("Table Setup", state.tableSetup ? "Yes" : "No")
          : row("Event Start", escapeHtml(state.eventStartTime)) +
            row("Event End", escapeHtml(state.eventEndTime)) +
            row("Approx. Guests", String(state.guestCount))
      }
      ${row("Drinks / Menu", drinkDetails || "—")}
      ${
        state.additionalNotes?.trim()
          ? row(
              "Additional Notes",
              escapeHtml(state.additionalNotes.trim()).replace(/\n/g, "<br/>"),
            )
          : ""
      }
      ${
        price
          ? row(price.drinkLine.label, formatCurrency(price.drinkLine.amount)) +
            (price.serviceLine
              ? row(price.serviceLine.label, formatCurrency(price.serviceLine.amount))
              : "") +
            includedRows +
            row(
              price.isEstimate ? "Estimated Total" : "Total",
              formatCurrency(price.total),
            )
          : ""
      }
      ${row("Submitted At", escapeHtml(submittedAt))}
    </table>
    <div style="padding:20px 28px 28px;color:#6B6560;font-size:13px;">
      Reply to ${escapeHtml(state.email)} · Delivered to ${escapeHtml(SITE.inquiryEmail)}
    </div>
  </div>
</body>
</html>`.trim();

  const textLines = [
    "New Sunset Tea Catering Inquiry",
    `Name: ${state.name}`,
    `Phone: ${state.phone}`,
    `Email: ${state.email}`,
    `Event Date: ${state.eventDate}`,
    `Package: ${pkg?.name ?? "—"}`,
  ];

  if (state.packageId === "dropoff") {
    textLines.push(
      `Drop-off Time: ${state.dropOffTime}`,
      `Cups: ${state.cupCount}`,
      `Table Setup: ${state.tableSetup ? "Yes" : "No"}`,
    );
  } else {
    textLines.push(
      `Start: ${state.eventStartTime}`,
      `End: ${state.eventEndTime}`,
      `Guests: ${state.guestCount}`,
    );
  }

  textLines.push(`Drinks: ${drinkDetails.replace(/<br\/>/g, "; ")}`);
  if (state.additionalNotes?.trim()) {
    textLines.push(`Additional Notes: ${state.additionalNotes.trim()}`);
  }
  if (price) {
    textLines.push(
      price.drinkLine.label,
      ...(price.serviceLine
        ? [`${price.serviceLine.label}: ${formatCurrency(price.serviceLine.amount)}`]
        : []),
      ...price.included,
      `${price.isEstimate ? "Estimated Total" : "Total"}: ${formatCurrency(price.total)}`,
    );
  }
  textLines.push(`Submitted: ${submittedAt}`);

  return { subject, html, text: textLines.join("\n") };
}
