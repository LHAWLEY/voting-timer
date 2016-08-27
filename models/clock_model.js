import moment from 'moment';

class ClockModel {
  constructor () {
    this.startAt = null
    this.endAt = null
  }

  start () {
    if (!this.startAt) {
      this.startAt = moment.now()
    } else {
      this.stop()
      this.startAt = moment.now()
    }
  }

  stop () {
    if (this.startAt && !this.endAt) {
      this.endAt = moment.now()
      this.save().then(response => response.json()).then(json => json)
      this.reset()
    }
  }

  reset () {
    this.startAt = null
    this.endAt = null
  }

  secondsElapsed () {
    if (this.startAt && this.endAt) {
      return Math.floor((this.endAt - this.startAt) / 1000)
    } else {
      return 0
    }
  }

  leftPad (time) {
    if (time < 10) {
      return '0' + time
    } else {
      return time
    }
  }

  getOngoingTime () {
    if (this.startAt) {
      return Math.floor((moment.now() - this.startAt) / 1000)
    } else {
      return 0
    }
  }

  asClock () {
    const seconds = this.getOngoingTime()

    return `${this.leftPad(Math.floor(seconds / 60))}:${this.leftPad(seconds % 60)}`
  }

  save () {
    const payload = {
      method: 'POST',
      body: this.toJSON()
    }

    return fetch('http://www.google.com', payload)
  }

  toJSON () {
    return JSON.stringify({
      duration: this.secondsElapsed()
    })
  }
}

export default ClockModel
