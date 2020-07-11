import React, { useState } from 'react';
import './App.css';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography';
import { Grid, Link, Slider, Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Image from 'material-ui-image';
import GithubCorner from 'react-github-corner';
import { StickyContainer, Sticky } from 'react-sticky';

import Header from './components/Headers.jsx';
import Footer from './components/Footer.jsx';
import Title from './components/Title.jsx';

const useStyles = makeStyles((theme) => ({
  slider: {
    width: 300
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  cardheight: {
    height: 200
  }
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Source Sans Pro',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const sections = [
  { title: 'Home', url: '/' },
  // TODO: hash will be re-do by route
  { title: 'Select', url: '/demo/#select' },
  { title: 'Result', url: '/demo/#result' },
  { title: 'References', url: '/demo/#references' },
];

function valuetext(value) {
  return `${value}`;
}

function zeroPad(num, numZeros) {
  var n = Math.abs(num);
  var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
  var zeroString = Math.pow(10,zeros).toString().substr(1);
  if( num < 0 ) {
      zeroString = '-' + zeroString;
  }
  return zeroString+n;
}

function App() {
  const classes = useStyles();
  const [imageId, setImageId] = useState(1);
  const [styleId, setStyleId] = useState(1);
  const [dataset, setDataset] = useState('dog2cat');

  const handleDatasetChange = (event) => {
    setDataset(event.target.value);
  };

  const handleImageChange = (event, newValue) => {
    setImageId(newValue);
  };

  const handleStylehange = (event, newValue) => {
    setStyleId(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StickyContainer>
        <Sticky>{({ style }) => <GithubCorner style={style} href="https://github.com/acht7111020/DSMAP" />}</Sticky>
      <div className="App">
        <Container maxWidth="lg">
          <Header title="Qualitative Results" sections={sections} />
          <Title anchor="select" name="Select" />
          <Typography variant="h6" align="left" paragraph>
            Select dataset(task) & content image id (from 1 to 25) & style image id (from 1 to 10).
          </Typography>
          <Grid container justify="center" spacing={6}>
            <Grid item>
              <FormControl className={classes.formControl}>
              <InputLabel id="label">Dataset</InputLabel>
                <Select
                  value={dataset}
                  onChange={handleDatasetChange}
                >
                  <MenuItem value="dog2cat">Dog to Cat</MenuItem>
                  <MenuItem value="cat2dog">Cat to Dog</MenuItem>
                  <MenuItem value="monet">Photo to Monet</MenuItem>
                  <MenuItem value="portrait">Photo to Portrait</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom>
                Content Image id:
              </Typography>
              <Slider className={classes.slider}
                value={imageId}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={25}
                onChange={handleImageChange}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom>
                Style Image id:
              </Typography>
              <Slider className={classes.slider}
                value={styleId}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                onChange={handleStylehange}
              />
            </Grid>
          </Grid>

          <Title anchor="result" name="Result" />
          <Typography variant="h6" align="left" paragraph>
            Given the content and style image, show the generated result from MUNIT, GDWCT, MSGAN, and ours.
          </Typography>
          <Grid container justify="center" spacing={6}>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" align="center" >
                Content Image
              </Typography>
              <Image
                src={'/demo_compared/' + dataset + '/content_' + zeroPad(imageId, 2) + '.jpg'}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" align="center" >
                Style Image
              </Typography>
              <Image
                src={'/demo_compared/' + dataset + '/style_' + zeroPad(styleId, 2) + '.jpg'}
              />
            </Grid>
          </Grid>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={3} md={3}>
              <Typography variant="subtitle1" align="center" >
                MUNIT [1]
              </Typography>
              <Image
                src={'/demo_compared/' + dataset + '/munit_' + zeroPad(imageId, 2) + '_' + zeroPad(styleId, 2) + '.jpg'}
              />
            </Grid>
            <Grid item xs={3} md={3}>
              <Typography variant="subtitle1" align="center" >
                GDWCT [2]
              </Typography>
              <Image
                src={'/demo_compared/' + dataset + '/gdwct_' + zeroPad(imageId, 2) + '_' + zeroPad(styleId, 2) + '.jpg'}
              />
            </Grid>
            <Grid item xs={3} md={3}>
              <Typography variant="subtitle1" align="center" >
                MSGAN [3]
              </Typography>
              <Image
                src={'/demo_compared/' + dataset + '/msgan_' + zeroPad(imageId, 2) + '_' + zeroPad(styleId, 2) + '.jpg'}
              />
            </Grid>
            <Grid item xs={3} md={3}>
              <Typography variant="subtitle1" align="center" >
                Ours
              </Typography>
              <Image
                src={'/demo_compared/' + dataset + '/ours_' + zeroPad(imageId, 2) + '_' + zeroPad(styleId, 2) + '.jpg'}
              />
            </Grid>
          </Grid>


          <Title anchor="references" name="References" />
          <Typography align="left" variant="h6" color="inherit" gutterBottom>
            [1] <Link href="https://arxiv.org/abs/1804.04732" target="_blank" rel="noopener">
            Xun Huang, Ming-Yu Liu, Serge Belongie, Jan Kautz, "Multimodal Unsupervised Image-to-Image Translation"</Link>
            , ECCV 2018
          </Typography>
          <Typography align="left" variant="h6" color="inherit" gutterBottom>
            [2] <Link href="https://arxiv.org/abs/1812.09912" target="_blank" rel="noopener">
            Wonwoong Cho, Sungha Choi, David Keetae Park, Inkyu Shin, Jaegul Choo, "Image-to-Image Translation via Group-wise Deep Whitening-and-Coloring Transformation"</Link>
            , CVPR 2019
          </Typography>
          <Typography align="left" variant="h6" color="inherit" gutterBottom>
            [3] <Link href="https://arxiv.org/abs/1903.05628" target="_blank" rel="noopener">
            Qi Mao, Hsin-Ying Lee, Hung-Yu Tseng, Siwei Ma, and Ming-Hsuan Yang, "Mode Seeking Generative Adversarial Networks for Diverse Image Synthesis"</Link>
            , CVPR 2019
          </Typography>
          <Footer />
        </Container>
      </div>
      </StickyContainer>
    </ThemeProvider>
  );
}

export default App;
