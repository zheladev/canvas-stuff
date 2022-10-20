//I don't remember how this works anymore, simply epic
export const calcRelativePosition = (x: number, y: number, vWidth: number, vHeight: number) => {
    const _getAbsNonMirroredX = (n: number, w: number) => {
        //return relative position by getting remainder of xpos / width per canvas
        //mirror horizontally if negative number
        return n >= 0 ? n % w : (w + n % w);
    }

    const _getAbsNonMirroredY = (n: number, w: number) => {
        return n >= 0 ? (w - n % w) : Math.abs(n) % w;
    }

    return {
        x: _getAbsNonMirroredX(x, vWidth),
        y: _getAbsNonMirroredY(y, vHeight),
    }
}

export const entityInCanvas = (x: number, y: number, fx: number, fy: number, vWidth: number, vHeight: number, dpp: number) => {
    let isInCanvas = false;
    //xquadrantId
    const qx = x/vWidth;
    //yquadrantId
    const qy = y / vHeight;

    isInCanvas = Math.floor(qx) === Math.floor(fx/vWidth) && Math.floor(qy) === Math.floor(fy/vHeight);
    return isInCanvas;
}
