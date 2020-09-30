let memo

const isLocalStorageAvailable: () => boolean = () => {
  if (memo) {
    console.log('returning memo')
    return memo
  }
  const test = 'test'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    memo = true
    return true
  } catch (error) {
    memo = false
    return false
  }
}

export { isLocalStorageAvailable }
