/*
* Title: Project: Shape Editor V1.1
* Author: Junghwan Kim
* Date: April 27, 2021
*/

var startTime = new Date();
var overlay = document.getElementById("overlay");
var canvas = document.getElementById("canvas");
var shape = [];
var shape_history = [];
var shape_temp = "";
var context = canvas.getContext("2d");
var index = -1;
var index_previous = -1;
var index_history = -1;
var grid = 0;
var info = 1;
var filename = "Untitled"

overlay.addEventListener("mousedown", (e) => {
    overlay.style.display = "none";
});

setTimeout(
    function() {
        overlay.style.display = "none";
    },
2000);

document.getElementById("button_move_up").style.opacity = 0.1;
document.getElementById("button_move_down").style.opacity = 0.1;
document.getElementById("button_move_left").style.opacity = 0.1;
document.getElementById("button_move_right").style.opacity = 0.1;
document.getElementById("button_scale_up").style.opacity = 0.1;
document.getElementById("button_scale_down").style.opacity = 0.1;
document.getElementById("button_rotate_left").style.opacity = 0.1;
document.getElementById("button_rotate_right").style.opacity = 0.1;

function new_line() {
    shape.push({
        type: 0,
        x1: 20,
        y1: 20,
        x2: 20,
        y2: 60,
        rotate: 0,
        color: "#000000",
        fill: "#ffffff",
        thick: 3
    });
    index = shape.length - 1;
    draw_line(index);
    record_histoy();
}

function new_triangle() {
    shape.push({
        type: 1,
        x1: 80,
        y1: 80,
        x2: 120,
        y2: 120,
        rotate: 0,
        color: "#000000",
        fill: "#ffffff",
        thick: 3
    });
    index = shape.length - 1;
    draw_triangle(index);
    record_histoy();
}

function new_rectangle() {
    shape.push({
        type: 2,
        x1: 140,
        y1: 140,
        x2: 180,
        y2: 180,
        rotate: 0,
        color: "#000000",
        fill: "#ffffff",
        thick: 3
    });
    index = shape.length - 1;
    draw_rectangle(index);
    record_histoy();
}

function new_square() {
    shape.push({
        type: 3,
        x1: 200,
        y1: 200,
        x2: 240,
        y2: 260,
        rotate: 0,
        color: "#000000",
        fill: "#ffffff",
        thick: 3
    });
    index = shape.length - 1;
    draw_square(index);
    record_histoy();
}

function new_circle() {
    shape.push({
        type: 4,
        x1: 260,
        y1: 260,
        x2: 300, 
        y2: 300,
        rotate: 0,
        color: "#000000",
        fill: "#ffffff",
        thick: 3
    });
    index = shape.length - 1;
    draw_circle(index);
    record_histoy();
}

function new_ellipse() {
    shape.push({
        type: 5,
        x1: 320,
        y1: 320,
        x2: 360,
        y2: 380,
        rotate: 0,
        color: "#000000",
        fill: "#ffffff",
        thick: 3
    });
    index = shape.length - 1;
    draw_ellipse(index);
    record_histoy();
}

function new_curve() {
    shape.push({
        type: 6,
        x1: 380,
        y1: 380,
        x2: 420,
        y2: 420,
        rotate: 0,
        color: "#000000",
        fill: "#ffffff",
        thick: 3
    });
    index = shape.length - 1;
    draw_curve(index);
    record_histoy();
}

function new_polyline(index) {
    shape.push({
        type: 7,
        x1: 420,
        y1: 420,
        x2: 460,
        y2: 460,
        rotate: 0,
        color: "#000000",
        fill: "#ffffff",
        thick: 3
    });
    index = shape.length - 1;
    draw_polyline(index);
    record_histoy();
}

function new_polygon(index) {
    shape.push({
        type: 8,
        x1: 480,
        y1: 480,
        x2: 520,
        y2: 520,
        rotate: 0,
        color: "#000000",
        fill: "#ffffff",
        thick: 3
    });
    index = shape.length - 1;
    draw_polygon(index);
    record_histoy();
}

