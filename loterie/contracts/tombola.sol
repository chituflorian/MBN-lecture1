// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
 contract Tombola {
     address public owner;
     string public name;
     uint public startDate;
     uint public commission;
     uint public totalPrize;
     uint public ticketPrice;
     uint public winningAmount;
     uint public secondPlaceAmount;
     address public firstPlace;
     address public secondPlace;
    event LogAddress(address indexed _address);

    function printAddress(address _address) public{
        emit LogAddress(_address);
    } 
    struct Participant{
        bool owns;
        uint tickets;
    }
    mapping(address=> Participant) public participants;
    address[] public addresses;

    constructor(string memory _name, uint _startDate){
        owner=msg.sender;
        name=_name;
        startDate = _startDate;
        ticketPrice = 1 ether;
        commission = 5; // 5%
        
    }

    function buyTicket() public payable {
        // Require-> securitate
        require(block.timestamp < startDate, "Tombola has already started");
        require(participants[msg.sender].owns == false,"Maximum tickets per address is 1");
        require(msg.value == ticketPrice,"Incorrect ticket price"); // <-de modificat
        addresses.push(msg.sender);
        participants[msg.sender].owns = true;
        participants[msg.sender].tickets++;
        totalPrize = addresses.length*ticketPrice;
    
        
    }

    function setTotalPrize() public  returns (uint){
        totalPrize = addresses.length * ticketPrice;
        return totalPrize;
    }
    function getWinningAmount() public view returns(uint){

        return (totalPrize*70)/100;   
    }
    function getSecondPlaceAmount() public view returns(uint){
        return(totalPrize*25)/100;
    }
    function getTotalPrize() public view returns(uint){
        return totalPrize;
    }
    
    function setRandomIndex(uint range, uint i) public returns(uint){
          uint randomNumber = uint(keccak256(abi.encodePacked(block.timestamp+i,block.difficulty, msg.sender))) % range;
            return randomNumber;
        }
 
    
    modifier admin(){
        require(msg.sender == owner,"Only the admin can call the function");
        _;
    }
    function startTombola() public admin{
        require(block.timestamp>=startDate, "Tombola nu a inceput");
        require(totalPrize > 0,"No participants or prize available");
        uint numberOfParticipants = addresses.length;
        
        require(numberOfParticipants>0, "Nu avem participanti");

        winningAmount = (getTotalPrize() * 70)/100;
        secondPlaceAmount = (getTotalPrize()*25)/100;
        commission = getTotalPrize() - winningAmount -secondPlaceAmount;

        address firstPlace = addresses[setRandomIndex(addresses.length,0)];
        printAddress(firstPlace);
        address secondPlace = addresses[setRandomIndex(addresses.length,0)];
        
        while(firstPlace==secondPlace){
            uint i =0;
            secondPlace=addresses[setRandomIndex(addresses.length, i+1)];
            i++;
        }
        printAddress(secondPlace);

        payable(firstPlace).transfer(winningAmount);
        payable(secondPlace).transfer(secondPlaceAmount);
        totalPrize = 0;
        winningAmount =0;
        secondPlaceAmount=0;
        
        for(uint i = 0; i< numberOfParticipants; i++){
            delete participants[addresses[i]];
        }
        
    } 

    function withdrawComission() public admin{
        require(commission > 0, "No comission available");
        payable(owner).transfer(commission);
        commission = 0;
    }
    function getAllParticipantsAddress() public view returns (address[] memory) {
        
    return addresses;
    }
    function getAddressLength() public view returns(uint){
        return addresses.length;
    }
    function getSetSecondAndFirst() public {
        firstPlace = addresses[setRandomIndex(addresses.length,0)];
        secondPlace = addresses[setRandomIndex(addresses.length,0)];
        
    }
  
}