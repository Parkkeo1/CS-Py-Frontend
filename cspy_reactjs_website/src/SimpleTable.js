import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './Table.css';

function unix_to_datetime(unix_timestamp) {
  let dt = new Date(unix_timestamp * 1000);
  let month = dt.getMonth();
  if (month < 10) {
    month = '0' + month;
  } else {
    month = month.toString();
  }

  let date = dt.getDate();
  if (date < 10) {
    date = '0' + date;
  } else {
    date = date.toString();
  }

  let hours = dt.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  } else {
    hours = hours.toString();
  }

  let minutes = dt.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  } else {
    minutes = minutes.toString();
  }

  return month + '/' + date + " " + hours + ':' + minutes;
}

function format_map_name(de_map_name) {
  let map_name = de_map_name.slice(3);
  return map_name.charAt(0).toUpperCase() + map_name.slice(1);
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#2196f3',
    color: theme.palette.common.white,
    fontWeight: 300,
  },
}))(TableCell);

class SimpleTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Map</CustomTableCell>
              <CustomTableCell>Start</CustomTableCell>
              <CustomTableCell>End</CustomTableCell>
              <CustomTableCell>Kills</CustomTableCell>
              <CustomTableCell>Assists</CustomTableCell>
              <CustomTableCell>Deaths</CustomTableCell>
              <CustomTableCell style={{ fontWeight: 500 }}>HLTV Rating 1.0</CustomTableCell>
              <CustomTableCell style={{ fontWeight: 500 }}>KAS %</CustomTableCell>
              <CustomTableCell>Headshot %</CustomTableCell>
              <CustomTableCell>Kills/Round</CustomTableCell>
              <CustomTableCell>KDR</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.matchData.map(match => {
              return (
                <TableRow key={match['Match_ID']}>
                  <CustomTableCell component="th" scope="row">{format_map_name(match['Map'])}</CustomTableCell>
                  <CustomTableCell>{unix_to_datetime(match['Start'])}</CustomTableCell>
                  <CustomTableCell>{unix_to_datetime(match['End'])}</CustomTableCell>
                  <CustomTableCell>{match['Kills']}</CustomTableCell>
                  <CustomTableCell>{match['Assists']}</CustomTableCell>
                  <CustomTableCell>{match['Deaths']}</CustomTableCell>
                  <CustomTableCell style={{ color: match['Rating1'] > 1 ? '#6CC644' : '#BD2C00' }}>
                    {match['Rating1']}</CustomTableCell>
                  <CustomTableCell>{match['KAS']}</CustomTableCell>
                  <CustomTableCell>{match['HSR']}</CustomTableCell>
                  <CustomTableCell>{match['KPR']}</CustomTableCell>
                  <CustomTableCell style={{ color: match['KDR'] > 1 ? '#6CC644' : '#BD2C00' }}>
                    {match['KDR']}</CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
