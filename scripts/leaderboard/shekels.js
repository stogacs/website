// shekels requires the supabase library and supabase-config.js to be loaded first

// null until supabase-config.js has been filled in
const shekelsDb = SUPABASE_URL.startsWith('https://')
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
const NOT_CONFIGURED_MESSAGE =
  'The Shekels leaderboard has not been connected to Supabase yet. See scripts/leaderboard/supabase-config.js.';

// full name followed by a two digit graduation year, e.g. SamStoga28
const USERNAME_PATTERN = /^[A-Za-z]+[0-9]{2}$/;

function usernameToEmail(username) {
  return username.trim().toLowerCase() + '@' + SHEKELS_EMAIL_DOMAIN;
}

// returns the logged in user's profile row, or null when nobody is logged in
async function getCurrentProfile() {
  if (!shekelsDb) {
    return null;
  }
  const {
    data: { session },
  } = await shekelsDb.auth.getSession();
  if (!session) {
    return null;
  }
  const { data, error } = await shekelsDb
    .from('profiles')
    .select('id, username, display_name, shekels, is_admin')
    .eq('id', session.user.id)
    .maybeSingle();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

async function signUp(username, displayName, password) {
  if (!shekelsDb) {
    throw new Error(NOT_CONFIGURED_MESSAGE);
  }
  username = username.trim();
  displayName = displayName.trim();

  if (!USERNAME_PATTERN.test(username)) {
    throw new Error(
      'Usernames are your full name followed by your two digit graduation year, like SamStoga28.',
    );
  }
  if (displayName.length < 1 || displayName.length > 40) {
    throw new Error('Display names must be between 1 and 40 characters.');
  }
  if (password.length < 6) {
    throw new Error('Passwords must be at least 6 characters.');
  }

  const { data: existing, error: lookupError } = await shekelsDb
    .from('profiles')
    .select('id')
    .ilike('username', username)
    .maybeSingle();
  if (lookupError) {
    throw new Error('Could not reach the leaderboard. Please try again.');
  }
  if (existing) {
    throw new Error('That username is already taken.');
  }

  const { error } = await shekelsDb.auth.signUp({
    email: usernameToEmail(username),
    password,
    options: { data: { username, display_name: displayName } },
  });
  if (error) {
    if (/already registered/i.test(error.message)) {
      throw new Error('That username is already taken.');
    }
    throw new Error(error.message);
  }
}

async function logIn(username, password) {
  if (!shekelsDb) {
    throw new Error(NOT_CONFIGURED_MESSAGE);
  }
  const { error } = await shekelsDb.auth.signInWithPassword({
    email: usernameToEmail(username),
    password,
  });
  if (error) {
    throw new Error('Incorrect username or password.');
  }
}

async function changeDisplayName(displayName) {
  displayName = displayName.trim();
  if (displayName.length < 1 || displayName.length > 40) {
    throw new Error('Display names must be between 1 and 40 characters.');
  }
  const { error } = await shekelsDb.rpc('set_my_display_name', { new_name: displayName });
  if (error) {
    console.error(error);
    throw new Error('Could not save your display name. Please try again.');
  }
}

// checks the current password first
async function changePassword(username, currentPassword, newPassword) {
  if (newPassword.length < 6) {
    throw new Error('Passwords must be at least 6 characters.');
  }
  const { error: checkError } = await shekelsDb.auth.signInWithPassword({
    email: usernameToEmail(username),
    password: currentPassword,
  });
  if (checkError) {
    throw new Error('Your current password is incorrect.');
  }
  const { error } = await shekelsDb.auth.updateUser({ password: newPassword });
  if (error) {
    if (/different from the old/i.test(error.message)) {
      throw new Error('Your new password must be different from your current one.');
    }
    throw new Error(error.message);
  }
}

async function logOut() {
  await shekelsDb.auth.signOut();
}