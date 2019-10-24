import dg from 'debug';

const debug = dg('router:login');

export const post = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        res.statusCode(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
