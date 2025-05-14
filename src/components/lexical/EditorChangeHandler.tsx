import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { $generateHtmlFromNodes } from '@lexical/html'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function EditorChangeHandler({ onChange }: { onChange: (html: string) => void }) {
  const [editor] = useLexicalComposerContext()
  return (
    <OnChangePlugin
      onChange={() => {
        editor.update(() => {
          const html = $generateHtmlFromNodes(editor)
          onChange(html)
        })
      }}
    />
  )
}
export default EditorChangeHandler
