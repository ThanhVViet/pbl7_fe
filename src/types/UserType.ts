export interface Address{
    id?: number,
    name: string,
    mobile: string,
    address: string,
    city: string,
    state: string,
    locality: string,
}

export enum UserRole{
    ROLE_CUSTOMER = 'ROLE_CUSTOMER',
    ROLE_SELLER = 'ROLE_SELLER',
    ROLE_ADMIN = 'ROLE_ADMIN',
}
export interface User {
    id?: number,
    email: string,
    password?: string,
    username: string,
    mobile: string,
    addresses?: Address[],
    role: UserRole,
    enabled?: boolean
}
