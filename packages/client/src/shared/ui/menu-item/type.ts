export interface IMenuItem {
    icon: string;
    title: string;
    description?: string;
    link: string;
    onClick: Function | any;
}
