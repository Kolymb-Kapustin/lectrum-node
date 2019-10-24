import checkBase64 from 'is-base64';

export const isBase64 = (req, res, next) => {

    if (req.headers['x-authorization'] && checkBase64(req.headers['x-authorization'])) {
        return next();
    }

    res.status(400).json({ message: "incorrect payload"});
};
