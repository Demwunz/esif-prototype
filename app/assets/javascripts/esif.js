var ESIF = ESIF || {};

ESIF.rowclick = function(container) {
  container.on('click', function() {
    window.location = $(this).find('a')[0].href;
  });
};

(function init(){
  var container = $('.application-status-list');
  if(container.length) {
    ESIF.rowclick(container);
  }
})();
