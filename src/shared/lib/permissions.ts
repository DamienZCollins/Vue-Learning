export type MaybeArray<T> = T | T[]

export function normalizeArray<T>(value?: MaybeArray<T>) {
  if (value === undefined)
    return []
  return Array.isArray(value) ? value : [value]
}

export function hasPermission<T>(required?: MaybeArray<T>, granted?: MaybeArray<T>) {
  const requiredList = normalizeArray(required)
  if (requiredList.length === 0)
    return true

  const grantedList = normalizeArray(granted)
  if (grantedList.length === 0)
    return false

  return requiredList.some((item) => grantedList.includes(item))
}
