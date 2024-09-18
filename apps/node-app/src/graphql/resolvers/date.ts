import { GraphQLScalarType, Kind } from 'graphql'

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom scalar type for Date',
    parseValue(value: Date) {
      return new Date(value)
    },
    serialize(value: Date) {
      return value instanceof Date ? value.toISOString() : null
    },
    parseLiteral(ast) {
      return ast.kind === Kind.STRING ? new Date(ast.value) : null
    },
  }),
}
