
import React from 'react';
import PropTypes from 'prop-types';

import Image from 'material-ui-image';
import { Typography, Box } from '@material-ui/core';


function ImageContainer(props) {
  const { src, title } = props;

  return (
    <Box>
      <Typography variant="subtitle1" align="center" >
        {title}
      </Typography>
      <Image
        color='transparent'
        style={{ paddingTop: 10 }}
        imageStyle={{ height: '235px', width: 'inherit', left: 'auto', position: 'relative' }}
        src={src}
      />
    </Box>
  );
}

ImageContainer.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};

export default ImageContainer;
