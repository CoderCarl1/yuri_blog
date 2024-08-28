export type documentFieldChild = {
    name: string;
    type: {
      jsonType: string;
      name: string;
      title: string;
      validation: [];
      [key: string]: any
    }
  }