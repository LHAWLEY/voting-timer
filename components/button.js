import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  }
});

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

export default Button
