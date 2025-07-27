# Enhanced Posts Section with Customizable Titles and Advanced Features

A comprehensive posts section implementation with advanced filtering, search functionality, customizable headers, and multiple responsive layout options.

## 🆕 New Features

### ✨ **Customizable Headers**

- **Custom titles, subtitles, and descriptions**
- **Statistics display** with post counts
- **Refresh functionality** with loading states
- **Professional header styling** with gradients and animations

### 🎨 **Multiple Component Variations**

- **PostsSection** - Main configurable component
- **PostsGrid** - Grid layout without filters
- **PostsList** - List layout without filters
- **FeaturedPosts** - Pre-configured featured section
- **LatestPosts** - Pre-configured latest posts section
- **CompactPosts** - Sidebar-friendly compact layout
- **AdvancedPostsSection** - Full-featured with all enhancements

### 🔧 **Enhanced Configuration**

- **Default layout setting** for consistent design
- **Custom empty state messages** and actions
- **Flexible refresh handling** with custom callbacks
- **Show/hide options** for all UI elements

## 📋 Component Props

### PostsSection Props

```typescript
interface PostsSectionProps {
  // Display options
  showFilters?: boolean; // Show/hide filter panel
  showHeader?: boolean; // Show/hide custom header
  title?: string; // Main title
  subtitle?: string; // Secondary title
  description?: string; // Description text

  // Layout and limits
  maxPosts?: number; // Limit number of posts
  defaultLayout?: LayoutType; // "grid" | "list" | "compact"
  allowLayoutSwitch?: boolean; // Allow layout switching

  // Styling
  className?: string; // Custom CSS class
  headerClassName?: string; // Header CSS class

  // State
  isLoading?: boolean; // Loading state

  // Actions
  onViewAll?: () => void; // View all button callback
  onRefresh?: () => void; // Refresh button callback

  // Customization
  showStats?: boolean; // Show post statistics
  showViewAllButton?: boolean; // Show/hide view all button
  emptyStateMessage?: string; // Custom empty message
  emptyStateAction?: {
    // Custom empty state action
    label: string;
    onClick: () => void;
  };
}
```

## 🎯 Usage Examples

### Basic Grid Layout

```tsx
import { PostsGrid } from "@/components";

function HomePage() {
  return (
    <PostsGrid
      maxPosts={6}
      showHeader={true}
      title="Latest Articles"
      showStats={true}
    />
  );
}
```

### Featured Posts Section

```tsx
import { FeaturedPosts } from "@/components";

function FeaturedSection() {
  return (
    <FeaturedPosts
      className="featured-section"
      onViewAll={() => router.push("/posts")}
    />
  );
}
```

### Custom Posts Section

```tsx
import { PostsSection } from "@/components";

function CustomPostsPage() {
  const handleRefresh = () => {
    // Custom refresh logic
    refetchPosts();
  };

  return (
    <PostsSection
      showFilters={true}
      showHeader={true}
      title="Technology Posts"
      subtitle="Latest in Tech"
      description="Stay updated with the latest technology trends and tutorials"
      showStats={true}
      defaultLayout="list"
      maxPosts={12}
      onRefresh={handleRefresh}
      emptyStateMessage="No technology posts found. Check back soon!"
      emptyStateAction={{
        label: "Browse All Categories",
        onClick: () => router.push("/categories"),
      }}
    />
  );
}
```

### List Layout with Custom Actions

```tsx
import { PostsList } from "@/components";

function BlogPage() {
  return (
    <PostsList
      showHeader={true}
      title="Blog Posts"
      subtitle="In-depth articles and tutorials"
      showStats={true}
      onViewAll={() => window.open("/blog", "_blank")}
      className="blog-posts"
    />
  );
}
```

### Compact Sidebar Posts

```tsx
import { CompactPosts } from "@/components";

function Sidebar() {
  return (
    <CompactPosts
      showHeader={true}
      title="Recent Posts"
      maxPosts={5}
      className="sidebar-posts"
    />
  );
}
```

### Advanced Posts with All Features

```tsx
import { AdvancedPostsSection } from "@/components";

function AdvancedPage() {
  return (
    <AdvancedPostsSection
      title="All Posts"
      subtitle="Comprehensive post collection"
      description="Browse through our complete collection of articles, tutorials, and guides"
      showFilters={true}
      className="advanced-posts"
      headerClassName="custom-header"
    />
  );
}
```

## 🎨 Styling Customization

### Custom Header Styling

```css
.custom-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: 2px solid #667eea;
}

.custom-header .sectionTitle {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

### Layout-Specific Styling

```css
.featured-section .postsGrid {
  gap: 2rem;
}

.blog-posts .listLayout {
  max-width: 800px;
  margin: 0 auto;
}

.sidebar-posts {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1rem;
}
```

## 🔄 Advanced State Management

### With Custom Data Loading

```tsx
import { PostsSection, LoadingSkeleton } from "@/components";
import { useQuery } from "@tanstack/react-query";

