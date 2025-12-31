import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
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
import type {
  SlateElement,
  YooptaContentValue,
  YooptaOnChangeOptions,
  YooptaPlugin,
} from "@yoopta/editor";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { useCallback, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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

const documentSearchSchema = z.object({
  id: fallback(z.number().optional(), undefined),
});

export const Route = createFileRoute("/user/document/")({
  component: RouteComponent,
  validateSearch: zodValidator(documentSearchSchema),
});

function RouteComponent() {
  const { id } = Route.useSearch();
  const editor = useMemo(() => createYooptaEditor(), []);
  const [value, setValue] = useState<YooptaContentValue>();
  const [title, setTitle] = useState("");
  const handleChange = useCallback(
    (nextValue: YooptaContentValue, _: YooptaOnChangeOptions) => {
      // console.log(nextValue);
      setValue(nextValue);
    },
    []
  );

  return (
    <div className="p-4 flex flex-col h-full gap-4">
      <div className="space-y-2">
        <div className="flex gap-x-1">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a folder" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1">Folder 1</SelectItem>
            </SelectContent>
          </Select>

          <Button>Save</Button>
          {id && <Button variant="destructive">Delete</Button>}
        </div>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <Separator />
      <div className="border rounded flex-1">
        <YooptaEditor
          editor={editor}
          placeholder="Start outlining your next knowledge base article..."
          value={value}
          onChange={handleChange}
          plugins={plugins}
          tools={tools}
          marks={marks}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}
