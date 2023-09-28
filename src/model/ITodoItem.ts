export interface ITodoItem {
    completed: boolean;
    id: number;
    title: string;
    // userId: number;

    firstName: string;
    sex: string | null;
    list: string | null;
    lastName: string;
    email: string;
    subscribed: boolean;
    jobTitle: string;
    prefix: string;
    suffix: string;
    jobArea: string;
    age: number;
    keyword: string;
    address: string;
    phonenumber: string;
    city: string;
    state: string;
    country: string;
}

export default ITodoItem;
