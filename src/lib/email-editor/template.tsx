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

interface EmailTemplateProps {
  blocks: EmailBlock[];
  clubName: string;
  footerText?: string;
  physicalAddress?: string;
  unsubscribeUrl?: string;
}

export function EmailTemplate({
  blocks,
  clubName,
  footerText,
  physicalAddress,
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
              {renderBlock(block)}
            </Section>
          ))}

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            {footerText && <Text style={footerTextStyle}>{footerText}</Text>}
            {physicalAddress && (
              <Text style={footerTextStyle}>{physicalAddress}</Text>
            )}
            <Text style={footerTextStyle}>
              Sent by {clubName}
              {unsubscribeUrl && (
                <>
                  {" • "}
                  <a href={unsubscribeUrl} style={link}>
                    Unsubscribe
                  </a>
                </>
              )}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function renderBlock(block: EmailBlock) {
  switch (block.type) {
    case "heading":
      const HeadingTag = `h${block.level}` as "h1" | "h2" | "h3";
      return (
        <Heading as={HeadingTag} style={heading}>
          {block.content}
        </Heading>
      );

    case "text":
      return <Text style={text}>{block.content}</Text>;

    case "button":
      const buttonAlign = {
        left: { textAlign: "left" as const },
        center: { textAlign: "center" as const },
        right: { textAlign: "right" as const },
      };
      return (
        <div style={buttonAlign[block.align]}>
          <Button href={block.url} style={button}>
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
  marginBottom: "16px",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#484848",
  marginBottom: "16px",
  whiteSpace: "pre-wrap" as const,
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
