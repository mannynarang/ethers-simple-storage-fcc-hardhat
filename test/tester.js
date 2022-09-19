const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", () => {
  let SimpleStorageFactory, SimpleStorage;
  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    SimpleStorage = await SimpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async () => {
    // SimpleStorage.store("0");

    const currentValue = await SimpleStorage.retrieve();
    assert.equal(currentValue.toString(), "0");
  });
  it("Should update when we called the store function", async () => {
    const transactionResponse = await SimpleStorage.store("7");
    await transactionResponse.wait(1);
    const currentValue = await SimpleStorage.retrieve();
    assert.equal(currentValue, 7);
  });
});
