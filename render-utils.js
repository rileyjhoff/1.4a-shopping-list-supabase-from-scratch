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
    const checkboxEl = document.createElement('input');
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
    deleteButton.id = 'delete';
    checkboxEl.type = 'checkbox';
    quantityEl.type = 'number';
    if (item.bought) {
        itemEl.contentEditable = false;
        buyUndoButton.textContent = 'Undo';
        itemDiv.classList.add('bought');
        itemEl.classList.add('line-through');
        buyUndoButton.id = 'undo';
        quantityEl.disabled = true;
    } else {
        itemEl.contentEditable = true;
        buyUndoButton.textContent = 'Buy';
        buyUndoButton.id = 'buy';
    }
    if (item.checked) {
        checkboxEl.checked = true;
    } else {
        checkboxEl.checked = false;
    }

    quantityEl.value = item.quantity;
    itemEl.textContent = item.item;
    deleteButton.textContent = 'Delete';

    buttonDiv.append(buyUndoButton, deleteButton);
    itemDiv.append(checkboxEl, quantityEl, itemEl, buttonDiv);

    return itemDiv;
}