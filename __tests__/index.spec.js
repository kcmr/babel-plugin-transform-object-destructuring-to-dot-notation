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

  const result = transformFixture(code, { objects: ['myObject'] });
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

  const result = transformFixture(code, { objects: ['myObject'] });
  expect(result).toMatchSnapshot();
});

it('transforms properties from multiple objects', () => {
  const code = `
    const { foo } = objOne;
    console.log(foo);

    const { bar } = objTwo;
    console.log(bar);
  `;

  const result = transformFixture(code, { objects: ['objOne', 'objTwo'] });
  expect(result).toMatchSnapshot();
});

it('does not transform code without objects option', () => {
  const code = 'const { foo } = myObject';
  const result = transformFixture(code);

  expect(result).toMatchSnapshot();
});
