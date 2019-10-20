const { Readable, Writable, Transform } = require('stream');
const crypto = require('crypto');
const cryptoPassword = 'cryptopassword'

const algorithm = 'aes192';
const iv = Buffer.alloc(16, 0);
const key = crypto.scryptSync(cryptoPassword, 'salt', 24);

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
    }

    _read() {
        const data = this.data.shift();

        if (!data) {
            this.push(null);
        } else {
            this.push(data);
        }
    }
}

class Guardian extends Transform {
    constructor(options) {
        super(options);

        this.algorithm = 'aes192';
    }

    chipherData(data) {
        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(
            data,
            'utf8',
            'hex'
        );

        encrypted += cipher.final('hex');
        return encrypted;
    }

    _transform(chunk, encoding, done) {
        chunk.email = this.chipherData(chunk.email);
        chunk.password = this.chipherData(chunk.password);
        this.push(chunk);
        done();
    }
}

class AccountManager extends Writable {
    constructor(options) {
        super(options)

        this.store = {
            users: []
        };
    }

    decipherData(data) {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(data, 'hex', 'utf8');
        return decrypted += decipher.final('utf8');
    }

    _write(chunk, encoding, done) {
        chunk.email = this.decipherData(chunk.email);
        chunk.password = this.decipherData(chunk.password);

        this.store.users.push(chunk);
        done();
    }
}

const options = {
    objectMode: true,
    highWaterMark: 1,
};

const ui = new Ui(customers, options);
const guardian = new Guardian(options);
const manager = new AccountManager(options);
ui.pipe(guardian).pipe(manager);
