import React from 'react';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
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

interface Metadata {
  title: string;
  link: string;
}
interface Props {
  metadata?: Metadata;
  elevation: number;
  imageSrc: string;
}

export default function Banner(props: Props): React.ReactElement<Props> {
  const classes = useStyles();
  const { metadata, imageSrc, elevation } = props;

  return (
    <Paper elevation={elevation} className={classes.bannerImg}>
      <Grid container>
        <Link
          href={metadata ? metadata.link : ''}
          target="_blank"
          rel="noopener"
        >
          <Typography
            component="h3"
            variant="subtitle1"
            color="inherit"
            gutterBottom
          >
            {metadata ? metadata.title : ''}
          </Typography>
          <CardMedia
            component="img"
            alt={metadata ? metadata.title : ''}
            src={imageSrc}
            title={metadata ? metadata.title : ''}
          />
        </Link>
      </Grid>
    </Paper>
  );
}
