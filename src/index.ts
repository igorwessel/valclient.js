import valclient from "./client";

(async () => {
    try {
        const valClient = new valclient();
        await valClient.init();
    } catch (e) {
        console.log(e);
    }
})();
