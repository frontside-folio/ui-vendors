import LanguageList from './Languages';

const ConvertLanguageToCQL = () => {
  const newArray = [];
  const arr = LanguageList;
  Object.keys(arr).map((key) => {
    if(key > 0) {
      const obj = {
        name: arr[key].label,
        cql: arr[key].value
      };
      newArray.push(obj);
      return newArray;
    }
  });
  return newArray;
};

const Filters = () => {
  const cqlLanguage = ConvertLanguageToCQL();
  return [
    {
      label: 'Vendor Status',
      name: 'vendor_status',
      cql: 'vendor_status',
      values: ['Active', 'Pending', 'Inactive']
    },
    {
      label: 'Languages',
      name: 'language',
      cql: 'language',
      values: cqlLanguage
    }
  ];
};

export { Filters, ConvertLanguageToCQL };
