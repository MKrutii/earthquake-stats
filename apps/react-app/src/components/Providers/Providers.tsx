import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import EarthquakeDataProvider from '@/components/Providers/EarthquakeDataProvider'
import { API_URL } from '@/config'

interface ProvidersType {
  children: React.ReactNode
}

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
})

export default function Providers({ children }: ProvidersType) {
  return (
    <ApolloProvider client={client}>
      <EarthquakeDataProvider>
        {children}
      </EarthquakeDataProvider>
    </ApolloProvider>
  )
}

