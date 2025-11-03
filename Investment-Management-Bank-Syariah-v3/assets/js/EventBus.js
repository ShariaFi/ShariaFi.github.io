/*
 * ====================================================================
 * EventBus.js: A Simple Pub/Sub Event Bus
 * ====================================================================
 * This utility provides a central "announcement board" for
 * decoupled modules to communicate without knowing about each other.
 */
class EventBus {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribes a callback function to a specific event.
     * @param {string} eventName - The name of the event to listen for.
     * @param {function} callback - The function to call when the event is published.
     */
    subscribe(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    /**
     * Publishes (triggers) an event, calling all subscribed callbacks.
     * @param {string} eventName - The name of the event to publish.
     * @param {*} data - The data to pass to the callbacks.
     */
    publish(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(data);
            });
        }
    }
    /**
     * Unsubscribes a callback function from a specific event.
     * @param {string} eventName - The name of the event.
     * @param {function} callback - The specific function to remove.
     */
    unsubscribe(eventName, callback) {
        if (this.events[eventName]) {
            // Filter out the callback to remove
            this.events[eventName] = this.events[eventName].filter(
                (cb) => cb !== callback
            );
        }
    }

    // We could add an 'unsubscribe' method, but for this app, it's not needed.
}
