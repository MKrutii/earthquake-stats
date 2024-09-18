import { mergeResolvers,  } from '@graphql-tools/merge'
import earthquakes from './earthquakes'
import date from './date'

export default mergeResolvers([
  earthquakes,
  date
])
