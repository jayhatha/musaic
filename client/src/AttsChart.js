import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class AttsChart extends Component {
	render() {
		const valence = Math.floor(this.props.spfyAtts[0] * 100);
		const mode = (this.props.spfyAtts[1] >= 0.5) ? 'Major' : 'Minor';
		const energy = Math.floor(this.props.spfyAtts[2] * 100);
		const danceability = Math.floor(this.props.spfyAtts[3] * 100);

		const data = {
			labels: ['valence', 'energy', 'danceability'],
			datasets: [
				{
					data: [valence, energy, danceability],
					backgroundColor: ['#32ace1', '#fbeb3e', '#e71a8b'],
					label: "Major"
				}
			],
		}

		const legendOpts = {
		  display: false
		};

		if(this.props.spfyAtts.length) {
			console.log('IF', this.props)
			return (
				<div className="atts-chart">
					<Doughnut data={data} legend={legendOpts}/>
				</div>
			);
		}
		else {
			console.log('ELSE', this.props)
			return '';
		}
	}
}

export default AttsChart;