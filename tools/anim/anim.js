  $(document).ready(function () {
      var Layout_Size_Width = 720;
      var Layout_Size_Height = 550;
      var X1 = 0,
          X2 = 0,
          Y1 = 0,
          Y2 = 0;
      $('#anim_1_x1,#anim_1_y1').on('input propertychange ', function () {
          X1 = $('#anim_1_x1').val() * Layout_Size_Width;
          Y1 = $('#anim_1_y1').val() * Layout_Size_Height;
          $("#anim_1").css({
              "margin-left": X1 + "px",
              "margin-top": Y1 + "px",
          });
      });

      $("#play").click(function () {
          X2 = $('#anim_1_x2').val() * Layout_Size_Width;
          Y2 = $('#anim_1_y2').val() * Layout_Size_Height;
          var Speed = parseInt($('#speed').val());
          $("#anim_1").animate({
              "margin-left": X2 + "px",
              "margin-top": Y2 + "px",
          }, Speed, 'easeInOutBack');

          $("#ini").html("[Anim1]<br>Type=1<br>X=" + X1 / Layout_Size_Width + "," + X2 / Layout_Size_Width + "<br>Y=" + Y1 / Layout_Size_Height + "," + Y2 / Layout_Size_Height + "<br>Duration=" + Speed);

      });

  });
