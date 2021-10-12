import { ITodo } from './interfaces';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Method } from './enums';

export type RoutesTypes = {
    Home: undefined;
    Create: undefined;
    Edit: { todo: ITodo };
    Login: undefined;
    Register: undefined;
};

export type TodoProps = {
    todo: ITodo,
    deleteTodo: Function,
    editTodo: Function,
}

export type TodoFormProps = {
    initialValues: ITodo,
    navigation: any,
    method: Method,
    buttonText: string,
}

// export type EditProps = {
//     navigation: NativeStackScreenProps<RoutesTypes, 'Edit'>,
//     route: any
// }