function DataDrivenPosts() {
  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <LoadingSkeleton count={6} layout="grid" />;
  }

  return (
    <PostsSection
      showHeader={true}
      title="Latest Posts"
      showStats={true}
      onRefresh={() => refetch()}
      isLoading={isLoading}
    />
  );
}
```

### With Custom Empty States

```tsx
function PostsWithCustomEmpty() {
  const [category, setCategory] = useState("tech");

  return (
    <PostsSection
      showFilters={true}
      showHeader={true}
      title={`${category} Posts`}
      emptyStateMessage={`No ${category} posts available at the moment.`}
      emptyStateAction={{
        label: `Browse All ${category} Resources`,
        onClick: () => router.push(`/resources/${category}`),
      }}
    />
  );
}
```

## 🎯 Layout Configurations

### Grid Layout Features

- **Responsive columns**: 1-4 columns based on screen size
- **Card-style presentation**: Featured images with content overlay
- **Hover animations**: Smooth elevation and scale effects
- **Optimized spacing**: Professional grid gaps and alignment

### List Layout Features

- **Horizontal layout**: Image left, content right
- **Larger content area**: More space for descriptions
- **Read indicators**: Visual cues for interaction
- **Mobile stacking**: Responsive design for smaller screens

### Compact Layout Features

- **Minimal design**: Perfect for sidebars and widgets
- **Small thumbnails**: Space-efficient image display
- **Dense information**: Maximum content in minimal space
- **Quick scanning**: Easy to browse through many items

## 📱 Responsive Behavior

### Desktop (1200px+)

- **Grid**: 3-4 columns with full features
- **List**: Full horizontal layout with large images
- **Headers**: Full-width with side-by-side content and actions

### Tablet (768px - 1199px)

- **Grid**: 2-3 columns with adjusted spacing
- **List**: Maintained horizontal layout
- **Headers**: Stacked content with centered actions

### Mobile (< 768px)

- **Grid**: Single column with full-width cards
- **List**: Stacked layout for optimal mobile viewing
- **Headers**: Vertically stacked with mobile-optimized controls

## 🔧 Performance Features

### Optimized Rendering

- **Memoized calculations**: Efficient filtering and sorting
- **Virtual scrolling ready**: Optimized for large datasets
- **Lazy loading**: Images and content loaded on demand
- **Efficient animations**: CSS-based for smooth performance

### Loading States

- **Skeleton screens**: Match actual content layout
- **Progressive loading**: Staggered animation delays
- **Shimmer effects**: Professional loading indicators
- **Smooth transitions**: Between loading and content states

## ♿ Accessibility Features

### Enhanced Support

- **ARIA labels**: Comprehensive screen reader support
- **Keyboard navigation**: Full keyboard accessibility
- **Focus management**: Proper focus indicators and flow
- **High contrast**: Support for high contrast mode
- **Reduced motion**: Respects user motion preferences

### Semantic HTML

- **Proper headings**: Structured heading hierarchy
- **Landmarks**: Section and region landmarks
- **Live regions**: Dynamic content announcements
- **Form labels**: Proper input labeling

## 🎨 Theming Support

### CSS Variables

All components use design system variables for consistent theming:

```css
/* Custom theme overrides */
:root {
  --accent-blue: #4f46e5; /* Custom accent color */
  --text-3xl: 2rem; /* Custom title size */
  --spacing-xl: 2.5rem; /* Custom spacing */
  --radius-lg: 16px; /* Custom border radius */
}
```

### Dark Mode

Automatic dark mode support with enhanced styling:

- **Improved contrasts**: Better readability in dark mode
- **Theme-aware gradients**: Adapted for dark backgrounds
- **Consistent styling**: All components follow dark theme

## 🚀 Best Practices

### Performance

- Use `maxPosts` for pagination instead of loading all posts
- Implement virtual scrolling for very large datasets
- Use `LoadingSkeleton` for better perceived performance
- Debounce search inputs when connected to APIs

### UX Design

- Choose appropriate layouts for your content type
- Use custom headers to provide context and navigation
- Implement meaningful empty states with clear actions
- Provide refresh functionality for dynamic content

### Accessibility

- Always provide `aria-label` for interactive elements
- Test with screen readers and keyboard navigation
- Use proper heading hierarchy with custom titles
- Implement focus management for dynamic content

## 📦 Bundle Information

### Component Sizes

- **PostsSection**: ~8KB (gzipped)
- **Enhanced CSS**: ~12KB (gzipped)
- **Total bundle impact**: ~20KB for full functionality

### Dependencies

- **React 18+**: Required for modern hooks
- **Next.js 13+**: For Image optimization and routing
- **Zustand**: For global state management

## 🔄 Migration Guide

### From Basic to Enhanced

```tsx
// Before
<PostsSection showFilters={true} maxPosts={6} />

// After - with enhanced features
<PostsSection
  showFilters={true}
  showHeader={true}
  title="Latest Posts"
  subtitle="Stay updated"
  showStats={true}
  maxPosts={6}
  defaultLayout="grid"
  onRefresh={handleRefresh}
/>
```

### Component Replacements

- **Old**: `<PostsSection showFilters={false} />`
- **New**: `<PostsGrid />` (cleaner API)

- **Old**: Custom header implementation
- **New**: `<FeaturedPosts />` or `<LatestPosts />` (pre-configured)

## 🎯 Component Comparison

| Component              | Filters | Header   | Default Layout | Best For            |
| ---------------------- | ------- | -------- | -------------- | ------------------- |
| `PostsSection`         | ✅      | Optional | Any            | Full customization  |
| `PostsGrid`            | ❌      | Optional | Grid           | Simple grid display |
| `PostsList`            | ❌      | Optional | List           | Article browsing    |
| `FeaturedPosts`        | ❌      | ✅       | Grid           | Homepage highlights |
| `LatestPosts`          | ❌      | ✅       | List           | Recent content      |
| `CompactPosts`         | ❌      | Optional | Compact        | Sidebars, widgets   |
| `AdvancedPostsSection` | ✅      | ✅       | Any            | Full-featured pages |

## 📝 Examples Repository

Check out the complete examples in the `/examples` directory:

- Basic implementations
- Advanced configurations
- Custom styling examples
- Integration patterns
- Performance optimizations

---

**Enhanced Posts Section** - Building modern, accessible, and performant content displays with React and Next.js.
