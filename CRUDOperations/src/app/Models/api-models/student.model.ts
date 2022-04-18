import { Address } from "./address.model";
import { Gender } from "./gender.model";

export interface Student {
id : string,
firstName : string,
lastName : string,
dob : string,
email : string,
phoneNumber : string,
profileImageURL : string,
genderId : string,
gender : Gender,
address : Address
}
