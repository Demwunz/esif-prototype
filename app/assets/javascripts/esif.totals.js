var ESIF = ESIF || {};

ESIF.totals = {
  table : $('.table-totals')
};

(function init(){
  if($('.table-totals').length) {
    ESIF.totals();
  }
})()
