import { 
    checkAuth, 
    logout,
    createItem,
    getItems,
    // deleteAllItems,
    // deleteItem,
    // updateItem
} from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

const form = document.getElementById('item-form');
const listHeader = document.getElementById('list-header');
const listContainer = document.getElementById('shopping-list-container');

checkAuth();

window.addEventListener('load', () => {
    fetchAndDisplayList();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const item = {
        quantity: data.get('quantity'),
        item: data.get('item'),
        bought: false
    };
    await createItem(item);
    fetchAndDisplayList();
    form.reset();
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function fetchAndDisplayList() {
    listContainer.textContent = '';
    const list = await getItems();
    if (list.length > 0) {
        listHeader.textContent = 'Shopping List:';
    }
    for (let item of list) {
        const itemDiv = renderItem(item);
        listContainer.append(itemDiv);
    }
}