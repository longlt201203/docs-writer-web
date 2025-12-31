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
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";

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
  const [value, setValue] = useState<YooptaContentValue>({});
  const [title, setTitle] = useState("New Document");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleChange = useCallback(
    (nextValue: YooptaContentValue, _: YooptaOnChangeOptions) => {
      // console.log(nextValue);
      setValue(nextValue);
    },
    []
  );

  const savingDocumentMutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Document saved:", { id, title, value });
    },
  });

  const deleteDocumentMutation = useMutation({
    mutationFn: async (documentId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Document deleted:", documentId);
    },
    onSettled: () => {
      setOpenDeleteDialog(false);
    },
  });

  return (
    <>
      <div className="p-4 flex flex-col h-full gap-4">
        <div className="space-y-2">
          <div className="flex gap-x-1">
            <Select disabled={savingDocumentMutation.isPending}>
              <SelectTrigger>
                <SelectValue placeholder="Select a folder" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">Folder 1</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => savingDocumentMutation.mutate()}
              disabled={savingDocumentMutation.isPending}
            >
              {savingDocumentMutation.isPending ? "Saving..." : "Save"}
            </Button>
            {id && (
              <Button
                variant="destructive"
                onClick={() => setOpenDeleteDialog(true)}
                disabled={savingDocumentMutation.isPending}
              >
                Delete
              </Button>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="document-title">Title</Label>
            <Input
              id="document-title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={savingDocumentMutation.isPending}
            />
          </div>
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

      {id && (
        <ConfirmDialog
          open={openDeleteDialog}
          title="Delete Document"
          description="Are you sure you want to delete this document?"
          onCancel={() => setOpenDeleteDialog(false)}
          onConfirm={() => deleteDocumentMutation.mutate(id)}
          confirmText={
            deleteDocumentMutation.isPending ? "Deleting..." : "Delete"
          }
          loading={deleteDocumentMutation.isPending}
          variant="destructive"
        />
      )}
    </>
  );
}
