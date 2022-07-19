const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

// it('can Create a Star', async() => {
//     let tokenId = 1;
//     let instance = await StarNotary.deployed();
//     await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
//     assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
// });
//
// it('lets user1 put up their star for sale', async() => {
//     let instance = await StarNotary.deployed();
//     let user1 = accounts[1];
//     let starId = 2;
//     let starPrice = web3.utils.toWei(".01", "ether");
//     await instance.createStar('awesome star', starId, {from: user1});
//     await instance.putStarUpForSale(starId, starPrice, {from: user1});
//     assert.equal(await instance.starsForSale.call(starId), starPrice);
// }).timeout(15000);
//
// it('lets user1 get the funds after the sale', async() => {
//     let instance = await StarNotary.deployed();
//     let user1 = accounts[1];
//     let user2 = accounts[2];
//     let starId = 3;
//     let starPrice = web3.utils.toWei(".01", "ether");
//     let balance = web3.utils.toWei(".05", "ether");
//     await instance.createStar('awesome star', starId, {from: user1});
//     await instance.putStarUpForSale(starId, starPrice, {from: user1});
//     let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
//     await instance.buyStar(starId, {from: user2, value: balance});
//     let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
//     let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
//     let value2 = Number(balanceOfUser1AfterTransaction);
//     assert.equal(value1, value2);
// }).timeout(15000);
//
// it('lets user2 buy a star, if it is put up for sale', async() => {
//     let instance = await StarNotary.deployed();
//     let user1 = accounts[1];
//     let user2 = accounts[2];
//     let starId = 4;
//     let starPrice = web3.utils.toWei(".01", "ether");
//     let balance = web3.utils.toWei(".05", "ether");
//     await instance.createStar('awesome star', starId, {from: user1});
//     await instance.putStarUpForSale(starId, starPrice, {from: user1});
//     let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
//     await instance.buyStar(starId, {from: user2, value: balance});
//     assert.equal(await instance.ownerOf.call(starId), user2);
// }).timeout(15000);

// it('lets user2 buy a star and decreases its balance in ether', async(done) => {
//   let instance = await StarNotary.deployed();
//   let user1 = accounts[1];
//   let user2 = accounts[2];
//   let starId = 125;
//   let starPrice = web3.utils.toWei(".01", "ether");
//   let balance = web3.utils.toWei(".05", "ether");
//   const gasPrice = web3.utils.toWei(".0001", "ether");
//   await instance.createStar('awesome star', starId, {from: user1});
//   await instance.putStarUpForSale(starId, starPrice, {from: user1});
//   let balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
//   await instance.buyStar(starId, {from: user2, value: balance, gasPrice:gasPrice});
//   let balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
//   // console.log(balanceAfterUser2BuysStar)
//   console.log(balanceOfUser2BeforeTransaction-balanceAfterUser2BuysStar)
//   let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar) - 1000000000;
//   assert.equal(value, starPrice);
// });

// Implement Task 2 Add supporting unit tests

it('can add the star name and star symbol properly', async() => {
    // 1. create a Star with different tokenId
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 10;
    await instance.createStar('Star Name', starId, {from: user1});

    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    assert.equal(await instance.name(), 'NAME');
    assert.equal(await instance.symbol(), 'SYMBOL');
});

it('lets 2 users exchange stars', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let firstStarId = 6;
    let secondStarId = 7;
    await instance.createStar('First Star', firstStarId, {from: user1});
    await instance.createStar('Second Star', secondStarId, {from: user2});
    // await instance.approve(user2, firstStarId,  {from: user1})
    // await instance.approve(user1, secondStarId,  {from: user2})

    await instance.exchangeStars(firstStarId, secondStarId, {from: user2});

    assert.equal(await instance.ownerOf.call(firstStarId), user2);
    assert.equal(await instance.ownerOf.call(secondStarId), user1);
});

it('lets a user transfer a star', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 8;
    await instance.createStar('Star', starId, {from: user1});

    await instance.transferStar(user2, starId, {from: user1});

    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lookUptokenIdToStarInfo test', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 9;
    let starName = 'Weird Star Name'
    await instance.createStar(starName, starId);

    let obtainedStarName = await instance.lookUptokenIdToStarInfo(starId);

    assert.equal(starName, obtainedStarName);
});
