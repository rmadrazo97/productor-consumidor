    function getP() {
        $.ajax({
          url:  'https://productor.azurewebsites.net/prod/numero',
          type: 'GET',
          dataType: 'json',
          headers: {
            //WRITE IF THEIR HAVE SOME HEADER REQUEST OR DATA
          },
          crossDomain: true,
          success: function (data, textStatus, xhr) {
            console.log(data);
            getLog();
            getProducers();
            $('#result').html(data);
          },
          error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        });
    }  

    function getO() {
        $.ajax({
          url:  'https://productor.azurewebsites.net/prod/operaciones',
          type: 'GET',
          dataType: 'json',
          headers: {
            //WRITE IF THEIR HAVE SOME HEADER REQUEST OR DATA
          },
          crossDomain: true,
          success: function (data, textStatus, xhr) {
            console.log(data);
            $('#operaciones').html(data);
          },
          error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        });
    } 

    function getActivar() {
        $.ajax({
          url:  'https://productor.azurewebsites.net/prod/activar',
          type: 'GET',
          dataType: 'json',
          headers: {
            //WRITE IF THEIR HAVE SOME HEADER REQUEST OR DATA
          },
          crossDomain: true,
          success: function (data, textStatus, xhr) {
            console.log(data);
            getP();
            getO();
            $('#actionTxt').html('1 Productor Activado');
            $('#toastHd').addClass('text-success');
            $('#actionToast').toast('show'); 
          },
          error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        });
    } 

    function getDesActivar() {
        $.ajax({
          url:  'https://productor.azurewebsites.net/prod/desactivar',
          type: 'GET',
          dataType: 'json',
          headers: {
            //WRITE IF THEIR HAVE SOME HEADER REQUEST OR DATA
          },
          crossDomain: true,
          success: function (data, textStatus, xhr) {
            console.log(data);
            getP();
            getO();
            
            $('#actionTxt').html('1 Productor Des-Activado');
            $('#toastHd').addClass('text-danger');
            $('#actionToast').toast('show'); 
          },
          error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        });
    } 

    function getLog() {
        $('#logDiv').empty();
        $.ajax({
          url:  'https://productor.azurewebsites.net/prod/log',
          type: 'GET',
          dataType: 'json',
          headers: {
            //WRITE IF THEIR HAVE SOME HEADER REQUEST OR DATA
          },
          crossDomain: true,
          success: function (data, textStatus, xhr) {
            //console.log(data);
            const data2 = data.reverse();
            data2.forEach(function(log){
                //console.log(log);
                var type = log.slice(0,3);
                var bgColor;
                if (type == "err"){
                    bgColor = "bg-danger";
                } else if (type == "ini"){
                    bgColor = "bg-info";
                } else if (type == "nor") {
                    bgColor = "bg-secondary";
                } else if (type == "exi"){
                    bgColor = "bg-success";
                } else if (type == "tra"){
                    bgColor = "bg-primary";
                } else if (type == "des"){
                    bgColor = "bg-warning";
                }
                //console.log(type);
                $('#logDiv').append(
                    '<div class="card text-white '+bgColor+' shadow mb-2">'+
                    '<div class="card-body pb-1 pt-1">'+
                        '<p class="d-inline-block m-0 ml-2">'+log+'</p>'+
                    '</div>'+
                '</div>'
                );
            })
          },
          error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        });
    } 

    function getProducers() {
        $('#producersDiv').empty();
        $.ajax({
          url:  'https://productor.azurewebsites.net/prod/status',
          type: 'GET',
          dataType: 'json',
          headers: {
            //WRITE IF THEIR HAVE SOME HEADER REQUEST OR DATA
          },
          crossDomain: true,
          success: function (data, textStatus, xhr) {
            console.log(data);
            data.forEach(function(log){
                console.log(log);
                if(log.status){
                    var textS = "text-success";
                   var badgeS = "badge-success";
                } else {
                    var textS = "text-danger";
                    var badgeS = "badge-danger";
                   }
                $('#producersDiv').append(
                '<div class="card shadow border-left-primary py-2 mb-2">'+
                    '<div class="card-body pb-1 pb-1">'+
                        '<div class="row align-items-center no-gutters">'+
                            '<div class="col mr-2">'+
                                '<div class="text-uppercase text-primary font-weight-bold text-xs mb-1"><span class="text-primary" style="font-size: 14px;">Productor</span></div>'+
                                '<div class="text-dark font-weight-bold h5 mb-0"><span>ID:</span><span class="ml-2" style="font-weight: 500;">'+log.id+'</span></div>'+
                                '<div class="text-dark font-weight-bold h5 mb-0"><span>Position:</span><span class="ml-2" style="font-weight: 500;">'+log.position+'</span></div>'+
                                '<div class="text-dark font-weight-bold h5 mb-0"><span>Status:</span><span class="badge '+badgeS+' ml-2" style="font-weight: 500;">'+log.status+'</span></div>'+
                                '<div class="text-dark font-weight-bold h5 mb-0"><span>Work:</span><span class="ml-2" style="font-weight: 500;">'+log.work+'</span></div>'+
                            '</div>'+
                            '<div class="col-auto"><i class="fab fa-product-hunt fa-2x '+textS+'"></i></div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
                );
            })
          },
          error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        });
    } 
// ----------------------------------------

function getColaSize() {
        $.ajax({
          url:  'https://listener2020.herokuapp.com/cola-size/',
          type: 'GET',
          dataType: 'json',
          headers: {
            //WRITE IF THEIR HAVE SOME HEADER REQUEST OR DATA
          },
          crossDomain: true,
          success: function (data, textStatus, xhr) {
            console.log('size cola: '+data);
          },
          error: function (xhr, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        });
    }  
