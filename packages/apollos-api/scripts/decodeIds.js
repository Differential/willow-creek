const { parseGlobalId } = require('@apollosproject/server-core');

console.log(process.argv[2]);

console.log(parseGlobalId(process.argv[2]));
