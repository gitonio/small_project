var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var sc = SmallContract.deployed();
  console.log("SmallContract Address:" + SmallContract.deployed().address);

  sc.getAccountA.call(account, {from: account}).then(function(value) {
    var accountA_element = document.getElementById("AccountA");
    accountA_element.innerHTML = value;
    document.getElementById("AccountA").value = value;
      console.log('getAccountA:'+value);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });

  sc.getAccountB.call(account, {from: account}).then(function(value) {
     document.getElementById("AccountB").value = value;
     console.log('getAccountB:'+value);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });

  sc.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
     balance_element.innerHTML = web3.fromWei(value.valueOf(),"ether");
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });


 sc.getBalanceA.call(account, {from: account}).then(function(value) {
    var balanceA_element = document.getElementById("balanceA");
   balanceA_element.innerHTML = web3.fromWei(value.valueOf(),"ether");
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });


 sc.getBalanceB.call(account, {from: account}).then(function(value) {
    var balanceB_element = document.getElementById("balanceB");
   balanceB_element.innerHTML = web3.fromWei(value.valueOf(),"ether");
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};


function sendToSmallContract() {
    var amount = document.getElementById("amount").value;
    var txn = web3.eth.sendTransaction({ 
        from: web3.eth.coinbase, 
        to: SmallContract.deployed().address,
        value: web3.toWei(amount, "wei") 
    });
    console.log("Send to SmallContract txn: " + txn);
    refreshBalance();
}

function setAddress() {
  var sc = SmallContract.deployed();
  
  var aA = document.getElementById("AccountA").value;
  console.log('aA:'+aA);
  var bB = document.getElementById("AccountB").value;
  console.log('bB :'+bB);


  sc.setAccountA(aA ,{from: account});
  sc.setAccountB(bB ,{from: account});
}

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
    console.log('Account 1:' + accounts[1]);
    console.log('Account 2:' + accounts[2]);

    
    refreshBalance();
  });
}
