import { 
    checkAuth, 
    logout,
    createItem,
    getItems,
    buyItem,
    undoBuyItem,
    deleteAllItems,
    deleteItem,
    // updateItem
} from '../fetch-utils.js';
import { renderDeleteButton, renderItem } from '../render-utils.js';

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

// event listener for buying, undoing buyItem, and deleting an item from the list
document.addEventListener('click', async (e) => {
    console.log(e);
    if (e.target.id === 'buy') {
        const itemId = e.path[2].id;
        await buyItem(itemId);
        fetchAndDisplayList();
    }
    if (e.target.id === 'undo') {
        const itemId = e.path[2].id;
        await undoBuyItem(itemId);
        fetchAndDisplayList();
    }
    if (e.target.id === 'delete') {
        const itemId = e.path[2].id;
        await deleteItem(itemId);
        fetchAndDisplayList();
    }
    if (e.target.id === 'delete-all') {
        if (confirm('Are you sure you want to delete all items from your list?')) {
            await deleteAllItems();
            fetchAndDisplayList();
        }
    }
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function fetchAndDisplayList() {
    listContainer.textContent = '';
    const list = await getItems();
    for (let item of list) {
        const itemDiv = renderItem(item);
        itemDiv.id = item.id;
        listContainer.append(itemDiv);
    }
    if (list.length > 0) {
        listHeader.textContent = 'Shopping List:';
        const deleteAllButton = renderDeleteButton();
        listContainer.appendChild(deleteAllButton);
    } else {
        listHeader.textContent = 'Enter an item to start your list';
    }
}