import { createClient } from '@insforge/sdk';

export const insforge = createClient({
  baseUrl: import.meta.env.VITE_INSFORGE_BASE_URL || 'https://ak9w74vp.ap-southeast.insforge.app',
  anonKey: import.meta.env.VITE_INSFORGE_ANON_KEY || 'ik_4ac64bf30330771488f02f8dc1e0cbd6',
});
