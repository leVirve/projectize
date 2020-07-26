import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { HashLink } from 'react-router-hash-link'; // TODO:

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundImage:
      'radial-gradient(circle, rgb(233, 148, 148) 0%, rgb(238, 174, 202) 100%)',
    color: '#fff',
    zIndex: 0,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'center',
    backgroundColor: '#fef1f3',
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
  id: string;
  sections: SectionItem[];
  title: string;
}

export default function Header(props: Props): React.ReactElement<Props> {
  const classes = useStyles();
  const { id, sections, title } = props;
  const preventDefault = (event: React.MouseEvent): void =>
    event.preventDefault();

  return (
    <div id={id}>
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
            component={HashLink}
            onClick={preventDefault}
            variant="subtitle2"
            color="inherit"
            noWrap
            smooth
            to={section.url}
            key={section.title}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </div>
  );
}
