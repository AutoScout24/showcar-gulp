# showcar-gulp

Shared build steps for projects using the ShowCar UI Library

## Install
```
npm install showcar-gulp -D
```

## Before starting

Install gulp

```
npm install gulp -D
```

## Usage

Create your own `gulpfile.js` with the following structure

```js
// gulpfile.js

const gulp = require('gulp');
const scgulp = require('showcar-gulp')(gulp);

scgulp.registerTasks({
    // here goes the tasks configuration
});

// gulp tasks alliases
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

## Build tasks

JS
Builds and minimises and uglifies your js files

```js
js: {
    dependencies: ['eslint'],         // optional
    entry: 'src/main.js',
    out: 'dist/main.min.js',
    watch: 'src/**/*.js',
    rollupConfig: {
        moduleName: 'yourModuleName',
        format: 'iife'
    }
}
```

SCSS
Builds css from sass files and minimises it

```js
scss: {
    dependencies: ['stylelint'],      // optional
    entry: 'src/main.scss',
    out: 'dist/showcar.min.css',
    watch: 'src/**/*.scss'
}
```

## Linter tasks

Optional tasks for linting code style

```js
eslint: {
    files: 'src/**/*.js'
},

stylelint: {
    files: 'src/**/*.scss'
}
```

For running linter tasks you will also need to create a configuration files.
You could add custom rules to configuration files.

`.eslintrc.js` for eslint task

```js
module.exports = Object.assign(require('showcar-gulp/.eslintrc.js'), {
    // custom rules here
});
```

`stylelint.config.js` for stylelint task

```js
module.exports = Object.assign(require('showcar-gulp/.stylelintrc.js'), {
    // custom rules here
});
```

## Clean task
Simply cleans dist folder

```js
serve: {
    dir: 'dist'
}
```

## Serve task
Runs a local server on localhost:3000 by default

```js
clean: {
    files: ['dist/**/*']
}
```

## Karma task

TBU

## Compatibility with Grunt (?)

```
npm install gulp-grunt -D
...
```
