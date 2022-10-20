export interface UserRequestModel {
    first: string
    last: string
    username: string
    password: string
}

export interface UserResponseModel extends UserRequestModel {
    id: string
}

export interface LoginResponseModel {
    id: string
    name: string
}
