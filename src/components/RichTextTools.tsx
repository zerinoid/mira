import { type Editor } from "@tiptap/react";
import { FC } from "react";
import { Toggle } from "./ui/toggle";
import { Bold, Italic } from "lucide-react";

type Props = {
  editor: Editor | null;
};

const RichTextTools: FC<Props> = ({ editor }) => {
  if (!editor) {
    return;
  }
  return (
    <div className="bg-background border border-input rounded-md w-fit">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default RichTextTools;
