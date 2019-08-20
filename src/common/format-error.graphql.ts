import { GraphQLFormattedError, GraphQLError } from "graphql";

export const formatError = (error: GraphQLError): GraphQLFormattedError => {
  console.log(error);
  return <GraphQLFormattedError>({
    message: error.message,
    path: error.path,
  })
}