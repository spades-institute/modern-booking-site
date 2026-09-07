import {
  CONTACT_LIMITS,
  LOCATION_OPTIONS,
  SERVICE_OPTIONS,
} from "./constants.js";

const CONTROL_OR_BIDI_CHARACTERS =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/u;
const PHONE_PATTERN = /^\+?[0-9][0-9 ()-]*$/u;
const TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/u;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/u;

function normalize(value) {
  return typeof value === "string" ? value.normalize("NFKC").trim() : "";
}

function isSafeSingleLine(value, { min = 1, max }) {
  return (
    value.length >= min &&
    value.length <= max &&
    !value.includes("\n") &&
    !value.includes("\r") &&
    !CONTROL_OR_BIDI_CHARACTERS.test(value)
  );
}

function isSafeMessage(value, { required }) {
  if (!value) return !required;
  return (
    value.length <= CONTACT_LIMITS.message &&
    !CONTROL_OR_BIDI_CHARACTERS.test(value)
  );
}

function isValidPhone(phone) {
  if (
    !isSafeSingleLine(phone, { min: 7, max: CONTACT_LIMITS.phone }) ||
    !PHONE_PATTERN.test(phone)
  ) {
    return false;
  }

  const digitCount = phone.replace(/\D/gu, "").length;
  return digitCount >= 7 && digitCount <= 15;
}

function isValidDate(date) {
  const match = DATE_PATTERN.exec(date);
  if (!match) return false;

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return false;
  }

  const now = new Date();
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  const latest = today + 366 * 24 * 60 * 60 * 1000;
  return parsed.getTime() >= today && parsed.getTime() <= latest;
}

function addError(errors, condition, field) {
  if (!condition) errors.push(field);
}

export function validateContactPayload(input, kind) {
  if (
    !input ||
    typeof input !== "object" ||
    Array.isArray(input) ||
    (kind !== "booking" && kind !== "inquiry")
  ) {
    return { ok: false, fields: ["payload"] };
  }

  const name = normalize(input.name);
  const phone = normalize(input.phone);
  const message = normalize(input.message).replace(/\r\n?/gu, "\n");
  const errors = [];

  addError(
    errors,
    isSafeSingleLine(name, { min: 2, max: CONTACT_LIMITS.name }),
    "name",
  );
  addError(errors, isValidPhone(phone), "phone");
  addError(
    errors,
    isSafeMessage(message, { required: kind === "inquiry" }),
    "message",
  );

  if (kind === "inquiry") {
    return errors.length
      ? { ok: false, fields: [...new Set(errors)] }
      : { ok: true, data: { name, phone, message } };
  }

  const service = normalize(input.service);
  const location = normalize(input.location);
  const date = normalize(input.date);
  const time = normalize(input.time);
  const address = normalize(input.address);

  addError(errors, SERVICE_OPTIONS.includes(service), "service");
  addError(errors, LOCATION_OPTIONS.includes(location), "location");
  addError(errors, isValidDate(date), "date");
  addError(errors, TIME_PATTERN.test(time), "time");

  if (location === "home") {
    addError(
      errors,
      isSafeSingleLine(address, {
        min: 5,
        max: CONTACT_LIMITS.address,
      }),
      "address",
    );
  }

  return errors.length
    ? { ok: false, fields: [...new Set(errors)] }
    : {
        ok: true,
        data: {
          service,
          location,
          date,
          time,
          name,
          phone,
          address: location === "home" ? address : "",
          message,
        },
      };
}
