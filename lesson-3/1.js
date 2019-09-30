const EventEmitter = require('events');
const crypto = require('crypto');

class Bank extends EventEmitter {
    constructor() {
        super();

        this.users = new Map();

        this.on('add', (personId, summ) => {
            const user = this.users.get(personId);

            if (!this.users.has(personId)) {
                this.emit('error', new Error('Not correct id'));
            }

            if (summ <= 0) {
                this.emit('error', new Error('This summ must be more then 0'));
            }

            user.balance += summ;

            this.users.set(user);
        });

        this.on('withdraw', (personId, summ) => {
            const user = this.users.get(personId);

            if (!this.users.has(personId)) {
                this.emit('error', new Error('Not correct id'));
            }

            if (summ <= 0) {
                this.emit('error', new Error('This summ must be more then 0'));
            }

            if (summ > user.balance) {
                this.emit('error', new Error('Not enough money'));
            }

            user.balance -= summ;

            this.users.set(user);
        });

        this.on('get', (personId, cb) => {
            const user = this.users.get(personId);

            if (!this.users.has(personId)) {
                this.emit('error', new Error('Not correct id'));
            }

            cb(user.balance);
        });
    }

    register(payload) {
        this.users.forEach((value) => {
            if (value && value.name && payload.name === value.name) {
                this.emit('error', new Error('This name already exists.'));
            }
        });

        const personId = crypto.randomBytes(16).toString("hex");

        this.users.set(personId, {
            name: payload.name,
            balance: payload.balance
        });

        return personId
    }

};

const bank = new Bank();

const personId = bank.register({
    name: 'Pitter Black',
    balance: 100
});

bank.emit('add', personId, 20);

bank.emit('get', personId, (balance) => {
    console.log(`I have ${balance}₴`); // I have 120₴
});

bank.emit('withdraw', personId, 20);

bank.emit('get', personId, (balance) => {
    console.log(`I have ${balance}₴`); // I have 70₴
});
