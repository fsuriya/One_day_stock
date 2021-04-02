/* App.js */
import React, { Component } from "react";
import CanvasJSReact from '../canvasjs.stock.react';
// Data fucntion
import {readStock} from "../component/database";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], prediction: [], isLoaded: false };
  }

  componentDidMount() {
    var pathname = (window.location.pathname.split('/')[1]).toUpperCase();
    readStock(pathname)
      .then(
        (data) => {
          var dps1 = [], dps2 = [], dps3 = [], pred = [];
          for (var i = 0; i < data.length; i++) {
            dps1.push({
              x: new Date(data[i].date),
              y: [
                Number(data[i].open),
                Number(data[i].high),
                Number(data[i].low),
                Number(data[i].close)
              ]
            });
            var date = new Date(data[i].date)
            dps2.push({ x: new Date(data[i].date), y: Number(data[i].volume) });
            dps3.push({ x: new Date(data[i].date), y: Number(data[i].close) });
            pred.push({ x: new Date(data[i].date).setDate(date.getDate() + 1), y: Number(data[i].predict) });
          }
          this.setState({
            isLoaded: true,
            dataPoints1: dps1,
            dataPoints2: dps2,
            dataPoints3: dps3,
            prediction: pred
          });
        }
      )
  }

  render() {
    const options = {
      theme: "dark1",
      charts: [{
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function (e) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function (e) {
              return "";
            }
          }
        },
        axisY: {
          title: "Price",
          prefix: "THB ",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
            name: "Price (in Bath)",
            yValueFormatString: "#,###.##",
            axisYType: "secondary",
            type: "candlestick",
            color: "grey",
            risingColor: "lime",
            fallingColor: "red",
            dataPoints: this.state.dataPoints1,
            predictions: this.state.prediction
        },
        { 
            name: "Prediction (in Bath)",
            type: "line", 
            dataPoints: this.state.prediction, 
            showInLegend: true, 
            yValueFormatString: "#,###.##"
        }]
      }, {
        height: 100,
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        axisY: {
          title: "Volume",
          prefix: "THB ",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Volume",
          yValueFormatString: "#,###.##",
          type: "column",
          dataPoints: this.state.dataPoints2
        }]
      }],
      navigator: {
        data: [{
          dataPoints: this.state.dataPoints3
        }],
        slider: {
          minimum: new Date("2021-03-01"),
          maximum: new Date("2021-03-15")
        }
      }
    };
    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto"
    };
    return (
      <div>
        <div>
          {
            // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
            this.state.isLoaded &&
            <CanvasJSStockChart containerProps={containerProps} options={options}
            /* onRef = {ref => this.chart = ref} */
            />
          }
        </div>
      </div>
    );
  }
}
export default Graph;      