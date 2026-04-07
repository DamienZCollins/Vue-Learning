import { readJSON, writeJSON } from './storage'

export interface Identifiable {
  id: string
}

export function createLocalCollection<T extends Identifiable>(key: string, seedFactory: () => T[]) {
  function read() {
    return readJSON<T[]>(key, seedFactory())
  }

  function write(records: T[]) {
    writeJSON(key, records)
    return records
  }

  return {
    read,
    write,
    reset() {
      const seeded = seedFactory()
      return write(seeded)
    },
    insert(record: T) {
      const next = [...read(), record]
      return write(next)
    },
    update(id: string, patch: Partial<T>) {
      const next = read().map((record) => (record.id === id ? { ...record, ...patch } : record))
      return write(next)
    },
    remove(id: string) {
      const next = read().filter((record) => record.id !== id)
      return write(next)
    },
    upsert(record: T) {
      const current = read()
      const index = current.findIndex((item) => item.id === record.id)
      if (index === -1)
        return write([...current, record])

      const next = [...current]
      next[index] = record
      return write(next)
    },
    byId(id: string) {
      return read().find((record) => record.id === id)
    },
  }
}

export function paginate<T>(records: T[], page: number, pageSize: number) {
  const safePage = Math.max(1, page)
  const safePageSize = Math.max(1, pageSize)
  const total = records.length
  const start = (safePage - 1) * safePageSize
  const list = records.slice(start, start + safePageSize)

  return {
    list,
    total,
    page: safePage,
    pageSize: safePageSize,
  }
}
