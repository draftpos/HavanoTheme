# Havano Theme - Animated Backgrounds

This document describes the animated background system implemented for the Havano Theme, providing beautiful, performant, and accessible animated backgrounds for both login and web pages.

## Overview

The animated background system consists of:
- **Login Page Animations**: Full-screen animated backgrounds with floating shapes, particles, and gradient shifts
- **Web Page Animations**: Subtle animated backgrounds with geometric shapes, particles, and grid patterns
- **Theme Integration**: Seamless integration with existing theme color schemes
- **Performance Optimization**: Hardware acceleration and reduced motion support

## Files Structure

```
havano_theme/
├── public/
│   ├── css/
│   │   ├── havano_login.css          # Login page animated backgrounds
│   │   └── havano_web_animated.css   # Web page animated backgrounds
│   └── js/
│       └── havano_animated_bg.js     # Animation controller
├── templates/
│   └── web.html                      # Custom web template
└── www/
    └── login.html                    # Custom login template
```

## Features

### Login Page Animations

- **Gradient Background**: Animated gradient that shifts between theme colors
- **Floating Shapes**: Geometric shapes that float and rotate across the screen
- **Particle System**: Small particles that float upward
- **Wave Animation**: Subtle wave effect at the bottom
- **Glassmorphism Effects**: Login cards with backdrop blur and transparency

### Web Page Animations

- **Subtle Gradient**: Light animated gradient overlay
- **Floating Elements**: Gentle floating shapes and cards
- **Grid Pattern**: Animated grid overlay
- **Particle System**: Light particles for visual interest
- **Enhanced UI Elements**: Cards, forms, and buttons with glassmorphism

### Theme Integration

The system automatically adapts to different theme colors:

- **Default Theme**: Blue-purple gradient (#667eea, #764ba2, #4A2F87)
- **Purple Theme**: Deep purple gradient (#4A2F87, #3A2370, #2F1C5C)
- **Navy Blue Theme**: Navy blue gradient (#002b80, #001a4d, #001133)
- **Dark Theme**: Dark gradient (#1a202c, #2d3748, #4a5568)

## Usage

### Automatic Initialization

The animated backgrounds are automatically initialized when the page loads:

```javascript
// Automatically detects page type and initializes appropriate animations
window.havanoAnimatedBackground = new HavanoAnimatedBackground();
```

### Manual Theme Control

```javascript
// Change theme programmatically
window.havanoAnimatedBackground.changeTheme('purple');

// Toggle animations on/off
window.havanoAnimatedBackground.toggleAnimations();
```

### CSS Classes

The system adds CSS classes to the body element:

- `login-page`: Applied to login pages
- `web-page`: Applied to web pages
- `havano-theme-{theme}`: Applied based on current theme

## Performance Optimizations

### Hardware Acceleration

All animated elements use hardware acceleration:

```css
.animated-element {
    will-change: transform;
    transform: translateZ(0);
}
```

### Reduced Motion Support

Respects user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
    .animated-element {
        animation: none !important;
    }
}
```

### Mobile Optimization

On mobile devices, complex animations are disabled for better performance:

```css
@media (max-width: 768px) {
    .animated-shape,
    .animated-particle {
        display: none;
    }
}
```

### Tab Visibility

Animations pause when the browser tab is not visible to save resources.

## Accessibility

### High Contrast Support

```css
@media (prefers-contrast: high) {
    .animated-bg {
        opacity: 0.3;
    }
}
```

### Screen Reader Friendly

All animated elements are positioned behind content and don't interfere with screen readers.

## Customization

### Adding New Animations

To add new animated elements:

1. Add HTML structure to the background container
2. Define CSS animations
3. Update the JavaScript controller if needed

Example:

```css
.new-animated-element {
    position: absolute;
    animation: newAnimation 10s infinite;
}

@keyframes newAnimation {
    0% { transform: translateX(0); }
    100% { transform: translateX(100px); }
}
```

### Custom Theme Colors

To add new theme colors:

1. Update the CSS with new theme selectors
2. Add color values to the JavaScript theme object

```javascript
const themeColors = {
    'new-theme': {
        '--primary-color': '#your-color',
        '--secondary-color': '#your-color',
        '--accent-color': '#your-color'
    }
};
```

## Browser Support

- **Modern Browsers**: Full support with hardware acceleration
- **Older Browsers**: Graceful degradation with static backgrounds
- **Mobile Browsers**: Optimized performance with reduced animations

## Troubleshooting

### Animations Not Working

1. Check if CSS files are properly loaded
2. Verify JavaScript is enabled
3. Check for console errors
4. Ensure theme classes are applied

### Performance Issues

1. Check if hardware acceleration is enabled
2. Verify reduced motion preferences
3. Test on different devices
4. Monitor browser performance tools

### Theme Not Applying

1. Check theme data attributes
2. Verify localStorage theme value
3. Check CSS selector specificity
4. Ensure theme colors are defined

## Future Enhancements

- [ ] Interactive particle system
- [ ] Custom animation presets
- [ ] Real-time theme switching
- [ ] Animation performance metrics
- [ ] Custom shape generators
- [ ] Sound integration (optional)

## License

This animated background system is part of the Havano Theme and follows the same MIT license.
