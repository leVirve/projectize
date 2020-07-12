import React, { useState } from 'react';
import './App.css';

import {
  Container, Grid, Link, Slider, Select, InputLabel, FormControl, MenuItem, Typography
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import { project } from './variable';
import Header from './components/Headers.jsx';
import Footer from './components/Footer.jsx';
import Title from './components/Title.jsx';
import ImageContainer from './components/ImageContainer.jsx';

const useStyles = makeStyles((theme) => ({
  slider: {
    width: 300
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectText: {
    "&.Mui-focused": {
      color: "#FFB6C1",
    },
  },
  select: {
    "&:before": {
      borderBottom: `1px solid #F3B3B1`
    },
    "&:after": {
      borderBottom: `3px solid #FFB6C1`
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      borderBottom: `2px solid #FFB6C1`
    }
  }
}));

const PinkSlider = withStyles({
  root: {
    color: "#F08080",
    height: 8
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
  },
  valueLabel: {
    left: "calc(-12px)"
  },
  mark: {
    backgroundColor: "#FFB6C1",
    height: 3,
    borderRadius: 2,
  },
  track: {
    height: 4,
    borderRadius: 2,
    background: "linear-gradient(87deg, #FE6B8B 30%, #FF8E63 90%)",
  },
  rail: {
    height: 4,
    borderRadius: 2,
    background: "linear-gradient(87deg, #FE6B8B 30%, #FF8E63 90%)",
  }
})(Slider);

let contentMarks = [];
for (let i = 2; i < 25; i = i + 2) {
  contentMarks.push({ value: i });
}

let styleMarks = [];
for (let i = 2; i < 10; i++) {
  styleMarks.push({ value: i });
}

const sections = [
  { title: 'Home', url: '/' },
  { title: 'Control', url: '#control' },
  { title: 'Result', url: '#result' },
  { title: 'References', url: '#references' },
];

const publicResultFolder = '/demo_compared';

function urlForResult(dataset, prefix, { imageId, styleId }) {
  let prefixUrl = `${publicResultFolder}/${dataset}`;
  if (imageId === undefined)
    return `${prefixUrl}/${prefix}_${zeroPad(styleId, 2)}.jpg`;
  else if (styleId === undefined)
    return `${prefixUrl}/${prefix}_${zeroPad(imageId, 2)}.jpg`;
  else
    return `${prefixUrl}/${prefix}_${zeroPad(imageId, 2)}_${zeroPad(styleId, 2)}.jpg`;
}

function zeroPad(num, numZeros) {
  let zeros = Math.max(0, numZeros - num.toString().length);
  let zeroString = Math.pow(10, zeros).toString().substr(1);
  return zeroString + num;
}

function App() {
  const classes = useStyles();
  const [imageId, setImageId] = useState(1);
  const [styleId, setStyleId] = useState(1);
  const [dataset, setDataset] = useState('dog2cat');

  const handleDatasetChange = (event) => {
    setDataset(event.target.value);
  };

  const handleImageChange = (_event, newValue) => {
    setImageId(newValue);
  };

  const handleStyleChange = (_event, newValue) => {
    setStyleId(newValue);
  };

  return (
    <div className="App">
      <Header title={project.paperName} sections={sections} />
      <Container maxWidth="lg">
        {/* <Title name="Qualitative Results" /> */}

        <Title anchor="control" name="Control" variant={{ componet: 'h3', variant: 'h5' }} />
        <Typography variant="h6" align="left" paragraph>
          Here you can browse the results of our model in comparison to state-of-the-arts
          by choosing the translation tasks for different datasets,
          content image ID (from 1 to 25), and style image ID (from 1 to 10).
        </Typography>

        <Grid container justify="center" spacing={6}>
          <Grid item>
            <FormControl className={classes.formControl}>
              <InputLabel id="label" className={classes.selectText}>Dataset</InputLabel>
              <Select
                className={classes.select}
                value={dataset}
                onChange={handleDatasetChange}
              >
                <MenuItem value="dog2cat">Dog → Cat</MenuItem>
                <MenuItem value="cat2dog">Cat → Dog</MenuItem>
                <MenuItem value="monet">Photo → Monet</MenuItem>
                <MenuItem value="portrait">Photo → Portrait</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" gutterBottom>
              Content Image ID:
              </Typography>
            <PinkSlider className={classes.slider}
              value={imageId}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={contentMarks}
              min={1}
              max={25}
              onChange={handleImageChange}
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" gutterBottom>
              Style Image ID:
              </Typography>
            <PinkSlider className={classes.slider}
              value={styleId}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={styleMarks}
              min={1}
              max={10}
              onChange={handleStyleChange}
            />
          </Grid>
          {/* image / style image pair */}
          <Grid container justify="center" spacing={6}>
            <Grid item>
              <ImageContainer
                title="Content Image"
                src={urlForResult(dataset, 'content', { imageId: imageId })}
              />
            </Grid>
            <Grid item>
              <ImageContainer
                title="Style Image"
                src={urlForResult(dataset, 'style', { styleId: styleId })}
              />
            </Grid>
          </Grid>
        </Grid>

        <Title anchor="result" name="Result" variant={{ componet: 'h3', variant: 'h5' }} />
        <Typography variant="h6" align="left" paragraph>
          With the given content and style image,
          here demonstrates the generated result from MUNIT, GDWCT, MSGAN, and Ours.
        </Typography>

        {/* comparison images */}
        <Grid container justify="center" spacing={1}>
          <Grid item xs={6} md={3}>
            <ImageContainer
              title="MUNIT [1]"
              src={urlForResult(dataset, 'munit', { imageId: imageId, styleId: styleId })}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <ImageContainer
              title="GDWCT [2]"
              src={urlForResult(dataset, 'gdwct', { imageId: imageId, styleId: styleId })}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <ImageContainer
              title="MSGAN [3]"
              src={urlForResult(dataset, 'msgan', { imageId: imageId, styleId: styleId })}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <ImageContainer
              title="Ours"
              src={urlForResult(dataset, 'ours', { imageId: imageId, styleId: styleId })}
            />
          </Grid>
        </Grid>
        <br />

        <Title anchor="references" name="References" variant={{ componet: 'h3', variant: 'h5' }}/>
        <Typography align="left" variant="body1" color="inherit" gutterBottom>
          [1] <Link href="https://arxiv.org/abs/1804.04732" target="_blank" rel="noopener">
            Xun Huang, Ming-Yu Liu, Serge Belongie, Jan Kautz, "Multimodal Unsupervised Image-to-Image Translation"</Link>
            , ECCV 2018 <br/>
        {/* </Typography>
        <Typography align="left" variant="h6" color="inherit" gutterBottom> */}
          [2] <Link href="https://arxiv.org/abs/1812.09912" target="_blank" rel="noopener">
            Wonwoong Cho, Sungha Choi, David Keetae Park, Inkyu Shin, Jaegul Choo, "Image-to-Image Translation via Group-wise Deep Whitening-and-Coloring Transformation"</Link>
            , CVPR 2019 <br/>
        {/* </Typography>
        <Typography align="left" variant="h6" color="inherit" gutterBottom> */}
          [3] <Link href="https://arxiv.org/abs/1903.05628" target="_blank" rel="noopener">
            Qi Mao, Hsin-Ying Lee, Hung-Yu Tseng, Siwei Ma, and Ming-Hsuan Yang, "Mode Seeking Generative Adversarial Networks for Diverse Image Synthesis"</Link>
            , CVPR 2019
        </Typography>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
