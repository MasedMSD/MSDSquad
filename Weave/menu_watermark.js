var lerp = function(a, b, percentage) { return a + (b - a) * percentage; }
var x = 0;
var y = 0;

register_callback("render", function() { 
    var time = new Date().toTimeString().substring(0, 5);
    var a = ui.get_menu_alpha() //Made by Mased
    var pos = ui.get_menu_position()
    var size = ui.get_menu_size()

    x = lerp(x, pos[0] + 100, global_vars.frametime() * 6); 
    y = lerp(y, pos[1] + 150, global_vars.frametime() * 6)

    if (a > 0) {
        render.filled_rect([x - 80, y - 220], [size[0], 40], [16,16,16, 255 * a], 5)
        render.rect([x - 80, y - 220], [size[0], 40], [23, 98, 219, 255 * a], 4)
        render.text([x - 60, y - 200], [255, 255, 255, 255 * a], 12, 3, "Welcome back, Mased")
        render.text([x + size[0] - 140, y - 200], [255, 255, 255, 255 * a], 12, 3, time)

        render.line([x - 80, y - 185], [pos[0], pos[1]], [255, 255, 255, 100 * a], 0.5)
        render.line([x + size[0] - 80, y - 185], [pos[0] + size[0], pos[1]], [255, 255, 255, 100 * a], 0.5)
    }
})
