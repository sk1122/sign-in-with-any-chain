export const generateRandomNonce = () => {
    const length = 8

    const result = Math.random().toString(36).substring(2, length + 2);

    return result
}