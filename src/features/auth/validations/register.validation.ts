import { RegisterFormErrors, RegisterFormValues } from "../types";

// -----------------------------------------
// Export Register Validators 
// --------------------------------------------------
export const validateRegisterForm = (
  values: RegisterFormValues
): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};

    // validate full name 
    if (!values.fullName.trim()) {
        errors.fullName = 'Full name is required';
    } else if (values.fullName.trim().length < 3) {
        errors.fullName = 'Name must be at least 3 characters';
    }

    // Validate Bangladeshi phone numbers
    const bdPhoneRegex = /^(?:\+?88)?01[3-9][0-9]{8}$/;
    if (!values.phoneNumber.trim()) {
        errors.phoneNumber = 'Phone number is required';
    } else if (!bdPhoneRegex.test(values.phoneNumber.replace(/\s/g, ''))) {
        errors.phoneNumber = 'Please enter a valid Bangladeshi phone number';
    }

  return errors;
};
