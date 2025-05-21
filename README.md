# Portfolio Grid Website

A modern responsive grid layout website displaying cards of varying content types, built with React, Next.js, and Tailwind CSS.

## Features

- **Responsive Grid Layout**: Uses masonry layout with React Responsive Masonry for optimal card placement
- **Dark Theme**: Modern dark color scheme matching the design aesthetic
- **Content Variety**: Supports different card types (images, icons, text content)
- **Filtering System**: Filter projects by status (All, Success, Failed, Hidden)
- **Search Functionality**: Search through projects by title, description, and tags
- **Variable Card Sizes**: Supports standard, wide, tall, and large card dimensions
- **Status Indicators**: Visual status indicators for project states
- **Hover Effects**: Smooth animations and overlay effects on card interaction

## Technologies Used

- **Next.js**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Responsive Masonry**: Masonry grid layout library
- **Next Image**: Optimized image components

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Updating Project Images

To fetch new images from Pexels:

1. Get a free API key from [Pexels API](https://www.pexels.com/api/)
2. Set the environment variable:
```bash
export PEXELS_API_KEY=your_api_key_here
```
3. Run the fetch script:
```bash
node scripts/fetch-pexels-images.js
```

This will update `data/projects.ts` with 45 new stock images from various categories.

## Project Structure

```
├── components/          # React components
│   ├── Header.tsx      # Main header with stats
│   ├── Filters.tsx     # Filter and search controls
│   ├── ProjectCard.tsx # Individual project card
│   └── ProjectGrid.tsx # Grid layout with masonry
├── data/               # Project data
│   └── projects.ts     # Sample project data
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   └── index.tsx      # Main page
├── public/             # Static assets
│   └── images/        # Image assets
├── styles/             # Global styles
│   └── globals.css    # Tailwind and custom CSS
└── types/              # TypeScript definitions
    └── index.ts       # Project type definitions
```

## Customization

### Adding New Projects

Edit `data/projects.ts` to add new projects:

```typescript
{
  id: 21,
  title: "New Project",
  description: "Project description",
  image: "/images/new-project.jpg", // or use icon instead
  status: "success", // success | failed | hidden
  size: "standard", // standard | wide | tall | large
  tags: ["tag1", "tag2"]
}
```

### Styling

- Colors are defined in `tailwind.config.js` and CSS variables in `globals.css`
- Card styles can be customized in `components/ProjectCard.tsx`
- Grid layout breakpoints are in `components/ProjectGrid.tsx`

## License

MIT