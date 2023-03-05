import '@/styles/globals.css'
import type { AppProps } from 'next/app'
const CosmosClient = require('@azure/cosmos').CosmosClient

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}