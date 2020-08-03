import React, { useState } from 'react';

import {
  Container,
  Grid,
  Link,
  Slider,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Header from '../components/Headers';
import Footer from '../components/Footer';
import Title from '../components/Title';
import ImageContainer from '../components/ImageContainer';

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: 'center',
  },
  slider: {
    width: 300,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectText: {
    '&.Mui-focused': {
      color: '#FFB6C1',
    },
  },
  select: {
    '&:before': {
      borderBottom: `1px solid #F3B3B1`,
    },
    '&:after': {
      borderBottom: `3px solid #FFB6C1`,
    },
    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before': {
      borderBottom: `2px solid #FFB6C1`,
    },
  },
}));

const PinkSlider = withStyles({
  root: {
    color: '#F08080',
    height: 8,
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
  },
  valueLabel: {
    left: 'calc(-12px)',
  },
  mark: {
    backgroundColor: '#FFB6C1',
    height: 3,
    borderRadius: 2,
  },
  track: {
    height: 4,
    borderRadius: 2,
    background: 'linear-gradient(87deg, #FE6B8B 30%, #FF8E63 90%)',
  },
  rail: {
    height: 4,
    borderRadius: 2,
    background: 'linear-gradient(87deg, #FE6B8B 30%, #FF8E63 90%)',
  },
})(Slider);

function DemoPage(): React.ReactElement {
  const classes = useStyles();
  const demoPageSections = [
    { title: 'Home', url: '/' },
    { title: 'Control', url: '/demo#control' },
    { title: 'Result', url: '/demo#result' },
    { title: 'References', url: '/demo#references' },
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
        sections={demoPageSections}
      />
      <Container maxWidth="lg">
        <InteractiveDemoComponent />
        <ReferencesSection />
      </Container>
      <Footer authorName={authorName} githubPage={authorGithubProfile} />
    </div>
  );
}

function urlForResult(
  dataset: string,
  prefix: string,
  { imageId, styleId }: { imageId?: number; styleId?: number }
): string {
  const prefixUrl = `${process.env.PUBLIC_URL}/images/demo_compared/${dataset}`;

  if (imageId === undefined && styleId)
    return `${prefixUrl}/${prefix}_${zeroPad(styleId, 2)}.jpg`;
  if (styleId === undefined && imageId)
    return `${prefixUrl}/${prefix}_${zeroPad(imageId, 2)}.jpg`;
  if (imageId && styleId)
    return `${prefixUrl}/${prefix}_${zeroPad(imageId, 2)}_${zeroPad(
      styleId,
      2
    )}.jpg`;
  return 'fail';
}

function zeroPad(num: number, numZeros: number): string {
  const zeros = Math.max(0, numZeros - num.toString().length);
  const zeroString = (10 ** zeros).toString().substr(1);
  return zeroString + num;
}

function InteractiveDemoComponent(): React.ReactElement {
  const classes = useStyles();
  const [imageId, setImageId] = useState(1);
  const [styleId, setStyleId] = useState(1);
  const [dataset, setDataset] = useState('dog2cat');
  const datasetItems = [
    { name: 'dog2cat', text: 'Dog → Cat' },
    { name: 'cat2dog', text: 'Cat → Dog' },
    { name: 'monet', text: 'Photo → Monet' },
    { name: 'portrait', text: 'Photo → Portrait' },
  ];
  const contentMarks = [];
  const styleMarks = [];
  for (let i = 2; i < 25; i += 2) contentMarks.push({ value: i });
  for (let i = 2; i < 10; i += 1) styleMarks.push({ value: i });
  const comparisons = [
    { nameTag: 'MUNIT [1]', dataFolderPaht: 'munit' },
    { nameTag: 'GDWCT [2]', dataFolderPaht: 'gdwct' },
    { nameTag: 'MSGAN [3]', dataFolderPaht: 'msgan' },
    { nameTag: 'Ours', dataFolderPaht: 'ours' },
  ];

  const handleDatasetChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setDataset(event.target.value as string);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageChange = (event: any, newValue: number | number[]): void => {
    setImageId(newValue as number);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStyleChange = (event: any, newValue: number | number[]): void => {
    setStyleId(newValue as number);
  };

  return (
    <>
      <Title anchor="control" name="Control" fontVariant={{ variant: 'h5' }} />
      <Typography variant="h6" align="left" paragraph>
        Here you can browse the results of our model in comparison to
        state-of-the-arts by choosing the translation tasks for different
        datasets, content image ID (from 1 to 25), and style image ID (from 1 to
        10).
      </Typography>
      <Grid container justify="center" spacing={6}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id="label" className={classes.selectText}>
              Dataset
            </InputLabel>
            <Select
              className={classes.select}
              value={dataset}
              onChange={handleDatasetChange}
            >
              {datasetItems.map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" gutterBottom>
            Content Image ID:
          </Typography>
          <PinkSlider
            className={classes.slider}
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
          <PinkSlider
            className={classes.slider}
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
      </Grid>
      {/* image / style image pair */}
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Grid item xs={10} sm={5} md={3}>
          <ImageContainer
            title="Content Image"
            height={240}
            src={urlForResult(dataset, 'content', { imageId })}
          />
        </Grid>
        <Grid item xs={10} sm={5} md={3}>
          <ImageContainer
            title="Style Image"
            height={240}
            src={urlForResult(dataset, 'style', { styleId })}
          />
        </Grid>
      </Grid>

      {/* comparison images */}
      <Title anchor="result" name="Result" fontVariant={{ variant: 'h5' }} />
      <Grid container justify="center" spacing={1}>
        {comparisons.map((method) => (
          <Grid item xs={10} sm={5} md={3}>
            <ImageContainer
              title={method.nameTag}
              src={urlForResult(dataset, method.dataFolderPaht, {
                imageId,
                styleId,
              })}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function ReferencesSection(): React.ReactElement {
  const references = [
    {
      number: `[1] `,
      link: `https://arxiv.org/abs/1804.04732`,
      text: `Xun Huang, Ming-Yu Liu, Serge Belongie, Jan Kautz, "Multimodal
    Unsupervised Image-to-Image Translation"`,
      suffix: `, ECCV 2018`,
    },
    {
      number: `[2] `,
      link: `https://arxiv.org/abs/1812.09912`,
      text: `Wonwoong Cho, Sungha Choi, David Keetae Park, Inkyu Shin, Jaegul
      Choo, "Image-to-Image Translation via Group-wise Deep
      Whitening-and-Coloring Transformation"`,
      suffix: `, CVPR 2019`,
    },
    {
      number: `[3] `,
      link: `https://arxiv.org/abs/1903.05628`,
      text: `Qi Mao, Hsin-Ying Lee, Hung-Yu Tseng, Siwei Ma, and Ming-Hsuan Yang,
      "Mode Seeking Generative Adversarial Networks for Diverse Image
      Synthesis"`,
      suffix: `, CVPR 2019`,
    },
  ];

  return (
    <>
      <Title
        anchor="references"
        name="References"
        fontVariant={{ variant: 'h5' }}
      />
      <Typography align="left" variant="body1" color="inherit" gutterBottom>
        {references.map((reference) => (
          <>
            {reference.number}
            <Link href={reference.link} target="_blank" rel="noopener">
              {reference.text}
            </Link>
            {reference.suffix} <br />
          </>
        ))}
      </Typography>
    </>
  );
}

export default DemoPage;
