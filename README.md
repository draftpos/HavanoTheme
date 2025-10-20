# Havano Theme

A subtle, elegant theme for Frappe/ERPNext that enhances the existing design with modern polish and configurability.

## Philosophy

Havano Theme **respects Frappe's design principles** and doesn't drastically change the interface. Instead, it adds:
- Subtle visual polish and refinements
- Smooth transitions and hover effects
- Optional theme variations (Light, Purple, Dark)
- Configurable settings via DocType
- Better spacing and consistency

## Features

- 🎨 **Optional Theme Variations**: Light (default), Purple, and Dark themes
- ⚙️ **Theme Settings DocType**: Configure everything from the UI
- 🔍 **Sidebar Search**: Optional quick search within sidebar
- 📱 **Responsive Design**: Works seamlessly on all devices
- ⚡ **Smooth Transitions**: Subtle, elegant animations
- 🎯 **Icon Styles**: Choose between Default, Rounded, Circle, or Square icons
- 🛠️ **Custom CSS/JS**: Add your own customizations via settings
- 📐 **Configurable Width**: Adjust sidebar width to your preference

## Installation

1. **Install the app**:
   ```bash
   cd frappe-bench
   bench get-app havano_theme
   ```

2. **Install on your site**:
   ```bash
   bench --site [your-site] install-app havano_theme
   ```

3. **Build assets**:
   ```bash
   bench build --app havano_theme
   ```

4. **Clear cache and restart**:
   ```bash
   bench clear-cache
   bench restart
   ```

## Configuration

After installation, configure the theme through **Theme Settings**:

1. Go to: **Desk > Setup > Theme Settings**
2. Configure your preferences:
   - **Enable/Disable Theme**: Toggle theme enhancements
   - **Theme Mode**: Choose Light, Purple, Dark, or Auto
   - **Primary Color**: Set your brand color
   - **Sidebar Style**: Modern or Minimal
   - **Sidebar Width**: Adjust width (200-400px)
   - **Icon Style**: Default, Rounded, Circle, or Square
   - **Custom CSS/JS**: Add your own customizations

### Theme Switching

Change themes via:
1. **Theme Settings DocType**: Set globally for all users
2. **User Preferences**: Each user can choose their preference
3. **JavaScript API**: Programmatically switch themes
   ```javascript
   havano.sidebar.switch_theme('Purple');
   ```

### Features

- **Sidebar Search**: Enable in Theme Settings to add search box
- **Smooth Transitions**: Enable for elegant animations
- **Hover Effects**: Subtle highlighting on mouse over
- **Rounded Corners**: Modern, friendly design

## Customization

### Via Theme Settings

The easiest way to customize is through the **Theme Settings** DocType:

1. **Custom CSS**: Add your own CSS rules
2. **Custom JavaScript**: Add custom functionality
3. **Primary Color**: Set your brand color
4. **Icon Styles**: Choose the icon presentation

### Programmatic API

Use the JavaScript API for dynamic customization:

```javascript
// Switch theme
havano.sidebar.switch_theme('Dark');

// Get current settings
console.log(havano.sidebar.settings);

// Inject custom CSS
havano.sidebar.inject_custom_css('.my-class { color: red; }');

// Apply sidebar search
havano.sidebar.setup_sidebar_search();
```

### Advanced Customization

For advanced users, you can modify:
- `havano_theme/public/css/havano_sidebar.css` - Sidebar styles
- `havano_theme/public/css/havano_navbar.css` - Navbar styles
- `havano_theme/public/js/havano_sidebar.js` - Sidebar functionality

After modifications, rebuild assets:
```bash
bench build --app havano_theme
```

## Development

### Building Assets

After making changes to CSS or JS files:

```bash
cd frappe-bench
bench build --app havano_theme
bench clear-cache
```

### Hot Reload (Development Mode)

For development with automatic reload:

```bash
bench watch
```

## File Structure

```
havano_theme/
├── havano_theme/
│   ├── public/
│   │   ├── css/
│   │   │   └── havano_sidebar.css    # Main theme styles
│   │   └── js/
│   │       └── havano_sidebar.js     # Sidebar functionality
│   ├── hooks.py                       # App configuration
│   └── ...
├── README.md
└── ...
```

## Compatibility

- **Frappe**: Version 15.x
- **ERPNext**: Version 15.x
- **Browsers**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Screenshots

### Light Theme
Clean and minimal design with excellent readability

### Purple Theme
Vibrant purple theme for a unique look

### Dark Theme
Easy on the eyes for low-light environments

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Credits

Developed by [nasirucode](https://github.com/nasirucode)

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/your-repo/havano_theme/issues)
- Email: akingbolahan12@gmail.com

## Changelog

### Version 1.0.0
- Initial release
- Modern sidebar design
- Three theme variations (Light, Purple, Dark)
- Sidebar search functionality
- User profile section
- Collapsible sidebar
- Notification badges support
- Responsive design

## Roadmap

- [ ] Custom color picker for themes
- [ ] More animation options
- [ ] Sidebar width customization
- [ ] Additional theme presets
- [ ] Widget support in sidebar
- [ ] Quick actions menu

---

Made with ❤️ for the Frappe community
