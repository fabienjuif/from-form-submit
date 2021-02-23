const getObject = (typedData) => {
  const object = {}

  Object.entries(typedData)
    .map(([key, value]) => [key.split('.'), value])
    .forEach(([key, value]) => {
      let reference = object

      for (let i = 0; i < key.length; i += 1) {
        const keyPart = key[i]

        if (reference[keyPart] === undefined) {
          if (Number.isNaN(+key[i + 1])) reference[keyPart] = {}
          else reference[keyPart] = []
        }

        if (key.length - 1 === i) {
          reference[keyPart] = value
        }
        reference = reference[keyPart]
      }
    })

  return object
}

/**
 * Convert form submit event to a javascript object.
 * 
 * @param {*} event form submit event
 * @param {Object?} starter object where new data will be added
 */
export const fromEvent = (event, starter = {}) => {
  event.preventDefault()

  const typedData = { ...starter }

  Array.from(event.target.elements).forEach(
    ({ name, type, value, checked }) => {
      if (!name) return

      let castedValue = value
      if (type === 'number') castedValue = +value
      else if (type === 'date') castedValue = new Date(value)
      else if (type === 'checkbox') castedValue = !!checked

      typedData[name] = castedValue
    },
  )

  return getObject(typedData)
}

/**
 * Convert a given callback to a form submit callback
 * 
 * @param {(data: object) => void} callback 
 * @param {Object?} starter object where new data will be added
 */
export const wrapSubmit = (callback, starter) => (event) =>
  callback(fromEvent(event, starter), event)
