export function validateImdbId(id) {
  return /^tt\d{7,8}$/.test(id?.trim())
}