// Core
import debug from 'debug';

// Instruments
import { app } from './server';
import { getPort } from './utils';

const PORT = getPort();
const dg = debug('server:main');

app.listen(PORT, () => {
    dg(`Server API is up on port ${PORT}`);
});
