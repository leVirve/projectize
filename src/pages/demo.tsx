import React, { useState, useRef } from 'react';

import {
  Container,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Grid,
  Link,
  Slider,
  Select,
  InputLabel,
  Radio,
  MenuItem,
  Typography,
} from '@material-ui/core';
import useMouse, { MousePosition } from '@react-hook/mouse-position';
import useSize from '@react-hook/size';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  MagnifierContainer,
  MagnifierPreview,
  MagnifierZoom,
} from 'react-image-magnifiers';
import { MOUSE_ACTIVATION } from 'react-input-position';

import Header from '../components/Headers';
import Footer from '../components/Footer';
import Title from '../components/Title';
import ImageContainer from '../components/ImageContainer';

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
        <Title anchor="result_denoise" name="Denoisers" />
        <MagnifierPackDenoiserDemoComponet />
        {/* <Title anchor="result" name="Result" />
        <Grid container justify="center" spacing={1}>
          <div style={{ textAlign: 'left' }}>
            <Magnifier
              src={imageUrl1}
              width={500}
              mgWidth={100}
              mgHeight={100}
              zoomFactor={3}
            />
          </div>
        </Grid>
        <div style={{ marginBottom: 200 }} /> */}
        <Title anchor="result_noise" name="Noise Models" />
        <Grid>
          <MagnifierDemoComponet />
        </Grid>
        {/* <Grid>
          <MagnifierDenoiserDemoComponet />
        </Grid> */}
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

interface Props {
  width: string | number;
  height: string | number;
}
MagnifierDemoComponet.defaultProps = {
  width: '100%',
  height: 'auto',
};
interface Dictionary<T> {
  [Key: string]: T;
}

function MagnifierPackDenoiserDemoComponet(): React.ReactElement {
  const target = useRef(null);
  const [gridWidth] = useSize(target);
  const [imageId, setImageId] = useState(7);
  const [img1Load, setImg1Load] = useState(false);
  const [camera, setCamera] = useState('lg');
  const [iso, setIso] = useState('100');

  const imageUrlPrefix = `${process.env.PUBLIC_URL}/images/NR/NR_output`;
  const cameraOptions = [
    { model: 'LG', value: 'lg' },
    { model: 'Nexus', value: 'nexus' },
    { model: 'Pixel', value: 'pixel' },
    { model: 'Samsung', value: 'samsung' },
    { model: 'iPhone', value: 'iphone' },
  ];
  const methodPatches = [
    {
      method: 'Gaussian',
      url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_g.jpg`,
    },
    {
      method: 'HeteroGaussian',
      url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_pg.jpg`,
    },
    {
      method: 'NoiseFlow',
      url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_nf.jpg`,
    },
    {
      method: 'Real',
      url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_real.jpg`,
    },
    {
      method: 'Ours',
      url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_ours.jpg`,
    },
    {
      method: 'Ours+Real',
      url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_real_ours.jpg`,
    },
  ];
  const isoOptions: Dictionary<string[]> = {
    lg: ['100', '400', '800'],
    nexus: ['100', '400', '800', '1600', '3200'],
    pixel: ['100', '800', '3200', '6400'],
    samsung: ['100', '800', '3200', '6400'],
    iphone: ['100', '400', '800', '1600'],
  };

  const handleCameraChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCamera((event.target as HTMLInputElement).value);
  };
  const handleIsoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIso((event.target as HTMLInputElement).value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageChange = (event: any, newValue: number | number[]): void => {
    setImageId(newValue as number);
  };

  return (
    <MagnifierContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <MagnifierPreview
            imageSrc={`${imageUrlPrefix}/${zeroPad(imageId, 6)}_noisy.jpg`}
            mouseActivation={MOUSE_ACTIVATION.MOUSE_DOWN}
            onImageLoad={(): void => {
              setImg1Load(true);
            }}
          />
          {!img1Load && <CircularProgress />}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Camera</FormLabel>
            <RadioGroup
              aria-label="camera"
              name="camera"
              value={camera}
              onChange={handleCameraChange}
              row
            >
              {cameraOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.model}
                />
              ))}
            </RadioGroup>
            <FormLabel component="legend">ISO</FormLabel>
            <RadioGroup
              aria-label="iso"
              name="iso"
              value={iso}
              onChange={handleIsoChange}
              row
            >
              {isoOptions[camera].map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Typography variant="subtitle1" gutterBottom>
            Scene
          </Typography>
          <Slider
            value={imageId}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={12}
            onChange={handleImageChange}
          />
        </Grid>
      </Grid>
      <Grid container>
        {methodPatches.map((meta) => (
          <Grid item xs={4} md={2} key={meta.method} ref={target}>
            {meta.method}
            <MagnifierZoom
              style={{
                height: gridWidth - 5,
                width: gridWidth - 5,
                opacity: '1',
              }}
              imageSrc={meta.url}
            />
          </Grid>
        ))}
      </Grid>
    </MagnifierContainer>
  );
}

