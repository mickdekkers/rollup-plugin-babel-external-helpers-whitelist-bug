const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

const build = async () => {
  const bundle = await rollup.rollup({
    input: path.resolve(__dirname, '../src/foo.js'),
    plugins: [
      babel({
        exclude: 'node_modules/**',
        /* Set the `externalHelpersWhitelist` value
         * to an empty array or an array containing
         * an invalid helper name to cause the error
         * 
         * Try e.g. [`_typeof`] or []
         */
        externalHelpersWhitelist: ['typeof']
      })
    ]
  })

  const { code } = await bundle.generate({
    format: 'cjs'
  })

  fs.writeFileSync(path.resolve(__dirname, `../dist/foo.js`), code)
}

build()
