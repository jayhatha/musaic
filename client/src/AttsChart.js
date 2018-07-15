import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class AttsChart extends Component {
	render() {
		const colors = [];
		const colorPcts = [];

		this.props.spfyAtts.map((color) => {
			colors.push(color[0]);
			colorPcts.push(color[1]);
		})

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

		return (
			<div>
				<h1>HIE</h1>
				<Pie data={data} legend={legendOpts} />
			</div>
		);
	}
}

export default AttsChart;