"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionFormatter = positionFormatter;
function positionFormatter(position) {
    if (position === 1)
        return "1st";
    if (position === 2)
        return "2nd";
    if (position === 3)
        return "3rd";
    return `${position}th`;
}