function draw_line(index) {
    context = canvas.getContext("2d");
    context.beginPath();
    context.setTransform(1, 0, 0, 1, 0, 0, 0);
    context.moveTo(shape[index].x1, shape[index].y1);
    context.lineTo(shape[index].x2, shape[index].y2);
    context.lineWidth = shape[index].thick;
    context.strokeStyle = shape[index].color;
    context.fillStyle = shape[index].fill;
    context.stroke();
}

function draw_triangle(index) {
    context = canvas.getContext("2d");
    context.beginPath();
    context.setTransform(1, 0, 0, 1, 0, 0, 0);
    if(shape[index].rotate == 1 || shape[index].rotate == -3) {
        context.setTransform(1, 0, 0, 1, 0, shape[index].x1 + shape[index].x2);
        context.rotate(-90 * Math.PI / 180);
    } else if(shape[index].rotate == 2 || shape[index].rotate == -2) {
        context.setTransform(1, 0, 0, -1, 0, shape[index].x1 + shape[index].x2, 0);
    } else if(shape[index].rotate == 3 || shape[index].rotate == -1) {
        context.setTransform(1, 0, 0, 1, shape[index].x1 + shape[index].x2, 0);
        context.rotate(90 * Math.PI / 180);
    } else {
        shape[index].rotate = 0;
        context.setTransform(1, 0, 0, 1, 0, 0, 0);
    }
   context.moveTo(shape[index].x1 + ((shape[index].x2 - shape[index].x1) / 2), shape[index].y1);
   context.lineTo(shape[index].x1, shape[index].y2);
   context.lineTo(shape[index].x2, shape[index].y2);
   context.lineTo(shape[index].x1 + ((shape[index].x2 - shape[index].x1) / 2), shape[index].y1);
   context.lineWidth = shape[index].thick;
   context.strokeStyle = shape[index].color;
   context.fillStyle = shape[index].fill;
   context.fill();
   context.stroke();
}

function draw_rectangle(index) {
    context = canvas.getContext("2d");
    context.beginPath();
    context.setTransform(1, 0, 0, 1, 0, 0, 0);
    context.rect(shape[index].x1, shape[index].y1, shape[index].x2 - shape[index].x1, shape[index].y2 - shape[index].y1);
    context.lineWidth = shape[index].thick;
    context.strokeStyle = shape[index].color;
    context.fillStyle = shape[index].fill;
    context.fill();
    context.stroke();
}

function draw_square(index) {
    context = canvas.getContext("2d");
    context.beginPath();
    context.setTransform(1, 0, 0, 1, 0, 0, 0);
    if(shape[index].rotate != 0) {
        var x1 = shape[index].x1;
        var y1 = shape[index].y1;
        var x2 = shape[index].x2;
        var y2 = shape[index].y2;
        shape[index].x1 = y1;
        shape[index].y1 = x1;
        shape[index].x2 = y2;
        shape[index].y2 = x2;
        shape[index].rotate = 0;
    }
    context.rect(shape[index].x1, shape[index].y1, shape[index].x2 - shape[index].x1, shape[index].y2 - shape[index].y1);
    context.lineWidth = shape[index].thick;
    context.strokeStyle = shape[index].color;
    context.fillStyle = shape[index].fill;
    context.fill();
    context.stroke();
}

function draw_circle(index) {
    context = canvas.getContext("2d");
    context.beginPath();
    context.setTransform(1, 0, 0, 1, 0, 0, 0);
    context.arc(shape[index].x1+((shape[index].x2 - shape[index].x1) / 2), shape[index].y1+((shape[index].x2 - shape[index].x1) / 2), ((shape[index].x2 - shape[index].x1) / 2), 0, (Math.PI*2));
    context.lineWidth = shape[index].thick;
    context.strokeStyle = shape[index].color;
    context.fillStyle = shape[index].fill;
    context.fill();
    context.stroke();
}

