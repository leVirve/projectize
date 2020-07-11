import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  teaserImg: {
    padding: theme.spacing(2, 0, 6),
  },
}));

export default function Banner(props) {
  const classes = useStyles();
  const { imageSrc, link, title } = props;

  return (
    <React.Fragment>
      <Grid container justify="center" className={classes.teaserImg} spacing={2}>
        <Link href={link} target="_blank" rel="noopener">
          <CardMedia
            component="img"
            alt={title}
            src={imageSrc}
            title={title}
          />
        </Link>
      </Grid>
    </React.Fragment>
  )
}

Banner.propTypes = {
  imageSrc: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
};
