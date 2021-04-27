import { View } from "../view";
import { LoginView } from "../login/login.view";
import { addEventListener } from "../../utils/ui";
import { HOME_HTML } from "./home.html";

export class HomeView extends View {
    constructor() {
        super(HOME_HTML);
        addEventListener('form', 'submit', () => { new LoginView(); })
    }
}