function draw_ellipse(index) {
    context = canvas.getContext("2d");
    context.beginPath();
    context.setTransform(1, 0, 0, 1, 0, 0, 0);
    if(shape[index].rotate != 0) {
        var x1 = shape[index].x1;
        var y1 = shape[index].y1;
        var x2 = shape[index].x2;
        var y2 = shape[index].y2;
        shape[index].x1 = y1;
        shape[index].y1 = x1;
        shape[index].x2 = y2;
        shape[index].y2 = x2;
        shape[index].rotate = 0;
    }
    context.ellipse(shape[index].x1+((shape[index].x2 - shape[index].x1) / 2), shape[index].y1+((shape[index].x2 - shape[index].x1) / 2), ((shape[index].x2 - shape[index].x1) / 2), ((shape[index].y2 - shape[index].y1) / 2), Math.PI, 0, Math.PI * 2);
    context.lineWidth = shape[index].thick;
    context.strokeStyle = shape[index].color;
    context.fillStyle = shape[index].fill;
    context.fill();
    context.stroke();
}

function draw_curve(index) {
    context = canvas.getContext("2d");
    context.beginPath();
    context.setTransform(1, 0, 0, 1, 0, 0, 0);
    if(shape[index].rotate == 1 || shape[index].rotate == -3) {
        context.setTransform(1, 0, 0, 1, 0, shape[index].x1 + shape[index].x2);
        context.rotate(-90 * Math.PI / 180);
    } else if(shape[index].rotate == 2 || shape[index].rotate == -2) {
        context.setTransform(1, 0, 0, -1, 0, shape[index].x1 + shape[index].x2, 0);
    } else if(shape[index].rotate == 3 || shape[index].rotate == -1) {
        context.setTransform(1, 0, 0, 1, shape[index].x1 + shape[index].x2, 0);
        context.rotate(90 * Math.PI / 180);
    } else {
        shape[index].rotate = 0;
        context.setTransform(1, 0, 0, 1, 0, 0, 0);
    }
    context.arc(shape[index].x1+((shape[index].x2 - shape[index].x1) / 2), shape[index].y1+((shape[index].x2 - shape[index].x1) / 2), ((shape[index].x2 - shape[index].x1) / 2), 0, (Math.PI*1));
    context.lineWidth = shape[index].thick;
    context.strokeStyle = shape[index].color;
    context.fillStyle = shape[index].fill;
    context.fill();
    context.stroke();
}

function draw_polyline(index) {
    context = canvas.getContext("2d");
    context.beginPath();
    context.setTransform(1, 0, 0, 1, 0, 0, 0);
    if(shape[index].rotate == 1 || shape[index].rotate == -3) {
        context.setTransform(1, 0, 0, 1, 0, shape[index].x1 + shape[index].x2);
        context.rotate(-90 * Math.PI / 180);
    } else if(shape[index].rotate == 2 || shape[index].rotate == -2) {
        context.setTransform(1, 0, 0, -1, 0, shape[index].x1 + shape[index].x2, 0);
    } else if(shape[index].rotate == 3 || shape[index].rotate == -1) {
        context.setTransform(1, 0, 0, 1, shape[index].x1 + shape[index].x2, 0);
        context.rotate(90 * Math.PI / 180);
    } else {
        shape[index].rotate = 0;
        context.setTransform(1, 0, 0, 1, 0, 0, 0);
    }
    context.moveTo(shape[index].x1 + ((shape[index].x2 - shape[index].x1) / 2), shape[index].y1);
    context.lineTo(shape[index].x1, shape[index].y1 + ((shape[index].y2 - shape[index].y1) / 2));
    context.lineTo(shape[index].x1 + ((shape[index].x2 - shape[index].x1) / 4), shape[index].y2);
    context.lineWidth = shape[index].thick;
    context.strokeStyle = shape[index].color;
    context.fillStyle = shape[index].fill;
    context.fill();
    context.stroke();
}

