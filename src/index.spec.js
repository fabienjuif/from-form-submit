/* eslint-env jest */
const { JSDOM } = require('jsdom')
const { wrapSubmit } = require('./index')

test('all cases...', () => {
  const { window } = new JSDOM()
  const { document } = window

  document.body.innerHTML = `
    <form id="form">
      <input name="firstname" value="patrick" type="text" />
      <input name="brothers.0.firstname" value="gerard" type="text" />
      <input name="brothers.1.firstname" value="marc" type="text" />
      <input name="brothers.1.age" value="31" type="number" />
      <input name="brothers.0.age" value="33" type="number" />
      <input name="updatedAt" type="date" value="2019-11-16" />
      <input type="text" value="should not be in data object" />
      <input type="unknown" name="unknown-type" value="as text" />
      <input name="tomato" type="checkbox" checked />
      <input name="cheese" type="checkbox" />
    </form>
  `

  const onSubmit = (data, event) => {
    expect(event).toBeInstanceOf(window.Event)
    expect(data).toEqual({
      type: 'user',
      firstname: 'patrick',
      brothers: [
        {
          firstname: 'gerard',
          age: 33,
        },
        {
          firstname: 'marc',
          age: 31,
        },
      ],
      updatedAt: new Date('2019-11-16T00:00:00.000Z'),
      'unknown-type': 'as text',
      tomato: true,
      cheese: false,
    })
  }

  const starterObject = { type: 'user' }

  const form = document.getElementById('form')
  form.addEventListener('submit', wrapSubmit(onSubmit, starterObject))
  form.dispatchEvent(new window.Event('submit', { target: form }))
})
