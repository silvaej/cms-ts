interface Address {
    street: string
    city: string
    province: string
    state: string
    country: string
}

export interface ContactRequestModel {
    owner: string
    first: string
    last: string
    mobile: string | undefined
    home: string | undefined
    billing: Address | undefined
    physical: Address | undefined
}

export interface ContactResponseModel extends ContactRequestModel {
    id: string
}
