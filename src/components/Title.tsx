import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 0),
    margin: theme.spacing(6, 0, 0, 0),
  },
  text: {
    fontFamily: 'Source Serif Pro',
  },
}));

interface TypographyVariant {
  // component: string;
  variant: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
interface Props {
  name: string;
  anchor: string;
  fontVariant?: TypographyVariant;
}

export default function Title(props: Props): React.ReactElement<Props> {
  const classes = useStyles();
  const { name, anchor, fontVariant } = props;

  return (
    <Box className={classes.title} id={anchor}>
      <Typography
        className={classes.text}
        align="left"
        component="h4"
        variant={fontVariant ? fontVariant.variant : 'h4'}
        gutterBottom
      >
        {name}
      </Typography>
      <Divider />
    </Box>
  );
}
