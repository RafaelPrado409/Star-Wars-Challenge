import { factory } from 'factory-girl';

import Planet from '../src/app/schemas/Planet';

factory.define('Planet', Planet, {
    name: 'Kamino',
    climate: 'arid',
    terrain: 'desert',
});

factory.define('Planet2', Planet, {
    name: 'Marte',
    climate: 'arid',
    terrain: 'desert',
});
export default factory;