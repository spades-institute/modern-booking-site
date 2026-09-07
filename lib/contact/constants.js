export const SERVICE_OPTIONS = Object.freeze([
  "Signature Cut",
  "Skin Fade",
  "Beard Sculpt",
  "Cut + Beard",
  "Hot Towel Shave",
  "Junior Cut",
]);

export const LOCATION_OPTIONS = Object.freeze(["studio", "home"]);

export const CONTACT_LIMITS = Object.freeze({
  address: 240,
  bodyBytes: 16_384,
  message: 1_200,
  name: 100,
  phone: 24,
});
