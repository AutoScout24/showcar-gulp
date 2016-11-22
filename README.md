# showcar-gulp

Shared build steps for projects using the ShowCar UI Library

## Install
```
npm install showcar-gulp -D
```

## Usage

Create your own `gulpfile.js`.

```js
// gulpfile.js

const gulp = require('gulp');
const scgulp = require('showcar-gulp')(gulp);

scgulp.registerTasks({
    clean: {
        files: ['dist/**/*']
    },
    stylelint: {
        files: 'src/**/*.scss',
    },
    scss: {
        dependencies: ['stylelint'],
        entry: 'src/main.scss',
        out: 'dist/showcar.min.css',
        watch: 'src/**/*.scss'
    },
    'scss:docs': {
        dependencies: ['stylelint'],
        type: 'scss',
        entry: 'src/docs/docs.scss',
        out: 'dist/docs.min.css',
        watch: 'src/**/*.scss'
    },
    eslint: {
        files: 'src/**/*.js'
    },
    js: {
        dependencies: ['eslint'],
        entry: 'src/main.js',
        out: 'dist/showcar.min.js',
        watch: 'src/**/*.js'
    },
    serve: {
        dir: 'dist',
    }
});

gulp.task('set-dev', () => {
    scgulp.config.devmode = true;
});

gulp.task('build', [
    'scss',
    'js'
]);

gulp.task('dev', ['set-dev', 'scss:watch', 'js:watch', 'serve']);
gulp.task('default', ['build']);
```

## Compatibility with Grunt

```
npm install gulp-grunt -D
...
```
