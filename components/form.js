import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Picker, Text } from 'react-native';
import Button from './button';
import RaceForm from './race_form';

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
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
    height: 50,
    borderColor: '#666',
    borderWidth: 1,
    paddingLeft: 20
  },
  selectorTitle: {
    textAlign: 'center',
    fontSize: 25
  },
  next: {
    backgroundColor: '#2ECC71',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});

const URL = 'http://go41.com/vote/timer';

class Form extends Component {

  constructor (props) {
    super(props)
    this.state = {
      states: [],
      counties: [],
      selectedState: null,
      selectedCounty: null,
      text: ''
    }
    this.fetchStates();
  }

  fetchStates () {
    fetch(`${URL}/states.php`).then(res => res.json()).then(function (json) {
      this.setState({
        states: json.states
      });
    }.bind(this))
  }

  fetchCounties () {
    fetch(`${URL}/counties.php?state=${this.state.selectedState}`)
      .then(res => res.json())
      .then(function (json) {
        this.setState({
          counties: json.counties
        })
      }.bind(this));
  }

  goToRaceForm() {
    if (
      this.state.selectedState &&
      this.state.selectedCounty &&
      this.state.text.length
    ) {
      this.props.info.update({
        state: this.state.selectedState,
        county: this.state.selectedCounty,
        precinct: this.state.text
      })
      this.props.navigator.push({
        title: 'Race Information',
        component: RaceForm,
        passProps: { info: this.props.info }
      })
    }
  }

  selectState (abbrev) {
    this.setState({
      selectedState: abbrev
    }, function () {
      this.fetchCounties();
    }.bind(this));
  }

  selectCounty (county) {
    this.setState({
      selectedCounty: county
    });
  }

  renderStateSelector () {
    if (this.state.states.length) {
      return (
        <View style={styles.container2}>
          <Text style={styles.selectorTitle}>Select a State</Text>
          <Picker
            selectedValue={this.state.selectedState}
            onValueChange={this.selectState.bind(this)}
          >
            {this.state.states.map(this.renderStateOption)}
          </Picker>
        </View>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }

  renderStateOption (state) {
    return (
      <Picker.Item
        key={state.abbrev}
        label={state.name}
        value={state.abbrev}
      />
    );
  }

  renderCountySelector () {
    if (this.state.selectedState && this.state.counties.length) {
      return (
        <View style={styles.container2}>
          <Text style={styles.selectorTitle}>Select a County</Text>
          <Picker
            selectedValue={this.state.selectedCounty}
            onValueChange={this.selectCounty.bind(this)}
          >
            {this.state.counties.map(this.renderCountyOption)}
          </Picker>
        </View>
      );
    } else if (this.state.selectedState) {
      <Text>Loading...</Text>
    }
  }

  renderCountyOption (county, index) {
    return <Picker.Item key={index} label={county} value={county} />;
  }

  renderPrecinctField () {
    return(
      <TextInput
        style={styles.input}
        value={this.state.text}
        onChangeText={(text) => this.setState({text})}
        placeholder='Enter Precinct'
      />
    );
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderStateSelector()}
        {this.renderCountySelector()}
        {this.renderPrecinctField()}
        <Button
          text="Next"
          style={styles.next}
          onClick={() => this.goToRaceForm()}
        />
      </View>
    );
  }
}

export default Form
