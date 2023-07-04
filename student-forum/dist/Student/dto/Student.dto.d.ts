export declare class StudentDto {
    name: string;
    age: string;
    phone: string;
    email: string;
    gender: string;
    createdDate: Date;
    updatedDate: Date;
    password: string;
    profileImg: string;
    createdType: string;
    type: string;
    createdBy: number;
}
export declare class PasswordChangeStudentDto {
    oldPassword: string;
    newPassword: string;
}
export declare class ForgetPassStudentDto {
    email: string;
}
