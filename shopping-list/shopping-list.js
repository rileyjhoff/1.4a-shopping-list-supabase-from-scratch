import { 
    checkAuth, 
    logout,
    createItem,
    // deleteAllItems,
    // deleteItem,
    // updateItem,
    // getItems
} from '../fetch-utils.js';
import {
    // renderItem,
    // renderBuyUndoAllButtons,
    // renderDeleteButton
} from '../render-utils.js';

const form = document.getElementById('item-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const item = {
        quantity: data.get('quantity'),
        item: data.get('item'),
        bought: false
    };
    await createItem(item);
    form.reset();
});

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});
