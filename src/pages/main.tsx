import React from 'react';

import {
  Chip,
  Container,
  Grid,
  Icon,
  Link,
  Typography,
  Paper,
} from '@material-ui/core';
import {
  GitHub as GitHubIcon,
  Storage as StorageIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// import { Link as ReactLink } from 'react-router-dom';

import Header from '../components/Headers';
import Title from '../components/Title';
import Author from '../components/Author';
import Banner from '../components/Banner';
import Button from '../components/Button';
import Footer from '../components/Footer';
// import { DenoiserDemoComponent } from './demo';

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: 'center',
  },
  titleHead: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    fontFamily: 'Source Serif Pro',
    '& > a > *': {
      margin: theme.spacing(0.5),
    },
  },
  bibtexSpan: {
    backgroundColor: theme.palette.grey[200],
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 4),
  },
  iconText: {
    wordWrap: 'break-word',
  },
}));

export default function MainPage(): React.ReactElement {
  const classes = useStyles();
  const mainPageSections = [
    { title: 'Home', url: '#' },
    { title: 'Abstract', url: '#abstract' },
    { title: 'Paper', url: '#paper' },
    { title: 'Video', url: '#video' },
    { title: 'Download', url: '#download' },
    { title: 'Demo', url: '#results' },
  ];
  const authorName = 'Ke-Chi Chang';
  const authorGithubProfile = 'https://github.com/arcchang1236';
  const githubPage = 'https://github.com/arcchang1236/CA-NoiseGAN';
  const paperName = 'Learning Camera-Aware Noise Models';

  return (
    <div className={classes.main}>
      <Header
        title={paperName}
        githubPage={githubPage}
        sections={mainPageSections}
      />
      <Container maxWidth="lg">
        <HeadingTeaser />
        <AbstractSection />
        <PaperSection />
        <DownloadSection />
        <ResultsSection />
        <AcknowledgmentsSection />
      </Container>
      <Footer authorName={authorName} githubPage={authorGithubProfile} />
    </div>
  );
}

function HeadingTeaser(): React.ReactElement {
  const classes = useStyles();
  const topicLabels = [{ text: 'ECCV 2020', url: 'https://eccv2020.eu/' }];
  const imageUrl = `${process.env.PUBLIC_URL}/images/teaser.jpg`;

  return (
    <>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        className={classes.titleHead}
      >
        Learning Camera-Aware Noise Models <br />
        {topicLabels.map((label) => (
          <Link
            key={label.text}
            href={label.url}
            target="_blank"
            rel="noopener"
          >
            <Chip label={label.text} />
          </Link>
        ))}
      </Typography>
      <AuthorSection />
      <Banner elevation={0} imageSrc={imageUrl} />
      <Button text="Download / Demo" link="#download" />
    </>
  );
}

function AuthorSection(): React.ReactElement {
  const authors = [
    {
      name: 'Ke-Chi Chang',
      url: '',
      affiliation: '1,2',
    },
    {
      name: 'Ren Wang',
      url: '',
      affiliation: '1',
    },
    {
      name: 'Hung-Jin Lin',
      url: '',
      affiliation: '1',
    },
    {
      name: 'Yu-Lun Liu',
      url: 'https://www.cmlab.csie.ntu.edu.tw/~yulunliu',
      affiliation: '1',
    },
    {
      name: 'Chia-Ping Chen',
      url: '',
      affiliation: '1',
    },
    {
      name: 'Yu-Lin Chang',
      url: '',
      affiliation: '1',
    },
    {
      name: 'Hwann-Tzong Chen',
      url: '',
      affiliation: '2',
    },
  ];

  const affiliations = [
    { number: '1', name: 'MediaTek Inc.', url: '' },
    { number: '2', name: 'National Tsing Hua University', url: '' },
  ];
  return (
    <>
      <Author authors={authors} affiliations={affiliations} />
    </>
  );
}

function AbstractSection(): React.ReactElement {
  const imageUrl = `${process.env.PUBLIC_URL}/images/network.png`;

  return (
    <>
      <Title anchor="abstract" name="Abstract" />
      <Typography component="h3" variant="h6" align="left" paragraph>
        Modeling imaging sensor noise is a fundamental problem for image
        processing and computer vision applications. While most previous works
        adopt statistical noise models, real-world noise is far more complicated
        and beyond what these models can describe. To tackle this issue, we
        propose a data-driven approach, where a generative noise model is
        learned from real-world noise. The proposed noise model is camera-aware,
        that is, different noise characteristics of different camera sensors can
        be learned simultaneously, and a single learned noise model can generate
        different noise for different camera sensors. Experimental results show
        that our method quantitatively and qualitatively outperforms existing
        statistical noise models and learning-based methods.
      </Typography>
      <Banner elevation={0} imageSrc={imageUrl} />
    </>
  );
}

