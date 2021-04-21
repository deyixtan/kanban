const DATA_TRANSFER_TYPE = "text/plain";

const ATTRIBUTE_ID = "id";
const ATTRIBUTE_DRAGGABLE = "draggable";

const KB_TABLE_CLASS_TYPE = "kb-table";
const KB_CARD_CLASS_TYPE = "kb-card";

const EVENT_DRAG_START = "dragstart";
const EVENT_DRAG_OVER = "dragover";
const EVENT_DROP = "drop";

// Init
function initBoard() {
    const tableElements = document.getElementsByClassName(KB_TABLE_CLASS_TYPE);
    const cardElements = document.getElementsByClassName(KB_CARD_CLASS_TYPE);

    Array.from(tableElements).forEach(initTable);
    Array.from(cardElements).forEach(initCard);
}

function initTable(table, index) {
    const tableId = parseInt(index) + 1;
    table.setAttribute(ATTRIBUTE_ID, KB_TABLE_CLASS_TYPE + tableId)
    table.addEventListener(EVENT_DRAG_OVER, onDragOver);
    table.addEventListener(EVENT_DROP, onDrop);
}

function initCard(card, index) {
    const cardId = parseInt(index) + 1;
    card.setAttribute(ATTRIBUTE_ID, KB_CARD_CLASS_TYPE + cardId)
    card.setAttribute(ATTRIBUTE_DRAGGABLE, true);
    card.addEventListener(EVENT_DRAG_START, onDragStart);
}

// Card Events
function onDragStart(event) {
    event.dataTransfer.setData(DATA_TRANSFER_TYPE, event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const cardId = event.dataTransfer.getData(DATA_TRANSFER_TYPE);
    const cardElement = document.getElementById(cardId);

    const tableElement = event.target;
    tableElement.appendChild(cardElement);

    event.dataTransfer.clearData();
}
