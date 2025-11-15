# Email Editor

A simple, free, drag-and-drop email editor built with React Email components.

## Features

### Block Types
- **Heading** (H1, H2, H3) - Customizable heading levels
- **Text** - Multi-line text content
- **Button** - Call-to-action button with URL and alignment
- **Image** - Images with alt text and optional width
- **Divider** - Horizontal line separator  
- **Spacer** - Vertical spacing with configurable height

### Editor Features
- ✅ Drag-and-drop reordering (up/down buttons)
- ✅ Add/remove blocks
- ✅ Edit block properties in side panel
- ✅ Live preview of block content
- ✅ Save design as JSON
- ✅ Generate production-ready HTML with react-email

## Usage

```tsx
import { EmailEditor, generateEmailHTML, generateDesignJSON } from "@/lib/email-editor";

function MyComponent() {
  const [blocks, setBlocks] = useState<EmailBlock[]>([]);

  const handleSave = async () => {
    // Generate HTML for sending
    const html = await generateEmailHTML(
      blocks,
      "My Club Name",
      "Footer text",
      "123 Main St",
      "https://example.com/unsubscribe"
    );

    // Generate JSON for storage
    const designJson = generateDesignJSON(blocks);

    // Save both to database
  };

  return <EmailEditor blocks={blocks} onChange={setBlocks} />;
}
```

## Block Structure

Blocks are stored as JSON with the following structure:

```json
{
  "blocks": [
    {
      "id": "block-123",
      "type": "heading",
      "content": "Welcome!",
      "level": 1
    },
    {
      "id": "block-124",
      "type": "text",
      "content": "This is a paragraph..."
    },
    {
      "id": "block-125",
      "type": "button",
      "text": "Click Here",
      "url": "https://example.com",
      "align": "center"
    }
  ]
}
```

## Email Template

The generated HTML uses react-email components for:
- Cross-client compatibility
- Mobile responsiveness
- Professional styling
- Automatic footer with unsubscribe link

## Future Enhancements

- [ ] Rich text editing for text blocks
- [ ] Template library
- [ ] Duplicate blocks
- [ ] Conditional content
- [ ] Variable placeholders beyond {{name}}
- [ ] Image upload/hosting
- [ ] Color customization
- [ ] Font selection
- [ ] Column layouts
- [ ] Preview mode
