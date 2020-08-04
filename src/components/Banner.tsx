import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bannerImg: {
    padding: theme.spacing(2, 0, 6),
    backgroundColor: 'transparent',
  },
}));

interface Props {
  title?: string;
  elevation: number;
  imageSrc: string;
}

export default function Banner(props: Props): React.ReactElement<Props> {
  const classes = useStyles();
  const { title, imageSrc, elevation } = props;

  return (
    <Paper elevation={elevation} className={classes.bannerImg}>
      <Grid alignItems="center" justify="center" container>
        <Typography
          component="h3"
          variant="subtitle1"
          color="inherit"
          gutterBottom
        >
          {title}
        </Typography>
        <CardMedia component="img" alt={title} src={imageSrc} title={title} />
      </Grid>
    </Paper>
  );
}
