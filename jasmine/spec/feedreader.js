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
  /*This test suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */

  describe('RSS Feeds', function() {
    /* This is the first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty.
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* A test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */

    it('URL is defined', function(){
      for(let i=0; i < allFeeds.length; i++){
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
      }

    });

    /* A test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */

    it('NAME is defined',function(){
      for(let i=0; i < allFeeds.length; i++){
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
      }
    });
  });

  /* The menu test suite */
  describe('The menu', function() {

    /* A test that ensures the menu element is
    * hidden by default. You'll have to analyze the HTML and
    * the CSS to determine how we're performing the
    * hiding/showing of the menu element.
    */

    it('is hidden by default', function() {
      expect($("body").hasClass('menu-hidden')).toBe(true);
    });

    /* A test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * should have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */

    it('changes visiblity', function() {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toEqual(false);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toEqual(true);
    });
  });

  /* Initial Entries test suite */
  describe('Initial Entires', function() {

    /* A test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * Remember, loadFeed() is asynchronous so this test will require
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */

    beforeEach(function(done) {
      loadFeed(0,function(){
        done();
      });
    });

    it('Feed container has an entry', function(done){
      let entryValue = $('.entry').length;
      expect(entryValue).toBeGreaterThan(0);
      done();
    });
  });


  /* New Feed Selection test suite */

  describe ('New Feed Selection', function() {
    let firstFeed;

    /* A test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Keep in mind loadFeed() is asynchronous
    */

    beforeEach(function(done) {
      loadFeed(0, function(){
        firstFeed = $('.feed').html();
        loadFeed(1,done);
      });
    });

    it('has new content', function(done) {
      loadFeed(1, function() {
        newFeed = $('.feed').html();
        expect(firstFeed).not.toEqual(newFeed);
        done();
      })
    });
  });
}());
