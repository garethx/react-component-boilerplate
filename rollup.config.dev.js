import config from './rollup.config'
import liveServer from 'rollup-plugin-live-server'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

// Find the output that matches what the main build
const output = config.output.filter(o => o.file === pkg.main)[0]

config.input = 'dev/index.js'
output.file = 'dev/build/bundle.js'
output.sourcemap = true

// Plugin manipulation
config.plugins.unshift(resolve())
config.plugins.unshift(
  external({
    includeDependencies: true
  })
)
config.plugins.push(
    liveServer({
      port: 9090,
      host: '0.0.0.0',
      root: 'dev',
      mount: [
        ['/node_modules', './node_modules']
      ],
      open: false,
      wait: 500
    })
)

// Remove terser
config.plugins = config.plugins.filter(({name}) => name !== 'terser')

export default config
