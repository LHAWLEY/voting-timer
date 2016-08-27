import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

class Timer extends Component {
  toggleTimer () {

  }

  render () {
    return (
      <TouchableHighlight
        onPress={this.toggleTimer.bind(this)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableHighlight>
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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return (
      <View style={styles.container}>
        <ListView
          renderHeader={() => <Header />}
          dataSource={ds.cloneWithRows([''])}
          renderRow={() => <Timer />}
          contentContainerStyle={styles.timers}
        />
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
    backgroundColor: '#F5FCFF',
    paddingTop: 30
  },
  timers: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  header: {
    fontSize: 14,
    backgroundColor: '#F5FCFF',
    textAlign: 'center',
    borderBottomWidth: 12,
    borderBottomColor: '#444',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#d6f3ff',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 24
  }
});

AppRegistry.registerComponent('VotingTimer', () => Timers);
