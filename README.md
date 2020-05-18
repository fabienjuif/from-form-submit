# from-form-submit
> Simply convert a form submit event to a Javascript object

![npm bundle size](https://img.shields.io/bundlephobia/minzip/from-form-submit) ![npm](https://img.shields.io/npm/v/from-form-submit) [![Coverage Status](https://coveralls.io/repos/github/fabienjuif/from-form-submit/badge.svg)](https://coveralls.io/github/fabienjuif/from-form-submit)

## Features
- Convert input values by looking at their types
  - date
  - number
  - text
  - checkbox
- Support arrays (eg: `name="values.0.name"` will be converted as `{ values: [{ name }] }`)
- Vanilla JS, meaning it should work with all frameworks!
- Prevent the default form submit behaviour

## API
- `fromEvent(event: SubmitEvent, starter: Object): Object`: convert the submit event ̀`event` to a Javascript object
  * types are casted when we can
  * inputs must have a `name` attribute for this to work
  * you can give a `starter` object, in which case this object will be copied and then populated with the form informations

- `wrapSubmit(callback: Function, starter: Object): Function`: wrap your implementation before giving it to your "submit" callback form
  * this function catch the form event, then calls ̀formEvent to retrieve data, then calls your callback with it
  * `callback(data: object, event: window.Event): void`

## Examples (ReactJS)
**fromEvent**
```js
import React from 'react'
import { fromEvent } from 'from-form-submit'

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
import { wrapSubmit } from 'from-form-submit'

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
