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
    eslint: {
        files: 'src/**/*.js'
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
    js: {
        dependencies: ['eslint'],
        entry: 'src/main.js',
        out: 'dist/showcar.min.js',
        watch: 'src/**/*.js',
        rollupConfig: {
            moduleName: 'yourModuleName',
            format: 'iife'
        }
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

For running linter tasks you will also need to create a configuration files

for eslint `.eslintrc.js`

```js
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "worker": true,
        "mocha": true,
        "jasmine": true,
        "jquery": true,
        "serviceworker": true
    },
    "globals": {
        "expect": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
           "error",
           "single",
           { "allowTemplateLiterals": true }
       ],
       "no-console": "warn",
        "semi": [
            "error",
            "always"
        ]
    }
};
```

for stylelint `stylelint.config.js`

```js
module.exports = {
  "rules": {
    "max-empty-lines": 2,
    "indentation": 2,
    "length-zero-no-unit": true,
    "no-duplicate-selectors": true,
    "string-quotes": "single"
  }
};
```

## Compatibility with Grunt

```
npm install gulp-grunt -D
...
```
