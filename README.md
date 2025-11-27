# vitest Styled Components

> **Note:** This is a fork of [jest-styled-components](https://github.com/styled-components/jest-styled-components) that has been adapted to work with [vitest](https://github.com/vitest-dev/vitest).

A set of utilities for testing [Styled Components](https://github.com/styled-components/styled-components) with [vitest](https://github.com/vitest-dev/vitest).
This package improves the snapshot testing experience and provides a brand new matcher to make expectations on the style rules.

# Quick Start

## Installation

```sh
yarn add --dev @mirakl/vitest-styled-components
```

## Usage

In your vitest setup file, you can add the following:

```ts
import { toHaveStyleRule, resetStyleSheet, styleSheetSerializer } from '@mirakl/vitest-styled-components';

beforeEach(() => {
  resetStyleSheet();
});

expect.addSnapshotSerializer(styleSheetSerializer);
expect.extend({ toHaveStyleRule });
```

## Development

### Building

```sh
yarn build
```

This will build the package for both CommonJS and ES Modules.

Check the build output with:

```sh
yarn verify-build
```
