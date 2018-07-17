import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class ColorChart extends Component {
	render() {
		const colors = [];
		const colorPcts = [];

		const data = {
			labels: colors,
			datasets: [
				{
					data: colorPcts,
					backgroundColor: colors
				}
			]
		}
		
		const legendOpts = {
			display: false
		}
		
		if(this.props.colors.length) {
			this.props.colors.map((color) => {
				colors.push(color[0]);
				colorPcts.push(color[1]);
			})
			
			return (
				<div className="color-chart">
					<Pie data={data} legend={legendOpts} />
				</div>
			);
		}
		else {
			return '';
		}
	}
}

export default ColorChart;