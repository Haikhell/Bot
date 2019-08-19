const mas = [
  {
    name: 'Gift Ideas',
    id: 'abcat0010000'
  },
  {
    name: 'TV & Home Theater',
    id: 'abcat0100000'
  },
  {
    name: 'Audio',
    id: 'abcat0200000'
  },
  {
    name: 'Musical Instruments',
    id: 'abcat0207000'
  },
  {
    name: 'Car Electronics & GPS',
    id: 'abcat0300000'
  },
  {
    name: 'Cameras & Camcorders',
    id: 'abcat0400000'
  },
  {
    name: 'Computers & Tablets',
    id: 'abcat0500000'
  },
  {
    name: 'Movies & Music',
    id: 'abcat0600000'
  },
  {
    name: 'Video Games',
    id: 'abcat0700000'
  },
  {
    name: 'Cell Phones',
    id: 'abcat0800000'
  },
  {
    name: 'Appliances',
    id: 'abcat0900000'
  }
];
/// get all categories
module.exports = function shopFunc() {
  let buttonObj = [];
  for (let index = 0; index < mas.length; index++) {
    let tempObj = {};
    tempObj['title'] = mas[index].name;
    tempObj['payload'] = mas[index].name;
    buttonObj.push(tempObj);
  }

  return buttonObj;
};
