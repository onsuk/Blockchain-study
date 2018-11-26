const CryptoJS = require('crypto-js');

// 유효한 블럭으로 만들어주는 0의 개수
const difficulty = 4;

class Block {
    constructor(index, previousHash, timestamp, data, nonce, hash) {
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = nonce;
        this.hash = hash.toString();
    }
}

// SHA256 Hash Generator 에서 차례대로 값을 쓰고 Generate 하면 Hash 값이 나온다.
const getGenesisBlock = () => {
    return new Block(
        0,
        "0",
        1465154705,
        "my genesis block!!",
        0,
        "816534932C2B7154836DA6AFC367695E6337DB8A921823784C14378ABED4F7D7"
    )
}

const blockchain = [getGenesisBlock()];

// 해쉬값을 계산해주는 함수
const calculateHash = (index, previousHash, timestamp, data, nonce) =>
    CryptoJS.SHA256(index + previousHash + timestamp + data + nonce).toString();


const generateNextBlock = (blockData) => {
    const previousBlock = getLatestBlock();
    const nextIndex = previousBlock.index + 1;
    const nextTimestamp = new Date().getTime() / 1000; // 밀리세컨을 세컨으로 바꾸는? 세컨을 밀리세컨으로 바꾸는 거겠지?
    
    const zeros = "0".repeat(difficulty)
    let nonce = 0;
    let  nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData, nonce);
    while(!nextHash.startsWith(zeros)) {
        nonce = nonce + 1;
        nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData, nonce);
    }
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nonce, nextHash);
};

const getLatestBlock = () => blockchain[blockchain.length - 1]

// const addBlock = (newBlock) => {
//     if (isValidNewBlock(newBlock, getLatestBlock())) {
//         blockchain.push(newBlock);
//     }
// };


// // 블럭이 유효한지 확인해주는 함수
// const isValidNewBlock = (newBlock, previousBlock) => {
//     const zeros = "0".repeat(difficulty)
//     if(newBlock.hash.startWith(zeors)){
//         return true;
//     }
//     return false;
// };

console.log("it is genesis", blockchain)
blockchain.push(generateNextBlock("aaa"))
console.log(blockchain)