import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(3, 0),
  },
  text: {
    fontFamily: 'Source Serif Pro',
  }
}));

export default function Title(props) {
  const classes = useStyles();
  const { name, anchor, variant } = props;

  return (
    <Box className={classes.title} id={anchor}>
      <Typography className={classes.text} align="left"
       component={variant.component} variant={variant.variant} gutterBottom>
        {name}
      </Typography>
      <Divider />
    </Box>
  );
}

Title.propTypes = {
  name: PropTypes.string,
  anchor: PropTypes.string,
  variant: PropTypes.shape(
    PropTypes.string,
    PropTypes.string
  ),
};

Title.defaultProps = {
  variant: {
    component: 'h2',
    variant: 'h4',
  }
}
