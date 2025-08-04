# Navbar Component

A fully configurable, responsive navigation bar component built with React and TypeScript, featuring glass morphism design inspired by modern dashboards.

## Features

🎨 **Design System Integration**

- Uses your brand colors from the theme system
- Glass morphism effects with backdrop blur
- Dark/light mode support
- Consistent with dashboard aesthetic

🔧 **Fully Configurable**

- Customizable logo (text, image, or icon)
- Multi-level dropdown menus
- Search functionality with loading states
- Multiple CTA button variants
- Badge support for notifications

📱 **Responsive Design**

- Mobile-first approach
- Slide-out mobile menu
- Touch-friendly interactions
- Keyboard navigation support

♿ **Accessibility First**

- ARIA labels and roles
- Focus management
- Screen reader support
- High contrast mode support

## Quick Start

```tsx
import { Navbar } from "@/globals/components";

function App() {
  return (
    <Navbar
      logo={{
        type: "text",
        text: "SimplifiedNinja",
        href: "/",
      }}
      navigation={[
        { id: "home", label: "Home", href: "/", isActive: true },
        { id: "about", label: "About", href: "/about" },
        {
          id: "services",
          label: "Services",
          children: [
            { id: "web", label: "Web Development", href: "/services/web" },
            { id: "mobile", label: "Mobile Apps", href: "/services/mobile" },
          ],
        },
      ]}
      search={{
        isEnabled: true,
        placeholder: "Search...",
        onSearch: (query) => console.log(query),
      }}
      cta={[
        {
          id: "contact",
          label: "Contact",
          variant: "primary",
          href: "/contact",
        },
      ]}
    />
  );
}
```

## Configuration Options

### Logo Configuration

```tsx
// Text logo
logo: {
  type: 'text',
  text: 'Brand Name',
  href: '/'
}

// Image logo
logo: {
  type: 'image',
  imageUrl: '/logo.png',
  text: 'Alt text',
  href: '/'
}

// Icon logo
logo: {
  type: 'icon',
  icon: 'SN',
  text: 'SimplifiedNinja',
  href: '/'
}
```

### Navigation Items

```tsx
navigation: [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: "🏠",
    isActive: true,
    badge: "New",
  },
  {
    id: "services",
    label: "Services",
    icon: "⚙️",
    children: [
      {
        id: "web-dev",
        label: "Web Development",
        href: "/services/web",
        icon: "🌐",
      },
    ],
  },
];
```

### Search Configuration

```tsx
search: {
  isEnabled: true,
  placeholder: 'Search our services...',
  onSearch: (query) => handleSearch(query),
  onClear: () => handleClear(),
  suggestions: ['React', 'TypeScript', 'Next.js'],
  isLoading: false
}
```

### CTA Buttons

```tsx
cta: [
  {
    id: "demo",
    label: "Free Demo",
    variant: "ghost",
    onClick: () => showDemo(),
  },
  {
    id: "signup",
    label: "Get Started",
    variant: "primary",
    icon: "🚀",
    href: "/signup",
  },
];
```

## Button Variants

- `primary` - Main action button with gradient background
- `secondary` - Secondary action with border
- `ghost` - Transparent button for subtle actions
- `danger` - Warning/destructive actions

## Examples

### Basic Implementation

```tsx
import { BasicNavbar } from "@/globals/components";

<BasicNavbar />;
```

### E-commerce Style

```tsx
import { EcommerceNavbar } from "@/globals/components";

<EcommerceNavbar />;
```

### Light Theme

```tsx
import { LightNavbar } from "@/globals/components";

<LightNavbar />;
```

### Custom Implementation

```tsx
import { Navbar } from "@/globals/components";

<Navbar
  logo={{ type: "text", text: "MyApp" }}
  navigation={myNavItems}
  search={{ isEnabled: true }}
  cta={myCTAButtons}
  theme="dark"
  className="my-custom-navbar"
/>;
```

## Styling

The component uses the theme system from `/src/styles/theme/`. All styles are defined in:

- `navbar.css` - Desktop navbar styles
- `mobile.css` - Mobile responsive styles
- `variables.css` - Design tokens and CSS custom properties

### Custom Styling

You can override styles using CSS custom properties:

```css
.my-custom-navbar {
  --navbar-height: 80px;
  --navbar-bg: var(--bg-glass);
  --navbar-border: var(--border-subtle);
}
```

## Mobile Behavior

- **< 768px**: Navigation collapses to hamburger menu
- **< 480px**: Logo text hides, keeping only icon
- Touch-friendly: 44px minimum touch targets
- Slide-out menu with backdrop blur
- Accordion-style dropdowns

## Accessibility

- **Keyboard Navigation**: Tab, Enter, Escape, Arrow keys
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **High Contrast**: Enhanced borders and colors
- **Reduced Motion**: Respects user preferences

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { NavbarProps, NavItem, CTAButton } from "@/globals/components";
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- CSS Grid and Flexbox fallbacks
- Backdrop filter with fallbacks
