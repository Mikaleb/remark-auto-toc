import { name as isIdentifierName } from 'estree-util-is-identifier-name'
import { valueToEstree } from 'estree-util-value-to-estree'
import { type Root } from 'mdast'
import { toc } from 'mdast-util-toc'
import { Plugin } from 'unified'
import { Test } from 'unist-util-is'
import { MdxjsEsm } from 'mdast-util-mdx'

type Options = {
  name: string
  heading: string
  maxDepth: number
  skip?: string
  parents: Test | Array<Test> | 'tree' | undefined
  tight: boolean
  ordered: boolean
  prefix?: string
}

export interface RemarkMdxTocOptions {
  /**
   * If specified, the YAML data is exported using this name. Otherwise, each
   * object key will be used as an export name.
   */
  name?: string
  options?: Options
}

/**
 * A remark plugin to expose toc data as named exports.
 *
 * @param options Optional options to configure the output.
 * @returns A unified transformer.
 */
const remarkMdxToc: Plugin<[RemarkMdxTocOptions?], Root> = ({ name = 'toc', options } = {}) => {
  return (ast: Root) => {
    let identifier = name ?? 'toc'
    if (!isIdentifierName(identifier)) {
      throw new Error(`Name should be a valid identifier, got: ${JSON.stringify(identifier)}`)
    }

    const walkedToc = toc(ast)
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
                      name
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
}

export default remarkMdxToc
