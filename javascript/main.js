function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
function isCollisionCirclePoint(x1, y1, r1, x2, y2) {
    if ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) <= r1 * r1) return true;
    return false;
}
function isCollisionRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check collision between the first rectangle with 4 points of the second rectangle
    // Top-left point
    if (isCollisionRectPoint(x1, y1, w1, h1, x2, y2)) return true; 
    // Top-right point
    if (isCollisionRectPoint(x1, y1, w1, h1, x2 + w2, y2)) return true;
    // Bottom-left point
    if (isCollisionRectPoint(x1, y1, w1, h1, x2, y2 + h2)) return true;
    // Bottom-right point
    if (isCollisionRectPoint(x1, y1, w1, h1, x2 + w2, y2 + h2)) return true;

    return false;
}
function isCollisionRectPoint(x1, y1, w1, h1, x2, y2) {
    if ((x1 <= x2 && x2 <= x1 + w1) && (y1 <= y2 && y2 <= y1 + h1)) return true;

    return false;
}

function getRandomPosition(sizeBtnNo, positionParent, positionBtnYes, positionMouse) {
    // Return new position of the button 'No'
    // Does not contain the mouse
    // Does not collision with the button 'Yes'
    // Is inside the parent (div tag)

    var x = getRandomInt(positionParent.x, positionParent.x + positionParent.w - sizeBtnNo.w),
        y = getRandomInt(positionParent.y, positionParent.y + positionParent.h - sizeBtnNo.h);

    // Check if contain the mouse and collision with the button 'Yes'
    while (isCollisionCirclePoint(positionBtnYes.x + positionBtnYes.w/2, positionBtnYes.y + positionBtnYes.h/2,
                                   (positionBtnYes.w + sizeBtnNo.w)/2, 
                                    x + sizeBtnNo.w/2, y + sizeBtnNo.h/2) ||
            isCollisionCirclePoint(x + sizeBtnNo.w/2, y + sizeBtnNo.h/2, sizeBtnNo.w, positionMouse.x, positionMouse.y)
        ) {
        // Get random x coordinates, is inside the parent (in [positionParent.x, positionParent.w])
        x = getRandomInt(positionParent.x, positionParent.x + positionParent.w - sizeBtnNo.w);
        // Get random y coordinates, is inside the parent (in [positionParent.y, positionParent.h])
        y = getRandomInt(positionParent.y, positionParent.y + positionParent.h - sizeBtnNo.h);
    }
    return {x: x, y: y};
}

function clickBtnYes() {
    console.log("Yes");
}

function mouseHoverBtnNo(event) {

    var btnYes = document.getElementById("btn-yes");
    var btnNo = document.getElementById("btn-no");
    var parent = btnYes.parentElement;


    // Width and hight of the button 'No'
    var sizeBtnNo = {
        w: btnNo.offsetWidth,
        h: btnNo.offsetHeight
    };

    // The range where the button 'No' can be placed, absolute position 
    var positionParent = {
        x: parent.offsetLeft, 
        y: parent.offsetTop,
        w: parent.offsetWidth,
        h: parent.offsetHeight
    };
    // Absolute position, width and height of the button 'Yes'
    var positionBtnYes = {
        x: btnYes.offsetLeft, 
        y: btnYes.offsetTop,
        w: btnYes.offsetWidth,
        h: btnYes.offsetHeight
    };

    // Absolute position of the mouse
    var positionMouse = {
        x: event.clientX,
        y: event.clientY
    };

    var newPositionBtnNo = getRandomPosition(sizeBtnNo, positionParent, positionBtnYes, positionMouse);
    
    btnNo.setAttribute('style', 'left:' + newPositionBtnNo.x + 'px;top:' + newPositionBtnNo.y + 'px;');
}
