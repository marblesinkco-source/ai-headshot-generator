-- Create contact_messages table for the public contact form
-- Used by src/app/api/contact/route.ts

create table public.contact_messages (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  subject    text        not null,
  message    text        not null,
  created_at timestamptz not null    default now(),
  read       boolean     not null    default false,
  archived   boolean     not null    default false
);

comment on table public.contact_messages is
  'Messages submitted through the public contact form.';

-- Enable Row Level Security
alter table public.contact_messages enable row level security;

-- Allow anonymous and authenticated users to insert (public contact form)
create policy "Allow public inserts on contact_messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Only service_role can read messages (admin dashboard)
create policy "Allow service_role to select contact_messages"
  on public.contact_messages
  for select
  to service_role
  using (true);

-- Only service_role can update messages (mark as read/archived)
create policy "Allow service_role to update contact_messages"
  on public.contact_messages
  for update
  to service_role
  using (true)
  with check (true);

-- Index for sorting by submission date
create index idx_contact_messages_created_at
  on public.contact_messages (created_at desc);
