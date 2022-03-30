import { 
    checkAuth, 
    logout,
    createItem,
    getItems,
    buyItem,
    undoBuyItem,
    deleteAllItems,
    deleteItem,
    updateQuantity,
    updateItemName,
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
    console.log(e.path[0]);
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
    // if (e.path[0].className === 'item-name') {
    //     // const 
    //     let itemBeingEdited = e;
    //     let itemName = itemBeingEdited.path[0].textContent;
    //     document.addEventListener('click', async (e) => {
    //         if (e !== itemBeingEdited) {
    //             itemName = itemBeingEdited.path[0].textContent;
    //             console.log(itemName);
    //         }
    //     });
    // }
});

document.addEventListener('change', async (e) => {
    console.log(e);
    if (e.path[0].className === 'edit-quantity') {
        const itemId = e.path[1].id;
        const newQuantity = e.path[0].value;
        await updateQuantity(itemId, newQuantity);
    }
});

document.addEventListener('focus', async (e) => {
    console.log(e.target.path[0].value);
    document.addEventListener('input', () => {
        console.log();
    });
    // if (e.path[0].className === 'edit-quantity') {
    //     const itemId = e.path[1].id;
    //     const newQuantity = e.path[0].value;
    //     await updateQuantity(itemId, newQuantity);
    // }
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