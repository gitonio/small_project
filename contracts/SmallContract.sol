pragma solidity ^0.4.2;

contract SmallContract {
    address owner;
    address public accountA;
    address public accountB;

 
    mapping(address => bool) addedMapping;

    function SmallContract() {
        owner = msg.sender;
    }

    function getBalance() returns (uint) {
         return this.balance;
    }

    function transferAB() returns (bool) {
        var amount = this.balance / 2;
        if (!accountA.send(amount)) throw;
        if (!accountB.send(amount)) throw;
    }

    function getBalanceA() returns(uint) {
        return accountA.balance;
    }

    function getBalanceB() returns(uint) {
        return accountB.balance;
    }

    function  setAccountA  (address aA) public {
        accountA = aA;
        addedMapping[aA] = true;
    }
    function  setAccountB  (address bB) public {
        accountB = bB;
        addedMapping[bB] = true;
    }

    function getAccountA () public returns(address)  {
        return accountA;

    }

    function getAccountB () public returns(address)  {
        return accountB;

    }

    function killMe() returns (bool) {
        if (msg.sender == owner) {
            suicide(owner);
            return true;
        }
    }

    function () payable {
        if ( (accountA == 0x0 ) || (accountB == 0x0)) return;
        transferAB();
    }
}
