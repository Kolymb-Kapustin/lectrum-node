const { Readable, Transform, Writable } = require('stream');

const customers = [
    {
        name: 'Pitter Black',
        email: 'pblack@email.com',
        password: 'pblack_123'
    },
    {
        name: 'Oliver White',
        email: 'owhite@email.com',
        password: 'owhite_456'
    }
];

class Ui extends Readable {
    constructor(data, options) {
        super(options);

        this.data = data;
        this.init();
    }

    init() {
        this.on('data', chunk => {
            // console.log('\n---');
            // console.log(chunk);
        });
    }

    _read() {
        console.log('-');
        const data = this.data.shift();

        if (!data) {
            this.push(null);
        } else {
            this.push(data);
        }
    }
}
const options = {
    objectMode: true,
    highWaterMark: 1,
};

class Guardian extends Transform {
    constructor(options) {
        super(options);
    }
    _transform() {
        // console.log(this.data);
    }
}

class AccountManager extends Writable {
    constructor(options) {
        super(options);
    }
    _write() {
        // console.log(this.data);
    }
}

const ui = new Ui(['qew', 'qwe'], options);
const guardian = new Guardian(options);
const manager = new AccountManager(options);

ui.pipe(guardian).pipe(manager);
