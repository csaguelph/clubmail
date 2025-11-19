// docmd.config.js: basic config for docmd
module.exports = {
  // Core Site Metadata
  siteTitle: "ClubMail Documentation",
  // Define a base URL for your site, crucial for SEO and absolute paths
  // No trailing slash
  siteUrl: "https://docs.clubmail.csaonline.ca", // Replace with your actual deployed URL

  // Logo Configuration
  logo: {
    light: "/assets/images/clubmail-logo-light.svg", // Path relative to outputDir root
    dark: "/assets/images/clubmail-logo-dark.svg", // Path relative to outputDir root
    alt: "ClubMail logo", // Alt text for the logo
    href: "/", // Link for the logo, defaults to site root
  },

  // Directory Configuration
  srcDir: "docs", // Source directory for Markdown files
  outputDir: "generated/docs", // Directory for generated static site

  // Sidebar Configuration
  sidebar: {
    collapsible: true, // or false to disable
    defaultCollapsed: false, // or true to start collapsed
  },

  // Theme Configuration
  theme: {
    name: "sky", // Themes: 'default', 'sky'
    defaultMode: "light", // Initial color mode: 'light' or 'dark'
    enableModeToggle: true, // Show UI button to toggle light/dark modes
    positionMode: "top", // 'top' or 'bottom' for the theme toggle
    codeHighlight: true, // Enable/disable codeblock highlighting and import of highlight.js
    customCss: [],
  },

  // Custom JavaScript Files
  customJs: [
    // Array of paths to custom JS files, loaded at end of body
    // '/assets/js/custom-script.js', // Paths relative to outputDir root
    "/assets/js/docmd-image-lightbox.js", // Image lightbox functionality
  ],

  // Content Processing
  autoTitleFromH1: true, // Set to true to automatically use the first H1 as page title
  copyCode: true, // Enable/disable the copy code button on code blocks

  // Plugins Configuration
  // Plugins are configured here. docmd will look for these keys.
  plugins: {
    // SEO Plugin Configuration
    // Most SEO data is pulled from page frontmatter (title, description, image, etc.)
    // These are fallbacks or site-wide settings.
    seo: {
      // Default meta description if a page doesn't have one in its frontmatter
      defaultDescription:
        "ClubMail is a comprehensive email marketing platform designed specifically for CSA Clubs. Create beautiful email campaigns, manage subscribers, and track engagement—all with an intuitive drag-and-drop editor.",
    },
    // Enable Sitemap plugin
    sitemap: {
      defaultChangefreq: "weekly",
      defaultPriority: 0.8,
    },
    // Add other future plugin configurations here by their key
  },

  // Navigation Structure (Sidebar)
  // Icons are kebab-case names from Lucide Icons (https://lucide.dev/)
  navigation: [
    { title: "Welcome", path: "/", icon: "home" }, // Corresponds to docs/index.md
    {
      title: "Features",
      icon: "sparkles",
      path: "#",
      collapsible: true,
      children: [
        {
          title: "Email Campaigns",
          path: "/features/campaigns",
          icon: "mail",
        },
        {
          title: "Subscriber Management",
          path: "/features/subscribers",
          icon: "users",
        },
        {
          title: "Club Management",
          path: "/features/clubs",
          icon: "building",
        },
        {
          title: "Analytics & Tracking",
          path: "/features/analytics",
          icon: "bar-chart",
        },
        {
          title: "Variable Placeholders",
          path: "/features/variables",
          icon: "code",
        },
      ],
    },
    {
      title: "User Guide",
      icon: "book-open",
      path: "#",
      collapsible: true,
      children: [
        {
          title: "Creating Campaigns",
          path: "/user-guide/creating-campaigns",
          icon: "edit",
        },
        {
          title: "Managing Subscribers",
          path: "/user-guide/managing-subscribers",
          icon: "user-plus",
        },
        {
          title: "Club Settings",
          path: "/user-guide/club-settings",
          icon: "settings",
        },
        {
          title: "Viewing Analytics",
          path: "/user-guide/analytics",
          icon: "line-chart",
        },
        {
          title: "Scheduling Campaigns",
          path: "/user-guide/scheduling-campaigns",
          icon: "calendar",
        },
        {
          title: "Team Management",
          path: "/user-guide/team-management",
          icon: "user-cog",
        },
      ],
    },
    // External links:
    {
      title: "GitHub",
      path: "https://github.com/csaguelph/clubmail",
      icon: "github",
      external: true,
    },
  ],

  pageNavigation: true, // Enable previous / next page navigation at the bottom of each page

  // Footer Configuration
  // Markdown is supported here.
  footer:
    "© " +
    new Date().getFullYear() +
    " The University of Guelph Central Student Association",

  // Favicon Configuration
  // Path relative to outputDir root
  favicon: "/assets/favicon.ico",
};
