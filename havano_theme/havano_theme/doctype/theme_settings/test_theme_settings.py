# Copyright (c) 2025, nasirucode and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase


class TestThemeSettings(FrappeTestCase):
	def test_theme_settings_creation(self):
		"""Test that theme settings can be created"""
		settings = frappe.get_single("Theme Settings")
		self.assertIsNotNone(settings)
	
	def test_sidebar_width_validation(self):
		"""Test sidebar width validation"""
		settings = frappe.get_single("Theme Settings")
		settings.sidebar_width = 150  # Too small
		
		with self.assertRaises(frappe.exceptions.ValidationError):
			settings.save()

