// Email block types for the drag-and-drop editor
export type EmailBlockType = "heading" | "richtext" | "button" | "image" | "divider" | "spacer";

export interface BaseBlock {
  id: string;
  type: EmailBlockType;
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  content: string;
  level: 1 | 2 | 3;
}

export interface RichTextBlock extends BaseBlock {
  type: "richtext";
  content: string; // HTML content
}

export interface ButtonBlock extends BaseBlock {
  type: "button";
  text: string;
  url: string;
  align: "left" | "center" | "right";
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  url: string;
  alt: string;
  width?: number;
}

export interface DividerBlock extends BaseBlock {
  type: "divider";
}

export interface SpacerBlock extends BaseBlock {
  type: "spacer";
  height: number;
}

export type EmailBlock =
  | HeadingBlock
  | RichTextBlock
  | ButtonBlock
  | ImageBlock
  | DividerBlock
  | SpacerBlock;

export interface EmailDesign {
  blocks: EmailBlock[];
  subject: string;
  preheader: string;
}