function draw_polygon(index) {
    context = canvas.getContext("2d");
    context.beginPath();
    context.setTransform(1, 0, 0, 1, 0, 0, 0);
    if(shape[index].rotate == 1 || shape[index].rotate == -3) {
        context.setTransform(1, 0, 0, 1, 0, shape[index].x1 + shape[index].x2);
        context.rotate(-90 * Math.PI / 180);
    } else if(shape[index].rotate == 2 || shape[index].rotate == -2) {
        context.setTransform(1, 0, 0, -1, 0, shape[index].x1 + shape[index].x2, 0);
    } else if(shape[index].rotate == 3 || shape[index].rotate == -1) {
        context.setTransform(1, 0, 0, 1, shape[index].x1 + shape[index].x2, 0);
        context.rotate(90 * Math.PI / 180);
    } else {
        shape[index].rotate = 0;
        context.setTransform(1, 0, 0, 1, 0, 0, 0);
    }
    context.moveTo(shape[index].x1 + ((shape[index].x2 - shape[index].x1) / 2), shape[index].y1);
    context.lineTo(shape[index].x1, shape[index].y1 + ((shape[index].y2 - shape[index].y1) / 2));
    context.lineTo(shape[index].x1 + ((shape[index].x2 - shape[index].x1) / 4), shape[index].y2);
    context.lineTo(shape[index].x2 - ((shape[index].x2 - shape[index].x1) / 4), shape[index].y2);
    context.lineTo(shape[index].x2, shape[index].y1 + ((shape[index].y2 - shape[index].y1) / 2));
    context.lineTo(shape[index].x1 + ((shape[index].x2 - shape[index].x1) / 2), shape[index].y1);
    context.lineWidth = shape[index].thick;
    context.strokeStyle = shape[index].color;
    context.fillStyle = shape[index].fill;
    context.fill();
    context.stroke();
}

function move_up() {
    shape[index].y1 -= 10;
    shape[index].y2 -= 10;
    draw_update();
    record_histoy();
}

function move_down() {
    shape[index].y1 += 10;
    shape[index].y2 += 10;
    draw_update();
    record_histoy();
}

function move_left() {
    shape[index].x1 -= 10;
    shape[index].x2 -= 10;
    draw_update();
    record_histoy();
}

function move_right() {
    shape[index].x1 += 10;
    shape[index].x2 += 10;
    draw_update();
    record_histoy();
}

function scale_up() {
    if(shape[index].type == 0) {
        if(shape[index].rotate == 0) shape[index].y2 += 40;
        if(shape[index].rotate == 1) shape[index].x2 += 40;
    } else if(shape[index].type == 4 || shape[index].type == 5 || shape[index].type == 6) {
        shape[index].x2 += 40;
        shape[index].y2 += 40;
    } else if(shape[index].type == 2 || shape[index].type == 3) {
        shape[index].x2 += (shape[index].x2 - shape[index].x1);
        shape[index].y2 += (shape[index].y2 - shape[index].y1);
    } else if(shape[index].type == 1) {
        shape[index].x2 += 40;
        shape[index].y2 += 40;
    } else if(shape[index].type == 7 || shape[index].type == 8) {
        shape[index].x2 += 40;
        shape[index].y2 += 40;
    } else {

    }
    draw_update();
    record_histoy();
}

function scale_down() {
    if(shape[index].type == 0) {
        if(shape[index].rotate == 0) shape[index].y2 -= 20;
        if(shape[index].rotate == 1) shape[index].x2 -= 20;
    } else if(shape[index].type == 4 || shape[index].type == 5 || shape[index].type == 6) {
        shape[index].x2 -= 20;
        shape[index].y2 -= 20;
    } else if(shape[index].type == 2 || shape[index].type == 3) {
        shape[index].x2 -= (shape[index].x2 - shape[index].x1) / 2;
        shape[index].y2 -= (shape[index].y2 - shape[index].y1) / 2;
    } else if(shape[index].type == 1) {
        shape[index].x2 -= 20;
        shape[index].y2 -= 20;
    } else if(shape[index].type == 7 || shape[index].type == 8) {
        shape[index].x2 -= 20;
        shape[index].y2 -= 20;
    } else {

    }
    draw_update();
    record_histoy();
}

function rotate_left() {
    if(shape[index].type == 0) {
        var x2 = shape[index].x2;
        shape[index].x2 = shape[index].y2;
        shape[index].y2 = x2;
        shape[index].rotate ^= 1;
    } else if(shape[index].type == 2 || shape[index].type == 4) {

    } else if(shape[index].type == 1 || shape[index].type == 3 || shape[index].type == 5 || shape[index].type == 6 || shape[index].type == 7 || shape[index].type == 8) {
        shape[index].rotate += 1;
    } else {

    }
    draw_update();
    record_histoy();
}

