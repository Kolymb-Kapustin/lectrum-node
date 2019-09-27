class TimersManager {
    constructor() {
        this.timers = {};
        this.started = false
    }

    add(timer) {
        if (!this.started) {
            if (!timer.name && typeof timer.name !== 'string') {
                throw new Error('Timer name is not correct');
            }
            else if (!timer.delay &&  typeof timer.delay !== 'number') {
                throw new Error('Need to pass delay as a number');
            }
            else if (timer.delay < 0 && timer.delay > 5000) {
                throw new Error('Delay must be between 0 and 5000');
            }
            else if (!timer.job && typeof timer.job !== 'function') {
                throw new Error('Timer job is not correct');
            }
            else if (this.timers[timer.name]) {
                throw new Error('Timer was added');
            }
            else {
                this.timers[timer.name] = timer;
                this.timers[timer.name].arguments = arguments;
            }
        }
        else {
            throw new Error('Timer is started');
        }

    }

    remove(timer) {
        if (this.timers[timer.name]) {
            this.stopTimer(this.timers[timer.name]);

            delete this.timers[timer.name]
        }
        else {
            throw new Error('Timer is not defined');
        }
    }

    start() {
        for (const key in this.timers) {
            if (this.timers.hasOwnProperty(key)) {
                const timer = this.timers[key];

                timer.start = Date.now();
                timer.remaining = timer.delay;
                this.startTimer(timer, 'start');
            }
        }

        this.started = true;
    }

    stop() {
        for (const key in this.timers) {
            if (this.timers.hasOwnProperty(key)) {
                this.stopTimer(this.timers[key]);
            }
        }

        this.started = false;
    }

    pause(payload) {
        if (this.timers[payload]) {
            this.stopTimer(this.timers[payload]);

            this.timers[payload].remaining -= Date.now() - this.timers[payload].start;
        }
        else {
            throw new Error('Timer is not defined');
        }
    }

    resume(payload) {
        if (this.timers[payload]) {
            const timer = this.timers[payload];

            this.stopTimer(timer);
            timer.start = Date.now();
            this.startTimer(timer, 'resume');
        }
        else {
            throw new Error('Timer is not defined');
        }
    }

    startTimer(timer, place) {
        const delay = place === 'start' ? timer.delay : timer.remaining;

        if (timer.interval) {
            timer.timeout = setInterval(timer.job, timer.remaining, timer.arguments[1], timer.arguments[2]);
        } else {
            timer.timeout = setTimeout(timer.job, timer.remaining, timer.arguments[1], timer.arguments[2]);
        }
    }

    stopTimer(timer) {
        if (timer.interval) {
            clearInterval(timer.timeout);
        }
        else {
            clearTimeout(timer.timeout);
        }
    }
}

const manager = new TimersManager();

const t1 = {
    name: 't1',
    delay: 1000,
    interval: false,
    job: () => {
        console.log('t1')
    }
};

const t2 = {
    name: 't2',
    delay: 1000,
    interval: false,
    job: (a, b) => {
        console.log(a + b);
    }
};

manager.add(t1);
manager.add(t2, 1, 2);
manager.start();
manager.stop();
manager.remove(t1);
// console.log(1);
// manager.pause('t1');
manager.resume('t1');
