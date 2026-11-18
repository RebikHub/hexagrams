export type TLine = {
  type: 'yang' | 'yin';
  changing: boolean;
};

export type TSumToLine = {
  [key in number]: TLine;
};

export type THexagram = {
  [key in string]: {
    n: number;
    cn: string;
    py: string;
    ru: string;
  };
};
