# showcar-gulp

Shared build steps for projects using the ShowCar UI Library

```js
// gulpfile.js

const gulp = require('gulp');
const scgulp = require('showcar-gulp')(gulp);

scgulp.registerTasks({
    js: {
        // name: 'custom-js',
        entry: 'test/js-src/main.entry.js',
        out: 'test/dist/main.min.js',
        watch: 'test/js-src/**/*.js'
    },
    scss: {
        entry: 'test/scss-src/main.scss',
        out: 'test/dist/main.min.css',
        watch: 'test/scss-src/**/*.scss'
    }
});

gulp.task('build', ['custom-js', 'scss']);
```
