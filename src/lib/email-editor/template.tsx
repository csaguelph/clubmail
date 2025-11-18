import { getTextColorForBackground } from "@/lib/color-utils";
import { env } from "@/env";
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
  socialLinks?: Record<string, string> | null;
}

export function EmailTemplate({
  blocks,
  clubName,
  brandColor = "#b1d135",
  unsubscribeUrl,
  socialLinks,
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
            {socialLinks && Object.keys(socialLinks).length > 0 && (
              <Text
                style={socialIconsContainer}
                dangerouslySetInnerHTML={{
                  __html: renderSocialIcons(socialLinks),
                }}
              />
            )}
            <Text style={footerTextStyle}>
              This content is created by {clubName} and is not reviewed or
              endorsed by the Central Student Association or the University of
              Guelph.
            </Text>
            <Text style={footerTextStyle}>
              University of Guelph, University Centre 274, 50 Stone Road East,
              Guelph, ON N1G 2W1
            </Text>
            <Text style={footerTextStyle}>
              {unsubscribeUrl && (
                <a href={unsubscribeUrl} style={link}>
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

function renderBlock(block: EmailBlock, brandColor = "#b1d135") {
  const textColor = getTextColorForBackground(brandColor);

  switch (block.type) {
    case "heading": {
      const HeadingTag = `h${block.level}` as
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6";
      return (
        <Heading as={HeadingTag} style={heading}>
          {block.content}
        </Heading>
      );
    }

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
                  fontFamily:
                    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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
          <Button
            href={block.url}
            style={{ ...button, backgroundColor: brandColor, color: textColor }}
          >
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

// `text` style removed because it was unused (fixed lint warning)

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
  color: "#3b82f6", // Match rich text link color
  textDecoration: "underline",
};

const socialIconsContainer = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#8898aa",
  marginTop: "16px",
  textAlign: "center" as const,
};

// Social media icon PNG URLs (for email compatibility)
// These should be stored in public/social-icons/ directory
function getSocialIconUrl(platform: string): string {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;
  return `${baseUrl}/social-icons/${platform.toLowerCase()}.png`;
}

function renderSocialIcons(links: Record<string, string>): string {
  const iconSize = 20;
  const iconSpacing = 12;

  // Preferred order for university students (most popular first)
  const preferredOrder = [
    "instagram",
    "tiktok",
    "discord",
    "twitter",
    "youtube",
    "facebook",
    "linkedin",
    "github",
  ];

  // Sort entries by preferred order, then filter and map
  const sortedEntries = Object.entries(links)
    .filter(([_, url]) => url && url.trim() !== "")
    .sort(([platformA], [platformB]) => {
      const indexA = preferredOrder.indexOf(platformA.toLowerCase());
      const indexB = preferredOrder.indexOf(platformB.toLowerCase());
      // If platform not in preferred order, put it at the end
      const orderA = indexA === -1 ? Infinity : indexA;
      const orderB = indexB === -1 ? Infinity : indexB;
      return orderA - orderB;
    });

  // Use table-based layout with PNG images for better email client compatibility
  // This works much better in Outlook than SVGs
  // Wrap in a centered table to ensure proper alignment
  const icons = sortedEntries
    .map(([platform, url]) => {
      const iconUrl = getSocialIconUrl(platform);
      const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);

      return `
        <table cellpadding="0" cellspacing="0" border="0" style="display: inline-block; margin: 0 ${iconSpacing / 2}px; vertical-align: middle;">
          <tr>
            <td style="padding: 0;">
              <a href="${url}" style="display: block; text-decoration: none;" target="_blank" rel="noopener noreferrer">
                <img src="${iconUrl}" alt="${platformName}" width="${iconSize}" height="${iconSize}" style="display: block; border: 0; outline: none; text-decoration: none; width: ${iconSize}px; height: ${iconSize}px;" />
              </a>
            </td>
          </tr>
        </table>
      `;
    })
    .filter(Boolean)
    .join("");

  // Wrap all icons in a centered container table for proper alignment
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 auto;">
      <tr>
        <td align="center" style="padding: 0;">
          ${icons}
        </td>
      </tr>
    </table>
  `;
}
