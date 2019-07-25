/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const DEFAULT_OPTIONS = {
    // Some defaults.
};
// A JavaScript function that returns an object.
// `context` is provided by Docusaurus. Example: siteConfig can be accessed from context.
// `opts` is the user-defined options.
module.exports = function (context, opts) {
    // Merge defaults with user-defined options.
    const options = { ...DEFAULT_OPTIONS, ...opts };
    console.log('Options',options)
    return {
        // A compulsory field used as the namespace for directories to cache
        // the intermediate data for each plugin.
        // If you're writing your own local plugin, you will want it to
        // be unique in order not to potentially conflict with imported plugins.
        // A good way will be to add your own project name within.
        name: 'docusaurus-wenerme',
        async loadContent() {
            // The loadContent hook is executed after siteConfig and env has been loaded
            // You can return a JavaScript object that will be passed to contentLoaded hook
        },
        async contentLoaded({ content, actions }) {
            // contentLoaded hook is done after loadContent hook is done
            // actions are set of functional API provided by Docusaurus. e.g: addRoute
            if (!content) {
                return;
            }

            const { blogPosts } = content;
            blogPosts.map(v => {
                console.log(`Load ${v.id} - ${v.metadata.id}`)
                if (v.id !== v.metadata.id && v.metadata.id) {
                    v.id = v.metadata.id;
                }
            })
        },
        async postBuild(props) {
            // after docusaurus <build> finish
        },
        // TODO
        async postStart(props) {
            // docusaurus <start> finish
        },
        // TODO
        afterDevServer(app, server) {
            // https://webpack.js.org/configuration/dev-server/#devserverbefore
        },
        // TODO
        beforeDevServer(app, server) {
            // https://webpack.js.org/configuration/dev-server/#devserverafter
        },
        configureWebpack(config, isServer) {
            // Modify internal webpack config. If returned value is an Object, it
            // will be merged into the final config using webpack-merge;
            // If the returned value is a function, it will receive the config as the 1st argument and an isServer flag as the 2nd argument.
        },
        getPathsToWatch() {
            // Path to watch
        },
        getThemePath() {
            // Returns the path to the directory where the theme components can
            // be found.
        },
        getClientModules() {
            // Return an array of paths to the modules that are to be imported
            // in the client bundle. These modules are imported globally before
            // React even renders the initial UI.
        },
    };
};