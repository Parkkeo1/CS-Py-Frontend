import React, { Component } from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class LineChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <VictoryChart
        width={1200}
        theme={VictoryTheme.material}>
        <VictoryAxis dependentAxis />
        <VictoryLine
          data={this.props.chartData}
          x='End'
          y={this.props.chartLabel}
        />
      </VictoryChart>
    );
  }
}

// Statistics to be graphed by time
const statsToGraph = [
  'Rating1',
  'KAS',
  'HSR'
];

// allMatches should be straight from the CS-Py REST API.
// statName will be an element from statsToGraph.
function formatDataForChart(allMatches, statName) {
  let formattedMatches = [];

  for (let i = 0; i < allMatches.length; i++) {
    formattedMatches.push({ 'End': allMatches[i]['End'], [statName]: allMatches[i][statName] });
  }

  return formattedMatches;
}

class DataGraphs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper>
        {statsToGraph.map((statistic, statIndex) => {
          return (
              <LineChart
                key={statIndex}
                chartData={formatDataForChart(this.props.matchData, statistic)}
                chartLabel={statistic}
              />
          );
        })}
      </Paper>
    );
  }
}

export default DataGraphs;