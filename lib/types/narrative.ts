export type NarrativeResponse = {
    backgroundUpdate: boolean;
    characterUpdate: boolean;
    narrative: string;
};

export type NarrativeInput= {
    role: string;
    parts: {text:string}[];
}