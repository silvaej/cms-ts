import { ContactResponseModel } from '@src/models/contact'
import { Address } from '@src/models/contact'
import { UserResponseModel } from '@src/models/user'

export class ContactValidator {
    public static validate(contact: ContactResponseModel) {
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

    private static validateStructure(contact: ContactResponseModel): void {
        /** CHECK IF ALL REQUIRED FIELDS EXIST */
        if (!contact.owner) throw new Error('Owner is required')
        if (!contact.first) throw new Error('First name is required')
        if (!contact.last) throw new Error('Last name is required')
        /** CHECK VALIDITY OF EACH OPTIONAL FIELDS */
        if (!contact.home && !contact.mobile) throw new Error('Telephone or mobile number missing')
        if (!contact.billing && !contact.physical) throw new Error('Billing or physical address missing')
    }

    public static validateName(name: string): void {
        /** CHECK IF NAME IS ATLEAST 3 CHARACTERS LONG */
        if (name.length < 3) throw new Error('Name must be atleast 3 characters long')
        /** CHECK IF NAME CONTAINS ILLEGAL CHARACTERS I.E NUMBERS */
        if (!/^[a-z\-]+$/i.test(name)) throw new Error('Name contains number and/or special characters except (-)')
    }

    private static validatePhoneNumber(number: string): void {
        /** CHECK IF THE PHONE NUMBER IS IN A VALID FORMAT */
        const regex = new RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)
        const valid = regex.test(number)
        if (!valid) throw new Error('Not a valid number')
    }

    private static validateAddress(address: Address): void {
        if (!address.street) throw new Error('Street is required')
        /** IF STREET EXISTS */
        if (address.street.length < 4) throw new Error('Street must be atleast 4 characters long')
        if (!address.city) throw new Error('City is required')
        /** IF CITY EXISTS */
        if (address.city.length < 4) throw new Error('City must be atleast 4 characters long')
        if (!address.province) throw new Error('Province is required')
        /** IF PROVINCE EXISTS */
        if (address.province.length < 2) throw new Error('Province must be atleast 2 characters long')
        if (!address.zip) throw new Error('State is required')
        /** IF ZIP EXISTS */
        if (address.zip.length < 4) throw new Error('State must be atleast 4 characters long')
        if (!/^[a-z\-]+$/.test(address.zip)) throw new Error('State must contain numbers only')
        if (!address.country) throw new Error('Country is required')
        /** IF COUNTRY EXISTS */
        if (address.country.length < 2) throw new Error('Country must be atleast 2 characters long')
    }
}

export class UserValidator {
    public static validate(user: UserResponseModel) {
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

    private static validateStructure(user: UserResponseModel): void {
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
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/.test(password))
            throw new Error(
                'Password must contain atleast one of the ff: uppercase letter, lowercase letter, number and a special character'
            )
    }
}
