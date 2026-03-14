// src/services/authService.js
import { supabase } from "./supabaseClient";

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError) throw profileError;

  return { session: data.session, user: data.user, profile };
}

export async function signup({ firstName, lastName, phone, email, address, dui, password }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  if (!data.user) throw new Error("No se pudo crear el usuario.");

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id:         data.user.id,
      role:       "client",
      first_name: firstName,
      last_name:  lastName,
      phone,
      address,
      dui,
    });

  if (profileError) throw profileError;

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPasswordForEmail(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}

export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}

export async function createEmployee({ firstName, lastName, email, companyId }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: "Temporal123*",
  });
  if (error) throw error;

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id:         data.user.id,
      role:       "company_employee",
      company_id: companyId,
      first_name: firstName,
      last_name:  lastName,
    });

  if (profileError) throw profileError;

  return data;
}

export async function createCompanyAdmin({ firstName, lastName, email, companyId }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: "Temporal123*",
  });
  if (error) throw error;

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id:         data.user.id,
      role:       "company_admin",
      company_id: companyId,
      first_name: firstName,
      last_name:  lastName,
    });

  if (profileError) throw profileError;

  return data;
}