function createKeyboardListener(document) {
    const state = {
        observers: [],
        playerId: null,
    };

    function registerPlayerId(playerId) {
        state.playerId = playerId;
    }

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
        const playerId = state.playerId;
        const key = event.key;

        const command = { playerId, key };

        notifyAll(command);
    }

    return {
        subscribe,
        registerPlayerId
    };
}

export default createKeyboardListener;
