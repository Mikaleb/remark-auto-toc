/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
export const toc = {
  index: undefined,
  endIndex: undefined,
  map: {
    type: 'list',
    ordered: false,
    spread: true,
    children: [
      {
        type: 'listItem',
        spread: true,
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'link',
                title: null,
                url: '#hi-1',
                children: [
                  {
                    type: 'text',
                    value: 'Hi 1'
                  }
                ]
              }
            ]
          },
          {
            type: 'list',
            ordered: false,
            spread: true,
            children: [
              {
                type: 'listItem',
                spread: true,
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'link',
                        title: null,
                        url: '#sub-level-2',
                        children: [
                          {
                            type: 'text',
                            value: 'Sub level 2'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'list',
                    ordered: false,
                    spread: false,
                    children: [
                      {
                        type: 'listItem',
                        spread: false,
                        children: [
                          {
                            type: 'paragraph',
                            children: [
                              {
                                type: 'link',
                                title: null,
                                url: '#test-3',
                                children: [
                                  {
                                    type: 'text',
                                    value: 'Test 3'
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
function _createMdxContent(props) {
  const _components = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    ...props.components
  }
  return (
    <>
      <_components.h1>{'Hi 1'}</_components.h1>
      {'\n'}
      <_components.p>{'I have some text'}</_components.p>
      {'\n'}
      <_components.h2>{'Sub level 2'}</_components.h2>
      {'\n'}
      <_components.p>{'Test'}</_components.p>
      {'\n'}
      <_components.h3>{'Test 3'}</_components.h3>
    </>
  )
}
export default function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {}
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  )
}
