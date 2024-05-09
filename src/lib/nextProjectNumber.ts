const handleNextProjectNumber = (projectNumbers: number[]): string => {
  let nextNumber = 1

  while (projectNumbers.includes(nextNumber)) {
    nextNumber++
  }
  return String(nextNumber)
}
export default handleNextProjectNumber
