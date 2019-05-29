import App, { Container } from 'next/app';
import AppContainer from '../components/AppContainer';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </Container>
    );
  }
}

export default MyApp;
