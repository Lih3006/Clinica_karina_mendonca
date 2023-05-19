$(document).ready(function () {
  (function ($) {
    'use strict';

    jQuery.validator.addMethod(
      'answercheck',
      function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
      },
      'type the correct answer -_-'
    );

    // validate contactForm form
    $(function () {
      $('#contactForm').validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
          },
          subject: {
            required: true,
            minlength: 4,
          },
          number: {
            required: true,
            minlength: 8,
          },
          email: {
            required: true,
            email: true,
          },
          message: {
            required: true,
            minlength: 20,
          },
        },
        messages: {
          name: {
            required: 'Digite seu nome',
            minlength: 'seu nome deve conter pelo menos 2 caracteres',
          },
          subject: {
            required: 'Falta preencher o assunto',
            minlength: 'Este texto deve conter pelo menos 2 caracteres',
          },
          number: {
            required: 'Falta inserir um número de telefone',
            minlength: 'O telefone deve conter pelo menos 8 caracteres',
          },
          email: {
            required: 'Favor inserir um  e-mail válido',
          },
          message: {
            required: 'Você precisa escrever algo para enviar esse formulário',
            minlength: 'Descreva um pouco mais',
          },
        },
        submitHandler: function (form) {
          $(form).ajaxSubmit({
            type: 'POST',
            data: $(form).serialize(),
            url: 'contact_process.php',
            success: function () {
              $('#contactForm :input').attr('disabled', 'disabled');
              $('#contactForm').fadeTo('slow', 1, function () {
                $(this).find(':input').attr('disabled', 'disabled');
                $(this).find('label').css('cursor', 'default');
                $('#success').fadeIn();
                $('.modal').modal('hide');
                $('#success').modal('show');
              });
            },
            error: function () {
              $('#contactForm').fadeTo('slow', 1, function () {
                $('#error').fadeIn();
                $('.modal').modal('hide');
                $('#error').modal('show');
              });
            },
          });
        },
      });
    });
  })(jQuery);
});
