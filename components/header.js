import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    fontSize: 14,
    backgroundColor: '#eee',
    textAlign: 'center',
    borderBottomWidth: 12,
    borderBottomColor: '#444',
    fontWeight: 'bold'
  }
});

const Header = ({ text }) => {
  return <Text style={styles.header}>{text}</Text>
}

export default Header
