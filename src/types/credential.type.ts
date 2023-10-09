interface IRegisterCredentials {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
}

interface ILoginCredentials {
  email: string;
  password: string;
}

export type { IRegisterCredentials, ILoginCredentials };
