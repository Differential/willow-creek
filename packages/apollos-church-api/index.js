import server from './src';

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
