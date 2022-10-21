import { ContactRequestModel, ContactUpdateRequest } from '@src/models/contact'
import { Address } from '@src/models/contact'
import { UserRequestModel } from '@src/models/user'

export class ContactValidator {
    public static validate(contact: ContactRequestModel) {
        /** VALIDATE THE OBJECT'S STRUCTURE IF IT FITS THE CONTACTRESPONSEMODEL */
        this.validateStructure(contact)
        /** VALIDATE THE NAME FIELDS */
        this.validateName(contact.first)
        this.validateName(contact.last)
        /** VALIDATE THE PHONE NUMBER FIELDS */
        if (contact.home) this.validatePhoneNumber(contact.home)
        if (contact.mobile) this.validatePhoneNumber(contact.mobile)
        /** VALIDATE THE ADDRESS FIELDS */
        if (contact.billing) this.validateAddress(contact.billing)
        if (contact.physical) this.validateAddress(contact.physical)
    }

    private static validateStructure(contact: ContactRequestModel): void {
        /** CHECK IF ALL REQUIRED FIELDS EXIST */
        if (!contact.owner || typeof contact.owner !== 'string')
            throw new Error('Owner is required and must be of type string')
        if (!contact.first || typeof contact.first !== 'string')
            throw new Error('First name is required and must be of type string')
        if (!contact.last || typeof contact.last !== 'string')
            throw new Error('Last name is required and must be of type string')
        /** CHECK VALIDITY OF EACH OPTIONAL FIELDS */
        if (!contact.home && !contact.mobile) throw new Error('Telephone or mobile number missing')
        if (!contact.billing && !contact.physical) throw new Error('Billing or physical address missing')
    }

    public static validateName(name: string): void {
        /** CHECK IF NAME IS ATLEAST 3 CHARACTERS LONG */
        if (name.length < 3) throw new Error('Name must be atleast 3 characters long')
        /** CHECK IF NAME CONTAINS ILLEGAL CHARACTERS I.E NUMBERS */
        const toMatch = new RegExp('!/^[a-z\\-]+$/i')
        if (toMatch.test(name)) throw new Error('Name contains number and/or special characters except (-)')
    }

    private static validatePhoneNumber(number: string): void {
        /** CHECK IF THE PHONE NUMBER IS IN A VALID FORMAT */
        const toMatch = new RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)
        if (!toMatch.test(number)) throw new Error('Not a valid number')
    }

    private static validateAddress(address: Address): void {
        if (!address.street || typeof address.street !== 'string')
            throw new Error('Street is required and must be of type string')
        /** IF STREET EXISTS */
        if (address.street.length < 4) throw new Error('Street must be atleast 4 characters long')
        if (!address.city || typeof address.city !== 'string')
            throw new Error('City is required and must be of type string')
        /** IF CITY EXISTS */
        if (address.city.length < 4) throw new Error('City must be atleast 4 characters long')
        if (!address.province || typeof address.province !== 'string')
            throw new Error('Province is required and must be of type string')
        /** IF PROVINCE EXISTS */
        if (address.province.length < 2) throw new Error('Province must be atleast 2 characters long')
        if (!address.zip || typeof address.zip !== 'string')
            throw new Error('Zip is required and must be of type string')
        /** IF ZIP EXISTS */
        if (address.zip.length < 4) throw new Error('Zip must be atleast 4 characters long')
        const toMatch = new RegExp('^[0-9]+$')
        if (!toMatch.test(address.zip)) throw new Error('Zip must contain numbers only')
        if (!address.country || typeof address.country !== 'string')
            throw new Error('Country is required and must be of type string')
        /** IF COUNTRY EXISTS */
        if (address.country.length < 2) throw new Error('Country must be atleast 2 characters long')
    }
}

export class UserValidator {
    public static validate(user: UserRequestModel) {
        /** VALIDATE THE OBJECT'S STRUCTURE IF IT FITS THE USERRESPONSEMODEL */
        this.validateStructure(user)
        /** VALIDATE THE NAME FIELDS */
        this.validateName(user.first)
        this.validateName(user.last)
        /** VALIDATE THE USERNAME FIELD */
        this.validateUsername(user.username)
        /** VALIDATE THE PASSWORD FIELD */
        this.validatePassword(user.password)
    }

    private static validateStructure(user: UserRequestModel): void {
        /** VALIDATE ALL REQUIRED FIELDS */
        if (!user.first) throw new Error('First name is required')
        if (!user.last) throw new Error('last name is required')
        if (!user.username) throw new Error('Username name is required')
        if (!user.password) throw new Error('Password name is required')
    }

    private static validateName(name: string): void {
        /** SINCE NAME VALIDATOR ALREADY EXISTS IN THE CONTACT VALIDATOR, I'M JUST GONNA USE THAT */
        ContactValidator.validateName(name)
    }

    private static validateUsername(username: string): void {
        /** VALIDATE IF USERNAME IS ATLEAST 5 CHARACTERS LONG */
        if (username.length < 5) throw new Error('Username must be atleast 5 charcters long')
    }

    private static validatePassword(password: string): void {
        /** VALIDATE IF PASSWORD IS ATLEAST 8 CHARCTERS LONG */
        if (password.length < 8) throw new Error('Password must be atleast 8 characters long')
        /** VALIDATE IF PASSWORD CONTAINS ATLEAST 1 OF THE FF: LOWERCASE, UPPERCASE, NUMBER, & SPECIAL CHARACTERS */
        const toMatch = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
        if (!toMatch.test(password))
            throw new Error(
                'Password must contain atleast one of the ff: uppercase letter, lowercase letter, number and a special character'
            )
    }
}

export function validateId(id: string): void {
    /** Check if id is 24 characters long */
    if (id.length !== 24) throw new Error('Id must be exactly 24 characters long')
}
