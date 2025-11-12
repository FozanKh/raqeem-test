// AngularJS Application - Raqeem ANAT SA
// Version: 1.6.5 Compatible

(function () {
	"use strict";

	var app = angular.module("raqeemApp", []);

	app.controller("MainController", [
		"$scope",
		"$timeout",
		function ($scope, $timeout) {
			// Initialize console logs array
			$scope.consoleLogs = [];

			// Current view state
			$scope.currentView = "login";

			// User credentials
			$scope.credentials = {
				username: "",
				password: "",
			};

			// Current user
			$scope.currentUser = "";

			// Login error
			$scope.loginError = "";

			// Helper function to add console logs
			function addLog(message, type) {
				type = type || "info";
				var timestamp = new Date().toLocaleTimeString();
				$scope.consoleLogs.push({
					message: message,
					type: type,
					timestamp: timestamp,
				});

				// Keep only last 20 logs
				if ($scope.consoleLogs.length > 20) {
					$scope.consoleLogs.shift();
				}

				// Also log to browser console
				console.log("[" + timestamp + "] " + message);

				// Apply changes if not in digest cycle
				if (!$scope.$$phase) {
					$scope.$apply();
				}
			}

			// Contentsquare pageview tracking helper
			function trackPageview(path) {
				if (window._uxa && typeof window._uxa.push === "function") {
					window._uxa.push(["trackPageview", path]);

					// Determine if this is initial or artificial pageview
					var pageviewType = path === "/login" && $scope.consoleLogs.length === 0 ? "initial" : "artificial";

					addLog("Contentsquare " + pageviewType + " pageview triggered for " + path, "success");
				} else {
					addLog("ERROR: Contentsquare _uxa object not available", "error");
				}
			}

			// Track CSP violations
			var cspViolationDetected = false;

			// Listen for CSP violations
			document.addEventListener("securitypolicyviolation", function (e) {
				cspViolationDetected = true;
				var violationDetails = {
					blockedURI: e.blockedURI,
					violatedDirective: e.violatedDirective,
					effectiveDirective: e.effectiveDirective,
					originalPolicy: e.originalPolicy,
				};

				addLog("✗ CSP VIOLATION DETECTED!", "error");
				addLog("Blocked URI: " + e.blockedURI, "error");
				addLog("Violated Directive: " + e.violatedDirective, "error");

				console.error("%c=== CONTENT SECURITY POLICY VIOLATION ===", "color: red; font-weight: bold; font-size: 16px");
				console.error("Blocked URI:", e.blockedURI);
				console.error("Violated Directive:", e.violatedDirective);
				console.error("Effective Directive:", e.effectiveDirective);
				console.error("Original Policy:", e.originalPolicy);
				console.error("%c=========================================", "color: red; font-weight: bold; font-size: 16px");
			});

			// Check CSP compliance on initialization
			function checkCSPCompliance() {
				$timeout(function () {
					if (!cspViolationDetected) {
						addLog("Checking CSP compliance...", "info");

						// Check if Contentsquare loaded successfully
						$timeout(function () {
							if (cspViolationDetected) {
								addLog("✗ CSP Compliance Check FAILED: CSP violations detected!", "error");
								addLog("⚠ Contentsquare script blocked by Content Security Policy", "error");
								addLog("⚠ Current CSP: script-src 'self' 'unsafe-inline' 'unsafe-eval'", "error");
							} else {
								addLog("✓ CSP Compliance Check: No violations detected", "success");
							}
						}, 2000);
					}
				}, 500);
			}

			// Initialize application
			function init() {
				addLog("=== Raqeem Application Initialized ===", "info");
				addLog("Framework: AngularJS v1.6.5", "info");
				addLog("Application Type: Single Page Application (SPA)", "info");

				// Check CSP compliance
				checkCSPCompliance();

				// Track initial pageview for /login
				$timeout(function () {
					trackPageview("/login");
				}, 1000);
			}

			// Login function
			$scope.login = function () {
				addLog("Login attempt for user: " + $scope.credentials.username, "info");

				// Simple validation (accept any non-empty credentials for demo)
				if ($scope.credentials.username && $scope.credentials.password) {
					// Simulate login success
					$scope.currentUser = $scope.credentials.username;
					$scope.loginError = "";

					addLog("✓ Login successful for user: " + $scope.credentials.username, "success");

					// Change view to dashboard
					$scope.currentView = "dashboard";

					// Track pageview for dashboard/home (SPA transition)
					$timeout(function () {
						trackPageview("/dashboard/home");
						addLog("✓ SPA Transition: Navigated from /login to /dashboard/home", "success");
					}, 500);
				} else {
					$scope.loginError = "الرجاء إدخال اسم المستخدم وكلمة المرور / Please enter username and password";
					addLog("✗ Login failed: Missing credentials", "error");
				}
			};

			// Logout function
			$scope.logout = function () {
				addLog("Logout initiated for user: " + $scope.currentUser, "info");

				// Clear user data
				var previousUser = $scope.currentUser;
				$scope.currentUser = "";
				$scope.credentials = {
					username: "",
					password: "",
				};

				// Change view back to login
				$scope.currentView = "login";

				addLog("✓ Logout successful for user: " + previousUser, "success");

				// Track pageview for login (after logout)
				$timeout(function () {
					trackPageview("/login");
					addLog("✓ SPA Transition: Navigated from /dashboard/home to /login", "success");
				}, 500);
			};

			// Track clicks on dashboard elements
			$scope.trackClick = function (elementId) {
				addLog("Click tracked on element: " + elementId, "info");

				// In real Contentsquare implementation, clicks are automatically tracked
				// This is just for demonstration purposes
				if (window._uxa && typeof window._uxa.push === "function") {
					addLog("✓ Click data sent to Contentsquare for heatmap/replay", "success");
				}
			};

			// Initialize the application
			init();
		},
	]);

	// Run block to set up the controller
	app.run([
		"$rootScope",
		function ($rootScope) {
			// Set up global error handler for CSP violations
			window.addEventListener("securitypolicyviolation", function (e) {
				console.error("CSP Violation:", e.violatedDirective, e.blockedURI);
			});
		},
	]);
})();
