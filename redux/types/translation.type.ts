export type Code = 'EN' | 'RU' | 'AZ';

export type Languages = {
  id: number;
  translation: string;
  languageCode: Code;
};

export type InitialType = {
  languages: Languages[];
  translation: Translation | { [key: string]: string };
  code: Code;
};

export type Translation = {
  hello: string;
};
