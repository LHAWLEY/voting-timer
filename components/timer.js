import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from './button';

const styles = StyleSheet.create({
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
    marginLeft: 50,
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
  clock: {
    height: 80,
    width: 80,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    paddingTop: 25,
    // borderRadius: 40,
    // backgroundColor: 'yellow',
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold'
  }
});

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
        <Text style={styles.clock}>{this.props.model.asClock()}</Text>
        <Button text="Vacant" style={styles.lastButton} onClick={this.endTimer.bind(this)} />
      </View>
    );
  }
}

export default Timer
