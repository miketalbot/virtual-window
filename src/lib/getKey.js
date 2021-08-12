const keys = new WeakMap()
let repeatId = 0
export function getKey(item) {
  if (typeof item === "object") {
    const key = keys.get(item) ?? repeatId++
    keys.set(item, key)
    return key
  } else {
    return item
  }
}
