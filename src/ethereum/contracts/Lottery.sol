pragma solidity ^0.4.19;

contract Lottery {
    address public manager;
    address[] public players;

    modifier isOwner() {
        // only allow manager to call function
        require(msg.sender == manager);
        _;
    }

    function Lottery() public {
        manager = msg.sender;
    }

    function enterLottery() public payable {
        require(msg.value >= 0.001 ether);
        players.push(msg.sender);
    }

    function getRandomNumber() private view returns(uint) {
        // this only gives a pseduo-random number and could be gamed
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public isOwner {

        // get index of winner using modulo
        uint winner = getRandomNumber() % players.length;
        // access index of winner in players array, and send them the winnings
        players[winner].transfer(this.balance);
        // reset players array to be an empty dynamic array
        players = new address[](0);
    }

    function getPlayers() public view returns(address[]) {
        return players;
    }
}