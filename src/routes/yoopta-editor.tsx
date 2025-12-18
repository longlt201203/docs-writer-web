import { createFileRoute } from "@tanstack/react-router";
import YooptaEditor, {
  createYooptaEditor,
  YooptaPlugin,
  type SlateElement,
  type YooptaContentValue,
  type YooptaOnChangeOptions,
} from "@yoopta/editor";
import YooptaParagraph from "@yoopta/paragraph";
import YooptaBlockquote from "@yoopta/blockquote";
import YooptaTable from "@yoopta/table";
import YooptaDivider from "@yoopta/divider";
import YooptaAccordion from "@yoopta/accordion";
import YooptaCode from "@yoopta/code";
import YooptaEmbed from "@yoopta/embed";
import YooptaImage from "@yoopta/image";
import YooptaLink from "@yoopta/link";
import YooptaFile from "@yoopta/file";
import YooptaCallout from "@yoopta/callout";
import YooptaVideo from "@yoopta/video";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
import { useMemo, useState } from "react";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import ActionMenu, { DefaultActionMenuRender } from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";

const plugins = [
  YooptaParagraph,
  YooptaBlockquote,
  YooptaTable,
  YooptaDivider,
  YooptaAccordion,
  YooptaCode,
  YooptaEmbed,
  YooptaImage,
  YooptaLink,
  YooptaFile,
  YooptaCallout,
  YooptaVideo,
  NumberedList,
  BulletedList,
  TodoList,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
] as YooptaPlugin<Record<string, SlateElement>, Record<string, unknown>>[];

const tools = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: ActionMenu,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
};

const marks = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

export const Route = createFileRoute("/yoopta-editor")({
  component: RouteComponent,
});

function RouteComponent() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState<YooptaContentValue>();
  const onChange = (value: YooptaContentValue, _: YooptaOnChangeOptions) => {
    setValue(value);
  };

  return (
    <div className="w-screen h-screen px-20 py-10">
      <div className="w-full min-h-full border rounded">
        <YooptaEditor
          editor={editor}
          placeholder="Type text.."
          value={value}
          onChange={onChange}
          plugins={plugins}
          tools={tools}
          marks={marks}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}
