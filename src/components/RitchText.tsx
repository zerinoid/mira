import { FC } from 'react'
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  type Editor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import RichTextTools from './RichTextTools'
import { cn } from '@/lib/utils'

type Props = {
  value: string
  onChange: (richText: string) => void
  className?: string
}

const RichText: FC<Props> = ({ value, onChange, className }) => {
  const resultClass = cn(
    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
    className
  )

  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: value,
    editorProps: {
      attributes: {
        class: resultClass
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    }
  })
  return (
    <>
      <BubbleMenu editor={editor as Editor | undefined}>
        <RichTextTools editor={editor} />
      </BubbleMenu>
      <EditorContent editor={editor} />
    </>
  )
}

export default RichText
