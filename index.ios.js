import React, { Component } from 'react';
import $ from 'jquery';
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
        onPress={this.props.onClick}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

class Timer extends Component {
  toggleTimer () {

  }

  render () {
    return (
      <View style={styles.row}>
        <Button text="Start" onClick={this.toggleTimer.bind(this)} />
        <Button text="Clock" onClick={this.toggleTimer.bind(this)} />
        <Button text="Vacant" onClick={this.toggleTimer.bind(this)} />
      </View>
    );
  }
}

const Header = ({ text }) => {
  return <Text style={styles.header}>{text}</Text>
}

class ClockModel extends ListView.DataSource {
  constructor () {
    super({ rowHasChanged: (row1, row2) => row1 !== row2 })
  }

  start () {
    if (!this.startAt) {
      this.startAt = moment.now()
      // trigger change
    } else if (this.startDate && !this.endDate) {
      this.stop()
    }
  }

  stop () {
    if (this.startAt && !this.endAt) {
      this.endAt = moment.now()
      this.save().then(this.reset)
    }
  }

  reset () {
    this.startAt = null
    this.endAt = null
  }

  secondsElapsed () {
    if (this.startAt && this.endAt) {
      return Math.floor((this.startAt - this.endAt) / 1000)
    } else {
      return 0
    }
  }

  save () {
    return $.post('http://www.google.com', this.toJSON())
  }

  toJSON () {
    return {
      duration: this.secondsElapsed()
    }
  }
}

class Timers extends Component {
  renderHeader () {
    return <Header text="Timers" />
  }

  render () {
    const model = new ClockModel()
    const rows = [
      { startAt: null, endAt: null },
      { startAt: null, endAt: null },
      { startAt: null, endAt: null }
    ];

    return (
      <View style={styles.container}>
        <ListView
          renderHeader={this.renderHeader.bind(this)}
          dataSource={model.cloneWithRows(rows)}
          renderRow={() => <Timer />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
    backgroundColor: '#2ECC71',
    height: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold'
  }
});

AppRegistry.registerComponent('VotingTimer', () => Timers);
