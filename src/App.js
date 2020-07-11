import React from 'react';
import './App.css';

import teaserImage from './images/teaser.png';
import paperThumbImage from './images/thumb.jpg';

import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { GitHub as GitHubIcon, Storage as StorageIcon, YouTube as YouTubeIcon } from '@material-ui/icons';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Header from './components/Headers.jsx';
import Title from './components/Title.jsx';
import Author from './components/Author.jsx';
import Banner from './components/Banner.jsx';
import Button from './components/Button.jsx';
import Footer from './components/Footer.jsx';


const useStyles = makeStyles((theme) => ({
  titleHead: {
    padding: theme.spacing(8, 0, 4),
    fontFamily: 'Source Serif Pro',
  },
  bibtexSpan: {
    backgroundColor: theme.palette.grey[200],
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 4),
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

const paperName = "Learning to See Through Obstructions";
const teaserBanner = {
  image: {teaserImage},
  elevation: 0,
}
const paperThumbBanner = {
  image: {paperThumbImage},
  link: 'https://arxiv.org/abs/2004.01180',
  title: "Learning to See Through Obstructions, CVPR 2020 (arxiv)",
}
const sections = [
  { title: 'Home', url: '#' },
  { title: 'Abstract', url: '#abstract' },
  { title: 'Paper', url: '#paper' },
  { title: 'Download', url: '#download' },
  { title: 'Results', url: '/#results' },
  { title: 'References', url: '#references' },
];
const authors = [
  { name: 'Yu-Lun Liu', url: 'http://www.cmlab.csie.ntu.edu.tw/~yulunliu/', affiliation: '1,5' },
  { name: 'Wei-Sheng Lai', url: '', affiliation: '2' },
  { name: 'Ming-Hsuan Yang', url: '', affiliation: '2,4' },
  { name: 'Yung-Yu Chuang', url: '', affiliation: '1' },
  { name: 'Jia-Bin Huang', url: '', affiliation: '3' },
]
const affiliations = [
  { number: '1', name: 'National Taiwan University', url: '' },
  { number: '2', name: 'Google', url: '' },
  { number: '3', name: 'Virginia Tech', url: '' },
  { number: '4', name: 'University of California at Merced', url: '' },
  { number: '5', name: 'MediaTek Inc.', url: '' },
]

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="lg">
          <Header title="Whose Research" sections={sections} />
          <Typography component="h1" variant="h2" gutterBottom className={classes.titleHead}>
            {paperName}
            <br/>
            <Chip label="CVPR 2020" />
          </Typography>
          <Author authors={authors} affiliations={affiliations} />
          <Banner metadata={teaserBanner} imageSrc={teaserImage} />
          <Button text="Download Code / Results" link="#download" />

          <Title anchor="abstract" name="Abstract" />
          <Typography variant="h6" align="left" paragraph>
            We present a learning-based approach for removing unwanted obstructions, such as window reflections, fence occlusions or raindrops, from a short sequence of images captured by a moving camera. Our method leverages the motion differences between the background and the obstructing elements to recover both layers. Specifically, we alternate between estimating dense optical flow fields of the two layers and reconstructing each layer from the flow-warped images via a deep convolutional neural network. The learning-based layer reconstruction allows us to accommodate potential errors in the flow estimation and brittle assumptions such as brightness consistency. We show that training on synthetically generated data transfers well to real images. Our results on numerous challenging scenarios of reflection and fence removal demonstrate the effectiveness of the proposed method.
          </Typography>

          <Title anchor="paper" name="Paper" />
          {/* <Chip label="arxiv" variant="outlined" /> */}
          <Banner metadata={paperThumbBanner} imageSrc={paperThumbImage} />

          <Title anchor="citation" name="Citation" />
          <Typography align="left" variant="h6" color="inherit" gutterBottom>
            {`Yu-Lun Liu, Wei-Sheng Lai, Ming-Hsuan Yang, Yung-Yu Chuang, and Jia-Bin Huang, "Learning to See Through Obstructions", in IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2020`}
          </Typography>
          <Chip label="Bibtex" variant="outlined" color="primary" />
          <Paper elevation={0} className={classes.bibtexSpan}>
            <Typography align="left" variant="h6" color="inherit" gutterBottom>
              <pre>{`@inproceedings{Liu-Learning-CVPR-2020,
    author    = {Liu, Yu-Lun and Lai, Wei-Sheng and Yang, Ming-Hsuan and Chuang, Yung-Yu and Huang, Jia-Bin},
    title     = {Learning to See Through Obstructions},
    booktitle = {IEEE Conference on Computer Vision and Pattern Recognition},
    year      = {2020}
}`}</pre>
            </Typography>
          </Paper>

          <Title anchor="download" name="Download" />
          <Grid container justify="center" spacing={6}>
            <Grid item>
              <Link href="https://github.com/alex04072000/ObstructionRemoval" target="_blank" rel="noopener">
                <GitHubIcon style={{ fontSize: 40 }} />
                <Typography align="left" variant="h6" color="inherit">Code</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="http://www.cmlab.csie.ntu.edu.tw/~yulunliu/SingleHDR_data/ObstructionRemoval_results/CVPR2020_full_results.zip" target="_blank" rel="noopener">
                <StorageIcon style={{ fontSize: 40 }} />
                <Typography align="left" variant="h6" color="inherit" gutterBottom>Results</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="https://www.youtube.com/watch?v=pJWcHhofYTE" target="_blank" rel="noopener">
                <YouTubeIcon style={{ fontSize: 40 }} />
                <Typography align="left" variant="h6" color="inherit">Video</Typography>
              </Link>
            </Grid>
          </Grid>

          <Title anchor="results" name="Results" />
          <Typography align="left" variant="h6" color="inherit" gutterBottom>
            <Link href="/demo" target="_blank" rel="noopener">Demo page</Link>
          </Typography>

          <Title anchor="references" name="References" />
          {[1, 2, 3, 4].map((e, index) => (
            <Typography align="left" variant="h6" color="inherit" gutterBottom key={index}>
              {e}. <Link href="https://arxiv.org/abs/1812.01461" target="_blank" rel="noopener">The visual centrifuge: Model-free layered video representations</Link>
              , CVPR, 2019.
            </Typography>
          ))}

          <Footer title="Acknowlegement" description="Template from" />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
