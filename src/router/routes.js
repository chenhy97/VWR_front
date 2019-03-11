import { TrafficFlow } from '@/components';
import { Eject } from '../components';
export default
[
    {
        path: '/',
        name: 'default',
        component: TrafficFlow, Eject
    },
    {
        path: '/:region',
        name: 'region',
        component: TrafficFlow,
        props: true
    }
]