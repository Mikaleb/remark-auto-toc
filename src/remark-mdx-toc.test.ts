import { compile } from '@mdx-js/mdx'
//@ts-ignore
import remarkAutoToc from 'remark-auto-toc'
import { testFixturesDirectory } from 'snapshot-fixtures'

testFixturesDirectory({
  directory: new URL('../fixtures', import.meta.url),
  prettier: true,
  write: true,
  tests: {
    'expected.jsx'(file, options) {
      return compile(file, {
        remarkPlugins: [[remarkAutoToc, { name: 'toc', options }]],
        jsx: true
      })
    }
  }
})

// Test('toc generator', async () => {
//   const { value } = await compile('---\nfoo: bar\n---\n', {
//     remarkPlugins: [],
//     jsx: true
//   })

//   assertEqual(
//     String(value),
//     `/*@jsxRuntime automatic*/
// /*@jsxImportSource react*/
// export const toc = [
//   {
//     depth: 1,
//     value: 'Hi 1',
//     attributes: {},
//     children: [
//       {
//         depth: 2,
//         value: 'Sub level 2',
//         attributes: {},
//         children: [
//           {
//             depth: 3,
//             value: 'Test 3',
//             attributes: {},
//             children: []
//           }
//         ]
//       }
//     ]
//   }
// ]
// function _createMdxContent(props) {
//   const _components = {
//     h1: 'h1',
//     h2: 'h2',
//     h3: 'h3',
//     p: 'p',
//     ...props.components
//   }
//   return (
//     <>
//       <_components.h1>{'Hi 1'}</_components.h1>
//       {' '}
//       <_components.p>{'I have some text'}</_components.p>
//       {' '}
//       <_components.h2>{'Sub level 2'}</_components.h2>
//       {' '}
//       <_components.p>{'Test'}</_components.p>
//       {' '}
//       <_components.h3>{'Test 3'}</_components.h3>
//     </>
//   )
// }
// export default function MDXContent(props = {}) {
//   const {wrapper: MDXLayout} = props.components || ({});
//   return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
// }
// `
//   )
// })

// test('invalid name', () => {
//   assert.throws(
//     () =>
//       compileSync('---\n\n---\n', {
//         remarkPlugins: [[remarkMdxToc, { name: 'Not valid', options: {} }]],
//         jsx: true
//       }),
//     /Name should be a valid identifier, got: "Not valid"/
//   )
// })
