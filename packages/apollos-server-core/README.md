# `apollos-server-core`

## Usage

### Constructor Functions
All the following functions consume the same object as their only data structure. The object is structured as follows.
```
{
  [ModelName]: {
    dataSource: [An optional datasource],
    model: [An optional class to be put on the context],
    schema: [Schema for this model],
    resolver: [Resolvers for the schema],
  }
}
```

`createResolvers(data)` returns merged resolvers object to pass into `new ApolloServer...`

`createSchema(data)` returns merged schema array to pass into `new ApolloServer...`

`createContext(data, ?middleware)` constructs a context object, adding the `models` from `data` onto the context. Takes an optional middleware argument with the args `({ req, context })` that can be used to modify the context before it's passed into `new ApolloServer...`

`createDataSources(data)` returns instantiated data sources to pass into  `new ApolloServer...`

