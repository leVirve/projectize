import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  teaserImg: {
    padding: theme.spacing(0, 0, 6),
  },
}));

export default function Author(props) {
  const classes = useStyles();
  const { imageSrc } = props;

  return (
    <React.Fragment>
      <Grid container justify="center" className={classes.teaserImg} spacing={2}>
        <CardMedia
          component="img"
          alt="teaser"
          src={imageSrc}
          title="teaser"
        />
      </Grid>
    </React.Fragment>
  )
}
