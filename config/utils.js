const chokidar = require('chokidar')


/** Reload browser when changing Nunjucks files */
const watchFileChanges = (app, server) => chokidar
  .watch(['./src/*.njk', './src/njk/**/*.njk'])
  .on('change', () => server.sockWrite(server.sockets, 'content-changed'))


/**
 * Get thread-loader
 * @prams {string} name - name of a pool
 * @prams {number} [jobs=100] - number of jobs a poll distributes to a workers
 * @returns {object}
 */
const getThreadLoader = (name, jobs = 100) => ({
  loader: 'thread-loader',
  options: {
    workerParallelJobs: jobs,
    poolRespawn: false,
    name
  }
})


/**
 * Is webpack running in development mode?
 * @type {boolean}
 */
const isDevMode = process.env.NODE_ENV === 'development'


module.exports = { getThreadLoader, isDevMode, watchFileChanges }
