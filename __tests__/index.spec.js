const babel = require('@babel/core');
const plugin = require('..');

function transformFixture(fixture, options = {}) {
  const { code } = babel.transform(fixture, {
    plugins: [[plugin, options]],
  });

  return code;
}

it('transforms properties from destructured object to dot notation', () => {
  const code = `
    const { foo, bar } = myObject;
    console.log(foo);
    console.log(bar);
  `;

  const result = transformFixture(code, { name: 'myObject' });
  expect(result).toMatchSnapshot();
});

it('does not transform properties from different scope', () => {
  const code = `
    const { foo, bar, fiz } = myObject;

    function baz() {
      const { foo } = anotherObject;
      console.log(foo);
      console.log(fiz);

      const bar = anotherObject.bar;
      console.log(bar);
    }
  `;

  const result = transformFixture(code, { name: 'myObject' });
  expect(result).toMatchSnapshot();
});

it('does not transform code without name option', () => {
  const code = 'const { foo } = myObject';
  const result = transformFixture(code);

  expect(result).toMatchSnapshot();
});
