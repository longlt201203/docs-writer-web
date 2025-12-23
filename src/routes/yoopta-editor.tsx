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
import { useCallback, useMemo, useState } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [title, setTitle] = useState("");
  const handleChange = useCallback(
    (nextValue: YooptaContentValue, _: YooptaOnChangeOptions) => {
      console.log(nextValue);
      setValue(nextValue);
    },
    []
  );

  return (
    <section className="min-h-screen bg-background px-4 py-10 text-foreground md:px-10 lg:px-16">
      <div className="mx-auto h-full w-full max-w-5xl">
        <Card className="flex min-h-[calc(100vh-4rem)] flex-col border-border/60 bg-card/95 shadow-lg shadow-primary/10">
          <CardContent className="flex flex-1 flex-col px-0 pb-6">
            <div className="border-b border-border/60 px-6 pb-4">
              <Label
                htmlFor="document-title"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Document Title
              </Label>
              <Input
                id="document-title"
                placeholder="Untitled document"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-2 h-12 rounded-lg border border-border bg-card/70 text-2xl font-semibold text-foreground shadow-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              />
            </div>
            <div className="flex-1 px-4 py-4 md:px-6">
              <YooptaEditor
                editor={editor}
                placeholder="Start outlining your next knowledge base article..."
                value={value}
                onChange={handleChange}
                plugins={plugins}
                tools={tools}
                marks={marks}
                className="yoopta-editor-surface"
                style={{ width: "100%", minHeight: "100%" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
