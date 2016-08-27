import moment from 'moment';

class InfoModel {
  constructor () {
    this.state = null
    this.county = null
    this.precinct = null
    this.races = 0
    this.props = null
    this.voting_style = null
    this.email = null
  }

  update (attrs = {}) {
    for (let key in attrs) {
      this[key] = attrs[key]
    }
  }

  toJSON () {
    return JSON.stringify({
      state: this.state,
      county: this.county,
      precinct: this.precinct,
      races: this.races,
      props: this.props,
      voting_style: this.voting_style,
      email: this.email
    })
  }
}

export default InfoModel
