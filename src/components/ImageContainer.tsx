import React from 'react';

import Image from 'material-ui-image';
import { Typography, Box } from '@material-ui/core';

interface Props {
  src: string;
  title: string;
  height?: number;
  width?: number;
}

export default function ImageContainer(
  props: Props
): React.ReactElement<Props> {
  const { src, title, height, width } = props;

  return (
    <>
      <Typography variant="subtitle1" align="center">
        {title}
      </Typography>
      <Box height={height} width={width}>
        <Image
          color="transparent"
          style={{
            paddingTop: 10,
          }}
          imageStyle={{
            display: 'block',
            height: 'auto',
            width: 'auto',
            left: 'auto',
            margin: 'auto',
            position: 'relative',
          }}
          src={src}
        />
      </Box>
    </>
  );
}
