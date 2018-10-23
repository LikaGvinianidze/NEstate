var StateSettings = function () {

  /*
    Private Functions
  */

  $.unitOptions = {
    currency : [],
    area: [],
    hotWater: [],
    parking: [],
    store: [],
    heating: [],
    exchange: [],
    status: {
      flat: [],
      house: [],
      comercial: [],
      land: []
    },
    flatType: []
  };

  $.buildOPtions = function (optionsArr, id) {
    var options = optionsArr.map(function (option) {
      if (option.hasOwnProperty('is_city')) {
        if (option.is_city)
          return `<option iscity=${option.is_city} value="${option.id}">${option.name}</option>`;
        return `<option value="${option.id}">${option.name}</option>`;
      }
      return `<option value="${option.id}">${option.name}</option>`;
    });

    $(`#${id}`).append(options).selectpicker('refresh');
  }

  var setStateTypes = function (types) {
    $.buildOPtions(types, 'state_type');

    $('#state_type option').each(function () {
      switch ($(this).text()) {
        case 'ბინა': $(this).attr('reference', 'flat'); break;
        case 'სასტუმრო': $(this).attr('reference', 'hotel'); break;
        case 'კომერციული ფართი': $(this).attr('reference', 'comercial'); break;
        case 'მიწის ნაკვეთი': $(this).attr('reference', 'land'); break;
        case 'კერძო სახლი': $(this).attr('reference', 'house'); break;
        default: return;
      }
    });
  }

  var setTransactionTypes = function (types) {
    $.buildOPtions(types, 'transaction_type');
  }

  var setAreaTypes = function (types) {
    types.forEach(function(type) {
      switch (type.name) {
        case 'm2': $.unitOptions.area.push({id: type.id, name: 'მ²'}); break;
        case 'ha': $.unitOptions.area.push({id: type.id, name: 'ჰა'}); break;
        case '1/100': $.unitOptions.area.push({id: type.id, name: '1/100'}); break;
        default: return;
      }
    });

    var m2 = $.unitOptions.area.filter(function(item) {
      return item.name === 'მ²'
    });
    $.buildOPtions(m2, 'area_unit');
  }

  var setCurrencies = function (currencies) {
    currencies.forEach(function(type) {
      switch (type.name) {
        case 'lari': $.unitOptions.currency.push({id: type.id, name: '₾'}); break;
        case 'dollar': $.unitOptions.currency.push({id: type.id, name: '$'}); break;
        case 'euro': $.unitOptions.currency.push({id: type.id, name: '€'}); break;
        default: return;
      }
    });
    $.buildOPtions($.unitOptions.currency, 'currency');
  }

  var setMunicipalities = function (municipalities) {
    $.buildOPtions(municipalities, 'm_select2_1');
  }

  var setClients = function (clients) {
    $.buildOPtions(clients, 'm_select2_13');
  }

  var setConditions = function (conditions) {
    $.buildOPtions(conditions, 'condition');
  }

  var setEnumsToProps = function (enums) {
    for (var enumKey in enums) {
      if (enums.hasOwnProperty(enumKey)) {
        var obj = enums[enumKey];
        if (enumKey === 'status') {
          for (var key in obj) {
            for (var objKey in obj[key]) {
              $.unitOptions[enumKey][key].push({name: obj[key][objKey], id: objKey});
            }
          }
        } else {
          for (var key in obj) {
            $.unitOptions[enumKey].push({name: obj[key], id: key});
          }
        }
      }
    }
  }

  var setProjects = function (projects) {
    $.buildOPtions(projects, 'm_select2_12');
  }

  /*
    Public Functions
  */

  var getMainData = function () {
    $.ajax({
      url: `/states/create/get-fields`,
      type: 'GET',
      success: function (result) {
        var {
          transactionTypes,
          stateTypes,
          areaTypes,
          currencies,
          municipalities,
          conditions,
          projects,
          clients,
          enums
        } = result;

        setTransactionTypes(transactionTypes);
        setStateTypes(stateTypes);
        setAreaTypes(areaTypes);
        setCurrencies(currencies);
        setMunicipalities(municipalities);
        setConditions(conditions);
        setProjects(projects);
        setClients(clients);
        setEnumsToProps(enums);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }


  return {
    init: function () {
      getMainData();
    }
  }

}();

$(document).ready(function () {
  StateSettings.init();
});
