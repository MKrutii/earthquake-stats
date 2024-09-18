import path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import EarthquakeType from './EarthquakeType'
import DateType from './DateType'

export function loadTypes() {
  const typesArray = loadFilesSync(path.join(__dirname, '.'), {
    extensions: ['graphql'],
    recursive: true
  })

  return mergeTypeDefs(typesArray)
}

export default mergeTypeDefs([
  DateType,
  EarthquakeType,
])
