var v = window.v || {};
// v is an abbreviation of "validate"

v.defaults = {
  select: {
    fields: 'select',
    label: 'label',
    error: 'Choose an option'
  },
  radio: {
    fields: 'input:radio',
    label: 'h2',
    error: 'Choose an option'
  },
  checkbox: {
    fields: 'input:checkbox',
    label: 'h2',
    error: 'Must be checked'
  },
  textfield: {
    fields: 'input:text, input[type="password"], input[type="number"], textarea',
    label: 'label',
    error: 'Cannot be empty'
  },
  date: {
    fields: 'input',
    label: 'legend',
    error: 'Must have correct date format'
  }
};

v.getFields = function() {
  var formgroups = $('[data-required]');

  formgroups.each(function(i, el) {
    var formgroup = $(el),
      params = v.setParams(formgroup);

    v.setField(formgroup, params);
  });
};

v.setField = function(formgroup, params) {
  var valid = v.validateField(formgroup, params);

  if(valid) {
    v.resetFieldErrors(formgroup, params);
  } else {
    v.setFieldErrors(formgroup, params);
  }
};

v.resetFieldErrors = function(formgroup, params) {
  formgroup
    .find(params.label)
    .removeClass('form-label-bold');
  formgroup
    .removeClass('error')
    .data('invalid', false)
    .find('.error-message')
    .remove();
};

v.setParams = function(formgroup) {
  var params = v.defaults[formgroup.data('field')],
    customParams = (function customParams() {
      var custom_params = formgroup.data('params');
      if (custom_params) {
        $.map(custom_params, function(val, key) {
          params[key] = val;
        });
      }
    })();
    return params;
};

v.validateField = function(formgroup, params){
  var valid,
    field = formgroup.find(params.fields);

  if (params.fields === 'select') {
    valid = field[0].selectedIndex;
  } else if(params.fields === 'input:radio' || params.fields === 'input:checkbox'){
    valid = field.filter(function(i, el) {
      return $(el).is(':checked');
    }).length;
  } else {
    valid = field.val();
  }
  return valid;
};

v.setFieldErrors = function(formgroup, params) {
  var field = formgroup.find(params.fields),
    label = formgroup.find(params.label),
    field_id = field[0].id,
    error_summary_list = $('.error-summary').show().find('ul');

  formgroup.addClass('error').data('invalid', true);

  error_summary_list
    .append('<li><a href="#' + field_id + '">' + label.text() +  ' ' + params.error.toLowerCase() + '</a></li>');

  label
    .addClass('form-label-bold')
    .append('<span class="visually-hidden">:</span><span class="error-message">' + params.error + '</span>');
};

(function() {
  'use strict';
  $('form').on('submit', function(event) {
    v.getFields();
    return false;
  });
})();
