var selectDepends={
	"#step2":[
		{ids:['#idDpto','#idProvin'], url:'ubigeo/provincias-por-departamento/id/$0'},
        {ids:['#idProvin','#idDistrito'], url:'ubigeo/distritos-por-provincia/id/$0'},
        {ids:['#idDistrito','#idUrbzn'], url:'ubigeo/urbanizacion-por-distrito/id/$0/type/$1',routes:{
    		"1":function(){
	            var select=$("#localzdo").val();
	            return (select=="3")?"2":"1";
      		}
       	}}
        ],
    "#step4":[
        {ids:['#selDepartamento','#selProvincia'], url:'ubigeo/provincias-por-departamento/id/$0'},
        {ids:['#selProvincia','#selDistrito'], url:'ubigeo/distritos-por-provincia/id/$0'}
        ],
    "#perfil":[
        {ids:['#selDepartamento','#selProvincia'], url:'ubigeo/provincias-por-departamento/id/$0'},
        {ids:['#selProvincia','#selDistrito'], url:'ubigeo/distritos-por-provincia/id/$0'}
    ],
    "#alert":[
        {ids:['#idDpto','#selProv'], url:'ubigeo/provincias-por-departamento/id/$0',callback:{
            "before":function(){
                $("#selDist2,#selDist3").html('').append('<option value="">No hay registros</option>').prop('disabled', true);
            }
        }},
        {ids:['#selProv','#selDist1'], url:'ubigeo/distritos-por-provincia/id/$0', callback:{
            "before":function(){
                $("#selDist2,#selDist3").html('').append('<option value="">No hay registros</option>').prop('disabled', true);
            },
            "after":function(json){
                var selects=$("#selDist2,#selDist3");
                utils.validAjax(json,{
                    "success":function(result){
                        var arr=result.data["src"];
                        selects.html('').prop('disabled', false);
                        $.each(arr, function(index,element){
                            for(var i in element){
                                selects.append('<option value="'+i+'">'+element[i]+'</option>');
                            }
                        });
                    }
                });
            }
        }}
    ],
    "#listado":[
        {ids:['#selDepartamento','#selProvincia'], url:'ubigeo/provincias-por-departamento/id/$0', callback:{
                "before": function(){
                  $("#selProvincia").html('').append('<option value="">Seleccione</option>').prop('disabled', true);
                  var methods = $('input[name=txtDistrito]').data('methods');
                  methods.hideContainer();
                  methods.disable();
                  methods.reset();
                }
        }}
    ]
};