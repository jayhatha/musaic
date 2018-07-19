import React, {Component} from 'react';
import axios from 'axios';
import convert from 'color-convert';
import {hues} from './hues';
import ColorChart from './ColorChart';
import AttsChart from './AttsChart';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dropzone from 'react-dropzone';
import Paper from '@material-ui/core/Paper';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router-dom';

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
		// this.spotifyAttributes = this.spotifyAttributes.bind(this);
		this.calculateSpfyAtts = this.calculateSpfyAtts.bind(this);
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

	handleSubmit(e) {
		if (e) e.preventDefault();

		const valence = this.state.spfyAtts[0];
		const mode = this.state.spfyAtts[1];
		const energy = this.state.spfyAtts[2];
		const danceability = this.state.spfyAtts[3];
		// if more than one genre is selected, join array with comma
		let genres = (this.state.genres.length > 1) ? this.state.genres.join(',') : this.state.genres[0];

		// Calling Spotify to get our playlist
		var spotifyToken = localStorage.getItem('spotifyToken');
		console.log('###TOKEN', spotifyToken)
		// Jay Magic...
		axios.defaults.headers.common['Authorization'] = "Bearer " + spotifyToken;
		  axios.get(`https://api.spotify.com/v1/recommendations?limit=25&market=US&seed_genres=${genres}&target_danceability=${danceability}&target_valence=${valence}&target_energy=${energy}&mode=${mode}`)
		  .then(response => {
				// FIXME: error handle the token here
		  this.setState({
			spotifyToken,
		  	// we have a playlist in state!
		  	playlist: response.data.tracks,
		    }, () => {
		    	this.props.liftPlaylist(this.state.playlist);
		    	this.props.history.push({
		    		pathname: '/results',
		    		state: {
		    			playlist: this.state.playlist,
		    			name: this.state.genres, // TODO: add highest attribute
		    			description: '',
		    			tags: [],
		    			genres: this.state.genres,
		    			colorData: this.state.cloudColors,
		    			spfyAtts: this.state.spfyAtts,
		    			imageURL: this.state.currImgURL,
		    			songs: this.state.playlist,
		    			spotifyToken: this.state.spotifyToken,
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
	        	// calls spfyAtts function using the colors stored in state
	        	// this.spotifyAttributes(this.state.cloudColors);
	        	this.calculateSpfyAtts(this.state.cloudColors);
	        	this.props.liftPhoto(this.state.currImgURL);
	        	this.props.liftColors(this.state.cloudColors);
	        });
	      });
	    });
	  }

	getHsl(hexHash) {
		// convert hex color to hsl
		let hexColor = hexHash.split('#')[1];
		let hslColor = convert.hex.hsl(hexColor);
		let hue = hslColor[0];
		let saturation = hslColor[1];
		let lightness = hslColor[2];

		// divide colors in to 15 ranges
		let color;
		if(hue <= 24) color = 'redOrange';
		else if (hue > 24 && hue <= 48) color = 'orangeLight';
		else if (hue > 48 && hue <= 72) color = 'yellow';
		else if (hue > 72 && hue <= 96) color = 'lightGreen';
		else if (hue > 96 && hue <= 120) color = 'green';
		else if (hue > 120 && hue <= 144) color = 'greenPale';
		else if (hue > 144 && hue <= 168) color = 'greenAqua';
		else if (hue > 168 && hue <= 192) color = 'aquaBlue';
		else if (hue > 192 && hue <= 216) color = 'lightBlue';
		else if (hue > 216 && hue <= 240) color = 'blue';
		else if (hue > 240 && hue <= 264) color = 'bluePurple';
		else if (hue > 264 && hue <= 288) color = 'purplePink';
		else if (hue > 288 && hue <= 312) color = 'pink';
		else if (hue > 312 && hue <= 336) color = 'pinkRed';
		else if (hue > 336 && hue <= 360) color = 'red';

		return [color, saturation, lightness];
	}

	calculateSpfyAtts(cloudColors) {
		let hslArr = [];
		let topColors = [];
		let pctCounter = 0;
		cloudColors.map((color) => {
			let hsl = this.getHsl(color[0]);
			hslArr.push(hsl);
			if(pctCounter < 75) {
				topColors.push(hsl);
				pctCounter += color[1];
			}
		});

		let valence = 0;
		let mode = 0;
		let energy = 0;
		let danceability = 0;
		const max = 5 * cloudColors.length;

		hslArr.map((hslColor) => {
			let currColor = hues.find((color) => color.hue === hslColor[0]);
			valence += currColor.valence;
			mode += currColor.mode;
			energy += currColor.energy;
			danceability += currColor.danceability; 
		});

		valence = valence / max;
		mode = mode / max;
		energy = energy / max;
		danceability = danceability / max;

		let saturationAvg = 0; 
		let lightnessAvg = 0;
		topColors.map((color) => {
			saturationAvg += color[1]
			lightnessAvg += color[2];
		});
		saturationAvg = saturationAvg / topColors.length;		
		lightnessAvg = lightnessAvg / topColors.length;		

		if(saturationAvg < 20) {
			valence -= 0.4;
			mode -= 0.4;
			energy -= 0.3;
			danceability -= 0.5;
		} else if(saturationAvg >= 20 && saturationAvg <= 40) {
			valence -= 0.2;
			mode -= 0.2;
			energy -= 0.1;
			danceability -= 0.3
		} else if(saturationAvg >= 40 && saturationAvg <= 60) {
			danceability -= 0.1;
		} else if(saturationAvg >= 60 && saturationAvg <= 80) {
			valence += 0.1;
			mode += 0.1;
			energy += 0.1;
			danceability += 0.3;
		} else if(saturationAvg >= 80 && saturationAvg <= 100) {
			valence += 0.2;
			mode += 0.2;
			energy += 0.1;
			danceability += 0.4;
		}

		if(lightnessAvg < 20) {
			valence -= 0.4;
			mode -= 0.4;
			energy -= 0.5;
			danceability -= 0.3;
		} else if(lightnessAvg >= 20 && lightnessAvg <= 40) {
			valence -= 0.2;
			mode -= 0.2;
			energy -= 0.3;
			danceability -= 0.1;
		} else if(lightnessAvg >= 40 && lightnessAvg <= 60) {
			energy -= 0.1;
		} else if(lightnessAvg >= 60 && lightnessAvg <= 80) {
			valence += 0.2;
			mode += 0.2;
			energy += 0.3;
			danceability += 0.1;
		} else if(lightnessAvg >= 80 && lightnessAvg <= 100) {
			valence += 0.2;
			mode += 0.2;
			energy += 0.4;
			danceability += 0.1
		}
		
		mode = (mode >= (0.5) ) ? 1 : 0;
		if(valence < 0.2) valence = 0.2;
		if(valence > 1) valence = 1;
		if(energy < 0.2) energy = 0.2;
		if(energy > 1) energy = 1;
		if(danceability < 0.2) danceability = 0.2;
		if(danceability > 1) danceability = 1;
		
		this.setState({
			spfyAtts: [valence, mode, energy, danceability]
		}, () => {this.props.liftAtts(this.state.spfyAtts)})
	}
	
	render() {
		const {classes} = this.props;
		console.log('PHOTOFORM STATE: ', this.state);
		let colorChart = (this.state.cloudColors) ? <ColorChart colors={this.state.cloudColors} /> : '';
		let attsChart = (this.state.spfyAtts) ? <AttsChart spfyAtts={this.state.spfyAtts} /> : '';
		let currImg = (this.state.currImgURL) ? <img src={this.state.currImgURL} width="200px" alt="uploaded-image" /> : '';
		return (
			<div className={classes.root}>
				<Grid container spacing={12}>
					<Grid item xs={12} >
						<Paper className={classes.paper}>
							<Dropzone className="dropzone" onDrop={this.handleDrop} accept="image/*">
								<p className="dropzone">Drag and drop your files or click here to upload</p>
								<AddAPhoto className="icon" style={{ fontSize: 100 }} />
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
