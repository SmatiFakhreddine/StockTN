import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Charts (props) {

	if (props.agent != "product") {

		let finalArray = [];
		const array = props.array;
		array.forEach((item, index) => {
			if(index < 5){
				finalArray.push({y: item.value, label: item[props.agent]});
			};
		});
		// console.log(finalArray);
		
		const options = {
			animationEnabled: true,
			theme: "dark1",
			axisX: {
				reversed: true,
			},
			axisY: {
				includeZero: true,
				labelFormatter: addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: finalArray
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
			containerProps={{ width: '100%', height: '300px' }}
			/>
		</div>
		);
	
		function addSymbols(event) {
			return CanvasJS.formatNumber(event.value);
		};

	} else {
			
		let finalRevenuesArray = [];
		let finalExpensesArray = [];
		const benefitsArray = props.benefitsArray;
		benefitsArray.forEach((item, index) => {
			if (index < 5) {
				finalRevenuesArray.push({label: item.product, y: item.revenuesValue});
				finalExpensesArray.push({label: item.product, y: item.expensesValue});
			};
		});
			const options = {
				animationEnabled: true,
				theme: "dark1",
				colorSet: "colorSet1",
				axisX: {
					reversed: true
				},
				axisY: [{
					includeZero: true,
					lineColor: "#fff",
					labelFontColor: "#fff",
					tickColor: "#fff"
				}],
				toolTip: {
					shared: true
				},
				data: [{
					type: "bar",
					name: "Revenues",
					axisYType: "primary",
					yValueFormatString: "#,##0.0 DT",
					dataPoints: finalRevenuesArray
				}, {
					type: "bar",
					name: "Expenses",
					axisYType: "primary",
					yValueFormatString: "#,##0.0 DT",
					dataPoints: finalExpensesArray
				}]
			};
	 
			return (
				<div>
					<CanvasJSChart options={options}
					containerProps={{ width: '100%', height: '300px' }}
					/>
				</div>
			);
		
	}
}
export default Charts;