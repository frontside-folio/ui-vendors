// Validate Multiple Forms
const Validate = (values) => {
  const errors = {}
  if (values) {
    if (!values.name) {
      errors.name = 'Required'
    }
    // Addresses
    // if (values.addresses && values.addresses.length) {
    //   console.log(values);
    //   const addressesArrayErrors = []
    //   values.addresses.forEach((add, i) => {
    //     const addErrors = {}
    //     if (!add || !add.address) {
    //       addErrors.address.addressLine1 = 'Required';
    //       addressesArrayErrors[i] = addErrors;
    //     }
    //     return addressErrors;
    //   });
    //   if (addressesArrayErrors.length) {
    //     errors.addresses = addressesArrayErrors;
    //   }
    // }
  }

  return errors;
}

// Validate Required Field
const Required = (value) => value ? undefined : 'Validation is working! This is required mate!'

export { Validate, Required };