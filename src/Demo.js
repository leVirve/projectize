import React from 'react';
import './App.css';

import testImage from './demo_compared/dog2cat/content_01.jpg';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography';
import { Grid, Link, Slider, NativeSelect, InputLabel, FormControl } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Header from './components/Headers.jsx';
import Footer from './components/Footer.jsx';
import Title from './components/Title.jsx';
import Banner from './components/Banner.jsx';

const useStyles = makeStyles((theme) => ({
  slider: {
    width: 300
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
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
  { title: 'Abstract', url: '/#abstract' },
  { title: 'Paper', url: '/#paper' },
  { title: 'Download', url: '/#download' },
  { title: 'Results', url: '/demo' },
  { title: 'References', url: '/#references' },
];

const teaserBanner = {
  image: {testImage},
  elevation: 0,
}

function valuetext(value) {
  return `${value}`;
}

var dataset = 'dog2cat';
var contentidx = 1;
var styleidx = 1;

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}

function App() {
  const classes = useStyles();

  const setdataset = (event) => {
    dataset = event.target.value;
  };

  const setcontent = (event) => {
    contentidx = event.target.value;
  };

  const setstyle = (event) => {
    styleidx = event.target.value;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="lg">
          <Header title="Qualitative Results" sections={sections} />
          <Title name="Select" />
          <Typography variant="h6" align="left" paragraph>
            Select dataset(task) & content image id (from 1 to 25) & style image id (from 1 to 10).
          </Typography>
          <Grid container justify="center" spacing={6}>
            <Grid item>
              <FormControl className={classes.formControl}>
              <InputLabel id="label">Dataset</InputLabel>
                <NativeSelect
                  defaultValue="dog2cat"
                  inputProps={{
                    name: 'dataset',
                    id: 'dataset-select',
                  }}
                  onChange={setdataset}
                >
                  <option value="dog2cat">Dog to Cat</option>
                  <option value="cat2dog">Cat to Dog</option>
                  <option value="monet">Photo to Monet</option>
                  <option value="portrait">Photo to Portrait</option>
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography id="discrete-slider-small-steps" gutterBottom>
                Content Image id:
              </Typography>
              <Slider className={classes.slider}
                defaultValue={1}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={25}
                onChange={setcontent}
              />
            </Grid>
            <Grid item>
              <Typography id="discrete-slider-small-steps" gutterBottom>
                Style Image id:
              </Typography>
              <Slider className={classes.slider}
                defaultValue={1}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                onChange={setstyle}
              />
            </Grid>
          </Grid>

          <Title name="Result" />
          <Typography variant="h6" align="left" paragraph>
            Given the content and style image, show the generated result from MUNIT, GDWCT, MSGAN, and ours.
          </Typography>
          <Grid container justify="center" spacing={6}>
            <Grid item>
              <Typography variant="h6" align="center" >
                Content Image
              </Typography>
              <Banner metadata={teaserBanner} imageSrc={testImage} />
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center" >
                Style Image
              </Typography>
              <Banner metadata={teaserBanner} imageSrc={testImage} />
            </Grid>
          </Grid>

          <Grid container justify="center" spacing={6}>
            <Grid item>
              <Typography variant="h6" align="center" >
                MUNIT [1]
              </Typography>
              <Banner metadata={teaserBanner} imageSrc={testImage} />
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center" >
                GDWCT [2]
              </Typography>
              <Banner metadata={teaserBanner} imageSrc={testImage} />
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center" >
                MSGAN [3]
              </Typography>
              <Banner metadata={teaserBanner} imageSrc={testImage} />
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center" >
                Ours
              </Typography>
              <Banner metadata={teaserBanner} imageSrc={testImage} />
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
          <Footer title="Acknowlegement" description="Template from" />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
