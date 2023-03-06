import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const GA_TRACKING_ID = process.env.GA_TRACKING_ID;
  return (
    <Html lang="en">
      <Head />
      {/* Add the Google Tag Manager script */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
              `,
            }}
          ></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}