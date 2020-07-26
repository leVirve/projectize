import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(87deg, #FE6B8B 30%, #FF8E63 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

interface Props {
  text: string;
  link: string;
}

export default function CustomButton(props: Props): React.ReactElement<Props> {
  const classes = useStyles();
  const { text, link } = props;

  return (
    <Button className={classes.root} href={link}>
      {text}
    </Button>
  );
}
