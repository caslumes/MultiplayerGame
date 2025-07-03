function createKeyboardListener(document) {
    const state = {
        observers: [],
    };

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    document.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(event) {
        const key = event.key;

        const command = { playerId: currentPlayerId, key };

        notifyAll(command);
    }

    return {
        subscribe,
    };
}

export default createKeyboardListener