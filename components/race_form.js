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
  constructor (props) {
    super(props)
    this.state = {
      races: '',
      voting_style: '',
      props: '',
      email: ''
    }
  }

  goToTimers() {
    if (
      parseInt(this.state.races) &&
      parseInt(this.state.props) &&
      this.state.voting_style
    ) {
      this.props.info.update({
        races: parseInt(this.state.races),
        props: parseInt(this.state.props),
        voting_style: this.state.voting_style,
        email: this.state.email
      })

      this.props.navigator.push({
        title: 'Timers',
        component: Timers,
        passProps: { info: this.props.info }
      })
    }
  }

  selectStyle (voting_style) {
    this.setState({ voting_style })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            onChangeText={(races) => this.setState({ races: races })}
            value={this.state.races}
            placeholder='How many races?'
          />
          <TextInput
            style={styles.input}
            onChangeText={(props) => this.setState({ props: props })}
            value={this.state.props}
            placeholder='How many initiatives?'
          />
        </View>
        <View style={styles.container2}>
          <Text style={styles.selectorTitle}>What is the voting style?</Text>
          <Picker
            selectedValue={this.state.voting_style}
            onValueChange={this.selectStyle.bind(this)}
          >
            <Picker.Item label="Paper" value="Paper" />
            <Picker.Item label="DRE" value="DRE" />
            <Picker.Item label="DRE with VVPAT" value="DRE with VVPAT" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          placeholder='Email (optional)'
        />
        <Button
          text="Next"
          style={styles.next}
          onClick={() => this.goToTimers()}
        />
      </View>
    );
  }
}

export default RaceForm



