{/* <div class="item">
    <input type="checkbox" name="checkbox" class="checkbox">
    <input type="number" name="edit-quantity" class="edit-quantity"></input>
    <p class="item-name" contenteditable="true">This is a shopping list item</p>
    <div class="buy-delete-item">
        <button id="buy-undo">Buy</button>
        <button id="delete">Delete</button>
    </div>
</div> */}

export function renderItem(item) {
    const itemDiv = document.createElement('div');
    const checkboxEl = document.createElement('input').type();
    const quantityEl = document.createElement('input');
    const itemEl = document.createElement('p');
    const buttonDiv = document.createElement('div');
    const buyUndoButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    itemDiv.classList.add('item');
    checkboxEl.classList.add('checkbox');
    quantityEl.classList.add('edit-quantity');
    itemEl.classList.add('item-name');
    buttonDiv.classList.add('buy-delete-item');
    buyUndoButton.id = 'buy-undo';
    deleteButton.id = 'delete';
    checkboxEl.type = 'checkbox';
    quantityEl.type = 'number';
    if (item.bought) {
        itemEl.contentEditable = false;
        buyUndoButton.textContent = 'Undo';
        itemDiv.classList.add('bought');
        itemEl.classList.add('line-through');
    } else {
        itemEl.contentEditable = true;
        buyUndoButton.textContent = 'Buy';
    }

    quantityEl.textContent = item.quantity;
    itemEl.textContent = item.item;
    deleteButton.textContent = 'Delete';

    buttonDiv.append(buyUndoButton, deleteButton);
    itemDiv.append(checkboxEl, quantityEl, itemEl, buttonDiv);

    return itemDiv;
}

{/* <div id="buy-undo-all">
    <button id="buy-all">Buy All</button>
    <button id="undo-all">Undo All</button>
</div> */}

export function renderBuyUndoAllButtons() {
    const div = document.createElement('div');
    const buyAllButton = document.createElement('button');
    const undoAllButton = document.createElement('button');

    div.id = 'buy-undo-all';
    buyAllButton.id = 'buy-all';
    undoAllButton.id = 'undo-all';

    buyAllButton.textContent = 'Buy All';
    undoAllButton.textContent = 'Undo All';


    div.append(buyAllButton, undoAllButton);

    return div;
}

{/* <button id="delete-all">Delete All</button> */}

export function renderDeleteButton() {
    const button = document.createElement('button');

    button.id = 'delete-all';

    button.textContent = 'Delete All';
    
    return button;
}