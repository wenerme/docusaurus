/* eslint-disable no-param-reassign,header/header */
const visit = require('unist-util-visit');
const url = require('url');

function baseUrlPlugin({baseUrl}) {
  if (!baseUrl) {
    throw Error('Missing required "baseUrl" option');
  }

  function visitor(node) {
    if (typeof node.url === 'string' && !/^(#|https?:[/]+)/.test(node.url)) {
      node.url = url.resolve(baseUrl, node.url);
    }
  }

  function transform(tree) {
    visit(tree, ['link', 'linkReference', 'image'], visitor);
  }

  return transform;
}

module.exports = async function({data}) {
  let plugins = [];
  if (data.baseUrl) {
    plugins = [...plugins, [baseUrlPlugin, {baseUrl: data.baseUrl}]];
  }
  return plugins;
};
