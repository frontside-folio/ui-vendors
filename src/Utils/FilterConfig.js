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

const SearchableIndexes = () => {
  return [
    { label: 'All', value: 'all', makeQuery: term => `(name="${term}*" or code="${term}*" or language="${term}*" or aliases="${term}*" or erp_code="${term}*" or tax_id="${term}*" or interfaces="${term}*")` },
    { label: 'Name', value: 'name', makeQuery: term => `(name="${term}*")` },
    { label: 'Code', value: 'code', makeQuery: term => `(code="${term}*")` },
    { label: 'Language', value: 'language', makeQuery: term => `(language="${term}*")` },
    { label: 'Aliases', value: 'aliases', makeQuery: term => `(aliases="${term}*")` },
    { label: 'ERP Code', value: 'erp_code', makeQuery: term => `(erp_code="${term}*")` },
    { label: 'Tax ID', value: 'tax_id', makeQuery: term => `(tax_id="${term}*")` },
    { label: 'Interfaces', value: 'interfaces', makeQuery: term => `(interfaces="${term}*")` }
  ];
};

export { Filters, ConvertArrayToCQL, SearchableIndexes };
