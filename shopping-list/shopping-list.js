import { 
    checkAuth, 
    logout,
    // createItem,
    // deleteAllItems,
    // deleteItem,
    // updateItem,
    // getItems
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});
