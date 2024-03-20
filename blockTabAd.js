// ==UserScript==
// @name         Block Movieffm Ad
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.movieffm.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    // Function to handle link clicks
    // Store the original domain when the script is first loaded
    var originalDomain = window.location.hostname;

    // Monitor changes to the domain
    window.addEventListener('hashchange', handleDomainChange);

    // Function to handle domain change
    function handleDomainChange() {
        // Get the new domain after the hash change
        var newDomain = window.location.hostname;

        // Check if the new domain is different from the original domain
        if (newDomain !== originalDomain) {
            // Prompt the user to go back to the previous page
            alert("You're about to leave this website. Please go back to the previous page.");

            // Optionally, you can automatically navigate back to the previous page
            // window.history.back();
        }
    }

    // Intercept window.open calls
    window.open = function(url, target, features) {
        // Check if the target is '_blank' or not specified
        if (target === '_blank' || typeof target === 'undefined') {
            // Parse the URL to extract the domain
            var newDomain = (new URL(url)).hostname;

            // Check if the new domain is different from the original domain
            if (newDomain !== originalDomain) {
                // Optionally, you can do something here, like logging the attempt
                alert("Attempt to open a new tab with a different domain blocked.");
                // Cancel the attempt
                return null;
            }
        }

        // Allow other types of window.open calls
        return window.originalOpen(url, target, features);
    };

    // Store the original window.open function
    window.originalOpen = window.open;
})();
