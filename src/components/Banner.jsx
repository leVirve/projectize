import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bannerImg: {
    padding: theme.spacing(2, 0, 6),
    backgroundColor: "transparent",
  },
}));

export default function Banner(props) {
  const classes = useStyles();
  const { metadata, imageSrc } = props;

  return (
    <Paper elevation={metadata.elevation} className={classes.bannerImg}>
      <Grid container>
        <Link href={metadata.link} target="_blank" rel="noopener">
          <Typography component="h3" variant="subtitle1" color="inherit" gutterBottom>
            {metadata.title}
          </Typography>
          <CardMedia
            component="img"
            alt={metadata.title}
            src={imageSrc}
            title={metadata.title}
          />
        </Link>
      </Grid>
    </Paper>
  )
}

Banner.propTypes = {
  metadata: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    elevation: PropTypes.number,
  }),
  imageSrc: PropTypes.string,
};
