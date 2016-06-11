var app = window.app || {};
// v is an abbreviation of "validate"

app.defaults = {
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

app.getFields = function() {
  var formgroups = $('[data-required]'),
    valid = 0;

  formgroups.each(function(i, el) {
    var formgroup = $(el),
      params = app.setParams(formgroup),
      value = app.checkFields(formgroup, params, i);

    valid = Math.abs(valid + value);
  });
  return formgroups.length === valid;
};

app.checkFields = function(formgroup, params, i) {
  //valid is a string: - 0 means no value, anything else means user entered some info
  var valid = app.validateField(formgroup, params);

  if(valid) {
    app.resetFieldErrors(formgroup, params, i);
  } else {
    app.setFieldErrors(formgroup, params, i);
  }
  return valid;
};

app.resetFieldErrors = function(formgroup, params, i) {
  $('#error-message-' + i).remove();
  formgroup
    .find(params.label)
    .removeClass('form-label-bold');
  formgroup
    .removeClass('error')
    .find('.error-message')
    .remove();
};

app.setParams = function(formgroup) {
  var params = app.defaults[formgroup.data('field')],
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

app.validateField = function(formgroup, params){
  var valid,
    field = formgroup.find(params.fields);

  if (params.fields === 'select') {
    valid = field[0].selectedIndex > 0 ? 1 : 0;
  } else if(params.fields === 'input:radio' || params.fields === 'input:checkbox'){
    valid = field.filter(function(i, el) {
      return $(el).is(':checked');
    }).length;
  } else {
    valid = field.val().length > 0 ? 1 : 0;
  }
  return valid;
};

app.setFieldErrors = function(formgroup, params, i) {
  var already_errored = formgroup.hasClass('error'),
    field = formgroup.find(params.fields),
    label = formgroup.find(params.label),
    field_id = field[0].id;
  if(!already_errored) {
    var error_summary_list = $('.error-summary').show().focus().find('ul'),
      li = $('<li id="error-message-' + i + '"><a href="#' + field_id + '">' + label.text() +  ' ' + params.error.toLowerCase() + '</a></li>');

    formgroup.addClass('error');

    error_summary_list.append(li);

    label
      .addClass('form-label-bold')
      .append('<span class="error-message">' + params.error + '</span>');
  }
};

(function() {
  'use strict';
  $('form').on('submit', function(event) {
    var valid = app.getFields();
    return false;
  });
})();
