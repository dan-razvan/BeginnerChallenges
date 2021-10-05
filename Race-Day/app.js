let raceTime = (userAge, registeredEarly) => {
    let raceNumber = Math.floor(Math.random() * 1000);
    if(userAge >= 18 && registeredEarly){
        raceNumber += 1000
      }
      if(userAge >= 18 && registeredEarly){
        return `You will race at 9:30 and you will have the race number: ${raceNumber}`;
      }else if(userAge >= 18 && !registeredEarly){
        return `You will race at 11:00 and will have the race number: ${raceNumber}`;
      }else if(userAge < 18) {
        return `You will race at 12:30 and will have the race number: ${raceNumber}`;
      }   
}
