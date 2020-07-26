import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  authorRoot: {
    flexGrow: 1,
  },
  affiliationRoot: {
    flexGrow: 1,
    padding: theme.spacing(0, 0, 6),
  },
}));

interface Author {
  url: string;
  name: string;
  affiliation: string;
}
interface Affiliation {
  name: string;
  number: string;
}
interface Props {
  authors: Author[];
  affiliations: Affiliation[];
}

export default function Author(props: Props): React.ReactElement<Props> {
  const classes = useStyles();
  const { authors, affiliations } = props;

  return (
    <>
      <Grid
        container
        justify="center"
        className={classes.authorRoot}
        spacing={2}
      >
        {authors.map((author, index) => (
          <Grid item key={author.name}>
            <Typography component="h3" variant="h6">
              <Link href={author.url}>{author.name}</Link>
              <sup>{author.affiliation}</sup>
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        justify="center"
        className={classes.affiliationRoot}
        spacing={2}
      >
        {affiliations.map((affiliation, index) => (
          <Grid item key={affiliation.name}>
            <Typography component="h4" variant="h6">
              {affiliation.name}
              <sup>{affiliation.number}</sup>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
