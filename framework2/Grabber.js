function drawGrabber(x, y) {
    const size = 5;
    const panel = document.getElementById('graphpanel')
    const ctx = panel.getContext('2d')
    ctx.beginPath()
    ctx.rect(x - size / 2, y - size / 2 , size, size, Math.PI*2, true)
    ctx.fillStyle = 'black'
    ctx.fill()
}
