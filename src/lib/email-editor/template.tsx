import { getTextColorForBackground } from "@/lib/color-utils";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Section,
  Text,
} from "@react-email/components";
import type { EmailBlock } from "./types";
import { processRichTextForEmail } from "./utils";
interface EmailTemplateProps {
  blocks: EmailBlock[];
  clubName: string;
  brandColor?: string;
  unsubscribeUrl?: string;
}

export function EmailTemplate({
  blocks,
  clubName,
  brandColor = "#b1d135",
  unsubscribeUrl,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Main content blocks */}
          {blocks.map((block) => (
            <Section key={block.id} style={section}>
              {renderBlock(block, brandColor)}
            </Section>
          ))}

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerTextStyle}>
              This content is created by {clubName} and is not reviewed or endorsed by the Central Student Association.
            </Text>
            <Text style={footerTextStyle}>
              University of Guelph, 50 Stone Road East, Guelph, ON N1G 2W1
            </Text>
            <Text style={footerTextStyle}>
              {unsubscribeUrl && (
                <a href={unsubscribeUrl} style={{ ...link, color: brandColor }}>
                  Unsubscribe
                </a>
              )}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function renderBlock(block: EmailBlock, brandColor: string = "#b1d135") {
  const textColor = getTextColorForBackground(brandColor);
  
  switch (block.type) {
    case "heading":
      const HeadingTag = `h${block.level}` as "h1" | "h2" | "h3";
      return (
        <Heading as={HeadingTag} style={heading}>
          {block.content}
        </Heading>
      );

    case "richtext":
      // Email clients need special handling for HTML content
      // Process the HTML to add inline styles for better email client compatibility
      const processedContent = processRichTextForEmail(block.content);
      return (
        <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
          <tbody>
            <tr>
              <td
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#484848",
                  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
                }}
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </tr>
          </tbody>
        </table>
      );

    case "button":
      const buttonAlign = {
        left: { textAlign: "left" as const },
        center: { textAlign: "center" as const },
        right: { textAlign: "right" as const },
      };
      return (
        <div style={buttonAlign[block.align]}>
          <Button href={block.url} style={{ ...button, backgroundColor: brandColor, color: textColor }}>
            {block.text}
          </Button>
        </div>
      );

    case "image":
      return (
        <Img
          src={block.url}
          alt={block.alt}
          width={block.width}
          style={image}
        />
      );

    case "divider":
      return <Hr style={hr} />;

    case "spacer":
      return <div style={{ height: block.height }} />;

    default:
      return null;
  }
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const section = {
  padding: "0 48px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
  margin: "0 0 16px 0",
  padding: "0",
};

const text = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#484848",
  margin: "0 0 16px 0",
  padding: "0",
};

const button = {
  backgroundColor: "#b1d135",
  borderRadius: "5px",
  color: "#000",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const image = {
  maxWidth: "100%",
  height: "auto",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  padding: "0 48px",
};

const footerTextStyle = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#8898aa",
  marginBottom: "8px",
};

const link = {
  color: "#b1d135",
  textDecoration: "underline",
};
