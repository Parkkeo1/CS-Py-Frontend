import React, { Component } from 'react';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
            <div>
              <Typography component="div" style={{ paddingTop: 20, paddingBottom: 0 }}>
                Player's {statistic} vs. Time
              </Typography>
              <LineChart
                key={statIndex}
                chartData={formatDataForChart(this.props.matchData, statistic)}
                chartLabel={statistic}
              />
            </div>
          );
        })}
      </Paper>
    );
  }
}

export default DataGraphs;