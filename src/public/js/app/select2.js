//== Class definition
var Select2 = function () {
  //== Private functions
  var demos = function () {
    // basic
    $('#m_select2_1, #m_select2_1_validate').select2({
      placeholder: "აირჩიეთ ერთერთი"
    });

    $('#m_select2_321, #m_select2_321_validate').select2({
      placeholder: "აირჩიეთ ერთერთი",
      minimumResultsForSearch: Infinity
    });

    $('#m_select2_001, #m_select2_001_validate').select2({
      placeholder: "აირჩიეთ",
      minimumResultsForSearch: Infinity
    });

    $('#m_select2_002, #m_select2_002_validate').select2({
      placeholder: "ქუჩა, უბანი, რაიონი, ქალაქი",
    });

    $('#m_select2_122, #m_select2_002_validate').select2({
      placeholder: "აირჩიეთ ",
      minimumResultsForSearch: Infinity
    });
 


    $('#m_select2_111, #m_select2_111_validate').select2({
      placeholder: "აირჩიეთ",
      minimumResultsForSearch: Infinity

    });

    $('#m_select2_state, #m_select2_state_validate').select2({
      placeholder: "აირჩიეთ",
      minimumResultsForSearch: Infinity

    });

    $('#m_select2_transaction, #m_select2_transaction_validate').select2({
      placeholder: "აირჩიეთ",
      minimumResultsForSearch: Infinity

    });

    $('#m_select2_222, #m_select2_222_validate').select2({
      placeholder: "აირჩიეთ ერთი ან რამდენიმე",
      minimumResultsForSearch: Infinity

    });
    $('#m_select2_333, #m_select2_222_validate').select2({
      placeholder: "აირჩიეთ ერთი ან რამდენიმე",
      minimumResultsForSearch: Infinity

    });
    $('#m_select2_444, #m_select2_444_validate').select2({
      placeholder: "აირჩიეთ ერთი ან რამდენიმე",
      minimumResultsForSearch: Infinity
    });
  
    $('#m_select2_0, #m_select2_1_validate').select2({

    });
    $('#m_select2_12, #m_select2_12_validate').select2({

    });
    $('#m_select2_13, #m_select2_1_validate').select2({

    });
    $('#m_select2_14, #m_select2_14_validate').select2({

    });
    $('#m_select2_15, #m_select2_15_validate').select2({

    });
    $('#m_select2_16, #m_select2_16_validate').select2({
      placeholder: "აირჩიეთ ერთი ან რამდენიმე",
      minimumResultsForSearch: Infinity
    });

    $('#m_select2_17, #m_select2_17_validate').select2({
      placeholder: "აირჩიეთ ერთი ან რამდენიმე",
      minimumResultsForSearch: Infinity
    });

    $('#hot_water_option, #hot_water_option_validate').select2({

    });
    $('#heating_option, #heating_option_validate').select2({

    });
    $('#parking_option, #parking_option_validate').select2({

    });
    $('#store_option, #store_option_validate').select2({

    });

    // nested
    $('#m_select2_2, #m_select2_2_validate').select2({
      placeholder: "აირჩიეთ ერთი ან რამდენიმე"
    });

    // multi select
    $('#m_select2_3, #m_select2_3_validate').select2({
      placeholder: "აირჩიეთ ერთი ან რამდენიმე",
    });

    // basic
    $('#m_select2_4').select2({
      placeholder: "აირჩიეთ ერთი ან რამდენიმე",
      allowClear: true
    });

    $('#m_select2_103').select2({
      placeholder: "კლიენტი",
      allowClear: true
    });
    // loading data from array
    var data = [{
      id: 0,
      text: 'Enhancement'
    }, {
      id: 1,
      text: 'Bug'
    }, {
      id: 2,
      text: 'Duplicate'
    }, {
      id: 3,
      text: 'Invalid'
    }, {
      id: 4,
      text: 'Wontfix'
    }];

    $('#m_select2_5').select2({
      placeholder: "Select a value",
      data: data
    });

    // loading remote data

    function formatRepo(repo) {
      if (repo.loading) return repo.text;
      var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__title'>" + repo.full_name + "</div>";
      if (repo.description) {
        markup += "<div class='select2-result-repository__description'>" + repo.description + "</div>";
      }
      markup += "<div class='select2-result-repository__statistics'>" +
        "<div class='select2-result-repository__forks'><i class='fa fa-flash'></i> " + repo.forks_count + " Forks</div>" +
        "<div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> " + repo.stargazers_count + " Stars</div>" +
        "<div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
        "</div>" +
        "</div></div>";
      return markup;
    }

    function formatRepoSelection(repo) {
      return repo.full_name || repo.text;
    }

    $("#m_select2_6").select2({
      placeholder: "Search for git repositories",
      allowClear: true,
      ajax: {
        url: "https://api.github.com/search/repositories",
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            q: params.term, // search term
            page: params.page
          };
        },
        processResults: function (data, params) {
          // parse the results into the format expected by Select2
          // since we are using custom formatting functions we do not need to
          // alter the remote JSON data, except to indicate that infinite
          // scrolling can be used
          params.page = params.page || 1;

          return {
            results: data.items,
            pagination: {
              more: (params.page * 30) < data.total_count
            }
          };
        },
        cache: true
      },
      escapeMarkup: function (markup) {
        return markup;
      }, // let our custom formatter work
      minimumInputLength: 1,
      templateResult: formatRepo, // omitted for brevity, see the source of this page
      templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
    });

    // custom styles

    // tagging support
    $('#m_select2_12_1, #m_select2_12_2, #m_select2_12_3, #m_select2_12_4').select2({
      placeholder: "Select an option",
    });

    // disabled mode
    $('#m_select2_7').select2({
      placeholder: "Select an option"
    });

    // disabled results
    $('#m_select2_8').select2({
      placeholder: "Select an option"
    });

    // limiting the number of selections
    $('#m_select2_9').select2({
      placeholder: "Select an option",
      maximumSelectionLength: 2
    });

    // hiding the search box
    $('#m_select2_10').select2({
      placeholder: "ცარიელი",
      minimumResultsForSearch: Infinity
    });

    $('#m_select2_101').select2({
      placeholder: "",
      minimumResultsForSearch: Infinity
    });
    $('#m_select2_102').select2({
      placeholder: "პერსონალი",
      minimumResultsForSearch: Infinity
    });

    $('#m_select2_103').select2({
      placeholder: "კლიენტი",
      // minimumResultsForSearch: Infinity
    });

    $('#emp_by_day').select2({
      placeholder: "პერსონალი",
    });

    $('#emp_by_period').select2({
      placeholder: "პერსონალი",
    });

    $('#m_select2_104').select2({
      placeholder: "სერვისი",
      minimumResultsForSearch: Infinity
    });
    $('#m_select2_105').select2({
      placeholder: "სტატუსი",
      minimumResultsForSearch: Infinity
    });

    // tagging support
    $('#m_select2_11').select2({
      placeholder: "Add a tag",
      tags: true
    });
  }

  var modalDemos = function () {
    $('#m_select2_modal').on('shown.bs.modal', function () {
      // basic
      $('#m_select2_1_modal').select2({
        placeholder: "აირჩიეთ ერთი ან რამდენიმე"
      });

      // nested
      $('#m_select2_2_modal').select2({
        placeholder: "აირჩიეთ ერთი ან რამდენიმე"
      });

      // multi select
      $('#m_select2_3_modal').select2({
        placeholder: "აირჩიეთ ერთი ან რამდენიმე",
      });

      // basic
      $('#m_select2_4_modal').select2({
        placeholder: "აირჩიეთ ერთი ან რამდენიმე",
        allowClear: true
      });
    });
  }

  //== Public functions
  return {
    init: function () {
      demos();
      modalDemos();
    }
  };
}();

//== Initialization
jQuery(document).ready(function () {
  Select2.init();
});