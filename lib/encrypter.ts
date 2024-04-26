import Cryptr from 'cryptr';

const cryptr = new Cryptr('myTotallySecretKey');


export const encryptToken = (id: number) => {
    const encryptedString = cryptr.encrypt(id.toString(),);
    return encryptedString;
};

export const decryptToken = (token: string) => {
    const decryptedString = cryptr.decrypt(token);
    return decryptedString;
};