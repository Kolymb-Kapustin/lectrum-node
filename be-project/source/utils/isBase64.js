import isBase64 from 'is-base64';

export const post = (req, res, next) => {

    if (isBase64(req.body)) {
        return next();
    }

    res.status(400).json({ message: "incorrect payload"});
};

export const get = (req, res, next) => {

    if (isBase64(req.body)) {
        return next();
    }

    res.status(400).json({ message: "incorrect payload"});
};
