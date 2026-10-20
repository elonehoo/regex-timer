// TypeScript 7 publishes a native compiler and no JavaScript API.
// typescript-eslint still imports `typescript` and rejects 7.x; unbuild's
// rollup-plugin-dts needs the 5.9 compiler API. Drop those peer edges so the
// project's typescript@7 does not satisfy them, and install an API build instead.

const typescript6 = 'npm:@typescript/typescript6@6.0.2'
const typescript59 = '5.9.3'

const apiPackages = {
  '@typescript-eslint/eslint-plugin': typescript6,
  '@typescript-eslint/parser': typescript6,
  '@typescript-eslint/project-service': typescript6,
  '@typescript-eslint/tsconfig-utils': typescript6,
  '@typescript-eslint/type-utils': typescript6,
  '@typescript-eslint/typescript-estree': typescript6,
  '@typescript-eslint/utils': typescript6,
  'rollup-plugin-dts': typescript59,
  'unbuild': typescript59,
}

function readPackage(pkg) {
  const spec = apiPackages[pkg.name]
  if (!spec)
    return pkg

  pkg.dependencies = pkg.dependencies || {}
  pkg.dependencies.typescript = spec

  if (pkg.peerDependencies)
    delete pkg.peerDependencies.typescript
  if (pkg.peerDependenciesMeta)
    delete pkg.peerDependenciesMeta.typescript

  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
