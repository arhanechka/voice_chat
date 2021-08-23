export interface Channel {
    vendor_key: string,
    sign_key: string,
    name: string
    id: string,
    status?: number,
    token?: string
  }

  export interface IUser {
      name: string,
      avatar: number,
      id: number,
      password: string
  }

  export interface IContext {
      user: IUser,
      logged: boolean,
      channels: Channel[]
  }