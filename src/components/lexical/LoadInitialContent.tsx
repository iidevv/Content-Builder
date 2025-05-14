import { useEffect, useRef } from 'react'
import { $generateNodesFromDOM } from '@lexical/html'
import { $getRoot, $isElementNode, $isDecoratorNode } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function LoadInitialContent({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext()
  const initialized = useRef(false)

  useEffect(() => {
    if (!html || initialized.current) return
    initialized.current = true

    editor.update(() => {
      const parser = new DOMParser()
      const dom = parser.parseFromString(html, 'text/html')

      const nodes = $generateNodesFromDOM(editor, dom)
      const root = $getRoot()
      root.clear()

      nodes.forEach((node) => {
        if ($isElementNode(node) || $isDecoratorNode(node)) {
          root.append(node)
        }
      })
    })
  }, [editor, html])

  return null
}

export default LoadInitialContent
