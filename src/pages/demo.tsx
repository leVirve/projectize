import React, { useState, useRef } from 'react';

import {
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Select,
  Switch,
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
  selectorFromControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0.25),
      marginRight: theme.spacing(0.25),
    },
  },
  cleanDenoiseSmaller: {
    [theme.breakpoints.down('xs')]: {
      marginTop: 'auto',
    },
  },
  magnifierZoomBox: {
    boxShadow: '0 0 0.2em black',
  },
  magnifierZoomCaption: {
    paddingTop: theme.spacing(1),
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
    { title: 'Noise Model', url: '/demo#result_noise' },
    { title: 'Denoiser', url: '/demo#result_denoise' },
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
        <Title anchor="result_noise" name="Noise Models" />
        <Typography paragraph align="left">
          Because of the useContext mechanism inside MagnifierContainer of
          react-image-magnifiers, you have to re-select the item for a smooth
          magnifying exploration.
          <br />
          If show noisy, texture overlaid with noise, will consume lots of
          resources and the hovering will be laggy.
        </Typography>
        <NoiseModelDemoComponent />
        <Title anchor="result_denoise" name="Denoisers" />
        <Typography paragraph align="left">
          Because of the useContext mechanism inside MagnifierContainer of
          react-image-magnifiers, you have to re-select the item for a smooth
          magnifying exploration.
        </Typography>
        <DenoiserDemoComponent />
        <ReferencesSection />
      </Container>
      <Footer authorName={authorName} githubPage={authorGithubProfile} />
    </div>
  );
}

interface Dictionary<T> {
  [Key: string]: T;
}

