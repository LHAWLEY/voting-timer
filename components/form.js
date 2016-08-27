import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Picker } from 'react-native';
import Header from './header'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#aaa'
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderColor: '#666',
    borderWidth: 1
  }
});

class Form extends Component {
  // Hack for now
  constructor (props) {
    super(props)
    this.state = {
      counties: []
    }
    fetch('http://go41.com/vote/timer/counties.php?state=IL').then(res => {debugger; return res.json()}).then(function (json) { this.setState({ counties: json.counties }) }.bind(this)).catch(function () {debugger;})
  }

  onChange () {

  }

  render () {
    return (
      <View style={styles.container}>
        <Header text="Info" />
        <TextInput
          style={styles.input}
          value="wutang"
          onChangeText={this.onChange.bind(this)}
        />
        <Picker
          onValueChange={this.onChange.bind(this)}
        >
          {this.state.counties.map(function (county) {
            return <Picker.Item label={county} value={country} />
          })}
        </Picker>
        <Picker
          selectedValue='wutang'
          onValueChange={this.onChange.bind(this)}
        >
          <Picker.Item label="Wutang" value="wutang" />
          <Picker.Item label="ODB" value="odb" />
          <Picker.Item label="Jay-Z" value="jayz" />
        </Picker>
      </View>
    );
  }
}

export default Form
