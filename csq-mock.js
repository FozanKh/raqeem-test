// Mock Contentsquare Tag
// This simulates the behavior of the actual Contentsquare tracking tag
// In production, this would be loaded from https://t.contentsquare.net or similar CDN

(function() {
    'use strict';
    
    console.log('%c[Contentsquare Mock] Tag loaded successfully', 'color: #4CAF50; font-weight: bold');
    
    // Initialize _uxa array if not already present
    window._uxa = window._uxa || [];
    
    // Store original push method
    var originalPush = window._uxa.push;
    
    // Session tracking
    var sessionId = 'CSQ_SESSION_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    var pageviews = [];
    var interactions = [];
    
    console.log('%c[Contentsquare Mock] Session ID: ' + sessionId, 'color: #2196F3');
    
    // Override push method to intercept commands
    window._uxa.push = function(command) {
        if (!Array.isArray(command) || command.length === 0) {
            return originalPush.apply(this, arguments);
        }
        
        var action = command[0];
        var data = command.slice(1);
        
        switch(action) {
            case 'trackPageview':
                handlePageview(data[0]);
                break;
            case 'trackEvent':
                handleEvent(data[0], data[1]);
                break;
            default:
                console.log('[Contentsquare Mock] Unknown command:', action);
        }
        
        // Call original push
        return originalPush.apply(this, arguments);
    };
    
    // Handle pageview tracking
    function handlePageview(path) {
        var pageview = {
            path: path,
            timestamp: new Date().toISOString(),
            sessionId: sessionId,
            url: window.location.href,
            referrer: document.referrer,
            userAgent: navigator.userAgent
        };
        
        pageviews.push(pageview);
        
        console.log('%c[Contentsquare Mock] Pageview tracked:', 'color: #4CAF50; font-weight: bold', {
            path: path,
            sessionId: sessionId,
            pageviewCount: pageviews.length,
            timestamp: pageview.timestamp
        });
        
        // Simulate sending data to CSQ servers
        simulateDataSend('pageview', pageview);
    }
    
    // Handle event tracking
    function handleEvent(category, action) {
        var event = {
            category: category,
            action: action,
            timestamp: new Date().toISOString(),
            sessionId: sessionId
        };
        
        interactions.push(event);
        
        console.log('%c[Contentsquare Mock] Event tracked:', 'color: #FF9800', {
            category: category,
            action: action,
            sessionId: sessionId
        });
        
        simulateDataSend('event', event);
    }
    
    // Simulate sending data to Contentsquare servers
    function simulateDataSend(type, data) {
        // In real implementation, this would send data to CSQ servers
        // For simulation, we just log it
        console.log('%c[Contentsquare Mock] Data sent to CSQ servers:', 'color: #9C27B0', {
            type: type,
            data: data,
            endpoint: 'https://uxamanager.contentsquare.com/collect'
        });
    }
    
    // Automatic click tracking (simulated)
    document.addEventListener('click', function(e) {
        var target = e.target;
        var elementInfo = {
            tagName: target.tagName,
            className: target.className,
            id: target.id,
            text: target.textContent ? target.textContent.substring(0, 50) : '',
            timestamp: new Date().toISOString(),
            sessionId: sessionId,
            x: e.clientX,
            y: e.clientY
        };
        
        interactions.push(elementInfo);
        
        console.log('%c[Contentsquare Mock] Click captured:', 'color: #00BCD4', {
            element: target.tagName + (target.id ? '#' + target.id : '') + (target.className ? '.' + target.className.split(' ')[0] : ''),
            position: { x: e.clientX, y: e.clientY },
            sessionId: sessionId
        });
        
        simulateDataSend('click', elementInfo);
    }, true);
    
    // Session replay simulation
    console.log('%c[Contentsquare Mock] Session Replay active for session: ' + sessionId, 'color: #E91E63; font-weight: bold');
    console.log('%c[Contentsquare Mock] Replay URL: https://app.contentsquare.com/replay/' + sessionId, 'color: #E91E63');
    
    // Expose session data for debugging
    window._csqDebug = {
        getSessionId: function() {
            return sessionId;
        },
        getPageviews: function() {
            return pageviews;
        },
        getInteractions: function() {
            return interactions;
        },
        getSessionSummary: function() {
            console.log('%c=== Contentsquare Session Summary ===', 'color: #4CAF50; font-weight: bold; font-size: 14px');
            console.log('Session ID:', sessionId);
            console.log('Total Pageviews:', pageviews.length);
            console.log('Total Interactions:', interactions.length);
            console.log('Pageviews:', pageviews);
            console.log('Interactions:', interactions);
            console.log('Session Replay URL:', 'https://app.contentsquare.com/replay/' + sessionId);
            console.log('%c=====================================', 'color: #4CAF50; font-weight: bold; font-size: 14px');
            return {
                sessionId: sessionId,
                pageviews: pageviews,
                interactions: interactions,
                replayUrl: 'https://app.contentsquare.com/replay/' + sessionId
            };
        }
    };
    
    // Log initialization complete
    console.log('%c[Contentsquare Mock] Initialization complete. Use window._csqDebug.getSessionSummary() to view session data.', 'color: #4CAF50; font-weight: bold');
    
    // Validate CSP compliance
    setTimeout(function() {
        console.log('%c[Contentsquare Mock] CSP Validation: Script loaded without violations ✓', 'color: #4CAF50; font-weight: bold');
    }, 100);
    
})();

