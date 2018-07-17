import React, {Component} from 'react';
import axios from 'axios';
import convert from 'color-convert';
import {colors} from './colors';
import ColorChart from './ColorChart';
import AttsChart from './AttsChart';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dropzone from 'react-dropzone';
import Paper from '@material-ui/core/Paper'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';
import createHistory from 'history/createBrowserHistory';
import {withRouter} from 'react-router-dom';

const history = createHistory();

const styles = theme => ({
	root: {
		textAlign: 'center',
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		margin: theme.spacing.unit * 2,
		height: '100%',
		color: theme.palette.text.secondary,
		textAlign: 'center'
	},
	button: {
		margin: theme.spacing.unit * 1
	},
	dropzone: {
		padding: theme.spacing.unit * 4,
		margin: theme.spacing.unit * 4
	}
})


class PhotoForm extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			playlist: [],
			spotifyToken: '',
			genres: [],
			cloudColors: [],
			spfyAtts: [],
			currImgURL: ''
		}
	}


	// this handles the changes in the select form
	// by updating the genres state with each selection
	handleChange(e) {
		console.log('change');
		this.setState({genres: e.target.value}, () => {
			this.props.liftGenres(this.state.genres);
		})
	}

	// dooeess a lot of things
	handleSubmit(e) {
		if (e) e.preventDefault();

		// first, calls spfyAtts function using the colors stored in state
		// (which were set in cloudinaryResult function)
		let attributes = this.spotifyAttributes(this.state.cloudColors);
		// atts are set using the returned array
		const valence = attributes[0];
		const mode = attributes[1];
		const energy = attributes[2];
		const danceability = attributes[3];

		// if more than one genre is selected, join array with comma
		// let genres = (this.state.genres.length > 1) ? this.state.genres.join(',') : this.state.genres[0];
		let genres = this.state.genres;

		// Calling Spotify to get our playlist
		var spotifyToken = localStorage.getItem('spotifyToken');
		console.log('###TOKEN', spotifyToken)
		// Jay Magic...
		axios.defaults.headers.common['Authorization'] = "Bearer " + spotifyToken;
		  axios.get(`https://api.spotify.com/v1/recommendations?limit=50&market=US&seed_genres=${genres}&max_danceability=${danceability}&max_valence=${valence}&max_energy=${energy}&mode=${mode}`)
		  .then(response => {
		  	console.log('GOT SPOTIFY STUFF')
				// FIXME: error handle the token here
		  this.setState({
			spotifyToken,
		  	// we have a playlist in state!
		  	playlist: response.data.tracks,
		  	spfyAtts: [valence, mode, energy, danceability]
		    }, () => {
		    	console.log("STATE IS SET")
		    	this.props.liftPlaylist(this.state.playlist);
		    	this.props.history.push({
		    		pathname: '/results',
		    		state: {
		    			playlist: this.state.playlist,
		    			spotifyToken: this.state.spotifyToken,
		    			genres: this.state.genres,
		    			cloudColors: this.state.cloudColors,
		    			spfyAtts: this.state.spfyAtts,
		    			currImgURL: this.state.currImgURL
		    		}
		    	})
		    })
		  }).catch(error => {
				console.log(error)
				console.log('token is ' + spotifyToken + ' ... clearing token')
				localStorage.removeItem('spotifyToken')
				console.log('oops, refreshing token. trying again.')
				this.props.refreshToken();
				console.log ('token is now ' + spotifyToken)
			})
	}

	handleDrop(files) {
	  const api_key = process.env.REACT_APP_CLOUDINARY_API_KEY;
	  const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
	  let imgPublicId, imgURL;
		// mapping all the uploaded files
	  const uploaders = files.map(file => {

	    var formData = new FormData();
	    formData.append("file", file);
	    formData.append("upload_preset", upload_preset);
	    formData.append("api_key", api_key);
	    formData.append("timestamp", (Date.now() / 1000) | 0);
			// This is our upload — sending the image and our credentials to Cloudinary
	    return axios.post("https://api.cloudinary.com/v1_1/dieaqkurh/image/upload", formData, {
	      headers: { "X-Requested-With": "XMLHttpRequest" },
	    }).then(response => {
	      imgPublicId = response.data.public_id;
	      imgURL = response.data.secure_url;
	    })
	   });


	    // Axios.all will run the above API call for each image in the queue
	    axios.all(uploaders).then(() => {
	      // ... sending the image url to the back end, waiting for color data.
	      console.log('SHOULD BE GETTING COLORS NOW');
	      axios.post('/cloudinary-data', {imgPublicId: imgPublicId}).then((result) => {
	        // set colors in state
	        this.setState({
	        	cloudColors: result.data.colors,
	        	currImgURL: imgURL
	        }, () => {
	        	this.props.liftPhoto(this.state.currImgURL);
	        	this.props.liftColors(this.state.cloudColors);
	        });
	      });
	    });
	  }

	getColorRange(hexHash) {
		// convert hex color to hsl
		let hexColor = hexHash.split('#')[1];
		let hslColor = convert.hex.hsl(hexColor);
		let hue = hslColor[0];
		let sat = hslColor[1];
		let light = hslColor[2];

		// divide colors in to 8 ranges
		let color;
		if(hue <= 45) color = 'redOrange';
		else if (hue > 45 && hue <= 90) color = 'orangeYellowGreen';
		else if (hue > 90 && hue <= 135) color = 'green';
		else if (hue > 135 && hue <= 180) color = 'greenAqua';
		else if (hue > 180 && hue <= 225) color = 'aquaBlue';
		else if (hue > 225 && hue <= 270) color = 'bluePurple';
		else if (hue > 270 && hue <= 315) color = 'purplePink';
		else if (hue > 315 && hue <= 360) color = 'pinkRed';
		// and lightness into 4
		let lightness;
		if(light <= 25) lightness = 'dark';
		else if(light > 25 && light <= 50) lightness = 'medDark';
		else if(light > 50 && light <= 75) lightness = 'medLight';
		else if(light > 75 && light <= 100) lightness = 'light';

		return color + '-' + lightness;
	}

	spotifyAttributes(cloudColors) {
		let colorsArr = [];
		// first, call colorRange function with every cloudColor
		cloudColors.map((color) => {
			let colorRange = this.getColorRange(color[0]);

			colorsArr.push(colorRange);
		});

		let valence = 0;
		let mode = 0;
		let energy = 0;
		let danceability = 0;
		// then find the matching object by color name,
		// and tally the value of each attribute for all the colors
		colorsArr.map((colorName) => {
			let currColor = colors.find((colorObj) => colorObj.name === colorName);
			valence += currColor.valence;
			mode += currColor.mode;
			energy += currColor.energy;
			danceability += currColor.danceability;
		});

		// then divide those values by the length of the cloudColors array,
		// to return floats that can be used in spotify call
		// (mode is always 1 or 0)
		valence = valence / cloudColors.length;
		mode = (mode >= (cloudColors.length / 2)) ? 1 : 0;
		energy = energy / cloudColors.length;
		danceability = danceability / cloudColors.length;

		if (valence < 0.2) {
			valence = 0.2
		}
		if (energy < 0.2) {
			energy = 0.2
		}
		if (danceability < 0.2) {
			danceability = 0.2
		}


		return [valence, mode, energy, danceability];
	}

	render() {
		console.log('PHOTOFORM STATE: ', this.state);
		let colorChart = (this.state.cloudColors) ? <ColorChart colors={this.state.cloudColors} /> : '';
		let attsChart = (this.state.spfyAtts) ? <AttsChart spfyAtts={this.state.spfyAtts} /> : '';
		let currImg = (this.state.currImgURL) ? <img src={this.state.currImgURL} width="200px" /> : '';
		return (
			<div className="root">
				<Grid container spacing={12}>
					<Grid item xs={12} >
						<Paper className="paper">
							<Dropzone className="dropzone" onDrop={this.handleDrop} accept="image/*">
								<p className="dropzone">Drag and drop your files or click here to upload</p>
								<PhotoCamera className="icon" style={{ fontSize: 100 }} />
							</Dropzone>
							{currImg}
						</Paper>
					</Grid>
				</Grid>

				<form onSubmit={this.handleSubmit} autoComplete="off">
					<FormControl required>
					<InputLabel htmlFor="genre-select">Genre</InputLabel>
						<Select value={this.state.genres}
								multiple
								onChange={this.handleChange}
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
				
				{colorChart}
				{attsChart}

			</div>
		);
	}
}

export default withRouter(withStyles(styles)(PhotoForm)); 
