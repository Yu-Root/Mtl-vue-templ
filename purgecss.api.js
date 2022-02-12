const { PurgeCSS } = require('purgecss')

// 参考：https://purgecss.com/api.html
// Reference：https://purgecss.com/api.html
async function runPurgeCSS() {
  const purgeCSSResults = await new PurgeCSS().purge({
    content: ['src/components/**/*.vue', 'src/pages/*.vue'],
    css: ['src/components/**/*.css', 'src/pages/**/*.css'],
    whitelist: ['html', 'body', 'root'],
    whitelistPatterns: [/html$|body$|root$|btn|loading/],
    whitelistPatternsChildren: [/html$|body$|root$|loading/],
    keyframes: true,
    rejected: true,
  })
  console.log('===== Start =====')

  purgeCSSResults.map((p, index) => {
    console.log(`unuse class path: ${p.file}`)
    console.log(`unuse class: ${p.rejected !== '' ? p.rejected : 'None'}`)
    if (index !== purgeCSSResults.length - 1) {
      console.log('===== Next ======')
    }
  })

  console.log('===== End ======')
}

runPurgeCSS()
