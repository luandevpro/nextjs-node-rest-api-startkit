import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import withLayout from '../lib/withLayout';
import withAuth from '../lib/withAuth';

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150,
  },
});

const Profile = ({ profile }) => {
  const classes = useStyles();
  return (
    <div style={{ marginTop: '100px' }}>
      <Grid container justify="center" alignItems="center">
        <Avatar alt={profile.name} src={profile.avatar} className={classes.bigAvatar} />
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <h1>{profile.name}</h1>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Link href="/logout">
            <a>
              <Button>Logout</Button>
            </a>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

Profile.getInitialProps = async () => {
  const { data } = await axios.get('http://localhost:3000/auth/profile');
  return {
    profile: data,
  };
};

Profile.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default withAuth(withLayout(Profile));
