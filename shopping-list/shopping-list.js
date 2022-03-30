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
    updateItem,
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

// event listener for buying, undoing buyItem, and deleting an item from the list
document.addEventListener('click', async (e) => {
    // console.log(e.path[0]);
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
    if (e.target.id === 'buy-all') {
        await buyAllItems();
        fetchAndDisplayList();
    }
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
    // console.log(e);
    if (e.target.className === 'edit-quantity') {
        const itemId = e.path[1].id;
        const newQuantity = e.path[0].value;
        await updateQuantity(itemId, newQuantity);
    }
    if (e.target.className === 'checkbox') {
        const itemId = e.path[1].id;
        const isChecked = e.path[0].checked;
        await updateChecked(itemId, isChecked);
        fetchAndDisplayList();
    }
});

//     const checkboxes = document.querySelectorAll('.checkbox');
//     console.log(checkboxes);
//     const div = document.createElement('div');
//     for (let checkbox of checkboxes) {
//         console.log(checkbox.checked);
//         console.log(checkbox.parentElement.className);
//     }
//     if (e.path[1].className === 'item bought') {
//         console.log('working for undo all');
//     } if (e.path[1].className === 'item') {
//         console.log('working for buy');
//     }

// document.addEventListener('focus', async (e) => {
//     console.log(e.target.path[0].value);
//     document.addEventListener('input', () => {
//         console.log();
//     });
    // if (e.path[0].className === 'edit-quantity') {
    //     const itemId = e.path[1].id;
    //     const newQuantity = e.path[0].value;
    //     await updateQuantity(itemId, newQuantity);
    // }
// });

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
}