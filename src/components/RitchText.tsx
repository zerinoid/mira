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
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'

type Props = {
  value: string
  onChange: (richText: string) => void
  className?: string
  oneLine?: boolean
}

const RichText: FC<Props> = ({ value, onChange, className, oneLine }) => {
  const resultClass = cn(
    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
    className
  )

  const OneLiner = Document.extend({
    content: 'block'
  })

  const extensions = oneLine
    ? [OneLiner, Text, Paragraph, Bold, Italic]
    : [StarterKit.configure()]

  const editor = useEditor({
    extensions: extensions,
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
