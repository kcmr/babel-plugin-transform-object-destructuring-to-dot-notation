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

function plugin() {
  return {
    name: 'transform-object-destructuring-to-dot-notation',

    visitor: {
      VariableDeclaration(path, { opts }) {
        if (!opts.objects || !opts.objects.length) {
          return;
        }

        const { objects } = opts;
        const declarations = path.get('declarations');

        for (const object of objects) {
          for (const decl of declarations) {
            if (isDestructuredObject(decl, object)) {
              renameIdentifiers(decl, decl.node.id.properties, object);
              path.remove();
            }
          }
        }
      },
    },
  };
}

module.exports = plugin;
