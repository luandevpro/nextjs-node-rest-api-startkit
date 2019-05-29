import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { setAuthToken } from './setAuthToken';

const jwtDecode = require('jwt-decode');

let globalUser = null;
let globalToken = null;

function withAuth(BaseComponent, { loginRequired = true, logoutRequired = false } = {}) {
  class App extends React.Component {
    static propTypes = {
      user: PropTypes.shape({
        id: PropTypes.string,
        isAdmin: PropTypes.bool,
      }),
      isFromServer: PropTypes.bool.isRequired,
      token: PropTypes.string, // eslint-disable-line
    };

    static defaultProps = {
      user: null,
    };

    componentDidMount() {
      const { user, token, isFromServer } = this.props;
      if (isFromServer) {
        globalUser = user;
        globalToken = token;
        setAuthToken(token);
      }
      if (loginRequired && !logoutRequired && !user) {
        Router.push('/login');
      }
      if (logoutRequired && user) {
        Router.push('/');
      }
    }

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req;
      const user =
        ctx.req && ctx.req.signedCookies.token
          ? jwtDecode(ctx.req.signedCookies.token)
          : globalUser;

      const token =
        ctx.req && ctx.req.signedCookies.token ? ctx.req.signedCookies.token : globalToken;

      const props = { user, token, isFromServer };

      if (token) {
        setAuthToken(token);
      }
      if (!token && ctx && ctx.pathname === '/profile') {
        ctx.res.writeHead(302, { Location: `/` });
        ctx.res.end();
      }
      if (BaseComponent.getInitialProps) {
        Object.assign(props, (await BaseComponent.getInitialProps(ctx)) || {});
      }

      return props;
    }

    render() {
      const { user } = this.props;

      if (loginRequired && !logoutRequired && !user) {
        return null;
      }

      if (logoutRequired && user) {
        return null;
      }

      return <BaseComponent {...this.props} />;
    }
  }

  return App;
}

export default withAuth;
