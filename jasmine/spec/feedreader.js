/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined, that it is not
         * empty, and that it has a name that is also defined and
         * not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have defined URLs', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        it('have defined names', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });

    });

    describe('The menu', function() {
        /* This is our second test - it tests to make sure that the
         * menu is hidden by default, and that it toggles visibility
         * when clicked.
         */
        it('is hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

        it('toggles visibility when clicked', function() {
            $('.menu-icon-link').click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
            $('.menu-icon-link').click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

    });
    
    describe('Initial entries', function() {
        /* This tests to make sure that at least one item is
         * available when the page loads.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should have at least one item', function() {
            var areEntries = $('.feed').has('.entry').length;
            expect(areEntries).not.toBe(0);
        });

    });
   
    describe('New Feed Selection', function() {
        /* This tests to make sure the content of the page changes
         * when a new feed is chosen.
         */
        var firstFeed,
            secondFeed;

        beforeEach(function(done) {
            loadFeed(0);
            firstFeed = $('.feed');
            loadFeed(1);
            done();
        });

        it('should change content on the page', function() {
            secondFeed = $('.feed');
            expect(firstFeed === secondFeed).toBe(false);           
        });

    });

    describe('Add Feed Button', function() {
        /* This tests to make sure the Add Feed Button causes a feed
         * to appear in the menu as well as in the array.
         */
        var initialSet,
            initialLength,
            newSet,
            newLength;

        var testFeed = {
            name: 'New York Times Most Shared Items',
            url: 'http://rss.nytimes.com/services/xml/rss/nyt/MostShared.xml'
        };

        beforeEach(function(done) {
            initialSet = allFeeds;
            initialLength = $('.feed-list').children().length;
            addFeed(testFeed);
            newSet = allFeeds;
            newLength = $('.feed-list').children().length;
            done();
        });

        it('should add a feed to the array', function() {
            expect(allFeeds[newLength].url).toBeDefined();
            expect(allFeeds[newLength].url).not.toBe('');
            expect(allFeeds[newLength].name).toBeDefined();
            expect(allFeeds[newLength].name).not.toBe('');
        });

        it('should add an option to the menu', function() {
            expect(initialLength === newLength).toBe(false);
        });

    });

}());
