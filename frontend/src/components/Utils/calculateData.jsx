export const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();
  let ageInMilliseconds = currentDate - birthDate;
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const millisecondsInYear = 365.25 * millisecondsInDay;
  const years = Math.floor(ageInMilliseconds / millisecondsInYear);
  const remainingMilliseconds = ageInMilliseconds % millisecondsInYear;
  const months = Math.floor(
    remainingMilliseconds / (30.44 * millisecondsInDay)
  );
  const days = Math.floor(
    (remainingMilliseconds % (30.44 * millisecondsInDay)) / millisecondsInDay
  );
  return `${years} years`;
};

export const threeDigitMonthDateConverter = (date) => {
  const inputDate = new Date(date);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = inputDate.getDate();
  const monthIndex = inputDate.getMonth();
  const year = inputDate.getFullYear();
  const formattedDate = `${day < 10 ? `0${day}` : day} ${
    monthNames[monthIndex]
  } ${year}`;
  return formattedDate;
};

export const calculateExperience = (joiningDate) => {
  const currentDate = new Date();
  const joinDate = new Date(joiningDate);
  const timeDifference = currentDate - joinDate;
  const years = Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000));
  const remainingMilliseconds = timeDifference % (365 * 24 * 60 * 60 * 1000);
  const months = Math.floor(remainingMilliseconds / (30 * 24 * 60 * 60 * 1000));
  const remainingMilliseconds2 =
    remainingMilliseconds % (30 * 24 * 60 * 60 * 1000);
  const days = Math.floor(remainingMilliseconds2 / (24 * 60 * 60 * 1000));
  if (years < 1 && months < 1) {
    if (days < 1) {
      return "No Experience";
    } else {
      return `${days}days`;
    }
  } else if (years < 1 && months >= 1) {
    if (days < 1) {
      return `${months}months`;
    } else {
      return `${months}months ${days}days`;
    }
  } else if (years >= 1) {
    if (months < 1 && days < 1) {
      return `${years}years`;
    } else if (months < 1 && days >= 1) {
      return `${years}years ${days}days`;
    } else if (months >= 1 && days < 1) {
      return `${years}years ${months}months`;
    } else {
      return `${years}years ${months}months ${days}days`;
    }
  }
};
