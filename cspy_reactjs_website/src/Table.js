import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
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

const columns = [
  { id: 'Map', isBold: false, tooltip: 'Map' },
  { id: 'Start', isBold: false, tooltip: 'Start time in UTC' },
  { id: 'End', isBold: false, tooltip: 'End time in UTC' },
  { id: 'Kills', isBold: false, tooltip: 'Kills' },
  { id: 'Assists', isBold: false, tooltip: 'Assists' },
  { id: 'Deaths', isBold: false, tooltip: 'Deaths' },
  { id: 'Rating1', isBold: true, tooltip: 'HLTV.org\'s Player Rating 1.0 Formula' },
  { id: 'KAS', isBold: true, tooltip: '% of rounds in which player got a kill or assist, or survived' },
  { id: 'HSR', isBold: false, tooltip: 'Ratio of kills that ended in a headshot' },
  { id: 'KPR', isBold: false, tooltip: 'Average kills per round' },
  { id: 'KDR', isBold: false, tooltip: 'Kill-death ratio' }
];

class SortableTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columns.map(column => {
            return (
              <CustomTableCell
                key={column.id}
                sortDirection={orderBy === column.id ? order : false}
                style={column.isBold ? {fontWeight: 500} : null }
              >
                <Tooltip
                  title={column.tooltip}
                  placement='bottom-start'
                  enterDelay={200}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.id}
                  </TableSortLabel>
                </Tooltip>
              </CustomTableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

SortableTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

class SortableTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'Start',
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  render() {
    const { classes } = this.props;
    const { order, orderBy } = this.state;

    return (
      <Paper className={classes.root}>
        <Table>
          <SortableTableHead onRequestSort={this.handleRequestSort} order={order} orderBy={orderBy} />
          <TableBody>
            {this.props.matchData.sort(getSorting(order, orderBy)).map(match => {
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
                  <CustomTableCell style={{ color: match['KAS'] > 65 ? '#6CC644' : '#BD2C00' }}>
                    {match['KAS']}</CustomTableCell>
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

SortableTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortableTable);
