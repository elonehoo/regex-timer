# regex-timer

> Make a regular expression time out if it takes too long to execute

## Install

```bash
#npm
npm install @elonehoo/regex-timer
# yarn
yarn add @elonehoo/regex-timer
#pnpm
pnpm install @elonehoo/regex-timer
```

## Usage

```typescript
import { isMatch } from '@elonehoo/regex-timer'

console.log(isMatch(/\d+/, getUserInput(), { timeout: 1000 }))
```
