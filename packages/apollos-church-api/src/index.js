import server from './server';

export { testSchema } from './server'; // eslint-disable-line import/prefer-default-export

// Use the port, if provided.
const { PORT } = process.env;
const options = PORT ? { port: PORT } : {};

server.listen(options).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
