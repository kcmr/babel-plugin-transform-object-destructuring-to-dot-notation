[![Build Status](https://travis-ci.com/kcmr/babel-plugin-transform-object-destructuring-to-dot-notation.svg?branch=master)](https://travis-ci.com/kcmr/babel-plugin-transform-object-destructuring-to-dot-notation)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![codecov](https://codecov.io/gh/kcmr/babel-plugin-transform-object-destructuring-to-dot-notation/branch/master/graph/badge.svg)](https://codecov.io/gh/kcmr/babel-plugin-transform-object-destructuring-to-dot-notation)
![Dependency status](https://img.shields.io/david/kcmr/babel-plugin-transform-object-destructuring-to-dot-notation.svg)

[![NPM](https://nodei.co/npm/babel-plugin-transform-object-destructuring-to-dot-notation.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/babel-plugin-transform-object-destructuring-to-dot-notation/)

# babel-plugin-transform-object-destructuring-to-dot-notation

Replaces identifiers from a destructured object by the corresponding object dot notation.   

**Input:**

```js
const { a, b, c } = myObject;

console.log(a, b, c);
```

**Output:**

```js
console.log(myObject.a, myObject.b, myObject.c);
```

## Install 

```
npm i babel-plugin-transform-object-destructuring-to-dot-notation
```

## Usage 

### With a configuration file (`.babelrc`)

```json
{
  "plugins": [
    ["babel-plugin-transform-object-destructuring-to-dot-notation", {
      "name": "myObject"
    }]
  ]
}
```

### Via Node API

```js
require('@babel/core').transform('code', {
  plugins: ['babel-plugin-transform-object-destructuring-to-dot-notation', {
    name: 'myObject'
  }],
});
```

## License

This project is licensed under the [MIT License](LICENSE).
