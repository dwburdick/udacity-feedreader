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
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
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

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should have at least one item', function() {
            var areEntries = $('.feed').has('.entry').length;
            expect(areEntries).not.toBe(0);
        });

    });
   
    describe('New Feed Selection', function() {

        var firstFeed,
            secondFeed;

        beforeEach(function(done) {
            loadFeed(0);
            firstFeed = $('.feed');
            loadFeed(1);
            secondFeed = $('.feed');
            done();
        });

        it('should change content on the page', function() {
            expect(firstFeed === secondFeed).toBe(false);           
        });

    });

    describe('Add Feed Button', function() {

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
