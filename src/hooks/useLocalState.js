import { useEffect, useState } from 'react'

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function mergeWithDefaults(defaultValue, storedValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(storedValue) ? storedValue : defaultValue
  }

  if (isPlainObject(defaultValue)) {
    const safeStored = isPlainObject(storedValue) ? storedValue : {}

    return Object.keys(defaultValue).reduce((acc, key) => {
      acc[key] = mergeWithDefaults(defaultValue[key], safeStored[key])
      return acc
    }, {})
  }

  return storedValue === undefined ? defaultValue : storedValue
}

export function useLocalState(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue

    try {
      const raw = window.localStorage.getItem(key)
      if (!raw) return initialValue

      const parsed = JSON.parse(raw)
      return mergeWithDefaults(initialValue, parsed)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage write failures.
    }
  }, [key, value])

  return [value, setValue]
}