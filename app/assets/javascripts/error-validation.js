var ev = window.ev || {};
// ev is an abbreviation of "error validation"

ev.defaults = {
  errors : {
    radio : 'Choose an option',
    checkbox : 'Must be checked',
    textfield : 'Cannot be empty',
    date : 'Must have correct date format',
    select : 'Choose an option'
  }
};

ev.checkFields = function() {
  var formgroups = $('[data-required]');

  formgroups.each(function(i, el) {
    var formgroup = $(el);
    var type = formgroup.data('field');

    if(formgroup.data('invalid')) {

    } else {
      ev.field[type](formgroup);
    }

  });
};
ev.setField = function(invalid, formgroup, label) {
  if(invalid) {
    ev.showFieldError(formgroup, label);
  } else {
    ev.resetField(formgroup, label);
  }
}
ev.resetField = function(formgroup, label) {
  label.removeClass('form-label-bold');
  formgroup.data('invalid', false);
}
ev.field = {
  select : function(formgroup) {
    var select = formgroup.find('select');
    var label = formgroup.find('label');
    var selected_option = !select[0].selectedIndex;

    ev.setField(selected_option, formgroup, label);

  },
  radio : function(formgroup) {
    var radios = formgroup.find(":radio");
    var label = formgroup.find('h2');
    var not_checked = !ev.checked(radios);

    ev.setField(not_checked, formgroup, label);
  },
  checkbox : function(formgroup) {
    var checkox = formgroup.find(":checkbox");
    var label = formgroup.find('label');
    var not_checked = !ev.checked(checkox);

    ev.setField(not_checked, formgroup, label);

  },
  textfield : function(formgroup) {
    var field = formgroup.find('input');
    var label = formgroup.find('label');
    var not_filled = !ev.populated(field);

    ev.setField(not_filled, formgroup, label);

  },
  date : function(formgroup) {
    var fields = formgroup.find('input');
    var label = formgroup.find('legend');
    var filled_fields = ev.populated(fields) !== 3;

    ev.setField(filled_fields, formgroup, label);
  }
};

ev.populated = function(fields) {
  return fields.filter(function(i, el) {
    return $(el).val();
  }).length;
};

ev.checked = function(fields) {
  return fields.filter(function(i, el) {
    return $(el).is(':checked');
  }).length;
};

ev.showFieldError = function(formgroup, label) {
  var error_message;
  var data_error = formgroup.data('error');

  if(typeof data_error === undefined) {
    error_message = formgroup.data('error');
  } else {
    error_message = ev.defaults.errors[formgroup.data('field')];
  }

  formgroup.addClass('error').data('invalid', true);

  label.addClass('form-label-bold')
    .append('<span class="error-message">' + error_message + '</span>');
};

(function(){
  'use strict';
  $('form').on('submit', function (event) {
    ev.checkFields();
    return false;
  });
})();