function rotate_right() {
    if(shape[index].type == 0) {
        var x2 = shape[index].x2;
        shape[index].x2 = shape[index].y2;
        shape[index].y2 = x2;
        shape[index].rotate ^= 1;
    } else if(shape[index].type == 2 || shape[index].type == 4) {

    } else if(shape[index].type == 1 || shape[index].type == 3 || shape[index].type == 5 || shape[index].type == 6 || shape[index].type == 7 || shape[index].type == 8) {
        shape[index].rotate -= 1;
    } else {

    }
    draw_update();
    record_histoy();
}

let drag = false;

canvas.addEventListener("mousedown", (e) => {
    drag = true;
    mouse_x = e.clientX - canvas.offsetLeft;
    mouse_y = e.clientY - canvas.offsetTop;
    var index_count = (shape.filter(element => element.x1 <= mouse_x && element.x2 >= mouse_x && element.y1 <= mouse_y && element.y2 >= mouse_y).length);

    if(index_count > 0) {
        if(index_count == 1) {
            index = shape.findIndex(element => element.x1 <= mouse_x && element.x2 >= mouse_x && element.y1 <= mouse_y && element.y2 >= mouse_y);
        } else {
            var index_last;
            shape.forEach((element, index) => element.x1 <= mouse_x ? index_last = index : null);
            index = index_last;
        }
        shape[index].fill = "#ff0000";
        control_ui(2);
        
        if(index != index_previous && index_previous != -1) {
            shape[index_previous].fill = "#ffffff";
        }
        
        document.getElementById("a_copy").onclick = function() {
            shape_temp = "";
            shape_temp = JSON.parse(JSON.stringify(shape[index]));
            shape[index].fill = "#ffffff";
            shape[index_previous].fill = "#ffffff";
            document.getElementById("a_paste").classList.remove("disabled");
        }

        document.getElementById("info").innerHTML= "Position (x, y): (<span style='font-weight: bold; color: yellow;'>" + shape[index].x1 + "</span>, <span style='font-weight: bold; color: yellow;'>" + shape[index].y1 + "</span>)";

        draw_update();
        index_previous = index;
    } else {
        drag = false;
        if(index != -1) {
            shape[index].fill = "#ffffff";
        }
        index = -1;
        control_ui(3);
        document.getElementById("info").innerHTML= "";
        draw_update();
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (drag == true) {
        mouse_x = e.clientX - canvas.offsetLeft;
        mouse_y = e.clientY - canvas.offsetTop;
        
        
            shape[index].fill = "#FFA500";
            control_ui(3);
            
            if(index != index_previous && index_previous != -1) {
                shape[index_previous].fill = "#ffffff";
            }
            if(index != -1) {
                var x1 = shape[index].x1;
                mouse_x_middle = mouse_x - ((shape[index].x2 - x1) / 2);
                shape[index].x1 = mouse_x_middle;
                shape[index].x2 = mouse_x_middle + shape[index].x2 - x1;

                var y1 = shape[index].y1;
                mouse_y_middle = mouse_y - ((shape[index].y2 - y1) / 2);
                shape[index].y1 = mouse_y_middle;
                shape[index].y2 = mouse_y_middle + shape[index].y2 - y1;
            }

            document.getElementById("info").innerHTML= "Position (x, y): (<span style='font-weight: bold; color: yellow;'>" + shape[index].x1 + "</span>, <span style='font-weight: bold; color: yellow;'>" + shape[index].y1 + "</span>)";
            draw_update();
            index_previous = index;
        
    }
});

canvas.addEventListener("mouseup", (e) => {
    if (drag == true) {
        record_histoy();
        drag = false;
        shape[index].fill = "#ff0000";
        control_ui(2);
        
        if(index != index_previous && index_previous != -1) {
            shape[index_previous].fill = "#ffffff";
        }
        
        document.getElementById("a_copy").onclick = function() {
            shape_temp = "";
            shape_temp = JSON.parse(JSON.stringify(shape[index]));
            shape[index].fill = "#ffffff";
            shape[index_previous].fill = "#ffffff";
            document.getElementById("a_paste").classList.remove("disabled");
        }

        document.getElementById("info").innerHTML= "Position (x, y): (<span style='font-weight: bold; color: yellow;'>" + shape[index].x1 + "</span>, <span style='font-weight: bold; color: yellow;'>" + shape[index].y1 + "</span>)";

        draw_update();
        index_previous = index;
    }
});

function record_histoy() {
    index_history++;
    shape_history.push(JSON.parse(JSON.stringify(shape)));
    control_ui(1);
}

function undo() {
    index_history--;
    if(index_history < 0) {
        index = -1;
        new_canvas();
    } else {
        shape = [];
        shape_temp = "";
        context = canvas.getContext("2d");
        index = -1;
        index_previous = -1;
    
        shape = shape_history[index_history];
    
        context.clearRect(0, 0, canvas.width, canvas.height);
    
        for(var i = 0; i < shape.length; i++) {
            if(shape[i].type == 0) {
                shape[i].fill = "#ffffff";
                draw_line(i);
            } else if(shape[i].type == 1) {
                shape[i].fill = "#ffffff";
                draw_triangle(i);
            } else if(shape[i].type == 2) {
                shape[i].fill = "#ffffff";
                draw_rectangle(i);
            } else if(shape[i].type == 3) {
                shape[i].fill = "#ffffff";
                draw_square(i);
            } else if(shape[i].type == 4) {
                shape[i].fill = "#ffffff";
                draw_circle(i);
            } else if(shape[i].type == 5) {
                shape[i].fill = "#ffffff";
                draw_ellipse(i);
            } else if(shape[i].type == 6) {
                shape[i].fill = "#ffffff";
                draw_curve(i);
            } else if(shape[i].type == 7) {
                shape[i].fill = "#ffffff";
                draw_polyline(i);
            } else if(shape[i].type == 8) {
                shape[i].fill = "#ffffff";
                draw_polygon(i);
            }
        }
        index = -1;
        control_ui(3);
    }
}

function draw_update() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < shape.length; i++) {
        if(shape[i].type == 0) {
            draw_line(i);
        } else if(shape[i].type == 1) {
            draw_triangle(i);
        } else if(shape[i].type == 2) {
            draw_rectangle(i);
        } else if(shape[i].type == 3) {
            draw_square(i);
        } else if(shape[i].type == 4) {
            draw_circle(i);
        } else if(shape[i].type == 5) {
            draw_ellipse(i);
        } else if(shape[i].type == 6) {
            draw_curve(i);
        } else if(shape[i].type == 7) {
            draw_polyline(i);
        } else if(shape[i].type == 8) {
            draw_polygon(i);
        }
    }
}

