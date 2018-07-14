import React, {Component} from 'react';
import axios from 'axios';
import convert from 'color-convert';
import {colors} from '../colors';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class PhotoForm extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			playlist: [],
			spotifyToken: '',
			genres: []
		}
	}

	handleChange(e) {
		console.log('change');
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("SUBMIT");
		let attributes = this.spotifyAttributes([["#162E02",6.7], ["#385B0C",6.3], ["#F3285C",5.0], ["#B3CB6E",5.0], ["#688F1C",4.4], ["#324D07",4.4], ["#8EAA34",4.3], ["#4F6D0D",4.2], ["#789446",4.1], ["#DF1327",3.9], ["#A10B12",3.7], ["#273804",3.4], ["#0D1802",3.4], ["#D5E191",3.2], ["#646E20",3.1], ["#94AF4D",2.9], ["#FB54A9",2.8], ["#48570B",2.7], ["#ACC655",2.7], ["#FCA2D9",2.7], ["#63110A",2.6], ["#E9B327",2.2], ["#6D644D",2.1], ["#6D8D12",2.0], ["#8F9F27",1.9], ["#C3573E",1.8], ["#CFD76E",1.6], ["#A0B058",1.6], ["#FCD0E9",1.6], ["#728F2D",1.4], ["#F958A1",1.4], ["#D1B694",1.0]])
		let valence = attributes[0];
		let mode = attributes[1];
		let energy = attributes[2];
		let danceability = attributes[3];
		let genres = (this.state.genres.length > 1) ?
					 this.state.genres.join(',') : this.state.genres[0];

		
		console.log('valence ', valence);
		console.log('mode ', mode);
		console.log('energy ', energy);
		console.log('danceability ', danceability);
		console.log('genres ', genres);
		// SPOTIFY CALL GOES HERE
		var token = localStorage.getItem('spotifyToken');
		console.log('###TOKEN', token)
		axios.defaults.headers.common['Authorization'] = "Bearer " + token;
		  axios.get(`https://api.spotify.com/v1/recommendations?limit=50&seed_genres=${genres}&max_danceability=${danceability}&max_valence=${valence}&max_energy=${energy}`)
		  .then(response => {
		  console.log(response.data);
		  this.setState({
		    playlist: response.data.tracks
		    })
		  })
	}

	getColorRange(hexHash) {
		let hexColor = hexHash.split('#')[1];
		let hslColor = convert.hex.hsl(hexColor);
		let hue = hslColor[0];
		let sat = hslColor[1];
		let light = hslColor[2];

		let color;
		if(hue <= 45) color = 'redOrange';
		else if (hue > 45 && hue <= 90) color = 'orangeYellowGreen';
		else if (hue > 90 && hue <= 135) color = 'green';
		else if (hue > 135 && hue <= 180) color = 'greenAqua';
		else if (hue > 180 && hue <= 225) color = 'aquaBlue';
		else if (hue > 225 && hue <= 270) color = 'bluePurple';
		else if (hue > 270 && hue <= 315) color = 'purplePink';
		else if (hue > 315 && hue <= 360) color = 'pinkRed';

		let lightness;
		if(light <= 25) lightness = 'dark';
		else if(light > 25 && light <= 50) lightness = 'medDark';
		else if(light > 50 && light <= 75) lightness = 'medLight';
		else if(light > 75 && light <= 100) lightness = 'light';

		return color + '-' + lightness;
	}

	spotifyAttributes(cloudColors) {
		let colorsArr = [];
		cloudColors.map((color) => {
			let colorRange = this.getColorRange(color[0]);
			colorsArr.push(colorRange);
		});
		
		let valence = 0;
		let mode = 0;
		let energy = 0;
		let danceability = 0;
		colorsArr.map((colorName) => {
			let currColor = colors.find((colorObj) => colorObj.name === colorName);
			valence += currColor.valence;
			mode += currColor.mode;
			energy += currColor.energy;
			danceability += currColor.danceability;
		});

		valence = valence / cloudColors.length;
		mode = mode / cloudColors.length;
		energy = energy / cloudColors.length;
		danceability = danceability / cloudColors.length;

		return [valence, mode, energy, danceability];
	}



	render() {
		console.log('GENRE ', this.state.genres);
		console.log('Playlist ', this.state.playlist);
		return (
			<form onSubmit={this.handleSubmit} autoComplete="off">
				<FormControl required>
				<InputLabel htmlFor="genre-select">Genre</InputLabel>
					<Select value={this.state.genres}
							onChange={this.handleChange}
							multiple
							inputProps={{name: 'genres', id: 'genre-select'}} >

							<MenuItem value='blues'>blues</MenuItem>
							<MenuItem value='chill'>chill</MenuItem>
							<MenuItem value='classical'>classical</MenuItem>
							<MenuItem value='club'>club</MenuItem>
							<MenuItem value='country'>country</MenuItem>
							<MenuItem value='dance'>dance</MenuItem>
							<MenuItem value='disco'>disco</MenuItem>
							<MenuItem value='dubstep'>dubstep</MenuItem>
							<MenuItem value='electronic'>electronic</MenuItem>
							<MenuItem value='folk'>folk</MenuItem>
							<MenuItem value='funk'>funk</MenuItem>
							<MenuItem value='hip-hop'>hip-hop</MenuItem>
							<MenuItem value='house'>house</MenuItem>
							<MenuItem value='indie'>indie</MenuItem>
							<MenuItem value='indie-pop'>indie-pop</MenuItem>
							<MenuItem value='j-pop'>j-pop</MenuItem>
							<MenuItem value='jazz'>jazz</MenuItem>
							<MenuItem value='k-pop'>k-pop</MenuItem>
							<MenuItem value='metal'>metal</MenuItem>
							<MenuItem value='pop'>pop</MenuItem>
							<MenuItem value='punk'>punk</MenuItem>
							<MenuItem value='punk-rock'>punk-rock</MenuItem>
							<MenuItem value='r-n-b'>r-n-b</MenuItem>
							<MenuItem value='reggae'>reggae</MenuItem>
							<MenuItem value='rock-n-roll'>rock-n-roll</MenuItem>
							<MenuItem value='romance'>romance</MenuItem>
							<MenuItem value='salsa'>salsa</MenuItem>
							<MenuItem value='samba'>samba</MenuItem>
							<MenuItem value='synth-pop'>synth-pop</MenuItem>
							<MenuItem value='techno'>techno</MenuItem>
					</Select>
				</FormControl>
				<Input value="Get Playlist" type="submit"></Input>
			</form>
		);
	}
}

export default PhotoForm;