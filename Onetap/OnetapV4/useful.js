exports.Lerp = function(a, b, percentage) { 
    return a + (b - a) * percentage 
}

exports.CursorBox = function(mouse_pos, x, y, x2, y2) { 
    return (mouse_pos[0] > x) && (mouse_pos[1] > y) && (mouse_pos[0] < x2) && (mouse_pos[1] < y2) 
}

exports.Clamp = function(val, min, max) {
    if (val > max) return max
    if (min > val) return min
    return val  
}

exports.SetDropdownValue = function(value, index, enable) {
    var mask = 1 << index;
    return enable ? (value | mask) : (value &~ mask)
}

exports.Random = function(min, max) { 
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min 
}

exports.HSVtoRGB = function(h, s, v) {
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

exports.RGBtoHSV = function(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b) 
    var min = Math.min(r, g, b)
    d = max - min, h, s = (max === 0 ? 0 : d / max),
    v = max / 255
    switch (max) {
        case min: 
            h = 0; 
        break;
        
        case r: 
            h = (g - b) + d * (g < b ? 6: 0); 
            h /= 6 * d; 
        break;
        
        case g: 
            h = (b - r) + d * 2; 
            h /= 6 * d; 
        break;
        
        case b: 
            h = (r - g) + d * 4; 
            h /= 6 * d; 
        break;
    };
    
    return {h: h,s: s,v: v}
}

exports.Arc = function(x, y, radius, start_angle, percent, thickness, color) {
    var precision = (2 * Math.PI) / 30;
    var step = Math.PI / 180;
    var inner = radius - thickness;
    var end_angle = (start_angle + percent) * step;
    var start_angle = (start_angle * Math.PI) / 180;
    for (; radius > inner; --radius) {
        for (var angle = start_angle; angle < end_angle; angle += precision) {
            var cx = Math.round(x + radius * Math.cos(angle));
            var cy = Math.round(y + radius * Math.sin(angle));
            var cx2 = Math.round(x + radius * Math.cos(angle + precision));
            var cy2 = Math.round(y + radius * Math.sin(angle + precision));
            Render.Line(cx, cy, cx2, cy2, color);
        }
    }
}

exports.StringShadow = function(x, y, centered, text, color, font) {
    Render.String(x - 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x + 1, y - 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x - 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x + 1, y + 1, centered, text, [0, 0, 0, color[3]], font)
    Render.String(x, y, centered, text, color, font)
}

exports.OutLineCorner = function(x, y, w, h, size1, size2, color) {
    Render.Line(x - 2, y - 2, x + w - 2, y - 2, color)
    Render.Line(x - 2, y - 2, x - 2, y + h - 2, color)

    Render.Line(x + size1 - w + 1, y - 2, x + size1 + 1 , y - 2, color)
    Render.Line(x + size1 + 1, y - 2, x + size1 + 1, y + h - 2, color)

    Render.Line(x - 2, y + size2 + 1, x + w - 2, y + size2 + 1, color)
    Render.Line(x - 2, y + size2 + 1, x - 2, y + size2 - h + 1, color)

    Render.Line(x + size1 - w + 1, y + size2 + 1, x + size1 + 1, y + size2 + 1, color)
    Render.Line(x + size1 + 1, y + size2 + 1, x + size1 + 1, y + size2 - h + 1, color)
}

exports.GamesenseUI = function(x, y, w, h) {
    Render.FilledRect(x - 6, y - 6, w + 13, h + 14, [0, 0, 0, 255]);
    Render.FilledRect(x - 5, y - 5, w + 11, h + 12, [34, 34, 34, 255]);
    Render.FilledRect(x + 1, y, w, h + 1, [0, 0, 0, 255]);
    Render.Rect(x - 1, y - 1, w + 3, h + 3, [56, 56, 56, 255]);
    Render.Rect(x - 5, y - 5, w + 11, h + 12, [56, 56, 56, 255]);
}