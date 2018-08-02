 pragma solidity ^0.4.19;

contract Grains {

  address public centralGovt;
  struct Person {
    bytes32 name;
    bytes32 accType;
    uint holdings; // in tonnes
    uint balance; // their cash
    uint priceQuoted; // in Rs. per tonnes
  }
  mapping (address => Person) public people;
  address[] public addressList;
  // constructor
  // runs once per each contract creation
  function Grains() public {
    centralGovt = msg.sender;
    /* Grains.Person admin =  */

    people[centralGovt] = Person({
            name : "Narendra Modi",
            accType: "Centre",
            holdings : 0,
            balance : 1200000,
            priceQuoted : 0
        });
    addressList.push(msg.sender);
  }

  // transfer balance to buy Grains in tonnes
  function buyGrains(address _from, uint _qty) public returns (bool success){
    uint _value = people[_from].priceQuoted * _qty;
    if(people[msg.sender].balance < _value || people[_from].holdings < _qty){
      return false;
    }

    people[msg.sender].balance -= _value;
    people[_from].balance += _value;
    people[msg.sender].holdings += _qty;
    people[_from].holdings -= _qty;
    return true;
  }

  // returns a single person based on the address
  function getPerson(address _user) constant public returns(bytes32, bytes32, uint, uint, uint){
    return(people[_user].name,people[_user].accType,people[_user].holdings,people[_user].balance,people[_user].priceQuoted);
  }

  function getCurrentPerson() constant public returns(bytes32, bytes32, uint, uint, uint){
    return(people[msg.sender].name,people[msg.sender].accType,people[msg.sender].holdings,people[msg.sender].balance,people[msg.sender].priceQuoted);
  }

  function addPerson(address _myAddress, bytes32 _firstName , bytes32 _accType, uint _holdings, uint _balance, uint _priceQuoted) public returns (bool success) {
    Person memory newPerson;
    newPerson.name = _firstName;
    newPerson.accType = _accType;
    newPerson.holdings = _holdings;
    newPerson.balance = _balance;
    newPerson.priceQuoted = _priceQuoted;

    people[_myAddress] = newPerson;
    addressList.push(_myAddress);
    return true;
  }
  /* function getPeople() constant public returns (bytes32[],bytes32[],uint[],uint[],uint[])  {

    uint length = people.length;

    bytes32[] memory names = new bytes32[](length);
    bytes32[] memory accTypes = new bytes32[](length);
    uint[] memory holdings = new uint[](length);
    uint[] memory balances= new uint[](length);
    uint[] memory pricesQuoted = new uint[](length);


    for(uint i=0 ;i < people.length; i++){
      Person memory currentPerson;
      currentPerson = people[i];

      firstNames[i] = currentPerson.firstName;
      lastNames[i]= currentPerson.lastName;
      ages[i] = currentPerson.age;
    }
return (firstNames, lastNames,ages);
  } */


}
