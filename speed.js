function detectspeed(speed) {
    const speedLimit = 70;
    const speedPerDemerit = 5;
    const totalDemeritPoints = 12;

    if (speed <= speedLimit) {
      console.log("Ok");
      return;
    }

    const demeritPoints = Math.floor((speed - speedLimit) / speedPerDemerit);

    if (demeritPoints > totalDemeritPoints) {
      console.log("License suspended");
    } else {
      console.log("Points:", demeritPoints);
    }
  }



