window.onload = function(){
    var canvas = document.getElementById("snow");
    var ctx = canvas.getContext("2d");
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    var mp = 35;
    var particles = [];
    for(var i = 0; i < mp; i++)
    {
      particles.push({
        x: Math.random()*W, //x-coordinate
        y: Math.random()*H, //y-coordinate
        r: Math.random()*4+1, //radius
        d: Math.random()*mp //density
      })
    }
    function draw()
    {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      for(var i = 0; i < mp; i++)
      {
        var p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
      }
      ctx.fill();
      update();
    }
    var angle = 0;
    function update()
    {
      angle += 0.01;
      for(var i = 0; i < mp; i++)
      {
        var p = particles[i];
        p.y += Math.cos(angle+p.d) + 1 + p.r/2;
        p.x += Math.sin(angle) * 2;
        if(p.x > W+5 || p.x < -5 || p.y > H)
        {
          if(i%3 > 0)
          {
            particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
          }
          else
          {
            if(Math.sin(angle) > 0)
            {
              particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
            }
            else
            {
              particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
            }
          }
        }
      }
    }
    setInterval(draw, 22);
    }


      // Year, Month, Day, Hour, Minute, Second
      // THIS IS A UTC DATE!!! (CET = UTC+1, CEST = UTC+2) lul aisaka
      var end = new Date(Date.UTC(2019,1,31,22,59,59));
      // We need to substrat a month cuz javascript months are zero-based
      end.setMonth(end.getMonth() - 1);
      var _second = 1000;
      var _minute = _second * 60;
      var _hour = _minute * 60;
      var _day = _hour * 24;
      var timer;

      function pad(num, size) {
          var s = num+"";
          while (s.length < size) s = "0" + s;
          return s;
      }
      
      function showRemaining() {
          var now = new Date().getTime();
          var distance = end - now;
          if (distance <= 0) {

              clearInterval(timer);
              document.getElementById('countdown').innerHTML = 'OVER';

              return;
          }
          var days = Math.floor(distance / _day);
          var hours = Math.floor((distance % _day) / _hour);
          var minutes = Math.floor((distance % _hour) / _minute);
          var seconds = Math.floor((distance % _minute) / _second);

          document.getElementById('countdown').innerHTML = pad(days,2) + ' Days ';
          document.getElementById('countdown').innerHTML += pad(hours,2) + ' Hours ';
          document.getElementById('countdown').innerHTML += pad(minutes,2) + ' Minutes ';
          document.getElementById('countdown').innerHTML += pad(seconds,2) + ' Seconds';
      }

      timer = setInterval(showRemaining, 1000);

$(document).on('selectstart', false);
