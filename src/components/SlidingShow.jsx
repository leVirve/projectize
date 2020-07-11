import React, {useState} from 'react';

import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from '@material-ui/core/Slider';


export default function SlidingShow() {
  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setLoading(true);
    setValue(newValue);
  };

  const handleLoadImage = () => {
    setLoading(false);
  };

  return (
    <Box width="300px">
      <Slider
        value={value}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        onChange={handleChange}
        min={1}
        max={20}
      />
      {loading && <LinearProgress color="secondary" />}
      <CardMedia
        component="img"
        src={"https://picsum.photos/id/" + value + "/200/300"}
        onLoad={handleLoadImage}
        alt=""
      />
    </Box>
  );
}
