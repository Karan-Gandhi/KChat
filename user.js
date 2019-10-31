module.exports = class user {
    constructor(uid, name, email, password, cid) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.password = password
        this.cid = cid;

        this.messages = [];
    }

    gotMessage(m) {
        this.messages.push(m);
    }

    getUID() {
        return this.uid;
    }

    getName() {
        return this.name;
    }

    getUname() {
        return this.uname;
    }

    getPassword() {
        return this.password;
    }

    getCID() {
        return this.cid;
    }

    getMessages() {
        return this.messages;
    }
}