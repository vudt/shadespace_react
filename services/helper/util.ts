export const validate_text_field = (name: string) => {
  return {
    required: `${name} is required`, 
    minLength: { 
      value: 2, 
      message: `${name} must have at least 2 characters.`
    }
  }
}

export const validate_phone_field = (name: string) => {
  return {
    required: `${name} is required`, 
    minLength: { 
      value: 9, 
      message: `${name} must have at least 9 characters.`
    },
    maxLength: {
      value: 13,
      message: `${name} must have from 9 - 13 characters.`
    }
  }
}

export const validate_email_field = {
  required: "Please input your email",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
    message: "Invalid email address"
  }
}