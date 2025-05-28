import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PieCharts (props) {

			const quantityArray = props.quantityArray;
			let totalQuantity = 0;
			quantityArray.forEach((item) => {totalQuantity += parseInt(item.count)});
			
			let finalQuantityArray = [];
			quantityArray.forEach((item) => {
				if (item.count != 0) {
					finalQuantityArray.push({y: Math.floor(item.count / totalQuantity * 10000) / 100, label: item.title});
				};
			});
			const options = {
				animationEnabled: true,
				theme: "dark1",
				title: {
					text: "Products Quantities"
				},
				data: [{
					type: "pie",
					startAngle: 75,
					toolTipContent: "<b>{label}</b>: {y}%",
					// showInLegend: "true",
					legendText: "{label}",
					indexLabelFontSize: 16,
					indexLabel: "{label} - {y}%",
					dataPoints: finalQuantityArray
				}]
			}
			return (
			<div>
				<CanvasJSChart options = {options} />
			</div>
			);

}

export default PieCharts;