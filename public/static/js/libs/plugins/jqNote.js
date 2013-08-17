/*
    #qNote{position: fixed;width: 950px;z-index: 89;top:0px;}
    #user-top-panel{margin-top:6px;}
    #user-top-panel a{color:#000;text-decoration:none;}
*/
/*show notification status*/
var qNote = function (type, msje, $target) {
 this.statusAndColors = { 'error': 'alert-error', 'success': 'alert-success', 'default': 'alert-info' },
 this.stqNote = 'qNote';
 this.$tmpl = $('<div class="alert" style="display:none;"></div>').attr('id',this.stqNote);
 this.$target = $target;
 this.msje = msje;
 this.type = type;
};
qNote.prototype.build = function () {
 this.$Target = (typeof $target === 'undefined') ? $("body").find("#wrapper") : this.$target,
 this.$tmpl.html('<span class="qNote-msje">' + this.msje + '</span><button id="qNoteClose" data-dismiss="alert" class="close" type="button">×</button>');
 if (!this.type) {
  this.type = this.statusAndColors['default'];
 }
};
qNote.prototype.render = function () {
 this.build();
 if ($('#' + this.stqNote).length) {
  this.close();
  $('#' + this.stqNote).find(".qNote-msje").html(this.msje).slideDown('slow');
 } else {
  this.$Target.prepend(this.$tmpl);
 }
 this.$Target.find('#' + this.stqNote).slideDown('slow').addClass(this.statusAndColors[this.type]);
};
qNote.prototype.close = function (time) {
 var time = null || time;
 $('#' + this.stqNote).slideUp('slow');
 $('#' + this.stqNote).removeClass(this.statusAndColors[this.type]);
 if (time) {
     clearTimeout(time);
 }
};
$.qNote = function (type, msje, $target) {
 var objNote = new qNote(type, msje, $target);
 objNote.render();
 //autoclose
 var closeTimeout = setTimeout(function () {
     objNote.close(closeTimeout);
 }, 7000);
 $("#qNoteClose").live('click', function () {
     objNote.close(closeTimeout);
 });
}