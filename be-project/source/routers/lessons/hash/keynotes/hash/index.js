import dg from 'debug';

const debug = dg('router:lessons:keynotes:hash');

export const getKeynoteByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const data = {};

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeKeynoteByHash = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const data = {};

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
