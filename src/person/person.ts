/*All the info about a person*/

export interface Person {
    id: string,
    name: string,
    gender: string,
    other_gender: string,
    email: string,
    password: string,
    age: number,
    application_type: string,
    is_ucsc_student: boolean,
    other_school: string,
    current_company: string
}