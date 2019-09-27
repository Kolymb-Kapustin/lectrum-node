class TimersManager {
    constructor() {
        this.timers = {};
        this.started = false,
        this.logs = []
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
                const jobArg = [];

                for (const key in arguments) {
                    if (arguments.hasOwnProperty(key)) {
                        if (key !== '0') {
                            jobArg.push(arguments[key]);
                        }
                    }
                }

                this.timers[timer.name] = timer;
                this.timers[timer.name].arguments = jobArg;
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

    _log(timer, result) {
        this.logs.push({
            name: timer.name,
            in: timer.arguments,
            out: result,
            created: new Date(timer.start).toISOString()
        });
    }

    print() {
        return this.logs;
    }

    startTimer(timer, place) {
        const delay = place === 'start' ? timer.delay : timer.remaining;

        if (timer.interval) {
            timer.timeout = setInterval(() => {
                const result = timer.job.apply(timer.job, timer.arguments);
                this._log(timer, result);
            }, timer.remaining);
        }
        else {
            timer.timeout = setTimeout(() => {
                const result = timer.job.apply(timer.job, timer.arguments);
                this._log(timer, result);
            }, timer.remaining);
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
    job: () => throw new Error('We have a problem!')
};

const t3 = {
    name: 't2',
    delay: 1000,
    interval: false,
    job: (a, b) => a + b
};

manager.add(t1);
manager.add(t2, 1, 2);
manager.start();

setTimeout(() => {
    console.log(manager.print());
}, 2000);

module.exports = TimersManager;
