import { DisplayState } from "./displayState";
import { BaseData } from "./baseData";

export class RootReducer {
    baseData: BaseData
    displayData: DisplayState

    constructor(input?: RootReducer) {
            Object.assign(this, input);
    }
   
}