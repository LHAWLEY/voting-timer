import React, { Component } from 'react';
import moment from 'moment';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

class Button extends Component {
  render () {
    return (
      <TouchableHighlight
        {...this.props}
        onPress={this.props.onClick}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

class Timer extends Component {
  componentDidMount () {
    setInterval(function () {
      this.forceUpdate()
    }.bind(this), 500)
  }

  startTimer () {
    this.props.model.start()
  }

  endTimer () {
    this.props.model.stop()
  }

  render () {
    return (
      <View style={styles.row}>
        <Button text="Start" style={styles.firstButton} onClick={this.startTimer.bind(this)} />
        <Text>{this.props.model.asClock()}</Text>
        <Button text="Vacant" style={styles.lastButton} onClick={this.endTimer.bind(this)} />
      </View>
    );
  }
}

const Header = ({ text }) => {
  return <Text style={styles.header}>{text}</Text>
}

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

class Timers extends Component {
  renderHeader () {
    return <Header text="Timers" />
  }

  render () {
    const datasource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    const rows = [
      new ClockModel(),
      new ClockModel(),
      new ClockModel()
    ];

    return (
      <View style={styles.container}>
        <ListView
          renderHeader={this.renderHeader.bind(this)}
          dataSource={datasource.cloneWithRows(rows)}
          renderRow={rowData => <Timer model={rowData} />}
        />
        <Button text="Cancel" style={styles.cancel} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#aaa'
  },
  header: {
    paddingTop: 30,
    fontSize: 14,
    backgroundColor: '#eee',
    textAlign: 'center',
    borderBottomWidth: 12,
    borderBottomColor: '#444',
    fontWeight: 'bold'
  },
  button: {
    height: 80,
    width: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    borderRadius: 40,
    backgroundColor: '#eee'
  },
  firstButton: {
    marginRight: 60,
    height: 80,
    width: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    borderRadius: 40,
    backgroundColor: '#2ECC71'
  },
  lastButton: {
    marginLeft: 60,
    height: 80,
    width: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    borderRadius: 40,
    backgroundColor: '#EC644B'
  },
  start: {
    backgroundColor: '#2ECC71'
  },
  stop: {
    backgroundColor: 'red'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingTop: 5,
    backgroundColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    marginTop: 1
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  cancel: {
    backgroundColor: '#EC644B',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    // fontWeight: 'bold'
  }
});

AppRegistry.registerComponent('VotingTimer', () => Timers);
