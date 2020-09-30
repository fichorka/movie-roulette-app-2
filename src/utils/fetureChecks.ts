const isLocalStorageAvailable: () => boolean = () => {
  const test = 'test'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (error) {
    return false
  }
}

export { isLocalStorageAvailable }
