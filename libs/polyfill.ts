// PDF library uses Array.at() which is not supported in safari and other older browsers. this polyfill is a workaround for the method

if (!Array.prototype.at) {
    Array.prototype.at = function (index) {
        // Get the length of the array
        const length = this.length;

        // Handle negative indices
        if (index < 0) {
            index = length + index;
        }

        // Check if the index is out of range
        if (index < 0 || index >= length) {
            return undefined;
        }

        // Return the element at the specified index
        return this[index];
    };
}
export {}