/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: "User1",
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: "/img/undraw_open_source.svg",
    infoLink: "https://www.facebook.com",
    pinned: true,
  },
]

const siteConfig = {
  title: "Paperclip", // Title for your website.
  tagline: "A language for UI primitives",
  url: "https://paperclip.dev", // Your website URL
  baseUrl: "/",

  algolia: {
    apiKey: "24dd5424911cddbd61fa5057d8452c70",
    indexName: "prod_paperclip",
    algoliaOptions: {
      facetFilters: ["language:LANGUAGE", "version:VERSION"],
    },
  },

  // Used for publishing and more
  projectName: "paperclip",
  organizationName: "crcn",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "getting-started-installation", label: "Docs" },
    { href: "http://github.com/crcn/paperclip", label: "GitHub" },
    // { blog: true, label: "Blog" },
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  // headerIcon: "img/favicon.ico",
  // footerIcon: "img/favicon.ico",
  // favicon: "img/favicon.ico",

  /* Colors for website */
  colors: {
    primaryColor: "#121287",
    secondaryColor: "#0c0c5e",
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Craig Condon`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default",
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: "img/undraw_online.svg",
  twitterImage: "img/undraw_tweetstorm.svg",

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
}

module.exports = siteConfig
