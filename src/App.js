import React from 'react';
import './App.css';

import teaserImage from './images/teaser.png';
import demoImage from './images/demo.png';
import paperThumbImage from './images/thumb.jpg';

import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Paper, CardMedia } from '@material-ui/core';
import { GitHub as GitHubIcon, Storage as StorageIcon, YouTube as YouTubeIcon, PictureAsPdf as PictureAsPdfIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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
  },
  cardheight: {
    height: 100
  }
}));

// const paperName = "Domain-Specific Mappings for Generative Adversarial Style Transfers";
const teaserBanner = {
  image: { teaserImage },
  elevation: 0,
}
const paperThumbBanner = {
  image: { paperThumbImage },
  link: 'https://arxiv.org/abs/2004.01180',
  title: "Learning to See Through Obstructions, CVPR 2020 (arxiv)",
}
const sections = [
  { title: 'Home', url: '#' },
  { title: 'Abstract', url: '#abstract' },
  { title: 'Paper', url: '#paper' },
  { title: 'Download', url: '#download' },
  { title: 'Results', url: '/#results' },
  { title: 'Acknowledgments', url: '#acknowledgments' },
];
const authors = [
  { name: 'Hsin-Yu Chang', url: 'http://www.cmlab.csie.ntu.edu.tw/~hsinyu1020/', affiliation: '1,2' },
  { name: 'Zhixiang Wang', url: 'http://www.cmlab.csie.ntu.edu.tw/~r06944046/', affiliation: '1' },
  { name: 'Yung-Yu Chuang', url: 'https://www.csie.ntu.edu.tw/~cyy/', affiliation: '1' },
]
const affiliations = [
  { number: '1', name: 'National Taiwan University', url: '' },
  { number: '2', name: 'MediaTek Inc.', url: '' },
]

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Header title="DSMAP: Domain-specific Mappings for Generative Adversarial Style Transfers" sections={sections} />
        <Typography component="h1" variant="h3" gutterBottom className={classes.titleHead}>
          Domain-Specific Mappings <br />for Generative Adversarial Style Transfers
            <br />
          <Chip label="ECCV 2020" />
          <Chip label="Style Transfer" />
        </Typography>
        <Author authors={authors} affiliations={affiliations} />
        <Banner metadata={teaserBanner} imageSrc={teaserImage} />
        <Button text="Download Code / Results" link="#download" />

        <Title anchor="abstract" name="Abstract" />
        <Typography variant="h6" align="left" paragraph>
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
          <Link href="" target="_blank" rel="noopener">
            <PictureAsPdfIcon color="action" style={{ fontSize: 60 }} />
            <Typography align="center" variant="h6" color="inherit">Arxiv</Typography>
          </Link>
        </Grid>

        <Title anchor="citation" name="Citation" />
        <Typography align="left" variant="h6" color="inherit" gutterBottom>
          {`Hsin-Yu Chang, Zhixiang Wang, and Yung-Yu Chuang, "Domain-Specific Mappings for Generative Adversarial Style Transfers", in Proceedings of the European Conference on Computer Vision (ECCV), 2020`}
        </Typography>
        <Chip label="Bibtex" variant="outlined" color="primary" />
        <Paper elevation={0} className={classes.bibtexSpan}>
          <Typography align="left" variant="h6" color="inherit" gutterBottom>
            <pre style={{ overflow: 'auto' }}>{`@inproceedings{Liu-Learning-CVPR-2020,
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
            <Link href="https://github.com/acht7111020/DSMAP" target="_blank" rel="noopener">
              <GitHubIcon style={{ fontSize: 60 }} />
              <Typography align="center" variant="h6" color="inherit">Code</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href="https://www.dropbox.com/s/9wt2753hjgzf3rv/ECCV_supp_domain_specific_mapping_style_transfer.pdf?dl=0" target="_blank" rel="noopener">
              <PictureAsPdfIcon style={{ fontSize: 60 }} />
              <Typography align="center" variant="h6" color="inherit" gutterBottom>Supplementary</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href="https://drive.google.com/file/d/1RhQRE1a-7O-a7nuNvrcqtoM79sxWvA5g/view?usp=sharing" target="_blank" rel="noopener">
              <StorageIcon style={{ fontSize: 60 }} />
              <Typography align="center" variant="h6" color="inherit" gutterBottom>Results</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href="https://www.youtube.com/watch?v=pJWcHhofYTE" target="_blank" rel="noopener">
              <YouTubeIcon style={{ fontSize: 60 }} />
              <Typography align="center" variant="h6" color="inherit">Video</Typography>
            </Link>
          </Grid>
        </Grid>
        {/* https://www.dropbox.com/s/l8ykaeafo9foxhl/ECCV_supp_domain_specific_mapping_style_transfer.pdf?dl=0 */}

        <Title anchor="results" name="Results" />
        <div align="center">
          <Link href="/demo" target="_blank" rel="noopener">
            <Typography variant="h6" color="inherit" gutterBottom>
              <img src={demoImage} height="150px" /> <br />
                Demo Website
              </Typography>
          </Link>
        </div>

        <Title anchor="acknowledgments" name="Acknowledgments" />
        <Typography variant="h6" align="left" paragraph>
          We thank <Link href="https://github.com/leVirve">Salas Lin</Link> for providing this template! <br />
          We thank <Link href="https://github.com/HsinYingLee/DRIT">DRIT</Link> and <Link href="https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix">CycleGAN</Link> for providing their datasets. <br />
          Part of our codes are based on <Link href="https://github.com/NVlabs/MUNIT">MUNIT</Link> and <Link href="https://github.com/HelenMao/MSGAN">MSGAN</Link>.
          </Typography>

        <Footer />
      </Container>
    </div>
  );
}

export default App;
