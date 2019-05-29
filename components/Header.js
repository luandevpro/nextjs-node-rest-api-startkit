import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

function Header({ user }) {
  return (
    <ToolbarStyled>
      <Grid container justify="space-around" alignItems="center">
        <Grid item sm={10} xs={8} style={{ textAlign: 'left' }}>
          <Link prefetch href="/">
            <a>
              <LogoStyled>
                <TypographyStyled>Next Node Rest API Startkit</TypographyStyled>
              </LogoStyled>
            </a>
          </Link>
        </Grid>
        <Grid item sm={2} xs={4} style={{ textAlign: 'right' }}>
          {user ? (
            <Link prefetch href="/profile">
              <TypographyStyled>
                <a>{user.name}</a>
              </TypographyStyled>
            </Link>
          ) : (
            <Link prefetch href="/login">
              <TypographyStyled>
                <a style={{ margin: '0px 20px 0px auto' }}>Log in</a>
              </TypographyStyled>
            </Link>
          )}
        </Grid>
      </Grid>
    </ToolbarStyled>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
};

Header.defaultProps = {
  user: null,
};

const ToolbarStyled = styled(Toolbar)`
  && {
    background: #0c1213;
  }
`;

const TypographyStyled = styled(Typography)`
  && {
    color: ${(props) => props.theme.palette.primary.light};
    padding-left: 10px;
  }
`;

const LogoStyled = styled.div`
  display: flex;
`;
export default Header;
