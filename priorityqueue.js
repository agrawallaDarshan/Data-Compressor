var pq = new priorityQueue();
const compressData = document.getElementById("compress");
const textarea = document.getElementById("floatingTextarea");
const charTable = document.getElementById("charTable");
const encodedCharTable = document.getElementById("encodedCharTable");
const encoded = document.getElementById("encoded");
const decoded = document.getElementById("decoded");
const reset = document.getElementById("reset");

compressData.addEventListener("click", () => {
    var string = textarea.value;
    fillUpTable(string);
});

function fillUpTable(string) {
    let totalSize = 0;
    let map = new Map();
    let mapDecoded = new Map();
    cleanUpTable(charTable, charTable.rows.length);
    cleanUpTable(encodedCharTable, encodedCharTable.rows.length);
    pq.clear();
    for (let index = 0; index < string.length; index++) {
        const element = string.charAt(index);
        if (!map.has(element)) {
            map.set(element, 1);
        } else {
            map.set(element, map.get(element) + 1);
        }
    }

    fillUpEncoded(string);
    let charArray = [];
    let charFrequency = [];
    for (let key of map.keys()) {
        let keyValue = key;
        let freqValue = map.get(key);
        charArray.push(keyValue);
        charFrequency.push(freqValue);
        var row = charTable.insertRow();
        var cell1 = row.insertCell(0);
        cell1.innerHTML = `"${keyValue}"`;
        var cell2 = row.insertCell(1);
        cell2.innerHTML = `${freqValue}`;
        var cell3 = row.insertCell(2);
        var binaryString = Number(keyValue.charCodeAt(0)).toString(2);
        if (binaryString.length < 8) {
            while (binaryString.length < 8) {
                binaryString = "0" + binaryString;
            }
        }
        cell3.innerHTML = `${binaryString}`;
        var cell4 = row.insertCell(3);
        let size = 8 * freqValue;
        totalSize += size;
        cell4.innerHTML = `${size}`;
    }

    insertInPriorityQueue(charArray, charFrequency);
    createBinaryHeap();
    printCharCode(pq.front(), "", map, mapDecoded);
    let compressSize = fillUpDecoded(string, mapDecoded);
    // pq.print();
    // drawBinaryTree(pq.print()[0]);
    // levelOrderTraversal(pq.print()[0]);

    document.getElementById("before").innerHTML = `Original Data Size : ${totalSize} bits or ${totalSize/8} b or ${totalSize/8000} kb`;
    document.getElementById("after").innerHTML = `Compressed Data Size : ${compressSize} bits or ${compressSize/8} b or ${compressSize/8000} kb`;
  
}

class TreeNode {
    constructor(value, freq, leftNode, rightNode) {
        this.value = value;
        this.frequency = freq;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
    }
}

function priorityQueue() {
    let collections = [];
    this.print = () => {
        return collections;
    };

    this.enqueue = (element) => {
        if (collections.length === 0) {
            collections.push(element);
            return;
        }

        let flag = true;
        for (let index = 0; index < collections.length; index++) {
            if (element.frequency < collections[index].frequency) {
                collections.splice(index, 0, element);
                flag = false;
                break;
            }
        }

        if (flag) {
            collections.push(element);
        }
    };

    this.dequeue = () => {
        var element = collections[0];
        collections.shift();
        return element;
    };

    this.front = () => {
        if (collections.length === 0) {
            return null;
        } else {
            return collections[0];
        }
    };

    this.size = () => {
        return collections.length;
    };

    this.isEmpty = () => {
        return (collections.length === 0);
    };

    this.clear = () => {
        collections.splice(0, collections.length);
    }
}

function insertInPriorityQueue(charArray, charFrequency) {
    for (let index = 0; index < charArray.length; index++) {

        const node = new TreeNode(`${charArray[index]}`, charFrequency[index], null, null);
        pq.enqueue(node);
    }
}

function createBinaryHeap() {
    while (pq.size() > 1) {
        const newNode1 = pq.dequeue();
        const newNode2 = pq.dequeue();
        const freq = newNode1.frequency + newNode2.frequency;
        const newNode = new TreeNode('-', freq, newNode1, newNode2);
        pq.enqueue(newNode);
    }
}

function printCharCode(rootNode, s, map, mapDecoded) {
    if (rootNode.leftNode === null && rootNode.rightNode === null && rootNode.value != '-') {
        mapDecoded.set(rootNode.value, s);
        var row = encodedCharTable.insertRow();
        var cell1 = row.insertCell(0);
        cell1.innerHTML = `"${rootNode.value}"`;
        var cell2 = row.insertCell(1);
        cell2.innerHTML = `${map.get(rootNode.value.toString())}`;
        var cell3 = row.insertCell(2);
        cell3.innerHTML = `${s}`;
        var cell4 = row.insertCell(3);
        let size = s.length * map.get(rootNode.value.toString());
        cell4.innerHTML = `${size}`;
        return;
    }

    printCharCode(rootNode.leftNode, s + '0', map, mapDecoded);
    printCharCode(rootNode.rightNode, s + '1', map, mapDecoded);
}

function cleanUpTable(table, limit) {
    for (let i = 2; i < limit; i++) {
        table.deleteRow(2);
    }
}

function fillUpEncoded(string) {
    encoded.value = "";
    for (let index = 0; index < string.length; index++) {
        binaryString = Number(string.charCodeAt(index)).toString(2);
        if (binaryString.length < 8) {
            while (binaryString.length < 8) {
                binaryString = "0" + binaryString;
            }
        }
        encoded.value += `${binaryString}`;
    }
}

function fillUpDecoded(string, map) {
    decoded.value = "";
    let compressSize = 0;
    for (let index = 0; index < string.length; index++) {
        decoded.value += `${map.get(string.charAt(index))}`;
        compressSize += map.get(string.charAt(index)).length;
    }

    return compressSize;
}

function queue() {
    let collections = [];
    this.print = () => {
        return collections;
    };

    this.enqueue = (element) => {
        collections.push(element);
    };

    this.dequeue = () => {
        var element = collections[0];
        collections.shift();
        return element;
    };

    this.front = () => {
        if (collections.length === 0) {
            return null;
        } else {
            return collections[0];
        }
    };

    this.size = () => {
        return collections.length;
    };

    this.isEmpty = () => {
        return (collections.length === 0);
    };

    this.clear = () => {
        collections.splice(0, collections.length);
    }
}

var q = new queue();

function levelOrderTraversal(rootTreeNode) {
    q.enqueue(rootTreeNode);
    while (!q.isEmpty()) {
        let node = q.front();
        if (node.leftNode !== null) {
            q.enqueue(node.leftNode);
        }
        if (node.rightNode !== null) {
            q.enqueue(node.rightNode);
        }
    }
}

reset.addEventListener("click", () => {
    textarea.value = "";
    encoded.value = "";
    decoded.value = "";
    cleanUpTable(charTable,charTable.rows.length);
    cleanUpTable(encodedCharTable, encodedCharTable.rows.length);
    document.getElementById("before").innerHTML = "";
    document.getElementById("after").innerHTML = "";
});



