/* eslint-disable header/header */
const fetch = require('node-fetch');

/**
 * support import directive
 */
async function fetchImport(content, o) {
  const repo = o || {};
  const next = content.replace(/<!--\s*import\((.*?)\)\s*-->/g, (placeholder, url) => {
    if (repo[url]) {
      return repo[url];
    }
    repo[url] = null;
    return placeholder;
  });

  const more = Object.entries(repo).filter(([, v]) => v === null);
  if (more.length) {
    await Promise.all(more.map(async ([k]) => {
      console.time(`fetch ${k}`);
      repo[k] = (await (await fetch(k)).text());
      console.timeEnd(`fetch ${k}`);
    }));
    return fetchImport(next, repo);
  }
  return next;
}

module.exports = async function(input) {
  const {content} = input;
  return {...input, content: await fetchImport(content)};
};
