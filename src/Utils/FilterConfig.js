import LanguageList from './Languages';
import CountryList from './Country';

const ConvertArrayToCQL = (arg) => {
  const newArray = [];
  const arr = arg;
  Object.keys(arr).map((key) => {
    if (key > 0) {
      const obj = {
        name: arr[key].label,
        cql: arr[key].value
      };
      newArray.push(obj);
      return newArray;
    }
    return newArray;
  });
  return newArray;
};

const Filters = () => {
  const cqlLanguage = ConvertArrayToCQL(LanguageList);
  const cqlCountry = ConvertArrayToCQL(CountryList);
  return [
    {
      label: 'Stats Available',
      name: 'available',
      cql: 'interfaces',
      values: ['true', 'false']
    },
    {
      label: 'Vendor Status',
      name: 'vendor_status',
      cql: 'vendor_status',
      values: ['Active', 'Pending', 'Inactive']
    },
    {
      label: 'Payment Method',
      name: 'payment_method',
      cql: 'payment_method',
      values: ['Cash', 'Credit Card/P-Card', 'EFT', 'Deposit Account']
    },
    {
      label: 'Address Category',
      name: 'category',
      cql: 'addresses',
      values: ['Accounting', 'Books', 'Customer Service', 'Databases', 'Ebooks', 'Econtent', 'General', 'Journals', 'Licenses', 'Primary', 'Sales', 'Serials', 'Returns', 'Shipments', 'Payments', 'Other']
    },
    {
      label: 'Contact People Category',
      name: 'category',
      cql: 'contacts',
      values: ['Accounting', 'Books', 'Customer Service', 'Databases', 'Ebooks', 'Econtent', 'General', 'Journals', 'Licenses', 'Primary', 'Sales', 'Serials', 'Returns', 'Shipments', 'Payments', 'Other']
    },
    {
      label: 'Country',
      name: 'country',
      cql: 'addresses',
      values: cqlCountry
    },
    {
      label: 'Languages',
      name: 'language',
      cql: 'language',
      values: cqlLanguage
    }
  ];
};

export { Filters, ConvertArrayToCQL };
