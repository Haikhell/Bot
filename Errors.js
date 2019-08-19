module.exports = async function(error) {
  switch (error) {
    case 300:
      return 'Category is empty';

    case 305:
      return 'You have not made purchases your list is empty';
    case 310:
      return 'You have not made favorite your list is empty';
    case 315:
      return 'Its category is empty';
  }
};
