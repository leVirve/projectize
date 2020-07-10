import React from 'react';
import './App.css';

import teaserImage from './images/teaser.png';
import paperThumbImage from './images/thumb.jpg';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Headers.jsx';
import Author from './components/Author.jsx';
import Teaser from './components/Teaser.jsx';


const useStyles = makeStyles((theme) => ({
  titleHead: {
    padding: theme.spacing(8, 0, 6),
  },
}));

const sections = [
  { title: 'Home', url: '#' },
  { title: 'Abstract', url: '#abstract' },
  { title: 'Paper', url: '#' },
  { title: 'Download', url: '#' },
  { title: 'Results', url: '#' },
  { title: 'References', url: '#' },
];
const authors = [
  { name: 'Yu-Lun Liu', url: 'http://www.cmlab.csie.ntu.edu.tw/~yulunliu/', affiliation: '1,5'},
  { name: 'Wei-Sheng Lai', url: '', affiliation: '2'},
  { name: 'Ming-Hsuan Yang', url: '', affiliation: '2,4'},
  { name: 'Yung-Yu Chuang', url: '', affiliation: '1'},
  { name: 'Jia-Bin Huang', url: '', affiliation: '3'},
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
    <div className="App">
      <Container maxWidth="lg">
        <Header title="Research" sections={sections} />
        <Typography variant="h3" gutterBottom className={classes.titleHead}>
          Learning to See Through Obstructions
        </Typography>
        <Author authors={authors} affiliations={affiliations}/>
        <Teaser imageSrc={teaserImage} />

        <Typography id="abstract" align="left" variant="h4" color="inherit" gutterBottom>
          Abstract
        </Typography>
        <Divider />
        <Typography variant="h6" align="left" paragraph>
          We present a learning-based approach for removing unwanted obstructions, such as window reflections, fence occlusions or raindrops, from a short sequence of images captured by a moving camera. Our method leverages the motion differences between the background and the obstructing elements to recover both layers. Specifically, we alternate between estimating dense optical flow fields of the two layers and reconstructing each layer from the flow-warped images via a deep convolutional neural network. The learning-based layer reconstruction allows us to accommodate potential errors in the flow estimation and brittle assumptions such as brightness consistency. We show that training on synthetically generated data transfers well to real images. Our results on numerous challenging scenarios of reflection and fence removal demonstrate the effectiveness of the proposed method.
        </Typography>

        <Typography id="abstract" align="left" variant="h4" color="inherit" gutterBottom>
          Paper
        </Typography>
        <Divider />
        <Teaser imageSrc={paperThumbImage} />

      </Container>
    </div>
  );
}

export default App;
