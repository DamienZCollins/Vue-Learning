export function delay(ms = 260) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}