function new_canvas() {
    if(shape.length > 0) {
        var warning = confirm("Do you want to save first?");
        if(warning) {
            save_file(shape, "shapeEditor.json");
        }
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
            
    shape = [];
    shape_history = [];
    shape_temp = "";
    context = canvas.getContext("2d");
    index = -1;
    index_previous = -1;
    index_history = -1;

    control_ui(0);
}

function save_image() {
    if(index != -1) {
        shape[index].fill = "#ffffff";
    }
    if(index_previous != -1) {
        shape[index_previous].fill = "#ffffff";
    }
    draw_update();
    
    document.getElementById("a_save_image").download = "shapeEditor.png";
    document.getElementById("a_save_image").href = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}

function save_pdf() {
    if(index != -1) {
        shape[index].fill = "#ffffff";
    }
    if(index_previous != -1) {
        shape[index_previous].fill = "#ffffff";
    }
    draw_update();
    
    var pdf = new jsPDF();
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0);
    pdf.save("shapeEditor.pdf");
}

function paste() {
    shape.push(shape_temp);
    index = shape.length - 1;
    record_histoy();

    shape_temp = "";
    index_previous = index - 1;
    shape[index].fill = "#ffffff";
    shape[index_previous].fill = "#ffffff";

    shape[index].x1 = shape[index].x1 + 30;
    shape[index].x2 = shape[index].x2 + 30;

    
    index = -1;
    control_ui(3);

    draw_update();
    document.getElementById("a_paste").classList.add("disabled");
}

