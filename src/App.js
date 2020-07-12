import React from 'react';
import './App.css';

import teaserImage from './images/teaser.png';
import demoImage from './images/demo.png';

import { Chip, Container, Grid, Link, Typography, Paper } from '@material-ui/core';
import {
  GitHub as GitHubIcon,
  Storage as StorageIcon,
  YouTube as YouTubeIcon,
  PictureAsPdf as PictureAsPdfIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { project, authors, affiliations, bibtex } from './variable';
import Header from './components/Headers.jsx';
import Title from './components/Title.jsx';
import Author from './components/Author.jsx';
import Banner from './components/Banner.jsx';
import Button from './components/Button.jsx';
import Footer from './components/Footer.jsx';


const useStyles = makeStyles((theme) => ({
  titleHead: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    fontFamily: 'Source Serif Pro',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  bibtexSpan: {
    backgroundColor: theme.palette.grey[200],
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 4),
  },
}));

const sections = [
  { title: 'Home', url: '#' },
  { title: 'Abstract', url: '#abstract' },
  { title: 'Paper', url: '#paper' },
  { title: 'Download', url: '#download' },
  { title: 'Results', url: '#results' },
  { title: 'Acknowledgments', url: '#acknowledgments' },
];


function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Header title={project.paperName} sections={sections} />
        <Typography component="h1" variant="h3" gutterBottom className={classes.titleHead}>
          Domain-Specific Mappings <br />
          for Generative Adversarial Style Transfers <br />
          <Chip label="ECCV 2020" />
          <Chip label="Style Transfer" />
        </Typography>
        <Author authors={authors} affiliations={affiliations} />
        <Banner metadata={{ elevation: 0 }} imageSrc={teaserImage} />
        <Button text="Download Code / Results" link="#download" />

        <Title anchor="abstract" name="Abstract" />
        <Typography component="h3" variant="h6" align="left" paragraph>
          Style transfer generates an image whose content comes from one image and style from the other.
          Image-to-image translation approaches with disentangled representations have been shown effective for style transfer between two image categories.
          However, previous methods often assume a shared domain-invariant content space,
          which could compromise the content representation power. For addressing this issue, this paper leverages domain-specific mapping functions for remapping latent features in the shared content space to domain-specific content spaces.
          This way, images can be encoded more properly for style transfer.
          Experiments show that the proposed method outperforms previous style transfer methods, particularly on challenging scenarios that would require semantic correspondences between images.
        </Typography>

        <Title anchor="paper" name="Paper" />
        {/* <Chip label="arxiv" variant="outlined" /> */}
        {/* <Banner metadata={paperThumbBanner} imageSrc={paperThumbImage} /> */}
        <Grid item>
          <Link href={project.arxivLink} target="_blank" rel="noopener">
            <PictureAsPdfIcon color="action" style={{ fontSize: 60 }} />
            <Typography align="center" variant="h6" color="inherit">Arxiv</Typography>
          </Link>
        </Grid>

        <Title anchor="citation" name="Citation" />
        <Typography align="left" variant="h6" color="inherit" gutterBottom>
          {`Hsin-Yu Chang, Zhixiang Wang, and Yung-Yu Chuang, "Domain-Specific Mappings for Generative Adversarial Style Transfers", in Proceedings of the European Conference on Computer Vision (ECCV), 2020`}
        </Typography>
        <Chip label="BibTeX" variant="outlined" color="primary" />
        <Paper elevation={0} className={classes.bibtexSpan}>
          <Typography align="left" variant="h6" color="inherit" gutterBottom>
            <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{bibtex}</pre>
          </Typography>
        </Paper>

        <Title anchor="download" name="Download" />
        <Grid container justify="center" spacing={6}>
          <Grid item>
            <Link href={project.githubPage} target="_blank" rel="noopener">
              <GitHubIcon color="action" style={{ fontSize: 60 }} />
              <Typography align="center" variant="h6" color="inherit">Code</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href={project.supplementaryLink} target="_blank" rel="noopener">
              <PictureAsPdfIcon color="action" style={{ fontSize: 60 }} />
              <Typography align="center" variant="h6" color="inherit" gutterBottom>Supplementary</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href={project.resultZipLink} target="_blank" rel="noopener">
              <StorageIcon color="action" style={{ fontSize: 60 }} />
              <Typography align="center" variant="h6" color="inherit" gutterBottom>Results</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href={project.youtubeLink} target="_blank" rel="noopener">
              <YouTubeIcon color="action" style={{ fontSize: 60 }} />
              <Typography align="center" variant="h6" color="inherit">Video</Typography>
            </Link>
          </Grid>
        </Grid>

        <Title anchor="results" name="Results" />
        <div align="center">
          <Link href="/demo" target="_blank" rel="noopener">
            <Typography variant="h6" color="inherit" gutterBottom>
              <img src={demoImage} height="150px" alt="demo page thumb" /> <br />
              Demo Website
            </Typography>
          </Link>
        </div>

        <Title anchor="acknowledgments" name="Acknowledgments" />
        <Typography variant="body1" align="left" paragraph>
          We thank <Link href="https://github.com/leVirve">Hung-Jin Lin</Link> for providing this template! <br />
          We thank <Link href="https://github.com/HsinYingLee/DRIT">DRIT</Link> and <Link href="https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix">CycleGAN</Link> for providing their datasets. <br />
          Part of our codes are based on <Link href="https://github.com/NVlabs/MUNIT">MUNIT</Link> and <Link href="https://github.com/HelenMao/MSGAN">MSGAN</Link>.
        </Typography>

        <Footer />
      </Container>
    </div>
  );
}

export default App;
