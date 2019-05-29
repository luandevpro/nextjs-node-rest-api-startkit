import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import withLayout from '../lib/withLayout';
import withAuth from '../lib/withAuth';

const Index = () => (
  <Grid
    container
    justify="center"
    alignItems="center"
    spacing={0}
    alignContent="center"
    style={{ minHeight: '100vh' }}
  >
    <Grid item xs={3} />
    <Grid item xs={6}>
      <Link href="/auth/google">
        <a style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" fullWidth>
            Signin with Google
          </Button>
        </a>
      </Link>
    </Grid>
    <Grid item xs={3} />
    <Grid item xs={3} style={{ marginTop: '100px' }} />
    <Grid item xs={6}>
      <Button variant="contained" fullWidth>
        Signin with Facebook
      </Button>
    </Grid>
    <Grid item xs={3} />
  </Grid>
);

export default withAuth(withLayout(Index), { logoutRequired: true });