function KeyPress(e) {
    var evtobj = window.event? event : e

    // Ctrl + C
    if(evtobj.keyCode == 67 && evtobj.ctrlKey) {
        if(index != -1) {
            shape_temp = "";
            shape_temp = JSON.parse(JSON.stringify(shape[index]));
            shape[index].fill = "#ffffff";
            shape[index_previous].fill = "#ffffff";
            document.getElementById("a_paste").classList.remove("disabled");
        }
    }

    // Ctrl + V
    if(evtobj.keyCode == 86 && evtobj.ctrlKey) {
        if(index != -1) paste();
    }

    // Ctrl + Z
    if(evtobj.keyCode == 90 && evtobj.ctrlKey) {
        undo();
    }
}
document.onkeydown = KeyPress;

function about() {
    overlay.style.display = "block";
}

function properties() {
    var elapsedTime = parseInt((new Date() - startTime) / 1000);
    alert("Properties\n\nShape Count: " + shape.length + "\nElapsed Time: " + elapsedTime + " Seconds" + "\nFilename: " + filename);
}

function view_grid() {
    if(grid == 0) {
        canvas.style.backgroundImage = "url('images/background.png')";
        document.getElementById("a_grid").innerHTML="<b>&#10003&nbsp;&nbsp;View Grid</b>";
        grid = 1;
    } else {
        canvas.style.backgroundImage = "none";
        document.getElementById("a_grid").innerHTML="View Grid";
        grid = 0;
    }
}

function view_info() {
    if(info == 0) {
        document.getElementById("info").style.display = "block";
        document.getElementById("a_info").innerHTML="<b>&#10003&nbsp;&nbsp;View Shape Position</b>";
        info = 1;
    } else {
        document.getElementById("info").style.display = "none";
        document.getElementById("a_info").innerHTML="View Shape Position";
        info = 0;
    }
}

function save_file(data, filename) {
    if(index != -1) {
        shape[index].fill = "#ffffff";
    }
    if(index_previous != -1) {
        shape[index_previous].fill = "#ffffff";
    }
    draw_update();

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4);
    }

    var blob = new Blob([data], {type: "text/json"}),
    e = document.createEvent("MouseEvents"),
    a = document.createElement("a")

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(":")
    e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

const load_file = async () => {
    const options = {
        types: [
        {
            description: "JSON File",
            accept: {
            "text/html": [".json"]
            }
        }
        ]
    };
    [fileHandle] = await window.showOpenFilePicker(options);
    const file = await fileHandle.getFile();
    const contents = await file.text();

    filename = file.name;
    shape = [];
    shape_history = [];
    shape_temp = "";
    context = canvas.getContext("2d");
    index = -1;
    index_previous = -1;
    index_history = -1;

    shape = JSON.parse(contents);

    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < shape.length; i++) {
        if(shape[i].type == 0) {
            shape[i].fill = "#ffffff";
            draw_line(i);
        } else if(shape[i].type == 1) {
            shape[i].fill = "#ffffff";
            draw_triangle(i);
        } else if(shape[i].type == 2) {
            shape[i].fill = "#ffffff";
            draw_rectangle(i);
        } else if(shape[i].type == 3) {
            shape[i].fill = "#ffffff";
            draw_square(i);
        } else if(shape[i].type == 4) {
            shape[i].fill = "#ffffff";
            draw_circle(i);
        } else if(shape[i].type == 5) {
            shape[i].fill = "#ffffff";
            draw_ellipse(i);
        } else if(shape[i].type == 6) {
            shape[i].fill = "#ffffff";
            draw_curve(i);
        } else if(shape[i].type == 7) {
            shape[i].fill = "#ffffff";
            draw_polyline(i);
        } else if(shape[i].type == 8) {
            shape[i].fill = "#ffffff";
            draw_polygon(i);
        }
    }

    control_ui(1);
    control_ui(3);
    document.getElementById("a_undo").classList.add("disabled");

    shape_history.push(JSON.parse(JSON.stringify(shape)));
    index_history++;
};

