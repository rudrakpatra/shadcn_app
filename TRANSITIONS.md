# Page Transitions Implementation

This project implements smooth slide transitions using **Framer Motion** for all page navigation.

## Quick Start

The current `layout.tsx` uses Framer Motion for page transitions:

```tsx
import PageTemplate from "@/components/page-template";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PageTemplate>
          {children}
        </PageTemplate>
      </body>
    </html>
  );
}
```

## Demo Pages

Visit these pages to see the transitions in action:

- **Framer Motion Demo**: `/components/framer-motion-demo`
  - Slide transitions with scale effects
  - Scale animations with spring physics
  - Advanced 3D effects with staggered children

## Transition Animation

The PageTemplate component creates smooth slide transitions:

```tsx
<motion.div
  key={pathname}
  initial={{ 
    opacity: 0, 
    x: 100,
    scale: 0.95
  }}
  animate={{ 
    opacity: 1, 
    x: 0,
    scale: 1
  }}
  exit={{ 
    opacity: 0, 
    x: -100,
    scale: 1.05
  }}
  transition={{ 
    duration: 0.4,
    ease: [0.25, 0.46, 0.45, 0.94]
  }}
>
  {children}
</motion.div>
```

## Customizing Transitions

Modify the `PageTemplate` component to change animation properties:

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 1.1 }}
  transition={{ 
    type: "spring",
    stiffness: 300,
    damping: 30
  }}
>
  {children}
</motion.div>
```

### Different Slide Directions

You can modify the slide direction by changing the `x` values:

```tsx
// Slide from left
initial={{ x: -100 }}
exit={{ x: 100 }}

// Slide from top
initial={{ y: -100 }}
exit={{ y: 100 }}

// Slide from bottom
initial={{ y: 100 }}
exit={{ y: -100 }}
```

## Browser Support

### Framer Motion
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobile browsers
- ✅ Works everywhere
- ✅ Consistent experience across all platforms

## Performance Considerations

1. **Keep animations under 500ms** for optimal user experience
2. **Use transform and opacity** for better performance
3. **Avoid animating layout properties** (width, height, margin, padding)
4. **Test on lower-end devices** to ensure smooth performance

## Accessibility

Both implementations respect the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-new(root),
  ::view-transition-old(root) {
    animation: none;
  }
}
```

## Files Created

- `src/components/page-template.tsx` - Framer Motion template with slide transitions
- `src/components/advanced-page-template.tsx` - Advanced Framer Motion template
- `src/app/components/framer-motion-demo/` - Framer Motion demo pages

## Dependencies Added

- `framer-motion` - Animation library for smooth page transitions

## Next Steps

1. Customize animations to match your design system
2. Test thoroughly across different devices and browsers
3. Consider implementing transition preferences in your app settings
4. Add different transition types for different page types if needed
