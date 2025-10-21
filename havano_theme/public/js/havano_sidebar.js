/**
 * Havano Theme - Subtle Sidebar Enhancements
 * Respects Frappe's design philosophy, only adds polish
 */

frappe.provide('havano');

havano.sidebar = {
	settings: null,
	sidebarOpen: true, // Track sidebar state
	
	init: function() {
		// Initialize immediately if DOM is ready
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', () => {
				this.initialize_sidebar();
			});
		} else {
			// DOM is already ready
			setTimeout(() => {
				this.initialize_sidebar();
			}, 100);
		}
		
		// Also wait for app to be ready (Frappe specific)
		$(document).on('app_ready', () => {
			this.load_settings();
			this.setup_mobile_menu();
		});
	},

	initialize_sidebar: function() {
		console.log('Initializing sidebar toggle...');
		
		// Check if sidebar exists
		const sidebar = document.querySelector('.layout-side-section');
		if (!sidebar) {
			console.log('Sidebar not found, retrying in 500ms...');
			setTimeout(() => {
				this.initialize_sidebar();
			}, 500);
			return;
		}
		
		console.log('Sidebar found:', sidebar);
		this.setup_desktop_toggle();
		this.setup_keyboard_shortcuts();
	},

	setup_keyboard_shortcuts: function() {
		// Add keyboard shortcut for testing (Ctrl/Cmd + B)
		document.addEventListener('keydown', (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
				e.preventDefault();
				console.log('Keyboard shortcut triggered');
				this.toggle_sidebar();
			}
		});
	},

	load_settings: function() {
		// Load theme settings from backend
		frappe.call({
			method: 'havano_theme.havano_theme.doctype.theme_settings.theme_settings.get_theme_settings',
			callback: (r) => {
				if (r.message) {
					this.settings = r.message;
					this.apply_settings();
				}
			}
		});
	},

	apply_settings: function() {
		if (!this.settings || !this.settings.enable_theme) {
			return; // Theme is disabled
		}

		// Apply theme mode
		if (this.settings.theme_mode && this.settings.theme_mode !== 'Auto') {
			this.set_theme_mode(this.settings.theme_mode.toLowerCase());
		}

		// Apply sidebar width
		if (this.settings.sidebar_width) {
			this.set_sidebar_width(this.settings.sidebar_width);
		}

		// Apply icon style
		if (this.settings.sidebar_icon_style && this.settings.sidebar_icon_style !== 'Default') {
			document.documentElement.setAttribute(
				'data-sidebar-icon-style', 
				this.settings.sidebar_icon_style.toLowerCase()
			);
		}

		// Apply custom CSS
		if (this.settings.custom_css) {
			this.inject_custom_css(this.settings.custom_css);
		}

		// Apply custom JS
		if (this.settings.custom_js) {
			this.inject_custom_js(this.settings.custom_js);
		}

		// Setup sidebar search if enabled
		if (this.settings.enable_sidebar_search) {
			this.setup_sidebar_search();
		}

		// Setup smooth transitions if enabled
		if (this.settings.enable_smooth_transitions) {
			this.enable_smooth_transitions();
		}
	},

	set_theme_mode: function(mode) {
		document.documentElement.setAttribute('data-havano-theme', mode);
		localStorage.setItem('havano_theme_mode', mode);
	},

	set_sidebar_width: function(width) {
		const sidebar = document.querySelector('.layout-side-section');
		if (sidebar) {
			sidebar.style.width = width + 'px';
		}
	},

	setup_sidebar_search: function() {
		// Only add if not already present
		if ($('.sidebar-search').length > 0) return;

		const searchHtml = `
			<div class="sidebar-search" style="padding: var(--padding-sm); margin-bottom: var(--margin-md);">
				<input type="text" 
					   class="form-control" 
					   placeholder="${__('Search...')}" 
					   style="font-size: var(--text-sm);"
				/>
			</div>
		`;

		const $sidebar = $('.desk-sidebar');
		if ($sidebar.length) {
			$(searchHtml).prependTo($sidebar);
			this.bind_search_events();
		}
	},

	bind_search_events: function() {
		let searchTimeout;
		$('.sidebar-search input').on('input', function() {
			clearTimeout(searchTimeout);
			const query = $(this).val().toLowerCase();
			
			searchTimeout = setTimeout(() => {
				havano.sidebar.filter_sidebar_items(query);
			}, 300);
		});
	},

	filter_sidebar_items: function(query) {
		if (!query) {
			$('.desk-sidebar-item, .sidebar-item-container').show();
			return;
		}

		$('.desk-sidebar-item').each(function() {
			const $item = $(this);
			const text = $item.text().toLowerCase();
			
			if (text.includes(query)) {
				$item.show();
				// Show parent containers
				$item.parents('.sidebar-item-container').show();
			} else {
				$item.hide();
			}
		});
	},

	enable_smooth_transitions: function() {
		// Already handled in CSS
	},

	inject_custom_css: function(css) {
		if ($('#havano-custom-css').length === 0) {
			$('<style id="havano-custom-css"></style>').appendTo('head');
		}
		$('#havano-custom-css').text(css);
	},

	inject_custom_js: function(js) {
		try {
			// Execute custom JavaScript in a safe context
			(new Function(js))();
		} catch (e) {
			console.error('Error executing custom JavaScript:', e);
		}
	},

	// Public API for theme switching
	switch_theme: function(theme_mode) {
		frappe.call({
			method: 'havano_theme.havano_theme.doctype.theme_settings.theme_settings.set_theme_mode',
			args: { theme_mode: theme_mode },
			callback: (r) => {
				if (r.message) {
					this.set_theme_mode(theme_mode.toLowerCase());
					frappe.show_alert({
						message: r.message.message,
						indicator: 'blue'
					});
				}
			}
		});
	},

	setup_mobile_menu: function() {
		// Create mobile menu toggle button
		if ($('.sidebar-mobile-toggle').length > 0) return;

		const toggleButton = $(`
			<button class="sidebar-mobile-toggle" aria-label="Toggle Menu">
				<svg viewBox="0 0 24 24" stroke="currentColor">
					<line x1="3" y1="12" x2="21" y2="12"></line>
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				</svg>
			</button>
		`);

		// Create overlay
		const overlay = $('<div class="sidebar-overlay"></div>');

		// Add to body
		$('body').append(toggleButton);
		$('body').append(overlay);

		// Toggle sidebar on button click
		toggleButton.on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			const isActive = $('.layout-side-section').hasClass('mobile-active');
			
			if (isActive) {
				// Close sidebar
				$('.layout-side-section').removeClass('mobile-active');
				$('.sidebar-overlay').removeClass('active');
				toggleButton.removeClass('active');
			} else {
				// Open sidebar
				$('.layout-side-section').addClass('mobile-active');
				$('.sidebar-overlay').addClass('active');
				toggleButton.addClass('active');
			}
		});

		// Close sidebar when clicking overlay
		overlay.on('click', function() {
			$('.layout-side-section').removeClass('mobile-active');
			$('.sidebar-overlay').removeClass('active');
			toggleButton.removeClass('active');
		});

		// Close sidebar when clicking a menu item on mobile
		$(document).on('click', '.desk-sidebar-item a', function() {
			if ($(window).width() <= 768) {
				setTimeout(() => {
					$('.layout-side-section').removeClass('mobile-active');
					$('.sidebar-overlay').removeClass('active');
					toggleButton.removeClass('active');
				}, 200);
			}
		});

		// Close sidebar on escape key
		$(document).on('keydown', function(e) {
			if (e.key === 'Escape' && $('.layout-side-section').hasClass('mobile-active')) {
				$('.layout-side-section').removeClass('mobile-active');
				$('.sidebar-overlay').removeClass('active');
				toggleButton.removeClass('active');
			}
		});

		// Handle window resize
		$(window).on('resize', function() {
			if ($(window).width() > 768) {
				// Reset mobile state on desktop
				$('.layout-side-section').removeClass('mobile-active');
				$('.sidebar-overlay').removeClass('active');
				toggleButton.removeClass('active');
			}
		});
	},

	setup_desktop_toggle: function() {
		// Create desktop toggle button
		if (document.querySelector('.sidebar-toggle-btn')) return;

		const toggleButton = document.createElement('button');
		toggleButton.className = 'sidebar-toggle-btn';
		toggleButton.setAttribute('aria-label', 'Toggle Sidebar');
		toggleButton.innerHTML = `
			<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
				<line x1="3" y1="12" x2="21" y2="12"></line>
				<line x1="3" y1="6" x2="21" y2="6"></line>
				<line x1="3" y1="18" x2="21" y2="18"></line>
			</svg>
		`;

		// Add to body
		document.body.appendChild(toggleButton);

		// Toggle sidebar on button click
		toggleButton.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.toggle_sidebar();
		});

		// Create close button inside sidebar
		this.create_sidebar_close_button();
	},

	create_sidebar_close_button: function() {
		// Create close button inside sidebar
		if (document.querySelector('.sidebar-close-btn')) return;

		const closeButton = document.createElement('button');
		closeButton.className = 'sidebar-close-btn';
		closeButton.setAttribute('aria-label', 'Close Sidebar');
		closeButton.innerHTML = `
			<svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		`;

		// Add to sidebar
		const sidebar = document.querySelector('.layout-side-section');
		if (sidebar) {
			sidebar.appendChild(closeButton);

			// Close sidebar on button click
			closeButton.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.close_sidebar();
			});
		}
	},

	toggle_sidebar: function() {
		console.log('Toggle sidebar clicked, current state:', this.sidebarOpen);
		if (this.sidebarOpen) {
			this.close_sidebar();
		} else {
			this.open_sidebar();
		}
	},

	open_sidebar: function() {
		console.log('Opening sidebar...');
		const sidebar = document.querySelector('.layout-side-section');
		const body = document.body;
		
		if (sidebar) {
			sidebar.classList.remove('sidebar-closed');
			sidebar.classList.add('sidebar-open');
			console.log('Sidebar classes:', sidebar.className);
		}
		body.classList.remove('sidebar-closed');
		this.sidebarOpen = true;
		this.update_toggle_button_icon();
	},

	close_sidebar: function() {
		console.log('Closing sidebar...');
		const sidebar = document.querySelector('.layout-side-section');
		const body = document.body;
		
		if (sidebar) {
			sidebar.classList.remove('sidebar-open');
			sidebar.classList.add('sidebar-closed');
			console.log('Sidebar classes:', sidebar.className);
		}
		body.classList.add('sidebar-closed');
		this.sidebarOpen = false;
		this.update_toggle_button_icon();
	},

	update_toggle_button_icon: function() {
		const toggleBtn = document.querySelector('.sidebar-toggle-btn svg');
		if (toggleBtn) {
			if (this.sidebarOpen) {
				// Show close icon
				toggleBtn.innerHTML = `
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				`;
			} else {
				// Show menu icon
				toggleBtn.innerHTML = `
					<line x1="3" y1="12" x2="21" y2="12"></line>
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				`;
			}
		}
	},

	// Test function for debugging
	test: function() {
		console.log('Testing sidebar functionality...');
		console.log('Sidebar element:', document.querySelector('.layout-side-section'));
		console.log('Toggle button:', document.querySelector('.sidebar-toggle-btn'));
		console.log('Close button:', document.querySelector('.sidebar-close-btn'));
		console.log('Current state:', this.sidebarOpen);
		this.toggle_sidebar();
	}
};

// Initialize
havano.sidebar.init();

// Make test function globally available
window.testSidebar = () => havano.sidebar.test();

// Refresh on route change
$(document).on('page-change', function() {
	// Re-apply settings if needed
	setTimeout(() => {
		if (havano.sidebar.settings && havano.sidebar.settings.enable_sidebar_search) {
			if ($('.sidebar-search').length === 0) {
				havano.sidebar.setup_sidebar_search();
			}
		}
	}, 500);
});
