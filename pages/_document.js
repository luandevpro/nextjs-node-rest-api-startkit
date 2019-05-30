import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { ServerStyleSheet } from 'styled-components';
import NextHead from 'next/head';
import getContext from '../lib/context';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="vi">
        <link rel="stylesheet" type="text/css" href="/static/css/nprogress.css" />
        <NextHead>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="icon" type="png" sizes="192x192" href="/static/icons/icon-192x192.png" />
          <link
            rel="apple-touch-icon"
            type="png"
            sizes="192x192"
            href="/static/icons/icon-192x192.png"
          />
          <link rel="icon" type="png" sizes="512x512" href="/static/icons/icon-512x512.png" />
          <link
            rel="apple-touch-icon"
            type="png"
            sizes="512x512"
            href="/static/icons/icon-512x512.png"
          />
          <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
          <meta name="theme-color" content="#fff" />
        </NextHead>
        <Head>{this.props.styleTags}</Head>
        <Head>{this.props.styleTagsStyled}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ({ renderPage }) => {
  const pageContext = getContext();
  const sheet = new ServerStyleSheets();
  const sheetStyled = new ServerStyleSheet();
  const page = renderPage((App) => (props) =>
    sheet.collect(<App pageContext={pageContext} {...props} />),
  );
  const styleTags = sheet.getStyleElement();
  const styleTagsStyled = sheetStyled.getStyleElement();
  return {
    ...page,
    pageContext,
    styleTags,
    styleTagsStyled,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: pageContext.sheetsRegistry.toString(),
        }}
      />
    ),
  };
};
