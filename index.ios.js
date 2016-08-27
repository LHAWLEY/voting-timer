import React, { Component } from 'react';
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

class Header extends Component {
  render () {
    return <Text style={styles.header}>Timers</Text>
  }
}

class Timers extends Component {
  render () {
    const rows = ['Start', 'Start', 'Start'];
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
      <View style={styles.container}>
        <ListView
          renderHeader={() => <Header />}
          dataSource={ds.cloneWithRows(rows)}
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
    marginTop: 2,
    borderRadius: 50
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
