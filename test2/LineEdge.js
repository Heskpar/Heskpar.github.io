'use strict'

function createLineEdge() {
  let start = undefined
  let end = undefined
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    draw: () => {
      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      const startBounds = start.getBounds() 
      const endBounds = end.getBounds() 
      const p = center(startBounds) // Just pick the center of the bounds for now
      const q = center(endBounds) // Not the "connection points" that graphed2 uses
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(q.x, q.y)
      ctx.stroke()
    },

    connectTwoNode: () => {
      var canvas = document.getElementById("graphpanel");
      var ctx = canvas.getContext("2d");
      var flag = false;
      var tc = document.createElement("canvas");
      tc.width = canvas.width;
      tc.height = canvas.height;
      var tctx = tc.getContext("2d");
      var x = 0;
      var y = 0;

      canvas.onmousedown = function (event) {
        event = event || window.event;
        x = event.clientX - canvas.offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft);
        y = event.clientY - canvas.offsetTop  + (document.body.scrollTop || document.documentElement.scrollTop);
        flag = true;
        tctx.drawImage(canvas,0,0,canvas.width,canvas.height);
      }
      canvas.onmousemove = function (event) {
        if (!flag) return;
        event = event || window.event;
        var gx = event.clientX - canvas.offsetLeft + (document.body.scrollLeft || document.documentElement.scrollLeft);
        var gy = event.clientY - canvas.offsetTop  + (document.body.scrollTop || document.documentElement.scrollTop);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(tc,0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(gx,gy);
        ctx.stroke();
      }
      canvas.onmouseup = function (e) {
        flag = false;
      }
    }
  }
}
