# showcar-gulp

Shared build steps for projects using the ShowCar UI Library

```js
// gulpfile.js

const gulp = require('gulp');
const scgulp = require('showcar-gulp')(gulp);

scgulp.registerTasks({
    scss: {
        type: 'scss',
        entry: 'src/main.scss',
        out: 'dist/showcar.min.css',
        watch: 'src/**/*.scss'
    },
    'scss:docs': {
        type: 'scss',
        entry: 'src/docs/docs.scss',
        out: 'dist/docs.min.css',
        watch: 'src/**/*.scss'
    },
    stylelint: {
        type: 'stylelint',
        files: 'src/**/*.scss',
        watch: 'src/**/*.scss'
    },
    clean: {
        type: 'clean',
        files: ['dist/**/*']
    },
    serve: {
        type: 'serve',
        dir: 'dist',
    }
});
```
