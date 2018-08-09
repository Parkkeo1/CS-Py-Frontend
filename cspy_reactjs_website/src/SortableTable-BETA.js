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
  { id: 'map', label: 'Map', isBold: false, showTooltip: false },
  { id: 'start', label: 'Start', isBold: false, showTooltip: true, tooltip: 'Start time in UTC' },
  { id: 'end', label: 'End', isBold: false, showTooltip: true, tooltip: 'End time in UTC' },
  { id: 'kills', label: 'Kills', isBold: false, showTooltip: false },
  { id: 'assists', label: 'Assists', isBold: false, showTooltip: false },
  { id: 'deaths', label: 'Deaths', isBold: false, showTooltip: false },
  { id: 'rating', label: 'Rating v1.0', isBold: true, showTooltip: true, tooltip: 'HLTV.org\'s Player Rating v1.0 Formula' },
  { id: 'kas', label: 'KAS %', isBold: true, showToolTip: true, tooltip: '% of rounds in which player got a kill or assist, or survived' },
  { id: 'hsr', label: 'HSR', isBold: false, showToolTip: true, tooltip: 'Ratio of kills that ended in a headshot' },
  { id: 'kpr', label: 'Kills/Round', isBold: false, showToolTip: true, tooltip: 'Average kills per round' },
  { id: 'kdr', label: 'KDR', isBold: false, showToolTip: true, tooltip: 'Kill-death ratio' }
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
                padding='default'
                sortDirection={orderBy === column.id ? order : false}
                style={column.isBold ? {fontWeight: 500} : null }
              >
                <Tooltip
                  title={column.showToolTip ? column.tooltip : null }
                  placement='bottom-start'
                  enterDelay={100}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
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
      orderBy: null,
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

SortableTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortableTable);
