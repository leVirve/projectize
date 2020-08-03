import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GithubCorner from 'react-github-corner';
import Sticky from 'react-stickynode';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#003153',
    color: '#fff',
    zIndex: 0,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'center',
    backgroundColor: '#ddd',
    zIndex: 0,
    '& > a': {
      padding: theme.spacing(0, 5),
    },
    [theme.breakpoints.down('md')]: {
      '& > a': {
        padding: theme.spacing(0, 3),
      },
    },
    [theme.breakpoints.down('xs')]: {
      '& > a': {
        padding: theme.spacing(0, 1),
      },
    },
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

interface SectionItem {
  url: string;
  title: string;
}
interface Props {
  sections: SectionItem[];
  githubPage: string;
  title: string;
}

export default function Header(props: Props): React.ReactElement<Props> {
  const classes = useStyles();
  const { sections, title, githubPage } = props;

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={process.env.PUBLIC_URL + section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>

      {/* add github sticker */}
      {githubPage ? (
        <Sticky>
          <GithubCorner href={githubPage} />
        </Sticky>
      ) : (
        ''
      )}
    </>
  );
}
