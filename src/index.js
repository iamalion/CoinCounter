//  function CoinCounter(amount) {
//   const coinValues = [
//     {quarters: 25}, 
//     {dimes: 10}, 
//     {nickles:5}, 
//     {pennies:1} 
// ];

// function calculateChange(amount, coins = [25, 10, 5, 1], index = 0) {
//   if (amount === 0) {
//       return [];
//   }

//   if (index >= coins.length) {
//       return null; // No combination of coins can make up the amount
//   }

//   const currentCoin = coins[index];
//   const maxCount = Math.floor(amount / currentCoin);

//   for (let count = maxCount; count >= 0; count--) {
//       const remainingAmount = amount - count * currentCoin;
//       const nextChange = calculateChange(remainingAmount, coins, index + 1);

//       if (nextChange !== null) {
//           return [count, ...nextChange];
//       }
//   }

//   return null; // No combination of this coin works, try the next one
// }

// function printChange(change) {
//   const coins = ["quarters", "dimes", "nickels", "pennies"];
//   change.forEach((count, i) => {
//       if (count > 0) {
//           console.log(`${count} ${coins[i]}`);
//       }
//   });
// }

// const amount = parseFloat(prompt("Enter the dollar amount: "));
// const change = calculateChange(amount * 100); // Convert to cents
// if (change === null) {
//   console.log("Cannot make change with available coins.");
// } else {
//   printChange(change);
// }



// with closures 
// below code returns "Cannot make change with available coins." for any input above 0. Nothing is printed in the console if 0 is inputted. There is an error if the inputted number is a negative number.

// function calculateChange(amount, coins = [25, 10, 5, 1]) {
//   function calculate(index) {
//     if (amount === 0) {
//         return [];
//     }
    
//     if (index >= coins.length) {
//         return null;
//     }

//     const currentCoin = coins[index];
//     const maxCount = Math.floor(amount / currentCoin);

//     const validChange = [...Array(maxCount + 1)].map((_, count) => {
//         const remainingAmount = amount - count * currentCoin;
//         const nextChange = calculate(index + 1);
// return nextChange !== null ? [count, ...nextChange] : null;
//         }).find(change => change !== null);

//         return validChange || null;
//         }
        
//   return calculate(0);
// }

// function printChange(change) {
// const coins = ["quarters", "dimes", "nickels", "pennies"];
// change.forEach((count, i) => {
//     if (count > 0) {
//         console.log(`${count} ${coins[i]}`);
//     }
// });
// }

// const amount = parseFloat(prompt("Enter the dollar amount: "));
// const change = calculateChange(amount * 100);
// if (change === null) {
// console.log("Cannot make change with available coins.");
// } else {
// printChange(change);
// }

// Updated code: This works as expected now.
function calculateChange(amountInCents, coins = [25, 10, 5, 1], index = 0) {
  if (amountInCents === 0) {
      return [];
  }

  if (index >= coins.length) {
      return null;
  }

  const currentCoin = coins[index];
  const maxCount = Math.floor(amountInCents / currentCoin);

  let bestChange = null;

  for (let count = maxCount; count >= 0; count--) {
      const remainingAmount = amountInCents - count * currentCoin;
      const nextChange = calculateChange(remainingAmount, coins, index + 1);

      if (nextChange !== null) {
          nextChange.unshift(count);
          if (bestChange === null || nextChange.length < bestChange.length) {
              bestChange = nextChange;
          }
      }
  }

  return bestChange;
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
const amountInCents = Math.round(amount * 100); // Convert to cents and round
const change = calculateChange(amountInCents);
if (change === null) {
  console.log("Cannot make change with available coins.");
} else {
  printChange(change);
}
