$(document).ready( function() {
  var table = $('#dataTable').DataTable( {
    dom: 'lfrtiBp',
    buttons: [{
      customize: function (xlsx) {
        var sheet = xlsx.xl.worksheets['sheet1.xml'];
        var col = $('col', sheet);
        $('row c[r^="A"]', sheet).attr( 's', '51' );
        $('row c[r^="B"]', sheet).attr( 's', '51' );
        $('row c[r^="C"]', sheet).attr( 's', '51' );
        $('row c[r^="D"]', sheet).attr( 's', '51' );
        $('row c[r^="E"]', sheet).attr( 's', '51' );
        $('row c[r^="F"]', sheet).attr( 's', '51' );
        $('row c[r^="G"]', sheet).attr( 's', '51' );
        $('row c[r^="H"]', sheet).attr( 's', '51' );
        $('row c[r^="I"]', sheet).attr( 's', '51' );
        $('row c[r^="J"]', sheet).attr( 's', '51' );
        $('row c[r^="K"]', sheet).attr( 's', '51' );
        $('row c[r^="L"]', sheet).attr( 's', '51' );
        $('row c[r^="M"]', sheet).attr( 's', '51' );
        col.each(function () {
          $(this).attr('width', 30);
        });

      },
      extend: 'excel',
      text: 'Excel &nbsp;<i class="fas fa-download fa-sm text-white-50"></i>',
      title: title,
      className: 'btn btn-primary',
      exportOptions: {
        columns: excel
      }
    }],
    "columnDefs": [ {
      // "searchable": false,
      "orderable": false,
      "class": "index",
      "targets" : no_order
    }],
    "footerCallback": function() {
      var api = this.api(), data, data_get_money, data_price, data_fee, data_state;
      var result_get_money = 0;
      var result_price = 0;
      var result_fee = 0;
      var result = 0;
      var count1 = 0;
      var count2 = 0;
      var count3 = 0;
      if(type == "withdraw") {
        api.column(footer_get_money, {search:'applied'}).data().each(function(data,index) {
          data_get_money = data.substring(2);
          result_get_money += parseInt(data_get_money.replace(/,/g,""));
        });
        api.column(footer_price, {search:'applied'}).data().each(function(data,index) {
          data_price = data.substring(2);
          result_price += parseInt(data_price.replace(/,/g,""));
        });
        result_fee = result_price - result_get_money;
        $(api.column(footer_get_money).footer()).html('?????? ?????? ?????? [ TOTAL &nbsp; : &nbsp; &#8361; ' + result_price.toLocaleString() +
        ' ]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;??? ?????? ?????? [ TOTAL &nbsp; :&nbsp; &#8361; ' + result_get_money.toLocaleString() +
        ' ]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;??? ?????? [ TOTAL &nbsp; :&nbsp; &#8361; ' + result_fee.toLocaleString() + ' ]');
        var string = '?????? ?????? ?????? [ TOTAL : ??? ' + result_price.toLocaleString() + ' ]  -  ??? ?????? ?????? [ TOTAL : ??? ' + result_get_money.toLocaleString() + ' ]  =  ??? ?????? [ TOTAL : ??? ' + result_fee.toLocaleString() + ' ]';
        if ( $('#caption').length == 0) {
          $('#dataTable').append('<caption id="caption" style="caption-side: bottom"></caption>');
        }
        $('#caption').text(string);
        $('#caption').hide();
      } else if(type == "payment") {
        api.column(footer_state, {search:'applied'}).data().each(function(data,index) {
          data_state = data;
          if(data_state == '?????? ??????') {
            api.column(footer, {search:'applied'}).data().each(function(data,index_2) {
              if(index == index_2) {
                data_price = data.substring(2);
              }
            });
            count1 +=1;
            result_price += parseInt(data_price.replace(/,/g,""));
          } else if(data_state == '??????') {
            api.column(footer, {search:'applied'}).data().each(function(data,index_2) {
              if(index == index_2) {
                data_get_money = data.substring(2);
              }
            });
            count2 +=1;
            result_get_money += parseInt(data_get_money.replace(/,/g,""));
          } else if(data_state == '?????? ??????') {
            api.column(footer, {search:'applied'}).data().each(function(data,index_2) {
              if(index == index_2) {
                data_fee = data.substring(2);
              }
            });
            count3 +=1;
            result_fee += parseInt(data_fee.replace(/,/g,""));
          }
        });
        api.column(footer, {search:'applied'}).data().each(function(data,index) {
          data = data.substring(2);
          result += parseInt(data.replace(/,/g,""));
        });
        count4 = count1+count2+count3;
        $(api.column(footer_get_money).footer()).html('??? ?????? ?????? [ TOTAL (' + count4 +')&nbsp; : &nbsp; &#8361; ' + result.toLocaleString() +
        ' ]&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;?????? ?????? [ TOTAL (' + count3 +')&nbsp; :&nbsp; &#8361; ' + result_fee.toLocaleString() +
        ' ]&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;?????? [ TOTAL (' + count2 +')&nbsp; :&nbsp; &#8361; ' + result_get_money.toLocaleString() +
        ' ]&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;?????? ?????? [ TOTAL (' + count1 +')&nbsp; :&nbsp; &#8361; ' + result_price.toLocaleString() + ' ]');
        var string = '??? ?????? ?????? [ TOTAL ('+count4+') : ??? '+ result.toLocaleString() + ' ]  -  ?????? ?????? [ TOTAL ('+count3 +') : ??? ' + result_fee.toLocaleString() + ' ]  -  ?????? [ TOTAL ('+count2 +') : ??? ' + result_get_money.toLocaleString() + ' ]  =  ?????? ?????? [ TOTAL ('+count1+') : ??? ' + result_price.toLocaleString() + ' ]';
        if ( $('#caption').length == 0) {
          $('#dataTable').append('<caption id="caption" style="caption-side: bottom"></caption>');
        }
        $('#caption').text(string);
        $('#caption').hide();
      } else if(type == "request") {
        api.column(footer, {search:'applied'}).data().each(function(data,index) {
          data = data.substring(2);
          result += parseInt(data.replace(/,/g,""));
        });
        $(api.column(footer).footer()).html('TOTAL &nbsp; : &nbsp; &#8361; ' + result.toLocaleString());
        var string = 'TOTAL : ??? ' + result.toLocaleString();
        if ( $('#caption').length == 0) {
          $('#dataTable').append('<caption id="caption" style="caption-side: bottom"></caption>');
        }
        $('#caption').text(string);
        $('#caption').hide();
      }
      else {
      }
    },
    "ordering": true,
    // "orderMulti": false,
    "info" : true,
    // "paging" : false,
    "order" : [ [ index , "desc" ] ],
    "filter" : true,
    // "lengthChange":true,
    "stateSave" : false,
    "pagingType": "first_last_numbers",
    "language": {
      "search" : "in Search",
      "infoEmpty": "Total : 0",
      "info": "Total : _TOTAL_",
      "zeroRecords": "???????????? ???????????? ?????????.",
      "infoFiltered": "/ _MAX_",
      "lengthMenu": 'Show <select name="dataTable_length" aria-controls="dataTable" class="custom-select custom-select-sm form-control form-control-sm">'+
                   '<option value="10">10</option>'+
			             '<option value="15">15</option>'+
			             '<option value="20">20</option>'+
			             '<option value="-1">??????</option>'+
			             '</select>',
        "paginate": {
          "last": "?????????",
          "first": "??????"
        }
      }
    });



    //????????? ????????? ??????
    table.on( 'order.dt search.dt', function () {
      table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
        cell.innerHTML = i+1;
      });
    }).draw();


    //?????????????????? ????????? ??????
    $('#dataTable_filter').prepend('<select class="custom-select custom-select-sm form-control form-control-sm" style="width:155px; margin-right:10px" id="select"></select>');


    //?????????????????? ?????? ?????? ?????????
    $('.dataTables_filter input').unbind();
    $('.dataTables_filter input').attr('name','search');
    $('.dataTables_filter input').keyup(function () {
      var colIndex = $("#select option:selected").val();
      table.columns(colIndex).search(this.value).draw();
    });

    //??????????????????, ??????????????? ??????
    $("#date_from, #date_to").change(function () {
      table.draw();
      $('.dataTables_filter input').attr('value',$('.dataTables_filter input').val());
    })
  });
