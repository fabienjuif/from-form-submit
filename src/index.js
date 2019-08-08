export const fromEvent = (event, starter = {}) => {
  event.preventDefault()

  const data = Object.assign({}, starter)

  Array
    .from(event.target.elements)
    .forEach(({ name, type, value }) => {
      if (!name) return

      let castedValue = value
      if (type === 'number') castedValue = +value
      else if (type === 'date') castedValue = new Date(value)

      data[name] = castedValue
    })

  return data
}

export const wrapSubmit = (callback, starter) => event => callback(fromEvent(event, starter))
