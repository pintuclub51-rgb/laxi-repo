import { createClient } from '@insforge/sdk';

export const insforge = createClient({
  baseUrl: 'https://ak9w74vp.ap-southeast.insforge.app',
  anonKey: 'ik_4ac64bf30330771488f02f8dc1e0cbd6', // Static key for now
});
