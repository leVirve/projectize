import React from 'react';

import Image from 'material-ui-image';
import { Typography, Box } from '@material-ui/core';

interface Props {
  src: string;
  title: string;
}

export default function ImageContainer(
  props: Props
): React.ReactElement<Props> {
  const { src, title } = props;

  return (
    <Box>
      <Typography variant="subtitle1" align="center">
        {title}
      </Typography>
      <Image
        color="transparent"
        style={{ paddingTop: 10 }}
        imageStyle={{
          height: '235px',
          width: 'inherit',
          left: 'auto',
          position: 'relative',
        }}
        src={src}
      />
    </Box>
  );
}
