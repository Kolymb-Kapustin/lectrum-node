import dg from 'debug';
import store from '../../store';
const debug = dg('router:logout');

export const post = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        // Когда это отправлять так и не понят т.к параметров нет
        // res.status(400).json({message: "incorrect payload"});

        if (store.userLogged) {
            res.status(204).send();

            store.userLogged = false;
        }
        else {
            res.status(401).json({message: "not authenticated"});
        }
    } catch (error) {
        res.status(500).json({message: "some server error" });
    }
};