function PaperSection(): React.ReactElement {
  const classes = useStyles();
  const thumbImageUrl = `${process.env.PUBLIC_URL}/images/thumb.jpg`;
  const thumbTitle = `Learning Camera-Aware Noise Models, ECCV 2020 (arxiv)`;
  const arxivLink = '';
  const descriptionText = `Ke-Chi Chang, Ren Wang, Hung-Jin Lin, Yu-Lun Liu, Chia-Ping Chen, Yu-Lin Chang, and Hwann-Tzong Chen, "Learning Camera-Aware Noise Models", in Proceedings
  of the European Conference on Computer Vision (ECCV), 2020`;
  const bibtex = `@inproceedings{chang2020canoisegan,
    author    = {Chang, Ke-Chi and Wang, Ren and Lin, Hung-Jin and Liu, Yu-Lun and Chen, Chia-Ping and Chang, Yu-Lin and Chen, Hwann-Tzong},
    title     = {Learning Camera-Aware Noise Models},
    booktitle = {European Conference on Computer Vision},
    year      = {2020}
  }`;

  return (
    <>
      <Title anchor="paper" name="Paper" />
      <Chip label="Arxiv" variant="outlined" color="primary" />
      <Grid item>
        <Link href={arxivLink} target="_blank" rel="noopener">
          <Banner title={thumbTitle} elevation={0} imageSrc={thumbImageUrl} />
        </Link>
      </Grid>
      <Title anchor="citation" name="Citation" />
      <Typography align="left" variant="h6" color="inherit" gutterBottom>
        {descriptionText}
      </Typography>
      <Chip label="BibTeX" variant="outlined" color="primary" />
      <Paper elevation={0} className={classes.bibtexSpan}>
        <Typography align="left" variant="h6" color="inherit" gutterBottom>
          <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
            {bibtex}
          </pre>
        </Typography>
      </Paper>
    </>
  );
}

function DownloadSection(): React.ReactElement {
  const classes = useStyles();
  const youtubeLink = 'https://youtu.be/_VWN8oLk68Q';
  const githubProjectLink = 'https://github.com/arcchang1236/CA-NoiseGAN';
  const supplementaryLink = '';
  const resultZipLink =
    'https://drive.google.com/file/d/1eKbZ8kd_9PzIKlDFGWj4Pdiv3OP_XPt1/view';

  const iconLinksContent = [
    { name: 'Code', url: githubProjectLink, icon: GitHubIcon },
    // { name: 'Video', url: youtubeLink, icon: YouTubeIcon },
    { name: 'Supplementary', url: supplementaryLink, icon: PictureAsPdfIcon },
    { name: 'Results', url: resultZipLink, icon: StorageIcon },
  ];

  return (
    <>
      <Title anchor="video" name="Video" />
      <Grid container justify="center" spacing={1}>
        <iframe
          title="ytVideo"
          width="660"
          height="415"
          src={youtubeLink}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Grid>
      <Title anchor="download" name="Download" />
      <Grid container justify="center" spacing={1}>
        {iconLinksContent.map((iconLink) => (
          <Grid item xs={3} key={iconLink.url}>
            <Link href={iconLink.url} target="_blank" rel="noopener">
              <Icon
                component={iconLink.icon}
                color="action"
                style={{ fontSize: 60 }}
              />
              <Typography
                align="center"
                variant="h6"
                color="inherit"
                className={classes.iconText}
              >
                {iconLink.name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function ResultsSection(): React.ReactElement {
  return (
    <>
      {/* <Title anchor="demo" name="Interactive Demo" />
      <MagnifierPackDenoiserDemoComponent /> */}
      <Title anchor="results" name="Results" />
      <div>
        {/* <ReactLink to="/demo"> */}
        <Typography variant="h6" color="inherit" gutterBottom>
          Comming soon...
        </Typography>
        {/* </ReactLink> */}
      </div>
    </>
  );
}

function AcknowledgmentsSection(): React.ReactElement {
  return (
    <>
      <Title anchor="acknowledgments" name="Acknowledgments" />
      <Typography variant="body1" align="left" paragraph>
        We thank <Link href="https://github.com/leVirve">Hung-Jin Lin</Link> for
        providing{' '}
        <Link href="https://github.com/leVirve/projectize">this template!</Link>{' '}
        <br />
        We thank <Link href="/toto">SIDD</Link> for providing their datasets.{' '}
        <br />
        Part of our codes are based on{' '}
        <Link href="/toto">SIDD simple camera pipeline</Link> and{' '}
        <Link href="/toto">NoiseFlow</Link>.
      </Typography>
    </>
  );
}