function MagnifierDenoiserDemoComponet(): React.ReactElement<Props> {
  const [imageId, setImageId] = useState(7);
  const [camera, setCamera] = useState('lg');
  const [iso, setIso] = useState('100');
  const target = useRef(null);
  const mouse = useMouse(target, {
    fps: 30,
    enterDelay: 100,
    leaveDelay: 100,
  });

  const cameraOptions = [
    { model: 'LG', value: 'lg' },
    { model: 'Nexus', value: 'nexus' },
    { model: 'Pixel', value: 'pixel' },
    { model: 'Samsung', value: 'samsung' },
    { model: 'iPhone', value: 'iphone' },
  ];
  const isoOptions: Dictionary<string[]> = {
    lg: ['100', '400', '800'],
    nexus: ['100', '400', '800', '1600', '3200'],
    pixel: ['100', '800', '3200', '6400'],
    samsung: ['100', '800', '3200', '6400'],
    iphone: ['100', '400', '800', '1600'],
  };

  const handleCameraChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCamera((event.target as HTMLInputElement).value);
  };
  const handleIsoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIso((event.target as HTMLInputElement).value);
  };

  const imageUrlPrefix = `${process.env.PUBLIC_URL}/images/NR/NR_output`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageChange = (event: any, newValue: number | number[]): void => {
    setImageId(newValue as number);
  };

  return (
    <>
      <div>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <img
              src={`${imageUrlPrefix}/${zeroPad(imageId, 6)}_noisy.jpg`}
              alt="demo"
              ref={target}
              style={{ width: 'auto', maxHeight: 300 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {' '}
            <Typography variant="subtitle1" gutterBottom>
              Scene
            </Typography>
            <Slider
              value={imageId}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={12}
              onChange={handleImageChange}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Camera</FormLabel>
              <RadioGroup
                aria-label="camera"
                name="camera"
                value={camera}
                onChange={handleCameraChange}
                row
              >
                {cameraOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.model}
                  />
                ))}
              </RadioGroup>
              <FormLabel component="legend">ISO</FormLabel>
              <RadioGroup
                aria-label="iso"
                name="iso"
                value={iso}
                onChange={handleIsoChange}
                row
              >
                {isoOptions[camera].map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <RegionOverlays
            mouse={mouse}
            subtitle="Denoised Comparison"
            zoomFactor={3}
            patches={[
              {
                method: 'Gaussian',
                url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_g.jpg`,
              },
              {
                method: 'HeteroGaussian',
                url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_pg.jpg`,
              },
              {
                method: 'NoiseFlow',
                url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_nf.jpg`,
              },
              {
                method: 'Real',
                url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_real.jpg`,
              },
              {
                method: 'Ours',
                url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_ours.jpg`,
              },
              {
                method: 'Ours+Real',
                url: `${imageUrlPrefix}/${zeroPad(imageId, 6)}_real_ours.jpg`,
              },
            ]}
          />
        </Grid>
      </div>
    </>
  );
}

function MagnifierDemoComponet(props: Props): React.ReactElement<Props> {
  const { width, height } = props;
  const target = useRef(null);
  const mouse = useMouse(target, {
    fps: 30,
    enterDelay: 100,
    leaveDelay: 100,
  });

  const cleanImage = `${process.env.PUBLIC_URL}/images/clean_dog.jpg`;

  return (
    <>
      <div
        style={{
          width,
          height,
        }}
      >
        <Grid container justify="center" spacing={1}>
          <Grid item xs={8}>
            <div style={{ position: 'relative' }}>
              <img src={cleanImage} alt="demo" ref={target} width="87%" />
            </div>
          </Grid>
          <Grid item xs={4}>
            {' '}
            <Typography variant="subtitle1" gutterBottom>
              Scene
            </Typography>
            <Slider
              defaultValue={2}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={4}
            />
            <Typography variant="subtitle1" gutterBottom>
              ISO
            </Typography>
            <Slider
              defaultValue={1600}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={400}
              marks
              min={100}
              max={3200}
            />
            <div style={{ whiteSpace: 'pre', textAlign: 'left', fontSize: 8 }}>
              <p>{JSON.stringify(mouse, null, 2)}</p>
            </div>
          </Grid>
          <RegionOverlays mouse={mouse} subtitle="Noisy" />
          <RegionOverlays mouse={mouse} subtitle="Noise" />
        </Grid>
      </div>
    </>
  );
}

interface PatchMetadata {
  method: string;
  url: string;
}
interface RegionOverlaysProps {
  mouse: MousePosition;
  zoomFactor: number;
  patches: PatchMetadata[];
  subtitle: string;
}
RegionOverlays.defaultProps = {
  zoomFactor: 1.5,
  patches: [],
};

function RegionOverlays(props: RegionOverlaysProps): React.ReactElement {
  const { mouse, zoomFactor, patches, subtitle } = props;
  const mgBorderWidth = 2;
  const target = useRef(null);
  const [gridWidth] = useSize(target);

  const calcMagnifierLocation = (pos: number | null, size: number): string => {
    if (pos) return `calc(${pos}px - ${size / 2}px - ${mgBorderWidth}px)`;
    return `0`;
  };
  const calcBackgroundLocation = (): string => {
    const posX = mouse.x;
    const posY = mouse.y;
    const height = mouse.elementHeight;
    const width = mouse.elementWidth;
    if (posX && posY && width && height) {
      const relX = posX / width;
      const relY = posY / height;
      const offsetX = gridWidth / 2 - relX * gridWidth;
      const offsetY = gridWidth / 2 - relY * gridWidth;
      return `calc(${relX * 100}% + ${offsetX}px) calc(${
        relY * 100
      }% + ${offsetY}px)`;
    }
    return `0`;
  };
  const calcBackgroundSize = (): string => {
    const height = mouse.elementHeight;
    const width = mouse.elementWidth;
    if (height && width)
      return `${zoomFactor * width}% ${zoomFactor * height}%`;
    return `0`;
  };

  return (
    <>
      <Typography variant="subtitle1" component="h6">
        {subtitle}
      </Typography>
      <Grid container justify="center" spacing={1}>
        {patches.map((meta) => (
          <Grid key={meta.method} item xs={4} md={2} ref={target}>
            <div
              style={{
                width: gridWidth - 10,
                height: gridWidth - 10,
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#878787',
                backgroundImage: `url("${meta.url}")`,
                backgroundPosition: calcBackgroundLocation(),
                backgroundSize: calcBackgroundSize(),
                borderWidth: mgBorderWidth,
              }}
            >
              <p style={{ backgroundColor: `rgba(255, 255, 255, 0.3)` }}>
                {meta.method}
              </p>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
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
