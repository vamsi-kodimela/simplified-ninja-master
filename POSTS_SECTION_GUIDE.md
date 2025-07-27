# Posts Section with Filters and Multi-Layout Support

A comprehensive posts section implementation with advanced filtering, search functionality, and multiple responsive layout options.

## Features

### 🔍 **Advanced Filtering**

- **Real-time search** across titles, descriptions, and categories
- **Category filtering** with visual feedback
- **Sorting options**: Newest, Oldest, Title A-Z, Title Z-A
- **Clear filters** functionality

### 📱 **Multi-Layout Support**

- **Grid Layout**: Card-style responsive grid (default)
- **List Layout**: Horizontal layout with larger content areas
- **Compact Layout**: Minimal rows for dense information display

### 🎯 **User Experience**

- **Responsive design** for all screen sizes
- **Loading states** and empty state handling
- **Real-time filtering** without page reloads
- **Accessibility** with proper ARIA labels and keyboard navigation
- **Dark mode** support

## Components Overview

### Core Components

- `PostsSection` - Main component with full functionality
- `PostsFilters` - Search, category, and layout controls
- `PostVariant` - Adaptive post component for different layouts
- `PostsGrid` - Posts without filters (for previews)
- `PostsWithFilters` - Posts with complete filter interface

### Store Integration

Uses Zustand for state management with:

- Filtered articles computation
- Search and category state
- Layout preferences
- Sorting options

## Usage Examples

### Basic Usage

```tsx
import { PostsWithFilters } from "@/components";

// Full posts section with all features
function PostsPage() {
  return <PostsWithFilters />;
}
```

### Homepage Preview

```tsx
import { PostsGrid } from "@/components";

// Simple posts grid without filters
function Homepage() {
  return (
    <section>
      <h2>Latest Posts</h2>
      <PostsGrid maxPosts={6} />
    </section>
  );
}
```

### Custom Implementation

```tsx
import { PostsSection } from "@/components";

function CustomPostsPage() {
  return (
    <PostsSection showFilters={true} maxPosts={12} className="custom-posts" />
  );
}
```

## Data Management

### Loading Data

```tsx
import { useGlobalStore } from "@/store/global-store";

function DataLoader() {
  const { setArticles, setCategories } = useGlobalStore();

  useEffect(() => {
    // Load your data
    fetchArticles().then(setArticles);
    fetchCategories().then(setCategories);
  }, []);

  return <PostsWithFilters />;
}
```

### State Access

```tsx
import { useGlobalStore } from "@/store/global-store";

function PostsStats() {
  const { filteredArticles, searchQuery, selectedCategories, layoutType } =
    useGlobalStore();

  return (
    <div>
      <p>Showing {filteredArticles.length} posts</p>
      <p>Layout: {layoutType}</p>
    </div>
  );
}
```

## Layout Types

### Grid Layout (Default)

- **Responsive card grid** with 1-4 columns based on screen size
- **Featured images** with 3:2 aspect ratio
- **Category badges** and publication dates
- **Best for**: General browsing, visual appeal

### List Layout

- **Horizontal layout** with image on left, content on right
- **Larger content area** for descriptions
- **"Read more" indicators**
- **Best for**: Detailed browsing, content focus

### Compact Layout

- **Minimal rows** with small thumbnails
- **Dense information display**
- **Quick scanning** friendly
- **Best for**: Archives, search results, mobile

## Responsive Behavior

### Desktop (1024px+)

- Grid: 3-4 columns
- List: Full horizontal layout
- Compact: Full-width rows

### Tablet (768px - 1023px)

- Grid: 2-3 columns
- List: Stacked layout
- Compact: Adjusted spacing

### Mobile (< 768px)

- Grid: 1 column
- List: Fully stacked
- Compact: Condensed layout
- Filters: Simplified mobile UI

## Styling

### CSS Variables Used

```css
/* Spacing */
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg, --spacing-xl

/* Colors */
--primary-dark, --primary-light
--secondary-light, --secondary-medium
--accent-blue

/* Typography */
--font-heading, --font-body

/* Effects */
--shadow-md, --shadow-lg
--radius-sm, --radius-md, --radius-lg
```

### Custom Styling

```tsx
// Add custom classes
<PostsSection className="my-custom-posts" />
```

```css
/* Custom styles */
.my-custom-posts {
  max-width: 1400px;
  margin: 0 auto;
}
```

## Performance Considerations

### Optimizations Included

- **Computed filtering** with Zustand
- **CSS Grid** for efficient layouts
- **Image optimization** with Next.js Image component
- **Responsive images** with proper sizing

### Best Practices

- Use `maxPosts` prop for pagination
- Implement virtual scrolling for large datasets
- Consider lazy loading for images
- Debounce search input for API calls

## Accessibility Features

### Included

- **Keyboard navigation** for all interactive elements
- **ARIA labels** for screen readers
- **Focus management** and indicators
- **High contrast** mode support
- **Reduced motion** support

### Implementation

```tsx
// Automatic accessibility features
<button aria-label="Clear search" />
<input aria-describedby="search-help" />
<select aria-label="Sort posts by" />
```

## Browser Support

- **Modern browsers** (Chrome 88+, Firefox 85+, Safari 14+, Edge 88+)
- **Mobile browsers** (iOS Safari, Chrome Mobile)
- **CSS Grid** support required
- **ES2020** features used

## File Structure

```
src/components/
├── posts-filters/
│   ├── index.tsx
│   └── posts-filters.module.css
├── post-variants/
│   ├── index.tsx
│   └── post-variants.module.css
├── posts-section/
│   ├── index.tsx
│   └── posts-section.module.css
└── posts-demo/
    └── index.tsx

src/store/
└── global-store.ts
```

## Contributing

When extending the posts section:

1. **Maintain responsive design** across all screen sizes
2. **Follow existing CSS patterns** and variable usage
3. **Test accessibility** with screen readers
4. **Update TypeScript types** as needed
5. **Consider performance impact** of new features

## License

Part of the Simplified Ninja project.
