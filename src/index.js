
  function calculateChange(amount, coins = [25, 10, 5, 1], index = 0) {
    if (amount === 0) {
        return [];
    }

    if (index >= coins.length) {
        return null;
    }

    const currentCoin = coins[index];
    const maxCount = Math.floor(amount / currentCoin);

    const validChange = findValidChange(amount, coins, index, maxCount);
    return validChange || null;
  }
    function findValidChange(amount, coins, index, maxCount){
      const currentCoin = coins[index];
    
    return [...Array(maxCount + 1)].map((_, count) => {
      const remainingAmount = amount - count * currentCoin;
        const nextChange = calculateChange(remainingAmount, coins, index + 1);
        return nextChange !== null ? [count, ...nextChange] : null;
    }).find(change => change !== null);
  }

function printChange(change) {
    const coins = ["quarters", "dimes", "nickels", "pennies"];
    change.forEach((count, i) => {
        if (count > 0) {
            console.log(`${count} ${coins[i]}`);
        }
    });
}

const amount = parseFloat(prompt("Enter the dollar amount: "));
const change = calculateChange(amount * 100);
if (change === null) {
    console.log("Cannot make change with available coins.");
} else {
    printChange(change);
}

