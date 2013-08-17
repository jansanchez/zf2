yOSON.require={
    "#frmSuscribir":{
        rules:{
            txtEmail:{
                required: true,
                emailUrbania: true,
                maxlength: 100
            }
        },
        tipsyOrientation : "w"
    },
	"#frm-DatosTienda":{
        rules:{
            txtReason:{
                required: true,
                razsoc: true,
                myMinLength:4,
                myMaxLength:100
            },
            txtName:{
                required: true,
                myMinLength:4,
                myMaxLength:100
            },
            txtMail:{
                required: true,
                emailUrbania: true,
                maxlength: 100
            },
            txtPhone:{
                required: true,
                phone: true
            }
        }
	},
    "#frm-comprobante":{
        rules:{
            txtName: {
                required: true
            },
            txtDni: {
                dni: true
            },
            txtRuc: {
                ruc: true,
                required: true
            },
            txtRazonSocial: {
                required: true
            },
            txtApePaterno:{
                required: true,
                nombre: true
            },
            txtApeMaterno:{
                required: true,
                nombre: true
            },
            txtNombre: {
                required: true,
                nombre: true
            },
            txtDireccion:{
                required: true
            }
        },
        onkeyup: false,
        messages:{
            txtName: {
                required: "Es requerido."
            },
            txtRuc: {
                required: "Es requerido."
            },
            txtRazonSocial: {
                required: "Es requerido."
            },
            txtApePaterno: {
                required: "Es requerido."
            },
            txtDireccion:{
                required: "Es requerido."
            }
        }
    },
    "#formStep2":{
        rules:{
            tipoTransac :{
                required : true
            },
            localzdo:{
                required : true
            },
            tipoInm:{
                required : true
            },
            dormtro:{
                required : true,
                digits: true,
                min: 0,
                max: 10
            },
            banio:{
                required : true,
                digits: true,
                min: 0,
                max: 20
            },
            medioBanio:{
                required : false,
                digits: true,
                min: 0,
                max: 10
            },
            estacionmto:{
                required : false,
                digits: true,
                min: 0,
                max: 50
            },
            areaTerreno:{
                required : true,
                decimals2 :true
            },
            areaConstruida:{
                required : true,
                decimals2 :true
            },
            anio:{
                required : false,
                digits: true,
                min: 0,
                max: 100  
            },
            telef01:{
                required :true,
                digits: true,
                minlength : 7,
                maxlength : 9
            },
            telef02:{
                digits: true,
                minlength : 7,
                maxlength : 9
            },
            fila:{
                required : false,
                digits: true,
                min: 0,
                max: 10 
            },
            cama:{
                required : false,
                digits: true,
                min: 0,
                max: 30 
            },
            idDpto:{
                required : true,
                valueNotEquals : '0'
            },
            idProvin:{
                required : true,
                valueNotEquals : '0'    
            },
            idDistrito:{
                required : true,
                valueNotEquals : '0'      
            }
        },
        messages:{
            tipoTransac :{
                required : "Este campo es necesario"
            },
            localzdo:{
                required : "Este campo es necesario"
            },
            tipoInm:{
                required : "Este campo es necesario"
            },
            dormtro:{
                required : "Este campo es necesario",
                digits: "Ingrese un numero entero",
                min: "Ingrese un numero igual o mayor a 0",
                max: "Ingrese un numero igual o menor a 10"
            },
            banio:{
                required : "Este campo es necesario",
                digits: "Ingrese un numero entero",
                min: "Ingrese un numero igual o mayor a 0",
                max: "Ingrese un numero igual o menor a 20"
            },
            medioBanio:{
                digits: "Ingrese un numero entero",
                min: "Ingrese un numero igual o mayor a 0",
                max: "Ingrese un numero igual o menor a 10"
            },
            estacionmto:{
                digits: "Ingrese un numero entero",
                min: "Ingrese un numero igual o mayor a 0",
                max: "Ingrese un numero igual o menor a 50"
            },
            areaTerreno :{
                required : "Este campo es necesario"
            },
            areaConstruida:{
                required : "Este campo es necesario"
            },
            anio:{
                digits: "Ingrese un numero entero",
                min: "Ingrese un numero igual o mayor a 0",
                max: "Ingrese un numero igual o menor a 100" 
            },
            telef01:{
                required : "Este campo es necesario",
                digits :'Ingrese solo números',
                minlength : "Mínimo 7 caracteres.",
                maxlength: "Máximo 9 caracteres."
            },
            telef02:{
                digits :'Ingrese solo números',
                minlength : "Mínimo 7 caracteres.",
                maxlength: "Máximo 9 caracteres."
            },
            fila:{
                digits: "Ingrese un numero entero",
                min: "Ingrese un numero igual o mayor a 0",
                max: "Ingrese un numero igual o menor a 10" 
            },
            cama:{
                digits: "Ingrese un numero entero",
                min: "Ingrese un numero igual o mayor a 0",
                max: "Ingrese un numero igual o menor a 30" 
            },
            idDpto:{
                required : "Este campo es necesario",
                valueNotEquals : "Este campo es necesario" 
            },
            idProvin:{
                required : "Este campo es necesario",
                valueNotEquals : "Este campo es necesario"    
            },
            idDistrito:{
                required : "Este campo es necesario",
                valueNotEquals : "Este campo es necesario"       
            }
        }
    }
};

/*
validateObj = {
            
        };

*/