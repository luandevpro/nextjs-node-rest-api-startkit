import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from 'next/router';
import NProgress from 'nprogress';
import Header from '../components/Header';
import getContext from './context';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function withLayout(BaseComponent) {
  class App extends React.Component {
    constructor(props) {
      super(props);
      const { pageContext } = this.props;
      this.pageContext = pageContext || getContext();
    }

    componentDidMount() {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/service-worker.js', { scope: '/' })
            .then((registration) => {
              console.log('success');
            })
            .catch((registrationError) => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    }

    render() {
      return (
        <ThemeProvider theme={this.pageContext.theme}>
          <CssBaseline />
          <div>
            <Header {...this.props} />
            <BaseComponent {...this.props} />
          </div>
        </ThemeProvider>
      );
    }
  }
  App.getInitialProps = (ctx) => {
    if (BaseComponent.getInitialProps) {
      return BaseComponent.getInitialProps(ctx);
    }
    return {};
  };
  App.propTypes = {
   pageContext: PropTypes.object, // eslint-disable-line
  };

  App.defaultProps = {
    pageContext: null,
  };

  return App;
}

export default withLayout;
