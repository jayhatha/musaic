import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class AttsChart extends Component {
	render() {
		const valence = this.props.spfyAtts[0] * 100;
		const mode = (this.props.spfyAtts[1]) ? 'Major' : 'Minor';
		const energy = this.props.spfyAtts[2] * 100;
		const danceability = this.props.spfyAtts[3] * 100;

		const data = {
			labels: ['valence', 'energy', 'danceability'],
			datasets: [
				{
					data: [valence, energy, danceability],
					backgroundColor: ['#32ace1', '#fbeb3e', '#e71a8b']
				}
			]
		}
		
		const legendOpts = {
			display: false
		}

		return (
			<div className="atts-chart">
				<Doughnut data={data} />
			</div>
		);
	}
}

export default AttsChart;