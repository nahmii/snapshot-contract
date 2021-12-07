const { expect } = require("chai");
const { ethers } = require("hardhat");
const abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",

    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

 

describe("Multicall", function () {
  let multicall;
  let bal;

  

  beforeEach(async function () {
      const provider = ethers.provider;
 const WETH_ADDRESS = 0x4200000000000000000000000000000000000006;
    const erc20 = new ethers.Contract(WETH_ADDRESS, abi, provider);
    bal = await erc20.balanceOf("0x81964e06cA51F7426F17c52485f9f5B0bA446F02")
    
    const Multicall = await ethers.getContractFactory("Multicall");
     let token = await Multicall.deploy();
     multicall = await token.deployed();
     
    // [owner, addr1] = await ethers.getSigners();
   });
  
  // it("Should return the correct token name", async function () {
  //   console.log("Multicall is here", multicall)
  //   expect(await multicall.getName()).to.equal("Multicall");
  // });

  it("Should return the Eth balance", async function () {

    // console.log(token.address);

    expect(await multicall.getEthBalance("0x81964e06cA51F7426F17c52485f9f5B0bA446F02")).to.gt(bal);

    
  });
});