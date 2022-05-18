export enum FormAction {
  Add = "Add",
  Edit = "Edit",
}

export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface IContacts {
  totalPages: number;
  results: IContact[];
}
