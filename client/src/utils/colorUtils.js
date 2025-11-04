export function getColorFromValue(value) {
  if (value === null || value === undefined) {
    return '#808080'
  }

  const clampedValue = Math.max(0, Math.min(1, value))

  if (clampedValue <= 0.5) {
    const ratio = clampedValue / 0.5
    const red = Math.round(255 * ratio)
    const green = 255
    const blue = 0
    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`
  } else {
    const ratio = (clampedValue - 0.5) / 0.5
    const red = 255
    const green = Math.round(255 * (1 - ratio))
    const blue = 0
    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`
  }
}
