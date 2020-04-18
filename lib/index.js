function isDestructuredObject(path, name) {
  return (
    path.get('id').isObjectPattern() && path.get('init').isIdentifier({ name })
  );
}

function renameIdentifiers(path, identifiers, name) {
  for (const identifier of identifiers) {
    path.scope.rename(
      identifier.value.name,
      `${name}.${identifier.value.name}`,
    );
  }
}

function plugin(babel) {
  return {
    name: 'transform-object-destructuring-to-dot-notation',

    visitor: {
      VariableDeclarator(path, { opts }) {
        if (!opts.name) {
          return;
        }

        if (isDestructuredObject(path, opts.name)) {
          renameIdentifiers(path, path.node.id.properties, opts.name);

          path.remove();
        }
      },
    },
  };
}

module.exports = plugin;
