# from-form-event
> Simply convert a form submit event to a Javascript object

## Features
- Convert types
- Support arrays (eg: `name="values.0.name"` will be converted as `{ values: [{ name }] }`)

## API
- `fromEvent(event: SubmitEvent, starter: Object): Object`: convert the submit event ̀`event` to a Javascript object
  * types are casted when we can
  * inputs must have a `name` attribute for this to work
  * you can give a `starter` object, in which case this object will be copied and then populated with the form informations

- `wrapSubmit(callback: Function, starter: Object): Function`: wrap your implementation before giving it to your "submit" callback form
  * this function catch the form event, then calls ̀formEvent to retrieve data, then calls your callback with it

## Examples (ReactJS)
**fromEvent**
```js
import React from 'react'
import { fromEvent } from 'from-form-event'

const Component = () => (
  <form
    onSubmit={(event) => {
      console.log(fromEvent(event))
    }}
  >
    <input
      type="number"
      name="age"
    />
    <input
      type="string"
      name="name"
    />
  </form>
)
```

**wrapSubmit**
```js
import React from 'react'
import { wrapSubmit } from 'from-form-event'

const Component = () => (
  <form
    onSubmit={wrapSubmit(console.log)}
  >
    <input
      type="number"
      name="age"
    />
    <input
      type="string"
      name="name"
    />
  </form>
)
```
