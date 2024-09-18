import React, { PropsWithChildren, useContext, useMemo } from 'react'

import { useQuery } from '@apollo/client'
import { GET_EARTHQUAKES_QUERY } from '@/graphql/earthquake'
import { Earthquake } from '@/types/earthquake'

interface EarthquakeDataProviderValue {
  isLoading: boolean
  hasError: boolean
  earthquakes: Array<Earthquake>
}

const defaultValue: EarthquakeDataProviderValue = {
  isLoading: false,
  hasError: false,
  earthquakes: [],
}

const EarthquakeDataContext: React.Context<EarthquakeDataProviderValue> = React.createContext(defaultValue)
export const useEarthquakeData: () => EarthquakeDataProviderValue = () => useContext(EarthquakeDataContext)

export default function EarthquakeDataProvider({ children }: PropsWithChildren) {
  const { loading, data, error } = useQuery(GET_EARTHQUAKES_QUERY, {
    errorPolicy: 'all',
    onError: (err) => {
      console.error(err)
    },
  })

  const providerValue: EarthquakeDataProviderValue = useMemo(() => ({
    isLoading: loading,
    hasError: !!error,
    earthquakes: data?.earthquakes ?? [],
  }), [loading, data, error])

  return (
    <EarthquakeDataContext.Provider value={providerValue}>
      {children}
    </EarthquakeDataContext.Provider>
  )
}
