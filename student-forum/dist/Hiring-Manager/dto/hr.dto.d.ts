export declare class HrDto {
    name: string;
    age: string;
    phone: string;
    email: string;
    gender: string;
    connection: string[];
    password: string;
    profileImg: string;
    createdBy: number;
}
export declare class HrLoginDto {
    email: string;
    password: string;
}
export declare class PasswordChangeHrDto {
    oldPassword: string;
    newPassword: string;
}
export declare class ForgetPassHrDto {
    email: string;
}
