import { useEffect, useState } from "react"


export function useSessionStorage<T>(key: string, initialValue: T) {

  const [value, setValue] = useState<T>(() => {
    const jsonValue = sessionStorage.getItem(key)
    if (jsonValue != null) {
      return JSON.parse(jsonValue)
    }
    return initialValue;
  })

  useEffect(() => {

    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>]
}

