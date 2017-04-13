
export interface IPTabs {
    changeTab (tab: number): void,
    tabs: Array<ITab>
};

export interface ISTabs {
    currentTab: number
};

export interface IPTab {
    id: number,
    title: string,
    url: string,
    isCurrent: boolean,
    handleClick (tab: number): void
};

export interface ISTab {
    
};


export interface ITab {
    id: number,
    title: string,
    url: string
}