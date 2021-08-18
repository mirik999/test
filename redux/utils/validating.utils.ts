import { isValid, parse } from 'date-fns';

//specific validate incoming date like dd/mm/yyyy
export function validateDate(date: string): boolean {
  const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
  return isValid(parsedDate);
}

export function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePhone(phone: string): boolean {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(String(phone).toLowerCase()) && phone.length === 13;
}

//at least 8 char and one uppercase one number
export function validatePassword(password: string): boolean {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(String(password));
}
