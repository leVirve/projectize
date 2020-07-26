import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(6, 0),
  },
}));

interface Props {
  authorName: string;
  githubPage: string;
}

export default function Footer(props: Props): React.ReactElement<Props> {
  const classes = useStyles();
  const { authorName, githubPage } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href={githubPage}>
            {authorName}
          </Link>
          {' , Template © '}
          <Link color="inherit" href="https://github.com/leVirve">
            Hung-Jin Lin
          </Link>{' '}
          {new Date().getFullYear()}.
        </Typography>
      </Container>
    </footer>
  );
}
