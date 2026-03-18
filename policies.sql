-- 1. Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_hearings ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- 2. Helper function to get current user's tenant_id and role
CREATE OR REPLACE FUNCTION get_my_context() 
RETURNS TABLE (tenant_id UUID, role user_role) AS $$
    SELECT tenant_id, role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 3. Universal Tenant Isolation Policy (Super Admin can see all, others only their tenant)
-- Note: Super Admin logic usually checks a specific global flag or email, 
-- but here we assume 'Super Admin' role in profiles is assigned to platform owners.

-- Tenants: Only Super Admin or Firm members
CREATE POLICY tenant_access ON tenants 
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'Super Admin' OR tenant_id = tenants.id))
    );

-- Profiles: Own profile or same tenant
CREATE POLICY profile_access ON profiles
    FOR ALL USING (
        id = auth.uid() OR 
        (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()) 
         AND (SELECT role FROM profiles WHERE id = auth.uid()) IN ('Super Admin', 'Firm Admin', 'Staff'))
    );

-- General Data Tables Policy Macro (Simplified for readability)
-- We apply this to clients, cases, tasks, etc.
DO $$ 
DECLARE 
    t TEXT;
BEGIN
    FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
             AND tablename NOT IN ('tenants', 'profiles') LOOP
        EXECUTE format('CREATE POLICY tenant_isolation ON %I FOR ALL USING (
            tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid())
            OR (SELECT role FROM profiles WHERE id = auth.uid()) = ''Super Admin''
        )', t);
    END LOOP;
END $$;

-- 4. Role Specific Restrictions (e.g., Clients only see their own cases/docs)
-- Clients should only see cases where client_id matches? No, usually clients are linked to a profile.
-- Let's add a mapping or assume profile.id = clients.id for specific logins, 
-- but a better way is to check if the user is a 'Client' role and filter by client_id if applicable.

CREATE POLICY client_data_restriction ON cases
    FOR SELECT USING (
        (SELECT role FROM profiles WHERE id = auth.uid()) != 'Client' 
        OR client_id IN (SELECT id FROM clients WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid()))
    );

-- 5. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_tenant ON profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_clients_tenant ON clients(tenant_id);
CREATE INDEX IF NOT EXISTS idx_cases_tenant ON cases(tenant_id);
CREATE INDEX IF NOT EXISTS idx_cases_client ON cases(client_id);
CREATE INDEX IF NOT EXISTS idx_tasks_tenant ON tasks(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_invoices_tenant ON invoices(tenant_id);
CREATE INDEX IF NOT EXISTS idx_documents_tenant ON documents(tenant_id);
CREATE INDEX IF NOT EXISTS idx_documents_case ON documents(case_id);
