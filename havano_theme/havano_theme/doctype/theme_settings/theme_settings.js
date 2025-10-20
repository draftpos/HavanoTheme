// Copyright (c) 2025, nasirucode and contributors
// For license information, please see license.txt

frappe.ui.form.on('Theme Settings', {
	onload: function(frm) {
		// Add custom buttons or setup if needed
		frm.set_intro(__('Configure the Havano Theme settings. Changes will be applied after save.'), 'blue');
	},

	refresh: function(frm) {
		// Add a custom button to preview changes
		if (!frm.is_new()) {
			frm.add_custom_button(__('Preview Changes'), function() {
				frappe.show_alert({
					message: __('Save the document to apply changes'),
					indicator: 'orange'
				});
			});
		}
	},

	after_save: function(frm) {
		// Show success message
		frappe.show_alert({
			message: __('Theme settings saved successfully. Reloading page...'),
			indicator: 'green'
		}, 3);

		// Reload the page after a short delay
		setTimeout(function() {
			window.location.reload();
		}, 1500);
	},

	enable_theme: function(frm) {
		if (frm.doc.enable_theme) {
			frappe.show_alert({
				message: __('Theme will be enabled after save'),
				indicator: 'blue'
			});
		} else {
			frappe.show_alert({
				message: __('Theme will be disabled after save'),
				indicator: 'orange'
			});
		}
	},

	theme_mode: function(frm) {
		if (frm.doc.theme_mode) {
			frappe.show_alert({
				message: __('Theme mode will be updated to {0} after save', [frm.doc.theme_mode]),
				indicator: 'blue'
			});
		}
	}
});

