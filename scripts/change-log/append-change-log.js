const getChangeLogContent = () => {
  const version = require('../../lerna.json').version;

  let commit = '';
  const commits = [];
  let newItem = false;

  process.argv.forEach((arg, index) => {
    if (index > 1) {
      if (arg === ',') {
        if (commit) {
          commits.push(commit.trim());
        }
        commit = '';
        newItem = true;
      }
      if (newItem && arg !== ',') {
        commit += ` ${arg}`;
      }
    }
  });

  const refinedCommits = commits.map((item) => `- ${item}`);
  const date = new Date();
  const template = `
${`v${version}: ${date.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}`}

${refinedCommits.map((commit) => `${commit}\n`).join('')}
`;

  return template;
};

(async () => {
  const fs = require('fs');

  try {
    const fileContent = await fs.readFileSync('./CHANGELOG.md');
    const openedFile = await fs.openSync('./CHANGELOG.md', 'w+');
    const buffer = new Buffer(getChangeLogContent());

    await fs.writeSync(openedFile, buffer, 0, buffer.length, 0);
    await fs.writeSync(
      openedFile,
      fileContent,
      0,
      fileContent.length,
      buffer.length
    );

    console.log('CHANGELOG updated successfully!');

    await fs.closeSync(openedFile);
  } catch (err) {
    console.log('Error ', err);
  }
})();
