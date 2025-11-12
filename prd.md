Technical Requirements and Validation Plan (TRVP) for Contentsquare Tag Integration

Goal: Generate a comprehensive Technical Requirements and Validation Plan (TRVP) for integrating the Contentsquare (CSQ) main tracking tag into the client's production AngularJS application (version 1.6.5) to ensure full behavioral data capture without violating security policies.

1. Target Environment & Scope

Client Website URL: raqeem.anat.sa

Framework: AngularJS v1.6.5 (Legacy Single Page Application - SPA).

Application Structure: View changes are handled by Angular routing (ng-if and potentially ngRoute or similar), not full page loads.

Critical Security Constraint (CSP): The client's existing Content Security Policy must be strictly respected. The relevant policy is:

<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval' *CSQ_CDN_HOST*">


(Note: Ensure the CSQ tag CDN host is explicitly added to the script-src directive.)

2. Implementation Requirements

Tag Placement: The CSQ main tracking script must be implemented in the <head> section of the main index.html file, placed as high as possible, ideally immediately after the CSP meta tag.

Tag Loading: The tag must load asynchronously and not block the rendering of the AngularJS application.

CSP Compliance: The tag must execute successfully without generating any CSP violation errors in the browser console. The existing unsafe-inline and unsafe-eval directives in the client's policy are assumed to cover the internal workings of AngularJS and the CSQ tag, but this must be validated.

SPA Pageview Handling (Critical): Due to the SPA nature of AngularJS, automatic pageview detection will fail on virtual page changes (like post-login). The implementation must use the window._uxa.push(['trackPageview', 'PATH']) command to manually trigger virtual pageviews on:

Initial Load: Trigger a pageview for /login.

Login Success: Trigger a pageview for /dashboard/home (or equivalent).

Logout: Trigger a pageview for /login.

Session Continuity: Ensure that the user session is maintained across these virtual page changes, resulting in a single session replay link for the user journey.

3. Validation & Success Criteria

Test Case

Step-by-Step Validation

Expected Outcome (Success Criteria)

CSP Compliance

1. Load the application and inspect the browser console.

No Content Security Policy errors are logged related to the Contentsquare tag or the core AngularJS framework.

Initial Pageview

1. Load the login page (/login).

A trackPageview event for the path /login is sent to CSQ, and the console shows: Contentsquare initial pageview triggered for /login.

SPA Transition

1. Log in (Transition to /dashboard/home).

A second trackPageview event for the path /dashboard/home is sent to CSQ, and the console shows: Contentsquare artificial pageview triggered for /dashboard/home.

Data Integrity

1. Click on two different elements within the dashboard.

Contentsquare heatmaps and session replays capture the clicks accurately, confirming the tag is recording interactions within the AngularJS context.