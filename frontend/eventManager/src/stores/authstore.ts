import {makeAutoObservable} from "mobx";

const API_BASE_URL = "http://127.0.0.1:8000";

class AuthStore {
    accessToken = "";
    refreshToken = "";
    isAuthenticated = false;
    role = "";
    username = "";
    userId = "";
    email = "";
    phone = "";

    constructor() {
        makeAutoObservable(this);
        // makeAutoObservable(this, {
        //     accessToken: observable,
        //     refreshToken: observable,
        //     isAuthenticated: observable,
        //     role: observable,
        //     username: observable,
        // })

        this.accessToken = localStorage.getItem("access_token") ?? "";
        this.refreshToken = localStorage.getItem("refresh_token") ?? "";

        this.isAuthenticated = !!(this.accessToken || this.refreshToken);
    }

    login(access: string, refresh: string) {
        this.accessToken = access;
        this.refreshToken = refresh;
        this.isAuthenticated = true;

        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
    }

    setAccessToken(access: string) {
        this.accessToken = access;
        this.isAuthenticated = true;
        localStorage.setItem("access_token", access);
    }

    async refreshAccessToken() {
        if (!this.refreshToken) {
            this.logout();
            return false;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: this.refreshToken }),
            });

            if (!response.ok) {
                this.logout();
                return false;
            }

            const data = await response.json();
            this.setAccessToken(data.access ?? "");

            if (data.refresh) {
                this.refreshToken = data.refresh;
                localStorage.setItem("refresh_token", data.refresh);
            }

            return true;
        } catch (error) {
            console.error("Error refreshing access token:", error);
            this.logout();
            return false;
        }
    }

    setProfile(role: string, username: string, userId: string, email: string, phone: string) {
        this.role = role;
        this.username = username;
        this.userId = userId;
        this.email = email;
        this.phone = phone;
    }

    logout() {
        this.accessToken = "";
        this.refreshToken = "";
        this.isAuthenticated = false;
        this.role = "";
        this.username = "";
        this.userId = "";
        this.email = "";
        this.phone = "";

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }
}

const authStore = new AuthStore();

export default authStore;
