contract('SmallContract', function(accounts) {
  it("should have 0 wei in the contract account using getBalance", function() {
    var sc = SmallContract.deployed();

    return sc.getBalance.call(accounts[0]).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "0 wasn't in the contract account");
    });
  });

  it("should have 0 wei in the contract account using direct access", function() {
    var sc = SmallContract.deployed();   
    assert.equal(web3.eth.getBalance(sc.address).toNumber(), 0, "0 wasn't in the contract account");
  });

  it("should start with zero address using getAccountA",function(){
    var sc = SmallContract.deployed();
    return sc.getAccountA.call(accounts[0]).then(function(account){
      assert.equal(account.valueOf(), 0, "0 wasn't the address")

    });
  });

  it("should start with zero address using direct access",function(){
    var sc = SmallContract.deployed();
    sc.accountA.call().then(function(accountA){
      assert.equal(accountA, 0x0, "0 wasn't the address")
    });

  });

  it("should set the address for account A",function(){
    var sc = SmallContract.deployed();
    return sc.setAccountA(accounts[1],{from: accounts[0]}).then(function(){
     sc.accountA.call().then(function(value){
      assert.equal(value,accounts[1], "wasn't the address")
    });
    });
  });


  it("should set the address for account B",function(){
    var sc = SmallContract.deployed();
    return sc.setAccountB(accounts[2],{from: accounts[0]}).then(function(){
     sc.accountB.call().then(function(value){
      assert.equal(value,accounts[2], "wasn't the address")
    });
    });
  });

  it("should distribute half of amount to account A", function(){
    var sc = SmallContract.deployed();
    var begbal;


    // Amount sent to contract
    var amount = 11;

    //console.log(sc.accountA.call());

    return sc.accountA.call( ).then(function(value) {
      begbal = web3.eth.getBalance(value).toNumber();
     }).then(function(){
      web3.eth.sendTransaction({ from: web3.eth.coinbase, to: SmallContract.deployed().address,value: web3.toWei(11, "wei")});
    }).then(function(){
      return sc.accountA.call();
    }).then(function(value){
      var endbal_act = web3.eth.getBalance(value).toNumber();
      endbal = begbal + amount/2 ;
      assert.equal(endbal_act, endbal, " was not in the first account");
    }).catch(function(e) {
      console.log(e);
    });
  });
 

  it("should distribute half of amount to account B", function(){
    var sc = SmallContract.deployed();
    var begbal;

    // Amount sent to contract
    var amount = 11;
  
    return sc.getBalanceB.call( {from: accounts[0]} ).then(function(value) {
      begbal = value;
      //return value;
    }).then(function(){
      sc.setAccountA(accounts[1],{from: accounts[0]})
      sc.setAccountB(accounts[2],{from: accounts[0]})
    }).then(function(){
      web3.eth.sendTransaction({ from: web3.eth.coinbase, to: SmallContract.deployed().address,value: web3.toWei(11, "wei")});
    }).then(function(){
      return sc.getBalanceB.call( {from: accounts[0]} );
    }).then(function(value){
      endbal = begbal.toNumber() + amount/2 ;
      assert.equal(value.valueOf(), endbal," was not in the first account");
    }).catch(function(e) {
      console.log(e);
    });
  });



});
