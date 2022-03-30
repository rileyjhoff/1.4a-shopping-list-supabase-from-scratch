const SUPABASE_URL = 'https://zhmowgcybteqgiwwrxln.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpobW93Z2N5YnRlcWdpd3dyeGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5OTQ2NjYsImV4cCI6MTk2MzU3MDY2Nn0.e8IeeowEcZ9C7aazuyONAepUhFvdOgDSLq8EKRJWwls';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createItem(item) {
    const response = await client
        .from('shopping_list')
        .insert(item);

    return checkError(response);
}

export async function getItems() {
    const response = await client
        .from('shopping_list')
        .select('*')
        .order('id', { ascending: true });

    return checkError(response);
}

export async function buyItem(id) {
    const response = await client
        .from('shopping_list')
        .update({ bought: true })
        .match({ id });

    return checkError(response);
}

export async function undoBuyItem(id) {
    const response = await client
        .from('shopping_list')
        .update({ bought: false })
        .match({ id });

    return checkError(response);
}

export async function updateItem(item) {
    const response = await client
        .from('shopping_list')
        .update(item)
        .match({ id: item.id });

    return checkError(response);
}

export async function deleteItem(id) {
    const response = await client
        .from('shopping_list')
        .delete()
        .match({ id });

    return checkError(response);
}

export async function deleteAllItems() {
    const user = await getUser();
    const response = await client
        .from('shopping_list')
        .delete()
        .match({ user_id: user.id });

    return checkError(response);
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./shopping-list');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
