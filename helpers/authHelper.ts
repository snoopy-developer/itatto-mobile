export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateForm = (email: string, password: string) => {
  const errors = {
    emailError: null as string | null,
    passwordError: null as string | null,
  };

  if (!validateEmail(email)) {
    errors.emailError = 'Please enter a valid email address';
  }

  if (!validatePassword(password)) {
    errors.passwordError = 'Password must be at least 8 characters';
  }

  return errors;
};
