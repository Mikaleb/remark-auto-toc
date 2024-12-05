import { name as isIdentifierName } from 'estree-util-is-identifier-name'
import { valueToEstree } from 'estree-util-value-to-estree'
import { type Root } from 'mdast'
import { type MdxjsEsm } from 'mdast-util-mdx'
import { type Options, toc } from 'mdast-util-toc'
import { type Plugin } from 'unified'

export interface RemarkMdxTocOptions {
  /**
   * If specified, the YAML data is exported using this name. Otherwise, each
   * object key will be used as an export name.
   */
  name?: string

  /**
   * Options
   */
  options?: Options
}

/**
 * A remark plugin to expose toc data as named exports.
 *
 * @param options Optional options to configure the output.
 * @returns A unified transformer.
 */
const remarkMdxToc: Plugin<[RemarkMdxTocOptions?], Root> =
  ({ name = 'toc', options } = {}) =>
  (ast: Root) => {
    const identifier = isIdentifierName(name) ? name : 'toc'

    const walkedToc = options ? toc(ast, options) : toc(ast)
    // Export in MDX
    const tocExport: MdxjsEsm = {
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              specifiers: [],
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: {
                      type: 'Identifier',
                      name: identifier
                    },
                    init: valueToEstree(walkedToc, { preserveReferences: true })
                  }
                ]
              }
            }
          ]
        }
      }
    }
    ast.children.unshift(tocExport)
  }

export default remarkMdxToc
