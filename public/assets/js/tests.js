// afficher le cumul des 1

let total = 0;
keptDices.forEach((dice) => {
  if (dice === 1) {
    total += dice;
  }
});
console.log("Total des dés 1 : " + total);

// afficher le cumul des 4

total = 0;
keptDices.forEach((dice) => {
  if (dice === 4) {
    total += 1;
  }
});
console.log("Total des dés 4 : " + total);

// afficher le cumul des 5

total = 0;
keptDices.forEach((dice) => {
  if (dice === 5) {
    total += 1;
  }
});

console.log("Total des dés 5 : " + total);

// afficher le cumul des 6

total = 0;
keptDices.forEach((dice) => {
  if (dice === 6) {
    total += 1;
  }
});
console.log("total des dés 6 :" + total);

// afficher le cumul des 3

total = 0;
keptDices.forEach((dice) => {
  if (dice === 3) {
    total += 1;
  }
});
console.log("Total des dés 3 : " + total);

// afficher le cumul des 2

function cumul(array, diceValue) {
  total = 0;
  array.forEach((dice) => {
    if (dice === diceValue) {
      total += dice;
    }
  });
  console.log("Total des dés : " + total);
}
cumul(keptDices, 4);

function calculate(diceRolls) {

  // Compter les occurrences de chaque valeur de dé
  diceRolls.forEach((diceValue) => {
    if (diceCounts[diceValue]) {
      diceCounts[diceValue]++;
    } else {
      diceCounts[diceValue] = 1;
    }
  });

  // Vérifier s'il y a un brelan
  for (let value in keptDices) {
    if (keptDices[value] === 3) {
      console.log("Brelan");
      return;
    }
  }

  console.log("Pas de brelan");
}

// Exemple d'utilisation
calculate([3, 3, 3, 1, 4]); // Affichera "Brelan"
