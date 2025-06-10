const getAge = function (birth, death) {
  if (!death) {
    death = new Date().getFullYear();
  }
  return death - birth;
};


const findTheOldest = function (arr) {
  return arr.reduce((old, person) => {

    const oldAge = getAge(old.yearOfBirth, old.yearOfDeath);

    const age = getAge(
      person.yearOfBirth,
      person.yearOfDeath
    );

    return age > oldAge ? person : old;
  });
};

// {
//         name: "Jane",
//         yearOfBirth: 1912,
//         yearOfDeath: 1941,
//       },
// Do not edit below this line
module.exports = findTheOldest;
