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

Runs karma tests

```js
jstest: {
    type: 'js',
    entry: 'src/main.spec.js',
    out: 'dist/main.min.spec.js',
    watch: ['test-src/**/*.js', 'js-src/**/*.js'],
},

karma: {
    dependencies: ['jstest'],
    files: ['dist/index.spec.js']
}
```

### Cross-browser testing on saucelabs

Please note, running tests on saucelabs requires `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` env variables to be set correctly.

```js
karma: {
    dependencies: ['jstest'],
    files: ['dist/index.spec.js'],
    sauceLabs: {
        startConnect: true
        // all available options are here: https://github.com/karma-runner/karma-sauce-launcher
    }
}
```

## Usage example

This is a working example, that shows all posible build tasks

```js
const gulp = require('gulp');
const scgulp = require('showcar-gulp')(gulp);

scgulp.registerTasks({
    js: {
        entry: 'src/main.entry.js',
        out: 'dist/main.min.js',
        watch: 'src/**/*.js',
        rollupConfig: {
            format: 'iife',
            moduleName: 'yourModuleName'
        }
    },
    scss: {
        entry: 'src/main.scss',
        out: 'dist/main.min.css',
        watch: 'src/**/*.scss'
    },
    clean: {
        path: ['dist/**/*']
    },
    serve: {
        dir: 'dist',
    },
    jstest: {
        type: 'js',
        entry: 'src/main.spec.js',
        out: 'dist/main.min.spec.js',
        watch: ['test-src/**/*.js', 'js-src/**/*.js'],
    },
    karma: {
        dependencies: ['jstest'],
        files: ['dist/main.min.spec.js'],
    }
});

gulp.task('set-dev', () => {
    scgulp.config.devmode = true;
});

gulp.task('build', ['js', 'scss']);

gulp.task('dev', ['set-dev', 'js:watch', 'jstest:watch', 'karma', 'scss:watch', 'serve']);

```

## Compatibility with Grunt (?)

```
npm install gulp-grunt -D
...
```
