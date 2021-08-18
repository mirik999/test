import { format, isValid, parse, parseISO } from 'date-fns';
import az from 'date-fns/locale/az';
import ru from 'date-fns/locale/ru';
import en from 'date-fns/locale/en-US';
import { enGB } from 'date-fns/locale';
//types
import { Code } from '../types/translation.type';

export function formatDate(date: string, langCode: Code): string {
  const locale = langCode ? (langCode === 'EN' ? en : langCode === 'RU' ? ru : az) : en;
  return !date ? '' : format(new Date(parseISO(date)), 'dd MMMM yyyy HH:mm', { locale });
}