function control_ui(mode) {
    if(mode == 0) {
        document.getElementById("button_move_up").disabled = true;
        document.getElementById("button_move_down").disabled = true;
        document.getElementById("button_move_left").disabled = true;
        document.getElementById("button_move_right").disabled = true;
        document.getElementById("button_scale_up").disabled = true;
        document.getElementById("button_scale_down").disabled = true;
        document.getElementById("button_rotate_left").disabled = true;
        document.getElementById("button_rotate_right").disabled = true;
        document.getElementById("button_move_up").style.opacity = 0.1;
        document.getElementById("button_move_down").style.opacity = 0.1;
        document.getElementById("button_move_left").style.opacity = 0.1;
        document.getElementById("button_move_right").style.opacity = 0.1;
        document.getElementById("button_scale_up").style.opacity = 0.1;
        document.getElementById("button_scale_down").style.opacity = 0.1;
        document.getElementById("button_rotate_left").style.opacity = 0.1;
        document.getElementById("button_rotate_right").style.opacity = 0.1;
        document.getElementById("a_new").classList.add("disabled");
        document.getElementById("a_save").classList.add("disabled");
        document.getElementById("a_save_image").classList.add("disabled");
        document.getElementById("a_save_pdf").classList.add("disabled");
        document.getElementById("a_undo").classList.add("disabled");
        document.getElementById("a_copy").classList.add("disabled");
        document.getElementById("a_paste").classList.add("disabled");
    } else if(mode == 1) {
        document.getElementById("a_new").classList.remove("disabled");
        document.getElementById("a_save").classList.remove("disabled");
        document.getElementById("a_save_image").classList.remove("disabled");
        document.getElementById("a_save_pdf").classList.remove("disabled");
        document.getElementById("a_undo").classList.remove("disabled");
    } else if(mode == 2) {
        document.getElementById("button_move_up").disabled = false;
        document.getElementById("button_move_down").disabled = false;
        document.getElementById("button_move_left").disabled = false;
        document.getElementById("button_move_right").disabled = false;
        document.getElementById("button_scale_up").disabled = false;
        document.getElementById("button_scale_down").disabled = false;
        document.getElementById("button_rotate_left").disabled = false;
        document.getElementById("button_rotate_right").disabled = false;
        document.getElementById("button_move_up").style.opacity = 1;
        document.getElementById("button_move_down").style.opacity = 1;
        document.getElementById("button_move_left").style.opacity = 1;
        document.getElementById("button_move_right").style.opacity = 1;
        document.getElementById("button_scale_up").style.opacity = 1;
        document.getElementById("button_scale_down").style.opacity = 1;
        document.getElementById("button_rotate_left").style.opacity = 1;
        document.getElementById("button_rotate_right").style.opacity = 1;
        document.getElementById("a_copy").classList.remove("disabled");
    } else if(mode == 3) {
        document.getElementById("button_move_up").disabled = true;
        document.getElementById("button_move_down").disabled = true;
        document.getElementById("button_move_left").disabled = true;
        document.getElementById("button_move_right").disabled = true;
        document.getElementById("button_scale_up").disabled = true;
        document.getElementById("button_scale_down").disabled = true;
        document.getElementById("button_rotate_left").disabled = true;
        document.getElementById("button_rotate_right").disabled = true;
        document.getElementById("button_move_up").style.opacity = 0.1;
        document.getElementById("button_move_down").style.opacity = 0.1;
        document.getElementById("button_move_left").style.opacity = 0.1;
        document.getElementById("button_move_right").style.opacity = 0.1;
        document.getElementById("button_scale_up").style.opacity = 0.1;
        document.getElementById("button_scale_down").style.opacity = 0.1;
        document.getElementById("button_rotate_left").style.opacity = 0.1;
        document.getElementById("button_rotate_right").style.opacity = 0.1;
        document.getElementById("a_copy").classList.add("disabled");
    }
}

window.onbeforeunload = function() {
    if(!document.getElementById("a_save").classList.contains("disabled")) {
        return "EXIT";
    }
}