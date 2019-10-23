import dg from 'debug';

const debug = dg('router:classes:education');

export const enroll = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const data = [];

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const expel = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const data = {};

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
