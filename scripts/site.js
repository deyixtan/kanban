// Global variables
const DATA_TRANSFER_TYPE = "text/plain";
const ELEMENT_TAG_IMG = "img";
const ELEMENT_TAG_SPAN = "span";
const ATTRIBUTE_ID = "id";
const ATTRIBUTE_CLASS = "class";
const ATTRIBUTE_DRAGGABLE = "draggable";
const CLASS_TYPE_DRAGGING = "dragging";
const CLASS_TYPE_BTN_DELETE_KB_CARD = "btn-delete-card";
const CLASS_TYPE_KB_TABLE = "kb-table";
const CLASS_TYPE_KB_TABLE_CONTENT = CLASS_TYPE_KB_TABLE + "-content";
const CLASS_TYPE_KB_CARD = "kb-card";
const EVENT_DRAG_START = "dragstart";
const EVENT_DRAG_END = "dragend";
const EVENT_DRAG_OVER = "dragover";
const EVENT_DROP = "drop";

const KB_TABLE_TASKS = CLASS_TYPE_KB_TABLE + 1;
const CREATE_CARD_TEXT_PROMPT = "Please enter a task name";

let TOTAL_CARD_COUNT = 0;

// Functions
function createTables() {
    const tableElements = document.getElementsByClassName(CLASS_TYPE_KB_TABLE);
    Array.from(tableElements).forEach(initTable);
}

function createCard() {
    const taskName = prompt(CREATE_CARD_TEXT_PROMPT);
    if (taskName == null || taskName.trim() == "") {
        return;
    }

    const deleteBtnElement = document.createElement(ELEMENT_TAG_IMG);
    deleteBtnElement.classList.add(CLASS_TYPE_BTN_DELETE_KB_CARD);
    deleteBtnElement.src = "images/btn-delete-card.png";
    deleteBtnElement.addEventListener("click", (event) => {
        event.currentTarget.parentNode.remove();
    })

    const cardElement = document.createElement(ELEMENT_TAG_SPAN);
    cardElement.classList.add(CLASS_TYPE_KB_CARD)
    cardElement.textContent = taskName;
    cardElement.appendChild(deleteBtnElement);
    initCard(cardElement, TOTAL_CARD_COUNT);    

    const tableElement = document.getElementById(KB_TABLE_TASKS);
    const tableContentElement = tableElement.getElementsByClassName(CLASS_TYPE_KB_TABLE_CONTENT)[0];
    tableContentElement.appendChild(cardElement);
}

function initTable(table, index) {
    const tableId = parseInt(index) + 1;
    table.setAttribute(ATTRIBUTE_ID, CLASS_TYPE_KB_TABLE + tableId);
    table.addEventListener(EVENT_DRAG_OVER, onDragOver);
    table.addEventListener(EVENT_DROP, onDrop);
}

function initCard(card, index) {
    const cardId = parseInt(index) + 1;
    card.setAttribute(ATTRIBUTE_ID, CLASS_TYPE_KB_CARD + cardId)
    card.setAttribute(ATTRIBUTE_DRAGGABLE, true);
    card.addEventListener(EVENT_DRAG_START, onDragStart);
    card.addEventListener(EVENT_DRAG_END, onDragEnd);
    TOTAL_CARD_COUNT += 1;
}

// Events
function onDragStart(event) {
    event.dataTransfer.setData(DATA_TRANSFER_TYPE, event.target.id);

    event.currentTarget.classList.add(CLASS_TYPE_DRAGGING);
}

function onDragEnd(event) {
    event.currentTarget.classList.remove(CLASS_TYPE_DRAGGING);
}

function onDragOver(event) {
    event.preventDefault();
    
    let targetElement = event.target;
    while (!targetElement.classList.contains(CLASS_TYPE_KB_TABLE)) {
        targetElement = targetElement.parentNode;
    }

    const tableContentElement = targetElement.getElementsByClassName(CLASS_TYPE_KB_TABLE_CONTENT)[0];
    const draggedCard = document.getElementsByClassName(CLASS_TYPE_DRAGGING)[0];
    tableContentElement.appendChild(draggedCard);
}

function onDrop(event) {
    const cardId = event.dataTransfer.getData(DATA_TRANSFER_TYPE);
    const cardElement = document.getElementById(cardId);

    let targetElement = event.target;
    while (!targetElement.classList.contains(CLASS_TYPE_KB_TABLE)) {
        targetElement = targetElement.parentNode;
    }

    const tableContentElement = targetElement.getElementsByClassName(CLASS_TYPE_KB_TABLE_CONTENT)[0];
    tableContentElement.appendChild(cardElement);

    event.dataTransfer.clearData();
}
