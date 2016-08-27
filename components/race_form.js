import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Picker, Text } from 'react-native';
import Timers from './timers';
import Button from './button';

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    borderColor: '#666',
    borderWidth: 1,
    paddingLeft: 20,
    marginTop: 5
  },
  selectorTitle: {
    textAlign: 'center',
    fontSize: 25,
  },
  next: {
    backgroundColor: '#2ECC71',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});

class RaceForm extends Component {

  GoToTimers() {
    this.props.navigator.push({
      title: 'Timers',
      component: Timers
    })
  }

  // Hack for now
  constructor (props) {
    super(props)
    this.state = {
      races: "How many races?",
      propositions: "How many initiatives, propositions, or referndums?",
      email: "Email (optional)"
    }
  }

  onChange () {

  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            onChangeText={(races) => this.setState({races})}
            value={this.state.races}
          />
          <TextInput
            style={styles.input}
            onChangeText={(propositions) => this.setState({propositions})}
            value={this.state.propositions}
          />
        </View>
        <View style={styles.container2}>
          <Text style={styles.selectorTitle}>What is the voting style?</Text>
          <Picker
            selectedValue='wutang'
            onValueChange={this.onChange.bind(this)}
          >
            <Picker.Item label="Paper" value="Paper" />
            <Picker.Item label="DRE" value="DRE"  />
            <Picker.Item label="DRE with VVPAT" value="DRE with VVPAT" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <Button
          text="Next"
          style={styles.next}
          onClick={() => this.GoToTimers()}
        />
      </View>
    );
  }
}

export default RaceForm



