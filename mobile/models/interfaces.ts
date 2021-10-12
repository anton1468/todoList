import { Dispatch, SetStateAction } from "react";

export interface ITodo {
    _id?: string;
    userId?: string,
    title: string,
    description: string,
    year: string,
    isPublic: boolean,
    isCompleted: boolean,
}

export interface ILogin {
    email: string,
    password: string,
}

export interface IRegister extends ILogin {
    userName: string,
    verifyPassword: string,
}

export interface IFailValidation {
    location: string,
    param: string,
    value: string | number,
    msg: string,
}

export interface IResponse {
    status: string,
    message: string,
    code: number,
}

export interface IDataResponse extends IResponse {
    data: ITodo[] | ITodo | IFailValidation[],
}


