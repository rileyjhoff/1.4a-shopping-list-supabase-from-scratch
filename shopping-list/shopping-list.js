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
    updateChecked,
    updateItemName,
    buyAllItems,
    undoBuyAllItems
} from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

const form = document.getElementById('item-form');
const listHeader = document.getElementById('list-header');
const listContainer = document.getElementById('shopping-list-container');
const deleteAllContainer = document.getElementById('delete-all-container');
const deleteAllButton = document.getElementById('delete-all');
const buyUndoAllContainer = document.getElementById('buy-undo-all');
const buyAllButton = document.getElementById('buy-all');
const undoAllButton = document.getElementById('undo-all');
const loadingSpinner = document.getElementById('loading-screen');

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
        bought: false,
        checked: false
    };
    await createItem(item);
    fetchAndDisplayList();
    form.reset();
});

// event listener for all button clicks
document.addEventListener('click', async (e) => {
    // console.log(e.path[0]);
    // buy button for a single item - updates item as bought in supabase
    if (e.target.id === 'buy') {
        const itemId = e.path[2].id;
        await buyItem(itemId);
        fetchAndDisplayList();
    }
    // undo button for a single item - updates item as NOT bought in supabase
    if (e.target.id === 'undo') {
        const itemId = e.path[2].id;
        await undoBuyItem(itemId);
        fetchAndDisplayList();
    }
    // delete button for a single item - deletes item in supabase
    if (e.target.id === 'delete') {
        const itemId = e.path[2].id;
        await deleteItem(itemId);
        fetchAndDisplayList();
    }
    // delete ALL button - deletes all items in supabase for the user
    if (e.target.id === 'delete-all') {
        if (confirm('Are you sure you want to delete all items from your list?')) {
            await deleteAllItems();
            fetchAndDisplayList();
        }
    }
    // buy ALL button - buys all items that are NOT bought && checked
    if (e.target.id === 'buy-all') {
        await buyAllItems();
        fetchAndDisplayList();
    }
    // undo ALL button - unbuys all items that are bought && checked
    if (e.target.id === 'undo-all') {
        await undoBuyAllItems();
        fetchAndDisplayList();
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
    // updates item quantity in supabase but doesnt rerender everything (too much loading)
    if (e.target.className === 'edit-quantity') {
        const itemId = e.path[1].id;
        const newQuantity = e.path[0].value;
        await updateQuantity(itemId, newQuantity);
    }
    // updates whether or not the item is checked in supabase
    if (e.target.className === 'checkbox') {
        const itemId = e.path[1].id;
        const isChecked = e.path[0].checked;
        await updateChecked(itemId, isChecked);
        fetchAndDisplayList();
    }
});

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function fetchAndDisplayList() {
    loadingSpinner.classList.toggle('invisible');
    listContainer.textContent = '';
    const list = await getItems();
    for (let item of list) {
        const itemDiv = renderItem(item);
        itemDiv.id = item.id;
        listContainer.append(itemDiv);
    }
    if (list.length > 0) {
        listHeader.textContent = 'Shopping List:';
        deleteAllContainer.classList.remove('hide');
        deleteAllButton.classList.remove('hide');
    } else {
        listHeader.textContent = 'Enter an item to start your list';
        deleteAllContainer.classList.add('hide');
        deleteAllButton.classList.add('hide');
    }
    const checkedCounter = list.reduce((acc, curr) => {
        if (curr.checked === true && curr.bought === true) {
            acc.checked++;
            acc.undo++;
        }
        if (curr.checked === true && curr.bought === false) {
            acc.checked++;
            acc.buy++;
        }
        return acc;
    }, { checked: 0, buy: 0, undo: 0 });
    if (checkedCounter.checked > 0) {
        buyUndoAllContainer.classList.remove('hide');
    } else {
        buyUndoAllContainer.classList.add('hide');
    }
    if (checkedCounter.buy > 0) {
        buyAllButton.classList.remove('hide');
    } else {
        buyAllButton.classList.add('hide');
    }
    if (checkedCounter.undo > 0) {
        undoAllButton.classList.remove('hide');
    } else {
        undoAllButton.classList.add('hide');
    }
    loadingSpinner.classList.toggle('invisible');
}