export const isEmail = (email) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

export const navBackgrounds = {
  '#1979BE': '#1567A2',
  '#D29034': '#B27B2D',
  '#519839': '#458231',
  '#B04632': '#953B2B',
  '#89609E': '#755287',
  '#CD5A91': '#AE4C7C',
  '#5AC06B': '#4BA25C',
  '#42AECC': '#3795AD',
  '#838C91': '#70777B',
};

export const labels = ['#61BD4F', '#F2D600', '#F69E1D', '#EB5A46', '#C377E0', '#1979BE'];

export const updateCardLocHelper = ({ lists, data }) => {
  let { cardSourceIndex, cardDestIndex, listSourceId, listDestId } = data;
  let sList, dList, card;
  lists.map((list) => {
    if (list._id == listSourceId) sList = list;
    if (list._id == listDestId) dList = list;
  });

  // * store card that want to delete
  card = sList.cards[cardSourceIndex];

  // * delete the card from sList cards
  sList.cards = sList.cards.filter((item, i) => i !== cardSourceIndex);

  // * add the card in dList cards in correct position
  dList.cards.splice(cardDestIndex, 0, card);

  // * update lists array;
  return lists.map((list) => (list._id == listSourceId ? sList : list._id == listDestId ? dList : list));
};

export const parseJwt = (token) => {
  try {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (err) {
    return {};
  }
};
