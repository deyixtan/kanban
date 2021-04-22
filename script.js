const DATA_TRANSFER_TYPE = "text/plain";

const SPAN_ELEMENT_TAG = "span";

const ATTRIBUTE_ID = "id";
const ATTRIBUTE_CLASS = "class";
const ATTRIBUTE_DRAGGABLE = "draggable";

const KB_TABLE_CLASS_TYPE = "kb-table";
const KB_TABLE_CONTENT_CLASS_TYPE = KB_TABLE_CLASS_TYPE + "-content";
const KB_CARD_CLASS_TYPE = "kb-card";

const KB_TASKS_TABLE = KB_TABLE_CLASS_TYPE + 1;

const EVENT_DRAG_START = "dragstart";
const EVENT_DRAG_OVER = "dragover";
const EVENT_DROP = "drop";

let TOTAL_CARD_COUNT = 0;

// Init
function createTables() {
    const tableElements = document.getElementsByClassName(KB_TABLE_CLASS_TYPE);
    Array.from(tableElements).forEach(initTable);
}

function createCard() {
    const taskName = prompt("Please enter a task name");
    if (taskName == null || taskName == "") {
        alert("User cancelled the prompt.");
        return;
    }

    const cardElement = document.createElement(SPAN_ELEMENT_TAG);
    cardElement.classList.add(KB_CARD_CLASS_TYPE)
    cardElement.textContent = taskName;
    initCard(cardElement, TOTAL_CARD_COUNT)    

    const tableElement = document.getElementById(KB_TASKS_TABLE);
    const tableContentElement = tableElement.getElementsByClassName(KB_TABLE_CONTENT_CLASS_TYPE)[0];
    tableContentElement.appendChild(cardElement);
}

function initTable(table, index) {
    const tableId = parseInt(index) + 1;
    table.setAttribute(ATTRIBUTE_ID, KB_TABLE_CLASS_TYPE + tableId);
    table.addEventListener(EVENT_DRAG_OVER, onDragOver);
    table.addEventListener(EVENT_DROP, onDrop);
}

function initCard(card, index) {
    const cardId = parseInt(index) + 1;
    card.setAttribute(ATTRIBUTE_ID, KB_CARD_CLASS_TYPE + cardId)
    card.setAttribute(ATTRIBUTE_DRAGGABLE, true);
    card.addEventListener(EVENT_DRAG_START, onDragStart);
    TOTAL_CARD_COUNT += 1;
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

    let targetElement = event.target;
    while (!targetElement.classList.contains(KB_TABLE_CLASS_TYPE)) {
        targetElement = targetElement.parentNode;
    }

    const tableContentElement = targetElement.getElementsByClassName(KB_TABLE_CONTENT_CLASS_TYPE)[0];
    tableContentElement.appendChild(cardElement);

    event.dataTransfer.clearData();
}
