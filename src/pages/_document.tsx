import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/apple-icon.png" />
          <link rel="manifest" href="/manifest.json" />

          <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
          <meta name="MobileOptimized" content="320" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="theme-color" content="#835AFD" />
          <meta name="msapplication-TileColor" content="#835AFD" />
          <meta name="referrer" content="no-referrer-when-downgrade" />
          <meta name="google" content="notranslate" />

          {/* Google fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
