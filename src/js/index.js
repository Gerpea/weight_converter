import 'normalize.css'
import './../scss/styles.scss'

const fields = {
  grams: {
    mult: 1,
  },
  kilograms: {
    mult: 1000,
  },
  tons: {
    mult: 1000000,
  },
  ounces: {
    mult: 28.34952,
  },
  pounds: {
    mult: 453.59237,
  },
  stones: {
    mult: 6350.29318,
  },
}

function formatField() {
  if (this.value.length === 0) {
    this.value = 0
  }
  if (this.value.length > 1 && this.value[0] === '0') {
    this.value = this.value.substr(1)
  }

  const afterDot = (this.value * 1.0).toFixed(4).split('.')[1]
  if (afterDot !== '0000') {
    this.value = (this.value * 1.0).toFixed(4)
  } else {
    this.value = Math.round(this.value)
  }
}

function onChange(value) {
  for (const subscriber of this._subscribers_) {
    subscriber(value)
  }
}

function subscribe(onChange) {
  if (!this.hasOwnProperty('_subscribers_')) {
    this._subscribers_ = []
  }
  this._subscribers_.push(onChange)
}

;(() => {
  for (const field in fields) {
    fields[field] = Object.assign(document.getElementById(field), fields[field])
    fields[field].addEventListener('input', (event) => {
      onChange.apply(fields[field], [event.target.value])
    })

    subscribe.apply(fields[field], [
      (value) => {
        for (const f in fields) {
          fields[f].value = value * (1 / fields[f].mult) * fields[field].mult
          formatField.call(fields[f])
        }
      },
    ])
  }
})()
