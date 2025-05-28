import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LineCharts (props) {

	let array = props.array;
	let sellArray = [];
	let buyArray = [];
	array.forEach((item) => {
		if (item.revenuesValue != 0 && item.expensesValue != 0) {
			sellArray.push({x: new Date(item.date), y: item.revenuesValue});
			buyArray.push({x: new Date(item.date), y: item.expensesValue});
		} else if (item.revenuesValue != 0) {
			sellArray.push({x: new Date(item.date), y: item.revenuesValue});
		} else if (item.expensesValue != 0) {
			buyArray.push({x: new Date(item.date), y: item.expensesValue});
		}
			
	});
	const options = {
		animationEnabled: true,
		theme: "dark1",
		title:{
			text: "Transactions"
		},
		axisX:{
			valueFormatString: "DD MMM",
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		axisY: {
			crosshair: {
				enabled: true
			}
		},
		toolTip:{
			shared:true
		},  
		legend:{
			cursor: "pointer",
			verticalAlign: "top",
			horizontalAlign: "right",
			dockInsidePlotArea: true,
			itemclick: function(e) {
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				} else{
					e.dataSeries.visible = true;
				}
				e.chart();
			}
		},
		data: [{
			type: "line",
			showInLegend: true,
			name: "Sell operations",
			lineDashType: "dash",
			markerType: "square",
			xValueFormatString: "DD MMM, YYYY",
			dataPoints: sellArray
		}, {
			type: "line",
			showInLegend: true,
			name: "Buy operations",
			lineDashType: "dot",
			dataPoints: buyArray 
		}]
	}	
	return (
	<div>
		<CanvasJSChart options = {options} />
	</div>
	);

}

export default LineCharts;