export function NoiseModelDemoComponent(): React.ReactElement {
  const classes = useStyles();
  const target = useRef(null);
  const [gridWidth] = useSize(target);
  const [sceneId, setSceneId] = useState(1);
  const [camera, setCamera] = useState(2);
  const [iso, setIso] = useState(100);
  const [showNoise, setShowNoise] = useState(true);

  const imageUrlPrefix = `${process.env.PUBLIC_URL}/images/noise_model`;
  const methodOptions = [
    { name: 'Gaussian', note: 'g' },
    { name: 'HeteroGaussian', note: 'pg' },
    { name: 'NoiseFlow [1]', note: 'nf' },
    { name: 'Ours', note: 'ours' },
    { name: 'GT', note: '' },
  ];
  const cameraOptions = [
    { model: 'Pixel', value: 0, fullVal: 'Pixel-Google-google' },
    { model: 'iPhone', value: 1, fullVal: 'iPhone9,3 back camera' },
    { model: 'Samsung', value: 2, fullVal: 'SM-G925I-samsung-samsung' },
    { model: 'Nexus', value: 3, fullVal: 'Nexus 6-motorola-google' },
    { model: 'LG', value: 4, fullVal: 'LG-H815-LGE-lge' },
  ];
  const sceneOptions: Dictionary<number[]> = {
    0: [1, 2, 8],
    1: [2, 8],
    2: [1, 2, 8],
    3: [1, 2],
    4: [1, 8],
  };
  const isoOptions: Dictionary<Dictionary<number[]>> = {
    0: { 1: [800], 2: [100, 800, 6400], 8: [100, 800, 3200] },
    1: { 2: [100], 8: [100] },
    2: { 1: [100, 800, 3200], 2: [100, 1600], 8: [800, 1600, 3200] },
    3: { 1: [100, 800], 2: [3200] },
    4: { 1: [800], 8: [100, 400] },
  };

  const formatFileName = (note: string): string => {
    const isoVal = iso < 999 ? `0${iso}` : `${iso}`;
    const idx = `01`;
    const suffix = note ? `${idx}_${note}` : `${idx}_noise`;
    return `${imageUrlPrefix}/${camera}_${sceneId}_${isoVal}_${suffix}.jpg`;
  };

  const handleCameraChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setCamera(event.target.value as number);
    const firstSceneId = sceneOptions[camera][0];
    const firstIso = isoOptions[camera][firstSceneId][0];
    setSceneId(firstSceneId);
    setIso(firstIso);
  };
  const handleSceneChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setSceneId(event.target.value as number);
  };
  const handleIsoChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setIso(event.target.value as number);
  };
  const handleShowNoiseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setShowNoise(event.target.checked);
  };

  return (
    <MagnifierContainer>
      <Grid container spacing={2} justify="center">
        <Grid item xs={4} sm={4}>
          <FormGroup row>
            <FormControl className={classes.selectorFromControl}>
              <InputLabel id="NM-camera-select-helper-label">Camera</InputLabel>
              <Select
                labelId="NM-camera-select-helper-label"
                id="NM-camera-select-helper"
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
            <FormControl className={classes.selectorFromControl}>
              <InputLabel id="NM-scene-select-helper-label">
                SIDD Scene
              </InputLabel>
              <Select
                labelId="NM-scene-select-helper-label"
                id="NM-scene-select-helper"
                value={sceneId}
                onChange={handleSceneChange}
              >
                {sceneOptions[camera].map((val) => (
                  <MenuItem key={val} value={val}>
                    Scene #{val}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.selectorFromControl}>
              <InputLabel id="NM-iso-select-helper-label">ISO</InputLabel>
              <Select
                labelId="NM-iso-select-helper-label"
                id="NM-iso-select-helper"
                value={iso}
                onChange={handleIsoChange}
              >
                {isoOptions[camera][sceneId].map((val) => (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={showNoise}
                  onChange={handleShowNoiseChange}
                  name="checkedA"
                />
              }
              label="Show overlay noisy"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={5} sm={5}>
          <MagnifierPreview
            imageSrc={formatFileName('noisy')}
            mouseActivation={MOUSE_ACTIVATION.MOUSE_DOWN}
          />
        </Grid>
      </Grid>
      <Grid container justify="center">
        {showNoise &&
          methodOptions.map((method) => (
            <Grid item xs={2} md={2} key={method.name} ref={target}>
              <Typography
                className={classes.magnifierZoomCaption}
                variant="subtitle2"
              >
                {method.name}
              </Typography>
              <MagnifierZoom
                className={classes.magnifierZoomBox}
                style={{
                  height: gridWidth - 5,
                  width: gridWidth - 5,
                  opacity: '1',
                }}
                imageSrc={formatFileName(method.note)}
              />
            </Grid>
          ))}
      </Grid>
      <Grid container justify="center">
        {methodOptions.map((method) => (
          <Grid item xs={2} md={2} key={method.name} ref={target}>
            <Typography
              className={classes.magnifierZoomCaption}
              variant="subtitle2"
            >
              {method.name}
            </Typography>
            <MagnifierZoom
              className={classes.magnifierZoomBox}
              style={{
                height: gridWidth - 5,
                width: gridWidth - 5,
                opacity: '1',
              }}
              imageSrc={formatFileName(`noisy${method.note}`)}
            />
          </Grid>
        ))}
      </Grid>
    </MagnifierContainer>
  );
}

export function DenoiserDemoComponent(): React.ReactElement {
  const classes = useStyles();
  const target = useRef(null);
  const [gridWidth] = useSize(target);
  const [sceneId, setSceneId] = useState(1);
  const [camera, setCamera] = useState(2);

  const imageUrlPrefix = `${process.env.PUBLIC_URL}/images/denoise`;
  const methodOptions = [
    { name: 'Gaussian', note: 'g' },
    { name: 'HeteroGaussian', note: 'pg' },
    { name: 'NoiseFlow [1]', note: 'nf' },
    { name: 'Real Paired', note: 'real' },
    { name: 'Ours', note: 'ours' },
    { name: 'Ours + Real', note: 'realours' },
  ];
  const cameraOptions = [
    { model: 'Pixel', value: 0, fullVal: 'Pixel-Google-google' },
    { model: 'iPhone', value: 1, fullVal: 'iPhone9,3 back camera' },
    { model: 'Samsung', value: 2, fullVal: 'SM-G925I-samsung-samsung' },
    { model: 'Nexus', value: 3, fullVal: 'Nexus 6-motorola-google' },
    { model: 'LG', value: 4, fullVal: 'LG-H815-LGE-lge' },
  ];
  const sceneOptions = [1, 2, 8];
  const imageSources: Dictionary<Dictionary<string>> = {
    0: { 1: '0800_04', 2: '6400_02', 8: '3200_01' },
    1: { 1: '0800_04', 2: '0100_04', 8: '0100_01' },
    2: { 1: '0100_02', 2: '1600_01', 8: '3200_02' },
    3: { 1: '0800_01', 2: '3200_02', 8: '0400_02' },
    4: { 1: '0800_02', 2: '0100_01', 8: '0400_01' },
  };

  const formatFileName = (note: string): string => {
    const footage = imageSources[camera][sceneId];
    return `${imageUrlPrefix}/${camera}_${sceneId}_${footage}_${note}.jpg`;
  };

  const handleSceneChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setSceneId(event.target.value as number);
  };
  const handleCameraChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setCamera(event.target.value as number);
  };

  return (
    <MagnifierContainer>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={4}>
          <FormControl className={classes.selectorFromControl}>
            <InputLabel id="NR-scene-select-helper-label">
              SIDD Scene
            </InputLabel>
            <Select
              labelId="NR-scene-select-helper-label"
              id="NR-scene-select-helper"
              value={sceneId}
              onChange={handleSceneChange}
            >
              {sceneOptions.map((val) => (
                <MenuItem key={val} value={val}>
                  Scene #{val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.selectorFromControl}>
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

          <MagnifierPreview
            imageSrc={formatFileName('noisy')}
            mouseActivation={MOUSE_ACTIVATION.MOUSE_DOWN}
          />
        </Grid>
        <Grid item xs={4} sm={2} className={classes.cleanDenoiseSmaller}>
          <Typography
            className={classes.magnifierZoomCaption}
            variant="subtitle2"
          >
            Clean
          </Typography>
          <MagnifierZoom
            className={classes.magnifierZoomBox}
            style={{
              height: gridWidth - 5,
              width: gridWidth - 5,
              opacity: '1',
            }}
            imageSrc={formatFileName('clean')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container>
            {methodOptions.map((method) => (
              <Grid item xs={4} md={4} key={method.name} ref={target}>
                <Typography
                  className={classes.magnifierZoomCaption}
                  variant="subtitle2"
                >
                  {method.name}
                </Typography>
                <MagnifierZoom
                  className={classes.magnifierZoomBox}
                  style={{
                    height: gridWidth - 5,
                    width: gridWidth - 5,
                    opacity: '1',
                  }}
                  imageSrc={formatFileName(method.note)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </MagnifierContainer>
  );
}

function ReferencesSection(): React.ReactElement {
  const references = [
    {
      number: `[1] `,
      link: `https://arxiv.org/abs/1908.08453`,
      text: `Abdelrahman Abdelhamed, Marcus A. Brubaker, Michael S. Brown, "Noise Flow: Noise Modeling with Conditional Normalizing Flows"`,
      suffix: `, ICCV 2019`,
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
