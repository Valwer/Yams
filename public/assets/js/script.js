function lancerCinqDes() {
    const resultats = [];
    for (let i = 0; i < 5; i++) {
      resultats.push(Math.floor(Math.random() * 6) + 1);
    }
    return resultats;
  }
  
  console.log(lancerCinqDes());