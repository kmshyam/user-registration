export const randomTwoDigNum = () => {
  let random = Math.floor(Math.random() * 100);
  let twoDigRndm;
  if (random < 10) {
    twoDigRndm = `0${random}`;
  } else {
    twoDigRndm = random;
  }
  return twoDigRndm;
};

export const randomFourDigNum = () => {
  let random = Math.floor(Math.random() * 10000);
  let fourDigRndm;
  if (random < 1000) {
    fourDigRndm = `0${random}`;
  } else {
    fourDigRndm = random;
  }
  return fourDigRndm;
};

export const randomFiveDigNum = () => {
  let random = Math.floor(Math.random() * 100000);
  let fiveDigRndm;
  if (random < 10000) {
    fiveDigRndm = `0${random}`;
  } else {
    fiveDigRndm = random;
  }
  return fiveDigRndm;
};

export const randomTenDigNum = () => {
  let random = Math.floor(Math.random() * 10000000000);
  let tenDigRndm;
  if (random < 10000) {
    tenDigRndm = `0${random}`;
  } else {
    tenDigRndm = random;
  }
  return tenDigRndm;
};

export const getUnixTime = () => {
  const currentDate = new Date();
  const unixTimestamp = currentDate.getTime();
  const unixTimestampInSeconds = Math.floor(unixTimestamp / 1000);
  return unixTimestampInSeconds;
};
