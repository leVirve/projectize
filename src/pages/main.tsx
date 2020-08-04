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
  YouTube as YouTubeIcon,
  PictureAsPdf as PictureAsPdfIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link as ReactLink } from 'react-router-dom';

import Header from '../components/Headers';
import Title from '../components/Title';
import Author from '../components/Author';
import Banner from '../components/Banner';
import Button from '../components/Button';
import Footer from '../components/Footer';

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
    { title: 'Download', url: '#download' },
    { title: 'Results', url: '#results' },
  ];
  const authorName = 'Hsin-Yu Chang';
  const authorGithubProfile = 'https://github.com/acht7111020';
  const githubPage = 'https://github.com/acht7111020/DSMAP';
  const paperName =
    'DSMAP: Domain-specific Mappings for Generative Adversarial Style Transfers';

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
  const topicLabels = [
    { text: 'ECCV 2020', url: 'https://eccv2020.eu/' },
    { text: 'Style Transfer', url: 'https://eccv2020.eu/' },
  ];
  const imageUrl = `${process.env.PUBLIC_URL}/images/teaser.png`;

  return (
    <>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        className={classes.titleHead}
      >
        Domain-Specific Mappings <br />
        for Generative Adversarial Style Transfers <br />
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
      <Button text="Download Code / Results" link="#download" />
    </>
  );
}

function AuthorSection(): React.ReactElement {
  const authors = [
    {
      name: 'Hsin-Yu Chang',
      url: 'http://www.cmlab.csie.ntu.edu.tw/~hsinyu1020/',
      affiliation: '',
    },
    {
      name: 'Zhixiang Wang',
      url: 'http://www.cmlab.csie.ntu.edu.tw/~r06944046/',
      affiliation: '',
    },
    {
      name: 'Yung-Yu Chuang',
      url: 'https://www.csie.ntu.edu.tw/~cyy/',
      affiliation: '',
    },
  ];

  const affiliations = [
    { number: '', name: 'National Taiwan University', url: '' },
  ];
  return (
    <>
      <Author authors={authors} affiliations={affiliations} />
    </>
  );
}

function AbstractSection(): React.ReactElement {
  return (
    <>
      <Title anchor="abstract" name="Abstract" />
      <Typography component="h3" variant="h6" align="left" paragraph>
        Style transfer generates an image whose content comes from one image and
        style from the other. Image-to-image translation approaches with
        disentangled representations have been shown effective for style
        transfer between two image categories. However, previous methods often
        assume a shared domain-invariant content space, which could compromise
        the content representation power. For addressing this issue, this paper
        leverages domain-specific mapping functions for remapping latent
        features in the shared content space to domain-specific content spaces.
        This way, images can be encoded more properly for style transfer.
        Experiments show that the proposed method outperforms previous style
        transfer methods, particularly on challenging scenarios that would
        require semantic correspondences between images.
      </Typography>
    </>
  );
}

function PaperSection(): React.ReactElement {
  const classes = useStyles();
  const thumbImageUrl = `${process.env.PUBLIC_URL}/images/thumb.png`;
  const thumbTitle = `Domain-specific Mappings for Generative Adversarial Style Transfers, ECCV 2020 (arxiv)`;
  const arxivLink = '';
  const descriptionText = `Hsin-Yu Chang, Zhixiang Wang, and Yung-Yu Chuang, "Domain-Specific
  Mappings for Generative Adversarial Style Transfers", in Proceedings
  of the European Conference on Computer Vision (ECCV), 2020`;
  const bibtex = `@inproceedings{chang2020dsmap,
    author    = {Chang, Hsin-Yu and Wang, Zhixiang and Chuang, Yung-Yu},
    title     = {Domain-Specific Mappings for Generative Adversarial Style Transfers},
    booktitle = {European Conference on Computer Vision},
    year      = {2020}
  }`;

  return (
    <>
      <Title anchor="paper" name="Paper" />
      <Chip label="Arxiv" variant="outlined" color="primary" />
      <Grid item>
        <Link href={arxivLink} target="_blank" rel="noopener">
          <Banner
            metadata={{ title: thumbTitle }}
            elevation={0}
            imageSrc={thumbImageUrl}
          />
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
  const youtubeLink = '';
  const githubProjectLink = 'https://github.com/acht7111020/DSMAP';
  const supplementaryLink =
    'https://www.dropbox.com/s/9wt2753hjgzf3rv/ECCV_supp_domain_specific_mapping_style_transfer.pdf?dl=0';
  const demoZipLink =
    'https://drive.google.com/file/d/1T2FDk9t78KgujByIrig-440in1lckOTe/view?usp=sharing';
  const resultZipLink =
    'https://drive.google.com/file/d/1RhQRE1a-7O-a7nuNvrcqtoM79sxWvA5g/view?usp=sharing';

  const iconLinksContent = [
    { name: 'Code', url: githubProjectLink, icon: GitHubIcon },
    { name: 'Video', url: youtubeLink, icon: YouTubeIcon },
    { name: 'Supplementary', url: supplementaryLink, icon: PictureAsPdfIcon },
    { name: 'Demo Results', url: demoZipLink, icon: StorageIcon },
    { name: 'More Results', url: resultZipLink, icon: StorageIcon },
  ];

  return (
    <>
      <Title anchor="download" name="Download" />
      <Grid container justify="center" spacing={1}>
        {iconLinksContent.map((iconLink) => (
          <Grid item xs={2}>
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
      <Title anchor="results" name="Results (Demo website)" />
      <div>
        <ReactLink to="/demo">
          <Typography variant="h6" color="inherit" gutterBottom>
            <Banner
              elevation={0}
              imageSrc={`${process.env.PUBLIC_URL}/images/style_inter.gif`}
            />
            {/* a dummy link stuff */}
            <Link href="/demo" target="_blank" rel="noopener">
              Demo Website
            </Link>
          </Typography>
        </ReactLink>
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
        We thank <Link href="https://github.com/HsinYingLee/DRIT">
          DRIT
        </Link>{' '}
        and{' '}
        <Link href="https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix">
          CycleGAN
        </Link>{' '}
        for providing their datasets. <br />
        Part of our codes are based on{' '}
        <Link href="https://github.com/NVlabs/MUNIT">MUNIT</Link> and{' '}
        <Link href="https://github.com/HelenMao/MSGAN">MSGAN</Link>.
      </Typography>
    </>
  );
}
