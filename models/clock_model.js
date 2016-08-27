import moment from 'moment';

class ClockModel {
  constructor (props) {
    this.info = JSON.parse(props)
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
      this.save()
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
    let body = this.info
    body.durations = [this.secondsElapsed()]
    const payload = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    fetch('http://54.161.224.89:5000/update', payload).catch(err => console.log(err))
  }
}

export default ClockModel
