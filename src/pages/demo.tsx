import React, { useState, useRef } from 'react';

import {
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from '@material-ui/core';
import useSize from '@react-hook/size';
import { makeStyles } from '@material-ui/core/styles';
import {
  MagnifierContainer,
  MagnifierPreview,
  MagnifierZoom,
} from 'react-image-magnifiers';
import { MOUSE_ACTIVATION } from 'react-input-position';

import Header from '../components/Headers';
import Footer from '../components/Footer';
import Title from '../components/Title';

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: 'center',
  },
  magnifier: {
    position: 'relative',
    display: 'inline-block',
    lineHeight: 0,
  },
  slider: {
    width: 300,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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

function DemoPage(): React.ReactElement {
  const classes = useStyles();
  const demoPageSections = [
    { title: 'Home', url: '/' },
    { title: 'Control', url: '/demo#control' },
    { title: 'Result', url: '/demo#result' },
    { title: 'References', url: '/demo#references' },
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
        sections={demoPageSections}
      />
      <Container maxWidth="lg">
        <Title anchor="result_denoise" name="Denoisers" />
        <MagnifierPackDenoiserDemoComponent />
        <Title anchor="result_noise" name="Noise Models" />
        <ReferencesSection />
      </Container>
      <Footer authorName={authorName} githubPage={authorGithubProfile} />
    </div>
  );
}

function zeroPad(num: number, numZeros: number): string {
  const zeros = Math.max(0, numZeros - num.toString().length);
  const zeroString = (10 ** zeros).toString().substr(1);
  return zeroString + num;
}

interface Dictionary<T> {
  [Key: string]: T;
}

function MagnifierPackDenoiserDemoComponent(): React.ReactElement {
  const classes = useStyles();
  const target = useRef(null);
  const [gridWidth] = useSize(target);
  const [imageId, setImageId] = useState(1);
  const [sceneId, setSceneId] = useState(1);
  const [camera, setCamera] = useState('pixel');
  const [iso, setIso] = useState(100);

  const imageUrlPrefix = `${process.env.PUBLIC_URL}/images/NR/NR_output`;
  const cameraMapping: Dictionary<number> = {
    pixel: 0,
    iphone: 1,
    samsung: 2,
    nexus: 3,
    lg: 4,
  };
  const cameraOptions = [
    { model: 'LG', value: 'lg', fullVal: 'LG-H815-LGE-lge' },
    { model: 'Nexus', value: 'nexus', fullVal: 'Nexus 6-motorola-google' },
    { model: 'Pixel', value: 'pixel', fullVal: 'Pixel-Google-google' },
    { model: 'Samsung', value: 'samsung', fullVal: 'SM-G925I-samsung-samsung' },
    { model: 'iPhone', value: 'iphone', fullVal: 'iPhone9,3 back camera' },
  ];

  const formatFileName = (note: string): string => {
    const cameraId = cameraMapping[camera];
    const isoVal = zeroPad(iso, 4);
    const imageNum = zeroPad(imageId, 2);
    const url = `${imageUrlPrefix}/${cameraId}_${sceneId}_${isoVal}_${imageNum}_${note}.jpg`;
    return url;
  };

  const methodPatches = [
    {
      method: 'Gaussian',
      url: formatFileName('g'),
    },
    {
      method: 'Hetero-Gaussian',
      url: formatFileName('pg'),
    },
    {
      method: 'NoiseFlow',
      url: formatFileName('nf'),
    },
    {
      method: 'Real',
      url: formatFileName('real'),
    },
    {
      method: 'Ours',
      url: formatFileName('ours'),
    },
    {
      method: 'Ours + Real',
      url: formatFileName('realours'),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function range(count: number) {
    const start = 1;
    return Array.apply(0, Array(count)).map((element, index) => index + start);
  }

  const imageSources: Dictionary<Dictionary<Dictionary<number[]>>> = {
    pixel: {
      1: { iso: [100, 800], num: [4, 4] },
      2: { iso: [100, 800, 6400], num: [2, 4, 2] },
      8: { iso: [100, 800, 3200], num: [2, 2, 2] },
    },
    iphone: {
      1: { iso: [100, 800, 1600], num: [2, 4, 4] },
      2: { iso: [100, 800, 1600], num: [4, 4, 2] },
      8: { iso: [100, 400, 800, 1600], num: [4, 4, 4, 2] },
    },
    samsung: {
      1: { iso: [100, 800, 3200], num: [16, 6, 8] },
      2: { iso: [100, 1600], num: [2, 2] },
      8: { iso: [100, 800, 1600, 3200], num: [2, 2, 2, 2] },
    },
    nexus: {
      1: { iso: [100, 800], num: [2, 2] },
      2: { iso: [100, 3200], num: [2, 2] },
      8: { iso: [100, 400, 800, 1600], num: [2, 2, 2, 2] },
    },
    lg: {
      1: { iso: [100, 800], num: [2, 2] },
      2: { iso: [100, 800], num: [2, 2] },
      8: { iso: [100, 800], num: [2, 2] },
    },
  };

  const handleSceneChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setSceneId(event.target.value as number);
    setIso(100);
    setImageId(1);
  };
  const handleCameraChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setCamera(event.target.value as string);
    setIso(100);
    setImageId(1);
  };
  const handleIsoChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setIso(event.target.value as number);
    setImageId(1);
  };
  const handleImageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setImageId(event.target.value as number);
  };

  return (
    <MagnifierContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <MagnifierPreview
            imageSrc={formatFileName('noisy')}
            mouseActivation={MOUSE_ACTIVATION.MOUSE_DOWN}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="NR-scene-select-helper-label">
              SIDD Scene
            </InputLabel>
            <Select
              labelId="NR-scene-select-helper-label"
              id="NR-scene-select-helper"
              value={sceneId}
              onChange={handleSceneChange}
            >
              {Object.keys(imageSources[camera]).map((val) => (
                <MenuItem key={val} value={val}>
                  Scene #{val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="NR-camera-select-helper-label">Camera</InputLabel>
            <Select
              labelId="NR-camera-select-helper-label"
              id="NR-camera-select-helper"
              value={camera}
              onChange={handleCameraChange}
            >
              {cameraOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="NR-iso-select-helper-label">ISO</InputLabel>
            <Select
              labelId="NR-iso-select-helper-label"
              id="NR-iso-select-helper"
              value={iso}
              onChange={handleIsoChange}
            >
              {imageSources[camera][sceneId].iso.map((isoOption) => (
                <MenuItem key={isoOption} value={isoOption}>
                  {isoOption}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>*Better view in high ISO.</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="NR-images-select-helper-label">
              Conditions
            </InputLabel>
            <Select
              labelId="NR-images-select-helper-label"
              id="NR-images-select-helper"
              value={imageId}
              onChange={handleImageChange}
            >
              {range(
                imageSources[camera][sceneId].num[
                  imageSources[camera][sceneId].iso.indexOf(iso)
                ]
              ).map((imageIdx) => (
                <MenuItem key={imageIdx} value={imageIdx}>
                  {imageIdx}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Different photo conditions.</FormHelperText>
          </FormControl>
          {/* <img width="100px" src={formatFileName('noisy')} alt="debug" /> */}
        </Grid>
      </Grid>
      <Grid container>
        {methodPatches.map((meta) => (
          <Grid item xs={4} md={2} key={meta.method} ref={target}>
            <Typography style={{ paddingTop: 5 }} variant="subtitle2">
              {meta.method}
            </Typography>
            <MagnifierZoom
              style={{
                height: gridWidth - 5,
                width: gridWidth - 5,
                opacity: '1',
                boxShadow: '0 0 0.2em black',
              }}
              imageSrc={meta.url}
            />
          </Grid>
        ))}
      </Grid>
    </MagnifierContainer>
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
