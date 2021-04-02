/* App.js */
import React, { Component } from "react";
import CanvasJSReact from '../canvasjs.stock.react';
// Data fucntion
import {readStock} from "../component/database";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class TestGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], prediction: [], isLoaded: false };
  }

  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
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
            var date = new Date(data[i].date);
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
      // exportEnabled: true,
      theme: "dark1",
      // title: {
      //   text: "React StockChart with Date-Time Axis"
      // },
      // subtitles: [{
      //   text: "Price-Volume Trend"
      // }],
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
          prefix: "THB "
          // tickLength: 0
          // interval: 5
        },
        legend: {
          verticalAlign: "top",
          cursor: "pointer",
          // itemclick: function (e) {
          //   if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          //     e.dataSeries.visible = false;
          //   } else {
          //     e.dataSeries.visible = true;
          //   }
          //   e.chart.render();
          // }
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Price (in Bath)",
          yValueFormatString: "#,###.00",
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
            yValueFormatString: "#,###.00"
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
          prefix: "THB "
          // tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Volume",
          yValueFormatString: "#,###.00",
          type: "column",
          dataPoints: this.state.dataPoints2
        }]
      }],
      navigator: {
        data: [{
          dataPoints: this.state.dataPoints3
        }],
        slider: {
          minimum: (new Date()).setDate((new Date().getDate() - 15)) ,
          maximum: new Date()
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
export default TestGraph;      