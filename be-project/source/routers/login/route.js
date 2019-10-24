import dg from 'debug';
import store from '../../store';
const debug = dg('router:login');

export const post = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const [login, password] = Buffer.from(req.headers['x-authorization'], 'base64').toString().split(':');
        const { PASSWORD } = process.env;

        if (!password || PASSWORD !== password) {
            res.status(401).json({ message: "Password not correct" });
        }

        store.userLogged = true;

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Some server error" });
    }
};
