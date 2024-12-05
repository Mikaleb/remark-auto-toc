# remark-mdx-toc

[![ci](https://github.com/Mikaleb/remark-mdx-toc/actions/workflows/ci.yaml/badge.svg)](https://github.com/Mikaleb/remark-mdx-toc/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/remcohaszing/remark-mdx-toc/branch/main/graph/badge.svg)](https://codecov.io/gh/remcohaszing/remark-mdx-toc)
[![npm version](https://img.shields.io/npm/v/remark-mdx-toc)](https://www.npmjs.com/package/remark-mdx-toc)
[![npm downloads](https://img.shields.io/npm/dm/remark-mdx-toc)](https://www.npmjs.com/package/remark-mdx-toc)

A [remark](https://remark.js.org) plugin for converting toc metadata into MDX exports

## Table of Contents

- [remark-mdx-toc](#remark-mdx-toc)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API](#api)
    - [Options](#options)
  - [Compatibility](#compatibility)
  - [License](#license)

## Installation

This package depends on the AST output by [remark-toc](https://github.com/remarkjs/remark-toc)

```sh
npm install remark-toc remark-mdx-toc
```

## Usage

This remark plugin takes toc content, and outputs it as JavaScript exports. Both YAML and TOML toc
data are supported.

For example, given a file named `example.mdx` with the following contents:

```mdx
---
hello: toc
---

Rest of document
```

The following script:

```js
import { readFile } from 'node:fs/promises'

import { compile } from '@mdx-js/mdx'
import remarkMdxToc from 'remark-mdx-toc'

const { value } = await compile(await readFile('example.mdx'), {
  jsx: true,
  remarkPlugins: [remarkMdxToc]
})
console.log(value)
```

Roughly yields:

```jsx
export const toc = {
  hello: 'toc'
}

export default function MDXContent() {
  return <p>Rest of document</p>
}
```

## API

The default export is a [remark](https://remark.js.org) plugin.

### Options

- `name`: The identifier name of the variable the toc data is assigned to. (Default: `toc`).
- `parsers`: A mapping A mapping of node types to parsers. Each key represents a toc node type. The
  value is a function that accepts the toc data as a string, and returns the parsed data. By default
  `yaml` nodes will be parsed using [`yaml`](https://github.com/eemeli/yaml) and `toml` nodes using
  [`toml`](https://github.com/BinaryMuse/toml-node).

## Compatibility

This project is compatible with Node.js 18 or greater.

## License

[MIT](LICENSE.md) © [Remco Haszing](https://github.com/remcohaszing)
