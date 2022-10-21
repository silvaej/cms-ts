export interface Address {
    street: string
    city: string
    province: string
    zip: string
    country: string
}

export interface ContactUpdateRequest {
    first: string
    last: string
    mobile: string | undefined
    home: string | undefined
    billing: Address | undefined
    physical: Address | undefined
}

export interface ContactRequestModel extends ContactUpdateRequest {
    owner: string
}

export interface ContactResponseModel extends ContactRequestModel {
    id: string
}
