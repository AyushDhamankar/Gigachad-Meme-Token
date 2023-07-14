// SPDX-License-Identifier: MIT
// 0xA4b494D9b9ce8516087883Fc1663F25A54a24c00 ACC 1
pragma solidity ^0.8.0;

contract Gigachad {
    string public TokenName = "Gigachad";
    string public TokenSymbol = "GC";
    string public TokenDecimal = "0";
    uint public totalSupply;
    mapping(address => uint) public TokenBalances;
    address public TokenOwner;

    struct Transactions {
        address from;
        address to;
        uint tokens;
    }

    Transactions[] public TransactionList;

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakingTime;
    mapping(address => bool) public isStaking;

    uint256 constant MIN_STAKING_DURATION = 60;
    uint256 constant REWARD_DIVISOR = 100;

    mapping(uint256 => mapping(address => bool)) public hasVoted;
    uint256 public proposalCount;

    struct Proposal {
        uint id;
        string title;
        string description;
        uint256 voteCount;
    }

    Proposal[] public ProposalList;

    constructor() {
        TokenOwner = msg.sender;
        totalSupply = 100000;
        TokenBalances[TokenOwner] = totalSupply;
    }

    function mint(uint amount) public {
        require(msg.sender == TokenOwner, "You are not the owner");
        TokenBalances[TokenOwner] += amount;
    }

    function burn() public {
        require(msg.sender == TokenOwner, "You are not the owner");
        TokenBalances[TokenOwner] = 0;
    }

    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return TokenBalances[tokenOwner];
    }

    function transfer(address to, uint tokens) public {
        require(TokenBalances[msg.sender] >= tokens, "You don't have sufficient balance");

        Transactions memory t1;
        t1.from = msg.sender;
        t1.to = to;
        t1.tokens = tokens;
        TransactionList.push(t1);

        TokenBalances[msg.sender] -= tokens;
        TokenBalances[to] += tokens;
    }

    function transfertocontract(address to, uint tokens) public {
        require(TokenBalances[TokenOwner] >= tokens, "You don't have sufficient balance");

        TokenBalances[TokenOwner] -= tokens;
        TokenBalances[to] += tokens;
    }

    function purchaseToken() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(TokenOwner != msg.sender, "Owner cannot buy the tokens");

        if(msg.value == 1000000) {
            payable(TokenOwner).transfer(msg.value);
            transfertocontract(msg.sender, 10);
        } else if(msg.value == 2000000) {
            payable(TokenOwner).transfer(msg.value);
            transfertocontract(msg.sender, 25);
        } else if(msg.value == 3000000) {
            payable(TokenOwner).transfer(msg.value);
            transfertocontract(msg.sender, 50);
        }
    }

    function getTransactions() public view returns(Transactions[] memory) {
        return TransactionList;
    }

    function stake(uint256 _amount) public {
        require(_amount > 0, "Stake amount must be greater than 0");
        require(TokenBalances[msg.sender] >= _amount, "Insufficient balance");
        require(!isStaking[msg.sender], "Already staking");
        TokenBalances[msg.sender] -= _amount;
        stakedBalance[msg.sender] += _amount;
        stakingTime[msg.sender] = block.timestamp;
        isStaking[msg.sender] = true;
    }

    function unstake() public {
        require(isStaking[msg.sender], "Not staking");
        uint256 amount = stakedBalance[msg.sender];
        uint256 stakingDuration = block.timestamp - stakingTime[msg.sender];
        if (stakingDuration >= MIN_STAKING_DURATION) {
            uint256 reward = calculateReward(amount, stakingDuration);
            uint256 unstakedAmount = amount + reward;
            TokenBalances[msg.sender] += unstakedAmount;
            stakedBalance[msg.sender] = 0;
            stakingTime[msg.sender] = 0;
            isStaking[msg.sender] = false;
        } else {
            revert("Minimum staking duration not reached");
        }
    }

    function calculateReward(uint256 _amount, uint256 _duration) internal pure returns (uint256) {
        uint256 reward = (_amount * _duration) / REWARD_DIVISOR;
        return reward;
    }

    function createProposal(string calldata _title, string calldata _description) public {
        require(TokenBalances[msg.sender] > 30, "You are not eligible for create proposal");
        ProposalList.push(Proposal(proposalCount, _title, _description, 0));
        proposalCount++;
    }

    function vote(uint256 _proposalId) public {
        require(TokenBalances[msg.sender] > 30, "You are not eligible for create proposal");
        require(_proposalId < ProposalList.length, "Invalid proposal ID");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");

        hasVoted[_proposalId][msg.sender] = true;
        ProposalList[_proposalId].voteCount += 1;
    }

    function getProposal() public view returns(Proposal[] memory) {
        return ProposalList;
    }

    function proposalResult(uint256 _proposalId) public view returns(bool) {
        require(_proposalId < ProposalList.length, "Invalid proposal ID");
        if(ProposalList[_proposalId].voteCount > 2) {
            return true;
        }else {
            return false;
        }
    }
}
