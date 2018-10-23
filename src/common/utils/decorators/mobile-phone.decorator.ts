const phones = {
  'sv-SE': /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
};

export const IsMobilePhone = () => {
  return (target, key) => {
    // tslint:disable-next-line:no-console
    console.log(Object.keys(target), key);
  };
};
