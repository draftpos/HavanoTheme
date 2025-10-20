# Copyright (c) 2025, nasirucode and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document


class ThemeSettings(Document):
	def validate(self):
		"""Validate theme settings"""
		if self.sidebar_width and (self.sidebar_width < 200 or self.sidebar_width > 400):
			frappe.throw(_("Sidebar width must be between 200 and 400 pixels"))
	
	def on_update(self):
		"""Clear cache when settings are updated"""
		frappe.clear_cache()


@frappe.whitelist()
def get_theme_settings():
	"""Get theme settings for frontend"""
	if not frappe.db.exists("Theme Settings", "Theme Settings"):
		return get_default_settings()
	
	settings = frappe.get_single("Theme Settings")
	return {
		"enable_theme": settings.enable_theme,
		"theme_mode": settings.theme_mode,
		"primary_color": settings.primary_color,
		"sidebar_style": settings.sidebar_style,
		"show_sidebar_icons": settings.show_sidebar_icons,
		"enable_sidebar_search": settings.enable_sidebar_search,
		"sidebar_width": settings.sidebar_width or 280,
		"enable_rounded_corners": settings.enable_rounded_corners,
		"enable_smooth_transitions": settings.enable_smooth_transitions,
		"enable_hover_effects": settings.enable_hover_effects,
		"sidebar_icon_style": settings.sidebar_icon_style,
		"custom_css": settings.custom_css,
		"custom_js": settings.custom_js
	}


def get_default_settings():
	"""Return default theme settings"""
	return {
		"enable_theme": True,
		"theme_mode": "Light",
		"primary_color": "#6366f1",
		"sidebar_style": "Modern",
		"show_sidebar_icons": True,
		"enable_sidebar_search": True,
		"sidebar_width": 280,
		"enable_rounded_corners": True,
		"enable_smooth_transitions": True,
		"enable_hover_effects": True,
		"sidebar_icon_style": "Rounded",
		"custom_css": "",
		"custom_js": ""
	}


@frappe.whitelist()
def set_theme_mode(theme_mode):
	"""Set theme mode for current user"""
	if theme_mode not in ["Light", "Purple", "Navy Blue", "Dark", "Auto"]:
		frappe.throw(_("Invalid theme mode"))
	
	frappe.db.set_value("User", frappe.session.user, "desk_theme", theme_mode)
	return {"message": _("Theme mode updated successfully")}

