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

const variableDeclaratorVisitor = {
  VariableDeclarator(path, { object }) {
    if (isDestructuredObject(path, object)) {
      renameIdentifiers(path, path.node.id.properties, object);

      path.remove();
    }
  },
};

function plugin() {
  return {
    name: 'transform-object-destructuring-to-dot-notation',

    visitor: {
      VariableDeclaration(path, { opts }) {
        const { objects } = opts;

        if (!objects || !objects.length) {
          return;
        }

        for (const object of objects) {
          path.traverse(variableDeclaratorVisitor, { object });
        }
      },
    },
  };
}

module.exports = plugin;
