import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField } from '../node_modules/@material-ui/core';

const styles = theme => ({
  root: {
    textAlign: 'center',
    flexGrow: 1
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
  }
})

const UpdatePlaylist = props => {
  const { classes } = props;
  return (
    <div className={classes.root} >
      <Grid container spacing={12}>
        <Grid item >
          <Paper className={classes.paper} >
            <form onSubmit={this.handleSubmit} >
              <TextField 
                id="name"
                label="Name"
                className={classes.TextField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(UpdatePlaylist);