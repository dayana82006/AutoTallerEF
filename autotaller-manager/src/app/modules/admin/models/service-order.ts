import { ServiceType } from "./service-type";
import { User } from "./user";
import { UserMember } from "./user-member";
import { Vehicle } from "./vehicle";


export interface ServiceOrder {
id: number,
description: string,
clientApproved : boolean,
serialNumber: Vehicle,
serviceType: ServiceType,
UserMember: UserMember,
unitPrice: number,
status: {
    id:number,
    description:string
}
}