var BerlinClock = function(h, m, s) {
	this.time = new Date(0,0,0, h, m, s);
}

var BerlinClock = function() {

}

BerlinClock.prototype.setTime = function(time) {
    var timeElements = time.split(':');

    if(timeElements.length == 2) {
        timeElements.push("00");
    }

    if (timeElements.length != 3) {
        throw new Error('Invalid time value: ' + time);
    }

    var hour = timeElements[0];
    var minute = timeElements[1];
    var seconds = timeElements[2];

    if(Number.isNaN(parseInt(hour)) || Number.isNaN(parseInt(minute)) || Number.isNaN(parseInt(seconds)) ) {
        throw new Error('Invalid time value: ' + time);
    }

    if((hour > 23) || (minute > 59) || (seconds > 59)) {
        throw new Error('Invalid time value: ' + time);
    }
    this.time = new Date(0, 0, 0, hour, minute, seconds);
}

BerlinClock.prototype.getSeconds = function() {
    var seconds = this.time.getSeconds();
    if(seconds % 2 === 1) {
        return 'Y';
    }
    return 'O';
}

BerlinClock.prototype.getFiveHoursRow = function() {
    var fiveHours = ['O', 'O', 'O', 'O'];
    var h = this.time.getHours();
    var nbFiveHours = (h - h%5)/5;
    for (i = 0; i < nbFiveHours; i++) {
        fiveHours[i] = 'R';
    }
    return fiveHours;
}

BerlinClock.prototype.getOneHoursRow = function() {
    var oneHours = ['O', 'O', 'O', 'O'];
    var h = this.time.getHours();
    var nbOneHours = h%5;
    for (i = 0; i < nbOneHours; i++) {
        oneHours[i] = 'R';
    }
    return oneHours;
}

BerlinClock.prototype.getFiveMinutesRow = function() {
    var fiveMinutes = ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'];
    var m = this.time.getMinutes();
    var nbFiveMinutes = (m - m%5)/5;
    var redArrayIndexes = [2, 5, 8];
    for (i = 0; i < nbFiveMinutes; i++) {
        if(redArrayIndexes.includes(i)) {
            fiveMinutes[i] = 'R';
        }
        else {
            fiveMinutes[i] = 'Y';
        }
    }
    return fiveMinutes;
}

BerlinClock.prototype.getOneMinutesRow = function() {
    var oneMinutes = ['O', 'O', 'O', 'O'];
    var m = this.time.getMinutes();
    var nbOneMinutes = m%5;
    for (i = 0; i < nbOneMinutes; i++) {
        oneMinutes[i] = 'Y';
    }
    return oneMinutes;
}
