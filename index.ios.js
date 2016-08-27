import React, { Component } from 'react';
import { AppRegistry, NavigatorIOS, StyleSheet } from 'react-native';
import Form from './components/form';
import Info from './models/info';

class VotingTimer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      info: new Info()
    };
  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Registration',
          component: Form,
          passProps: { info: this.state.info }
      }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('VotingTimer', () => VotingTimer);
