var ev = window.ev || {};
// ev is an abbreviation of "error validation"

ev.checkFields = function() {
  var formgroups = $('[data-required]');

  formgroups.each(function(i, el) {
    var formgroup = $(el);

    if(formgroup.data('invalid')) {
    } else {
      ev.getFields(formgroup);
    }

  });
};

ev.getFields = function(formgroup) {
  var textfield = formgroup.find('input[type="text"],input[type="password"],input[type="email"]'),
  checkbox = formgroup.find('input[type="checkbox"]'),
  radios =formgroup.find('input[type="radio"]'),
  textarea = formgroup.find('textarea'),
  select = formgroup.find('select');

  if (select.length) {
    ev.select(formgroup, select);
  } else if (radios.length) {
    ev.radios(formgroup, radios);
  } else if (checkbox.length) {
    ev.checkBox(formgroup, checkbox);
  } else if (textarea.length) {
    ev.textfield(formgroup, textarea);
  } else {
    ev.textfield(formgroup, textfield);
  }
};

ev.select = function(field) {

};

ev.radios = function(field) {

};

ev.checkbox = function(field) {

};

ev.textfield = function(formgroup, field) {
  if(!field.val()) {
    formgroup.data('invalid', true);
    ev.showFieldError(formgroup);
  }
};

ev.showFieldError = function(formgroup) {
  var errormessage = formgroup.addClass('error').data('error'),
    label = formgroup.find('label');

  label.addClass('form-label-bold')
    .append('<span class="error-message">' + errormessage + '</span>');
};
(function(){
  // $('form').on('submit', function (event) {
    ev.checkFields();
  // });
})();
