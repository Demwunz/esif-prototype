var v = window.v || {};
// v is an abbreviation of "validate"

v.defaults = {
  select : {
    fields : 'select',
    label : 'label',
    error : 'Choose an option',
    validation : 'checked'
  },
  radio : {
    fields : ':radio',
    label : 'h2',
    error : 'Choose an option',
    validation : 'checked'
  },
  checkbox : {
    fields : ':checkbox',
    label : 'h2',
    error : 'Must be checked',
    validation : 'checked'
  },
  textfield : {
    fields : 'input[type="text"], input[type="password"], input[type="number"], textarea',
    label : 'label',
    error : 'Cannot be empty',
    validation: 'populated'
  },
  date : {
    fields : 'input',
    label : 'legend',
    error : 'Must have correct date format',
    validation: 'populated'
  }
};

v.checkFields = function() {
  var formgroups = $('[data-required]');

  formgroups.each(function(i, el) {
    var formgroup = $(el);
      v.field(formgroup);
  });
};
v.setField = function(valid, formgroup, label) {
  if(valid) {
    v.resetFieldErrors(formgroup, label);
  } else {
    v.showFieldErrors(formgroup, label);
  }
};
v.resetFieldErrors = function(formgroup, label) {
  label.removeClass('form-label-bold');
  formgroup
    .data('invalid', false)
    .find('.error-message').remove();
};
v.field = function(formgroup) {
    var params = v.defaults[formgroup.data('field')],
      customParams = (function customParams() {
      var custom = formgroup.data('params');
        if(custom) {
          $.map(custom, function( val, key ) {
            return params[key] = val;
          });
        }
    })(),
    valid = function() {
      var fields = formgroup.find(params.fields),
      validation = params.validation;

      if(formgroup.data('field') === 'select') {
        validation = !fields[0].selectedIndex;
      }

      return v[params.validation](fields);
    },
    label = formgroup.find(params.label);
    v.setField(valid(), formgroup, label);
};

v.populated = function(fields) {
  return fields.filter(function(i, el) {
    return $(el).val();
  }).length;
};

v.checked = function(fields) {
  return fields.filter(function(i, el) {
    return $(el).is(':checked');
  }).length;
};

v.showFieldErrors = function(formgroup, label) {
  var error_message,
    data_error = formgroup.data('error'),
    page_error_list = $('#field-errors').find('ul');

  if(data_error) {
    error_message = data_error;
  } else {
    error_message = v.defaults[formgroup.data('field')].error;
  }

  formgroup.addClass('error').data('invalid', true);

  label
    .addClass('form-label-bold')
    .append('<span class="visually-hidden">:</span><span class="error-message">' + error_message + '</span>');
};

(function(){
  'use strict';
  $('form').on('submit', function (event) {
    v.checkFields();
    return false;
  });
})();
