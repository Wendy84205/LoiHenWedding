alter table public.customers add column if not exists auth_user_id uuid references auth.users(id) on delete set null;

create unique index if not exists customers_auth_user_id_idx
on public.customers(auth_user_id)
where auth_user_id is not null;

drop policy if exists customers_read_own_account on public.customers;
create policy customers_read_own_account on public.customers for select to authenticated
using (auth_user_id = auth.uid());

drop policy if exists orders_read_own_account on public.orders;
create policy orders_read_own_account on public.orders for select to authenticated
using (exists (
  select 1 from public.customers
  where customers.id = orders.customer_id and customers.auth_user_id = auth.uid()
));
