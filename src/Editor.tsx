import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useMemo } from "react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
import {faker} from "@faker-js/faker";

import { useLoaderData } from "react-router-dom";

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

const randomName = `${faker.name.fullName()}`;
const randomColor = faker.color.rgb();

interface EditorProps {
}

export const TextEditor = ({ }: EditorProps) => {
  const { documentName }: any = useLoaderData();
  const { classes: collaborationClasses } = useCollaborationStyles();

  const ydoc = useMemo(() => new Y.Doc(), [documentName]);

  const provider = useMemo(
    () =>
      new HocuspocusProvider({
        url: `ws://192.168.5.154:1234/collaboration/${documentName}`,
        name: documentName,
        document: ydoc
      }),
    [documentName]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false
      }),
      Link,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: { name: randomName, color: randomColor },
      }),
      Placeholder.configure({
        placeholder: "Type some text into this editor!"
      })
    ],
  });

  return (
    <RichTextEditor editor={editor} className={`${collaborationClasses.collab}`}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};


import { createStyles } from '@mantine/core';
import {TextAlign} from "@tiptap/extension-text-align";

const useCollaborationStyles = createStyles((theme) => ({
  collab: {
    ".collaboration-cursor__caret": {
      borderLeft: `1px solid ${theme.colors.dark[8]}`,
      borderRight: `1px solid ${theme.colors.dark[8]}`,
      marginLeft: '-1px',
      marginRight: '-1px',
      pointerEvents: 'none',
      position: 'relative',
      wordBreak: 'normal',
    },

    ".collaboration-cursor__label": {
      borderRadius: '3px 3px 3px 0',
      color: theme.colors.dark[8],
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 600,
      left: '-1px',
      lineHeight: 'normal',
      padding: '0.1rem 0.3rem',
      position: 'absolute',
      top: '-1.4em',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    },
  }
}));
