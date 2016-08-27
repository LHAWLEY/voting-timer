import _ from 'underscore';
import React, { Component } from 'react';
import { StyleSheet, View, ListView } from 'react-native';
import Button from './button';
import ClockModel from '../models/clock_model';
import Timer from './timer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#aaa'
  },
  cancel: {
    backgroundColor: '#EC644B',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});


class Timers extends Component {
  constructor(props) {
    super(props);

    const datasource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    const rows = [
      new ClockModel(this.props.info.toJSON()),
      new ClockModel(this.props.info.toJSON()),
      new ClockModel(this.props.info.toJSON())
    ]

    this.state = {
      rows: rows,
      datasource: datasource.cloneWithRows(rows)
    };
  }

  clearAll () {
    _.invoke(this.state.rows, 'reset')
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.datasource}
          renderRow={rowData => <Timer model={rowData} />}
        />
        <Button
          text="Cancel"
          style={styles.cancel}
          onClick={this.clearAll.bind(this)}
        />
      </View>
    );
  }
}

export default Timers
