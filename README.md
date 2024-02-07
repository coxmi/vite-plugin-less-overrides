
# vite-plugin-less-overrides

This plugin appends mixins and variable definitions to all imported css files, in order to overwrite any third party variables. Takes a relative string, glob, or array in the form `less(paths: string|string[])`

# How it works

For each file found by the glob, an import definition is added to the bottom of each .less file using the [reference](https://lesscss.org/features/#import-atrules-feature-reference) import option:

`@import (reference) "path/to/variables.less"`

This only includes @at rules, variables and mixins.


### Using vite:

```js
import less from 'vite-plugin-less-overrides'

defineConfig({
    plugins: [
        less('./src/**/variables.less'),
    ]
})
```

