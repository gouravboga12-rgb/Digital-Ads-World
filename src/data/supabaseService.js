import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- LEADS SECTION ---
export async function fetchLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function submitLead(lead) {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select();
  if (error) throw error;
  return data[0];
}

export async function updateLeadStatus(id, status) {
  const { data, error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function removeLead(id) {
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

// --- SERVICES SECTION ---
export async function fetchServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createService(service) {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select();
  if (error) throw error;
  return data[0];
}

export async function editService(id, service) {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function removeService(id) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

// --- TEAM SECTION ---
export async function fetchTeam() {
  const { data, error } = await supabase
    .from('team')
    .select('*')
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createTeamMember(member) {
  const { data, error } = await supabase
    .from('team')
    .insert([member])
    .select();
  if (error) throw error;
  return data[0];
}

export async function editTeamMember(id, member) {
  const { data, error } = await supabase
    .from('team')
    .update(member)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function removeTeamMember(id) {
  const { error } = await supabase
    .from('team')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

// --- GALLERY SECTION ---
export async function fetchGallery() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createGalleryItem(item) {
  const { data, error } = await supabase
    .from('gallery')
    .insert([item])
    .select();
  if (error) throw error;
  return data[0];
}

export async function removeGalleryItem(id) {
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

export async function updateGalleryItem(id, item) {
  const { data, error } = await supabase
    .from('gallery')
    .update(item)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
}

// --- SETTINGS (KEY-VALUE JSON) SECTION ---
export async function fetchSettings(key) {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .maybeSingle();
  if (error) throw error;
  return data ? data.value : null;
}

export async function updateSettings(key, value) {
  const { data, error } = await supabase
    .from('settings')
    .upsert({ key, value })
    .select();
  if (error) throw error;
  return data[0];
}
