# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

```bash
# Development
npm run dev           # Start Next.js development server (http://localhost:3000)

# Build & Production
npm run build         # Build production-ready application
npm start             # Start production server

# Code Quality
npm run lint          # Run ESLint
npm run lint:fix      # Run ESLint with auto-fix
npm run type-check    # Run TypeScript type checking
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

## Architecture Overview

This is a **Next.js portfolio gallery application** with the following key architectural patterns:

### Tech Stack
- **Next.js 14** with Pages Router (not App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom color scheme
- **React Three Fiber** for 3D components
- **Formidable** for file upload handling

### Project Structure

#### Core Data Flow
1. **Project Data**: Static project data lives in `data/projects.ts` and follows the `Project` type interface
2. **Dynamic Updates**: Admin panel can update project data via `/api/admin/projects` endpoint
3. **Image Uploads**: Users can upload images via `/api/upload` which:
   - Saves to `public/photos/`
   - Auto-commits and pushes to GitHub
   - Parses filename for metadata (order, size, name)

#### Key Architectural Patterns

**Component Organization**:
- Components use TypeScript interfaces for props
- Animated components wrap base components (e.g., `AnimatedProjectCard` wraps `ProjectCard`)
- Modular UI components (Button, Card, Modal, etc.) for consistency

**State Management**:
- AuthContext provides admin authentication state
- Local component state for UI interactions
- No global state management library

**File Naming Convention for Images**:
Images follow pattern: `{order}-{size}-{name}.{ext}`
- Order: numeric sorting (1-999)
- Size: square, tallrec, widerec, largesq, tinywide, tinytall
- Example: `10-square-project-name.jpg`

**Grid Layout System**:
- Uses CSS Grid with `grid-flow-dense` for optimal packing
- Responsive breakpoints: 1 col (mobile) → 4 cols (XL screens)
- Dynamic card sizes based on project.size property

### API Routes

- `/api/upload`: Handles image uploads with Git integration
- `/api/admin/projects`: Updates project data (requires auth)

### Styling Architecture

- Global styles in `styles/globals.css` with CSS variables
- Tailwind config extends default theme with custom colors
- Component-specific styles use Tailwind utility classes
- Dark theme with custom color palette (primary, secondary, accent)

### Key Features to Maintain

1. **Git Integration**: Upload API auto-commits and pushes images
2. **Filename Parsing**: Extracts metadata from filenames for ordering and sizing
3. **Admin Panel**: Protected routes with auth context
4. **Filtering System**: Multi-criteria filtering (status, search, tags)
5. **3D Components**: Multiple Room3D variants for different showcase styles

### Development Notes

- Always run type-check before committing TypeScript changes
- Use Prettier formatting (configured with Tailwind plugin)
- ESLint configured to allow console.warn/error but not console.log
- Images are served from `/public/images/` (static) and `/public/photos/` (uploads)